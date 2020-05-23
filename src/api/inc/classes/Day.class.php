<?php
class Day {
	var $id;
	var $name;

	function Day($id, $name) {
		$this->id = intval($id);
		$this->name = $name;
	}

	function getID() {
		return $this->id;
	}

	function getName() {
		return $this->name;
	}
}
?>