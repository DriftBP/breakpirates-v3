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

	function getHosts() {
    global $db;
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
    global $db;
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

	function getVideos() {
    global $db;
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
}

?>
