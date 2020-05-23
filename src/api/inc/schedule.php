<?php

/*
 * Schedule related objects and functions
 */

require_once("dbconnect.php");
require_once("classes/Day.class.php");
require_once("classes/Genre.class.php");
require_once("classes/Host.class.php");
require_once("classes/News.class.php");
require_once("classes/Show.class.php");
require_once("classes/Video.class.php");

// Hack for handling daylight saving
$daylight_saving = date("I");

if($daylight_saving == 0) {
	// Set the timezone back an hour
	//date_default_timezone_set('Atlantic/Azores');
}

function getHost($host_id) {
	$host_id = intval($host_id);

	$sql = "SELECT hostid, name, biog, location, image, twitter, mixcloud
			FROM hosts
			WHERE hostid = " . $host_id;

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		list($host_id, $name, $biog, $location, $image, $twitter, $mixcloud) = mysql_fetch_row($result);

		return new Host($host_id, $name, $biog, $location, $image, $twitter, $mixcloud);
	} else {
		return false;
	}
}

function getHosts($show_id = 0) {
	$show_id = intval($show_id);

	$hosts = array();

	$sql = "SELECT DISTINCT h.hostid
			FROM hosts h";

	if($show_id > 0) {
		$sql .= " INNER JOIN show_host sh ON sh.hostid = h.hostid
					WHERE sh.showid = " . $show_id;
	}

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		while(list($host_id)=mysql_fetch_row($result)) {
			$host = getHost($host_id);

			if($host) {
				array_push($hosts, $host);
			}
		}
	}

	return $hosts;
}

function getShow($show_id) {
	$show_id = intval($show_id);

	$sql = "SELECT showid, title, description, image, dayid, starttime, endtime
			FROM shows
			WHERE showid = " . $show_id;

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		list($id, $title, $description, $image, $day_id, $start_time, $end_time) = mysql_fetch_row($result);

		return new Show($id, $title, $description, $image, $day_id, $start_time, $end_time);
	} else {
		return false;
	}
}

function getVideo($video_id) {
	$video_id = intval($video_id);

	$sql = "SELECT name, code, showid, date
			FROM video
			WHERE videoid = " . $video_id;

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		list($name, $code, $show_id, $date) = mysql_fetch_row($result);

		return new Video($video_id, $name, $code, $show_id, $date);
	} else {
		return false;
	}
}

function getAllVideos() {
	$videos = array();

	$sql = "SELECT videoid
			FROM video
			ORDER BY date DESC";

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		while(list($video_id) = mysql_fetch_row($result)) {
			$video = getVideo($video_id);

			if($video) {
				array_push($videos, $video);
			}
		}
	}

	return $videos;
}

/*
 * Returns a single news article
 */
function getNews($news_id) {
	$news_id = intval($news_id);

	$sql = "SELECT title, summary, text, image, date, addedby
			FROM news
			WHERE  approved='yes'
				AND newsid = " . $news_id;

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		list($title, $summary, $text, $image, $date, $added_by) = mysql_fetch_row($result);

		return new News($news_id, stripslashes($title), stripslashes($summary), stripslashes($text), stripslashes($image), $added_by, $date);
	} else {
		return false;
	}
}

/*
 * Returns a number of news articles
 * A $number of 0 indicates all
 */
function getAllNews($only_approved = false, $number = 0) {
	$number = intval($number);
	$offset = intval($offset);

	$news_articles = array();

	$sql = "SELECT newsid
			FROM news";

	if($only_approved) {
		$sql .= " WHERE approved = 'yes'";
	}

	$sql .= " ORDER BY date DESC";

	if($number > 0) {
		$sql .= " LIMIT " . $number;
	}

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		while(list($newsid) = mysql_fetch_row($result)) {
			$news = getNews($newsid);

			if($news) {
				array_push($news_articles, $news);
			}
		}
	}

	return $news_articles;
}

function getDay($day_id) {
	$day_id = intval($day_id);

	$sql = "SELECT name
			FROM days
			WHERE dayid = " . $day_id;

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		list($name) = mysql_fetch_row($result);

		return new Day($day_id, $name);
	} else {
		return false;
	}
}

function getDayByName($day_name) {
	$sql = "SELECT dayid, name
			FROM days
			WHERE name = '" . addslashes($day_name) . "'";

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		list($day_id, $name) = mysql_fetch_row($result);

		return new Day($day_id, $name);
	} else {
		return false;
	}
}

function getGenre($genre_id) {
	$genre_id = intval($genre_id);

	$sql = "SELECT name
			FROM genres
			WHERE genreid = " . $genre_id;

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		list($name) = mysql_fetch_row($result);

		return new Genre($genre_id, $name);
	} else {
		return false;
	}
}

function getGenres() {
	$genres = array();

	$sql = "SELECT genreid
			FROM genres
			ORDER BY name";

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		while(list($genre_id)=mysql_fetch_row($result)) {
			$genre = getGenre($genre_id);

			if($genre) {
				array_push($genres, $genre);
			}
		}
	}

	return $genres;
}

function getShowOnNow() {
	$sql = "SELECT s.showid
			FROM shows s
				INNER JOIN days d ON d.dayid = s.dayid
			WHERE d.name = '" . date('l') . "'
			AND s.starttime <= '" . date('H:i') . "'
			AND s.endtime > '" . date('H:i') . "'";

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		list($show_id) = mysql_fetch_row($result);

		return getShow($show_id);
	} else {
		return false;
	}
}

function getShows($day) {
	$shows = array();

	$sql = "SELECT s.showid
			FROM shows s
				INNER JOIN days d ON d.dayid = s.dayid
			WHERE d.name = '" . addslashes($day) . "'
			ORDER BY s.starttime ASC";

	$result = mysql_query($sql);

	if($result && mysql_num_rows($result)>0) {
		while(list($show_id)=mysql_fetch_row($result)) {
			$show = getShow($show_id);

			if($show) {
				array_push($shows, $show);
			}
		}
	}

	return $shows;
}

function friendlyURL($string) {
	$string = preg_replace("`\[.*\]`U","",$string);
	$string = preg_replace('`&(amp;)?#?[a-z0-9]+;`i','-',$string);
	$string = htmlentities($string, ENT_COMPAT, 'utf-8');
	$string = preg_replace( "`&([a-z])(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig|quot|rsquo);`i","\\1", $string );
	$string = preg_replace( array("`[^a-z0-9]`i","`[-]+`") , "-", $string);
	return strtolower(trim($string, '-'));
}
?>
