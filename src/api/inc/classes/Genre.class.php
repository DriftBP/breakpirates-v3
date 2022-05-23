<?php
class Genre {
	var $id;
	var $name;

	function Genre($id, $name) {
		$this->id = intval($id);
		$this->name = $name;
	}

	function getID() {
		return $this->id;
	}

	function getName() {
		return $this->name;
	}

	/*
	 * Returns a list of shows featuring this genre
	 */
	function getShows() {
		$shows = array();

		$sql = "SELECT DISTINCT s.showid, s.dayid, s.starttime
				FROM shows s
					INNER JOIN shows_genres sg ON s.showid = sg.showid
				WHERE sg.genreid = " . $this->id . "
					AND s.active = 'yes'
				ORDER BY s.dayid ASC, s.starttime ASC";;

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
