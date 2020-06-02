<?php
class News {
	var $id;
	var $title;
	var $text;
	var $added_by;
	var $date;

	function News($id, $title, $summary, $text, $image, $added_by, $date) {
		$this->id = intval($id);
		$this->title = $title;
		$this->summary = $summary;
		$this->text = $text;
		$this->image = $image;
		$this->added_by = $added_by;
		$this->date = $date;
	}

	function getID() {
		return $this->id;
	}

	function getTitle() {
		return $this->title;
	}

	function getSummary() {
		return $this->summary;
	}

	function getText() {
		return $this->text;
	}

	function getImage() {
		return $this->image;
	}

	function getAddedBy() {
		return $this->added_by;
	}

	function getDate() {
		return $this->date;
	}
}

?>