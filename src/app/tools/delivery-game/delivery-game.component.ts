import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

interface Vec2 { x: number; y: number; }
interface Order {
  pickup: Vec2;
  dropoff: Vec2;
  freshness: number;
  temperature: number;
  quality: number;
  active: boolean;
}

@Component({
  selector: 'bp-delivery-game',
  templateUrl: './delivery-game.component.html',
  styleUrls: ['./delivery-game.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DeliveryGameComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  mapWidth = 40;
  mapHeight = 30;
  tileSize = 16;
  map: number[][] = [];
  player: Vec2 = { x: 5, y: 7 };
  velocity: Vec2 = { x: 0, y: 0 };
  speed = 0.12;
  maxSpeed = 0.22;
  order: Order | null = null;
  orderActive = false;
  freshness = 100;
  temperature = 80;
  quality = 100;
  score = 0;
  lastUpdate = 0;
  keys: { [k: string]: boolean } = {};
  customerLocations: Vec2[] = [
    { x: 16, y: 3 }, { x: 2, y: 12 }, { x: 18, y: 13 }, { x: 35, y: 5 }, { x: 28, y: 25 },
    { x: 8, y: 22 }, { x: 22, y: 10 }, { x: 38, y: 28 }, { x: 5, y: 27 }, { x: 30, y: 15 }
  ];
  restaurantLocations: Vec2[] = [
    { x: 3, y: 2 }, { x: 10, y: 7 }, { x: 20, y: 5 }, { x: 32, y: 8 }, { x: 25, y: 20 },
    { x: 12, y: 18 }, { x: 36, y: 12 }, { x: 7, y: 25 }
  ];
  playerAngle = 0;
  deliveryRatings: number[] = [];
  lastDeliveryRating: number = 0;
  overallRating: number = 0;
  lastDeliveryFee: number = 0;
  totalEarnings: number = 0;

  // Tile types: 0=road, 1=building, 2=grass, 3=sidewalk, 4=park, 5=shop, 6=house
  tileTypes = [
    { color: '#222', name: 'Road' },
    { color: '#bcbcbc', name: 'Building' },
    { color: '#6c6', name: 'Grass' },
    { color: '#e0e0e0', name: 'Sidewalk' },
    { color: '#4c8', name: 'Park' },
    { color: '#f7c873', name: 'Shop' },
    { color: '#c9a', name: 'House' }
  ];

  ngOnInit() {
    this.generateMap();
    this.spawnOrder();
    setTimeout(() => {
      requestAnimationFrame(this.gameLoop.bind(this));
    });
  }

  generateMap() {
    // Simpler, less grid-like town: main roads, some branches, and a few random streets
    this.map = Array.from({ length: this.mapHeight }, (_, y) =>
      Array.from({ length: this.mapWidth }, (_, x) => {
        // Border buildings
        if (x === 0 || y === 0 || x === this.mapWidth-1 || y === this.mapHeight-1) return 1;
        // Main horizontal road
        if (y === Math.floor(this.mapHeight / 2)) return 0;
        // Main vertical road
        if (x === Math.floor(this.mapWidth / 2)) return 0;
        // A few branches off the main roads
        if ((x === Math.floor(this.mapWidth / 4) && y > 4 && y < this.mapHeight - 4) ||
            (x === Math.floor(this.mapWidth * 3 / 4) && y > 6 && y < this.mapHeight - 6) ||
            (y === Math.floor(this.mapHeight / 4) && x > 4 && x < this.mapWidth - 4) ||
            (y === Math.floor(this.mapHeight * 3 / 4) && x > 6 && x < this.mapWidth - 6)) return 0;
        // Some random short streets
        if ((x % 11 === 0 && y > 2 && y < this.mapHeight - 2 && Math.random() < 0.5) ||
            (y % 9 === 0 && x > 2 && x < this.mapWidth - 2 && Math.random() < 0.5)) return 0;
        // Sidewalks next to roads
        if (Math.abs(y - Math.floor(this.mapHeight / 2)) === 1 || Math.abs(x - Math.floor(this.mapWidth / 2)) === 1) return 3;
        if (Math.abs(x - Math.floor(this.mapWidth / 4)) === 1 && y > 4 && y < this.mapHeight - 4) return 3;
        if (Math.abs(x - Math.floor(this.mapWidth * 3 / 4)) === 1 && y > 6 && y < this.mapHeight - 6) return 3;
        if (Math.abs(y - Math.floor(this.mapHeight / 4)) === 1 && x > 4 && x < this.mapWidth - 4) return 3;
        if (Math.abs(y - Math.floor(this.mapHeight * 3 / 4)) === 1 && x > 6 && x < this.mapWidth - 6) return 3;
        // Parks
        if ((x > 30 && x < 36 && y > 3 && y < 8) || (x > 5 && x < 12 && y > 20 && y < 27)) return 4;
        // Shops (yellow)
        if ((x === 2 && y === 2) || (x === 37 && y === 28) || (x === 25 && y === 5)) return 5;
        // Houses (pink)
        if ((x === 35 && y === 5) || (x === 8 && y === 22) || (x === 5 && y === 27) || (x === 30 && y === 15)) return 6;
        // Random grass
        if (Math.random() < 0.12) return 2;
        // Default: building block
        return 1;
      })
    );
    // Clear restaurant and customer spots to road
    [...this.restaurantLocations, ...this.customerLocations].forEach(loc => {
      this.map[loc.y][loc.x] = 0;
    });

    // Ensure all collection points are accessible by carving a path from each to the nearest road
    const isRoad = (x: number, y: number) => this.map[y]?.[x] === 0;
    const carvePath = (from: Vec2) => {
      // Find nearest road tile using BFS
      const visited = Array.from({ length: this.mapHeight }, () => Array(this.mapWidth).fill(false));
      const queue: { x: number; y: number; path: Vec2[] }[] = [{ x: from.x, y: from.y, path: [] }];
      visited[from.y][from.x] = true;
      let path: Vec2[] = [];
      while (queue.length) {
        const { x, y, path: p } = queue.shift()!;
        if (isRoad(x, y) && !(x === from.x && y === from.y)) {
          path = p;
          break;
        }
        for (const [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < this.mapWidth && ny < this.mapHeight && !visited[ny][nx]) {
            visited[ny][nx] = true;
            queue.push({ x: nx, y: ny, path: [...p, { x: nx, y: ny }] });
          }
        }
      }
      // Carve the path as road
      if (path.length) {
        path.forEach(({ x, y }) => {
          this.map[y][x] = 0;
        });
      }
    };
    [...this.restaurantLocations, ...this.customerLocations].forEach(loc => {
      carvePath(loc);
    });
  }

  spawnOrder() {
    const pickup = this.restaurantLocations[Math.floor(Math.random() * this.restaurantLocations.length)];
    let dropoff = this.customerLocations[Math.floor(Math.random() * this.customerLocations.length)];
    while (dropoff.x === pickup.x && dropoff.y === pickup.y) {
      dropoff = this.customerLocations[Math.floor(Math.random() * this.customerLocations.length)];
    }
    this.order = {
      pickup: { ...pickup },
      dropoff: { ...dropoff },
      freshness: 100,
      temperature: 50, // Start at 50°C
      quality: 100,
      active: false
    };
    this.orderActive = false;
    this.freshness = 100;
    this.temperature = 50; // Start at 50°C
    this.quality = 100;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    this.keys[e.key.toLowerCase()] = true;
    // Prevent scrolling for arrow keys and space
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "space"].includes(e.key.toLowerCase())) {
      e.preventDefault();
      return false;
    }
    return true;
  }
  @HostListener('window:keyup', ['$event'])
  onKeyUp(e: KeyboardEvent) {
    this.keys[e.key.toLowerCase()] = false;
  }

  gameLoop(ts: number) {
    if (!this.lastUpdate) this.lastUpdate = ts;
    const dt = Math.min((ts - this.lastUpdate) / 16, 2); // ~60fps
    this.lastUpdate = ts;
    this.update(dt);
    this.draw();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  update(dt: number) {
    // Movement
    let dx = 0, dy = 0;
    if (this.keys['arrowup'] || this.keys['w']) dy -= 1;
    if (this.keys['arrowdown'] || this.keys['s']) dy += 1;
    if (this.keys['arrowleft'] || this.keys['a']) dx -= 1;
    if (this.keys['arrowright'] || this.keys['d']) dx += 1;
    const mag = Math.sqrt(dx*dx + dy*dy) || 1;
    this.velocity.x = (dx / mag) * this.speed;
    this.velocity.y = (dy / mag) * this.speed;
    // Calculate angle for bike rotation
    if (dx !== 0 || dy !== 0) {
      this.playerAngle = Math.atan2(dy, dx);
    }
    // Simulate crazy driving
    let crazy = 0;
    if (Math.abs(dx) + Math.abs(dy) > 1) crazy += 0.5;
    if (Math.abs(this.velocity.x) > this.speed * 0.8 || Math.abs(this.velocity.y) > this.speed * 0.8) crazy += 0.5;
    // Move player
    let newX = this.player.x + this.velocity.x * dt;
    let newY = this.player.y + this.velocity.y * dt;
    if (this.map[Math.round(newY)]?.[Math.round(newX)] !== 1) {
      this.player.x = newX;
      this.player.y = newY;
    } else {
      crazy += 1; // collision
    }
    // Order logic
    if (this.order && !this.order.active && Math.abs(this.player.x - this.order.pickup.x) < 0.5 && Math.abs(this.player.y - this.order.pickup.y) < 0.5) {
      this.order.active = true;
      this.orderActive = true;
    }
    if (this.order && this.order.active && Math.abs(this.player.x - this.order.dropoff.x) < 0.5 && Math.abs(this.player.y - this.order.dropoff.y) < 0.5) {
      // Delivered!
      // Calculate delivery rating (0-5 stars)
      const freshnessScore = this.freshness / 100; // not used in rating, but could be
      const tempScore = Math.max(0, Math.min(1, this.temperature / 80));
      const qualityScore = Math.max(0, Math.min(1, this.quality / 100));
      // Weight: 50% quality, 50% temperature (higher ratings for orders)
      const rating = Math.round((qualityScore * 0.5 + tempScore * 0.5) * 5 * 10) / 10 / 1; // 0-5, 1 decimal
      this.lastDeliveryRating = Math.max(0, Math.min(5, rating));
      this.deliveryRatings.push(this.lastDeliveryRating);
      // Update overall rating (average, rounded to 1 decimal)
      this.overallRating = Math.round((this.deliveryRatings.reduce((a, b) => a + b, 0) / this.deliveryRatings.length) * 10) / 10;
      // Calculate delivery fee based on distance
      const dx = this.order.dropoff.x - this.order.pickup.x;
      const dy = this.order.dropoff.y - this.order.pickup.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      this.lastDeliveryFee = Math.round((3 + dist * 1.2) * 100) / 100; // $3 base + $1.2 per tile, 2 decimals
      this.totalEarnings = Math.round((this.totalEarnings + this.lastDeliveryFee) * 100) / 100;
      this.spawnOrder();
      return;
    }
    // Deteriorate order
    if (this.order && this.order.active) {
      this.freshness = Math.max(0, this.freshness - 0.08 * dt);
      // More realistic cooling: slower exponential decay toward room temp (20°C)
      const roomTemp = 20;
      const coolingRate = 0.0035; // Much slower cooling, closer to real food
      this.temperature = Math.max(roomTemp, this.temperature - (this.temperature - roomTemp) * coolingRate * dt);
      this.quality = Math.max(0, this.quality - crazy * 0.18 * dt); // erratic driving penalizes less
    }
  }

  draw() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, this.mapWidth * this.tileSize, this.mapHeight * this.tileSize);
    // Draw map with details
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        const tile = this.map[y][x];
        ctx.fillStyle = this.tileTypes[tile]?.color || '#222';
        ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        // Draw building details
        if (tile === 1) {
          ctx.strokeStyle = '#999';
          ctx.lineWidth = 2;
          ctx.strokeRect(x * this.tileSize + 4, y * this.tileSize + 4, this.tileSize - 8, this.tileSize - 8);
          ctx.fillStyle = '#eee';
          ctx.fillRect(x * this.tileSize + 12, y * this.tileSize + 12, 8, 8); // window
        }
        // Draw shop awning
        if (tile === 5) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(x * this.tileSize + 4, y * this.tileSize + 4, this.tileSize - 8, 8);
          ctx.fillStyle = '#f00';
          ctx.fillRect(x * this.tileSize + 4, y * this.tileSize + 12, 8, 8);
          ctx.fillStyle = '#0af';
          ctx.fillRect(x * this.tileSize + 20, y * this.tileSize + 12, 8, 8);
        }
        // Draw house roof
        if (tile === 6) {
          ctx.fillStyle = '#a44';
          ctx.beginPath();
          ctx.moveTo(x * this.tileSize + 4, y * this.tileSize + 16);
          ctx.lineTo(x * this.tileSize + 16, y * this.tileSize + 4);
          ctx.lineTo(x * this.tileSize + 28, y * this.tileSize + 16);
          ctx.closePath();
          ctx.fill();
        }
        // Draw park trees
        if (tile === 4) {
          ctx.fillStyle = '#393';
          ctx.beginPath();
          ctx.arc(x * this.tileSize + 10, y * this.tileSize + 10, 6, 0, 2 * Math.PI);
          ctx.arc(x * this.tileSize + 22, y * this.tileSize + 22, 5, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
    // Draw restaurants (make them look more like restaurants)
    this.restaurantLocations.forEach(loc => {
      ctx.save();
      ctx.translate(loc.x * this.tileSize + this.tileSize / 2, loc.y * this.tileSize + this.tileSize / 2);
      // Restaurant base
      ctx.fillStyle = '#fff';
      ctx.fillRect(-7, -7, 14, 14);
      // Red awning stripes
      ctx.fillStyle = '#e33';
      for (let i = -7; i < 7; i += 4) {
        ctx.fillRect(i, -7, 2, 6);
      }
      // Door
      ctx.fillStyle = '#964B00';
      ctx.fillRect(-2, 2, 4, 5);
      // Restaurant sign
      ctx.fillStyle = '#ffe066';
      ctx.fillRect(-6, -12, 12, 4);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.strokeRect(-6, -12, 12, 4);
      ctx.restore();
    });
    // Draw customers (make them look like houses/apartment blocks)
    this.customerLocations.forEach(loc => {
      ctx.save();
      ctx.translate(loc.x * this.tileSize + this.tileSize / 2, loc.y * this.tileSize + this.tileSize / 2);
      // House base
      ctx.fillStyle = '#f7e6e6';
      ctx.fillRect(-7, -5, 14, 10);
      // Roof
      ctx.fillStyle = '#a44';
      ctx.beginPath();
      ctx.moveTo(-8, -5);
      ctx.lineTo(0, -12);
      ctx.lineTo(8, -5);
      ctx.closePath();
      ctx.fill();
      // Door
      ctx.fillStyle = '#964B00';
      ctx.fillRect(-2, 2, 4, 5);
      // Windows
      ctx.fillStyle = '#bdf';
      ctx.fillRect(-5, -2, 3, 3);
      ctx.fillRect(2, -2, 3, 3);
      ctx.restore();
    });
    // Draw order pickup/dropoff
    if (this.order && !this.order.active) {
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        this.order.pickup.x * this.tileSize + this.tileSize / 2 - 9,
        this.order.pickup.y * this.tileSize + this.tileSize / 2 - 13,
        18, 22
      );
    }
    if (this.order && this.order.active) {
      ctx.strokeStyle = '#f00';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        this.order.dropoff.x * this.tileSize + this.tileSize / 2 - 9,
        this.order.dropoff.y * this.tileSize + this.tileSize / 2 - 13,
        18, 22
      );
    }
    // Draw player as a bike
    ctx.save();
    ctx.translate(this.player.x * this.tileSize + 16, this.player.y * this.tileSize + 16);
    ctx.rotate(this.playerAngle);
    // Draw bike body
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-8, 0); // rear wheel
    ctx.lineTo(8, 0);  // front wheel
    ctx.stroke();
    // Draw wheels
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-8, 0, 5, 0, 2 * Math.PI); // rear
    ctx.arc(8, 0, 5, 0, 2 * Math.PI);  // front
    ctx.fill();
    // Draw handlebar
    ctx.strokeStyle = '#0af';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(12, -4);
    ctx.moveTo(8, 0);
    ctx.lineTo(12, 4);
    ctx.stroke();
    // Draw rider (head and body)
    ctx.fillStyle = '#ff6';
    ctx.beginPath();
    ctx.arc(0, -7, 4, 0, 2 * Math.PI); // head
    ctx.fill();
    ctx.strokeStyle = '#fa0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -3);
    ctx.lineTo(0, 5);
    ctx.stroke();
    ctx.restore();
  }

  getCurrentOrderValue(): string {
    if (!this.order || !this.order.active) return '';
    const dx = this.order.dropoff.x - this.order.pickup.x;
    const dy = this.order.dropoff.y - this.order.pickup.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const value = Math.round((3 + dist * 1.2) * 100) / 100;
    return value.toFixed(2);
  }
}
