<?php

class Host {
	var $id;
	var $name;
	var $biog;
	var $location;
	var $image;
	var $twitter;
	var $mixcloud;

	function Host($id, $name, $biog, $location, $image, $twitter, $mixcloud) {
		$this->id = intval($id);
		$this->name = $name;
		$this->biog = $biog;
		$this->location = $location;
		$this->image = $image;
		$this->twitter = $twitter;
		$this->mixcloud = $mixcloud;
	}

	function getID() {
		return $this->id;
	}

	function getName() {
		return $this->name;
	}

	function getBiog() {
		return $this->biog;
	}

	function getLocation() {
		return $this->location;
	}

	function getImage() {
		return $this->image;
	}

	function getTwitter() {
		return $this->twitter;
	}

	function getMixcloud() {
			return $this->mixcloud;
	}

	function getShows() {
		$shows = array();

		$sql = "SELECT s.showid
				FROM shows s
					INNER JOIN show_host sh ON sh.showid = s.showid
				WHERE s.active = 'yes' AND sh.hostid = " . $this->id . "
				ORDER BY s.dayid ASC, s.starttime ASC";

		$result = mysqli_query($db, $sql);

		if($result && mysqli_num_rows($result)>0) {
			while(list($show_id)=mysqli_fetch_row($result)) {
				$show = getShow($show_id);

				if($show) {
					array_push($shows, $show);
				}
			}
		}

		return $shows;
	}
}

?>
