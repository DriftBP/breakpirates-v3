<?php
class Day {
	var $id;
	var $name;

	public function __construct($id, $name) {
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
