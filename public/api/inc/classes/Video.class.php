<?php
class Video {
	var $id;
	var $name;
	var $code;
	var $showid;
	var $date;

	public function __construct($id, $name, $code, $showid, $date) {
		$this->id = intval($id);
		$this->name = $name;
		$this->code = $code;
		$this->showid = $showid;
		$this->date = $date;
	}

	function getID() {
		return $this->id;
	}

	function getName() {
		return $this->name;
	}

	function getCode() {
		return $this->code;
	}

	function getShow() {
		if(!empty($this->showid)) {
			return getShow($this->showid);
		} else {
			return false;
		}
	}

	function getDate() {
		return $this->date;
	}
}

?>
