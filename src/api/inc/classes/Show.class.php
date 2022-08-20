<?php

class Show {
	var $id;
	var $title;
	var $description;
	var $image;
	var $day_id;
	var $start_time;
  var $end_time;
  var $genres;
  var $hosts;

	public function __construct($id, $title, $description, $image, $day_id, $start_time, $end_time) {
		$this->id = intval($id);
		$this->title = $title;
		$this->description = $description;
		$this->image = $image;
		$this->day_id = intval($day_id);
		$this->start_time = $start_time;
    $this->end_time = $end_time;
    $this->genres = $this->getGenres();
    $this->hosts = $this->getHosts();
	}

	function getID() {
			return $this->id;
	}

	function getTitle() {
			return $this->title;
	}

	function getDescription() {
			return $this->description;
	}

	function getImage() {
			return $this->image;
	}

	function getDayID() {
			return $this->day_id;
	}

	function getStartTime() {
			return $this->timeToHM($this->start_time);
	}

	function getEndTime() {
			return $this->timeToHM($this->end_time);
	}

	function timeToHM($time) {
		$time_bits = explode(':', $time);

		// Lose the minutes
		array_pop($time_bits);

		return join(':', $time_bits);
	}

	function getHosts() {
		$hosts = array();

		$sql = "SELECT DISTINCT h.hostid
				FROM show_host sh
					INNER join hosts h on h.hostid = sh.hostid
				WHERE sh.showid = " . $this->id;

		$result = mysqli_query($db, $sql);

		if($result && mysqli_num_rows($result)>0) {
			while(list($host_id)=mysqli_fetch_row($result)) {
				$host = getHost($host_id);

				if($host) {
					array_push($hosts, $host);
				}
			}
		}

		return $hosts;
	}

	function getGenres() {
		$genres = array();

		$sql = "SELECT DISTINCT g.genreid
				FROM shows_genres sg
					INNER join genres g on g.genreid = sg.genreid
				WHERE sg.showid = " . $this->id;

		$result = mysqli_query($db, $sql);

		if($result && mysqli_num_rows($result)>0) {
			while(list($genre_id)=mysqli_fetch_row($result)) {
				$genre = getGenre($genre_id);

				if($genre) {
					array_push($genres, $genre);
				}
			}
		}

		return $genres;
	}

	function isOnNow() {
		$today=date("l");

		if($today == $this->getDayName()) {
			return ($this->start_time <= date('H:i') && $this->end_time > date('H:i')) ? true : false;
		} else {
			return false;
		}
	}

	function getDayName() {
		$day = getDay($this->day_id);

		if($day) {
			return $day->getName();
		} else {
			return false;
		}
	}

	function getDownloads() {
		$downloads = array();

		return $downloads;
	}

	function getVideos() {
		$videos = array();

		$sql = "SELECT videoid, name, code, date
						FROM video
						WHERE showid = " . $this->id . "
						ORDER BY date DESC";

		$result = mysqli_query($db, $sql);

		if($result && mysqli_num_rows($result)>0) {
			while(list($videoid, $name, $code, $date) = mysqli_fetch_row($result)) {
				array_push($videos, new Video($videoid, $name, $code, $this->id, $date));
			}
		}

		return $videos;
	}

	function getSimilar($number = 3) {
		$number = intval($number);

		$similar_shows = array();

		$genre_ids = array();

		$genres = $this->getGenres();

		foreach($genres as $genre) {
			array_push($genre_ids, $genre->getID());
		}

		if(count($genre_ids) > 0) {
			$sql = "select s.showid, count(*) as matches from shows s
						INNER JOIN shows_genres sg ON s.showid = sg.showid
						WHERE sg.genreid IN (" . join(",", $genre_ids) . ")
							AND s.showid != " . $this->id . "
							AND s.active = 'yes'
						GROUP BY s.showid
						ORDER BY matches DESC
						LIMIT " . $number;

			$result = mysqli_query($db, $sql);

			if($result && mysqli_num_rows($result)>0) {
				while(list($show_id, $matches) = mysqli_fetch_row($result)) {
					$show = getShow($show_id);

					if($show) {
						array_push($similar_shows, $show);
					}
				}
			}
		}

		return $similar_shows;
	}
}

?>
