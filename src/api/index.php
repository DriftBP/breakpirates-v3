<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
} else {
    header('Access-Control-Allow-Origin: *');
}

date_default_timezone_set('Europe/London');

require_once("inc/schedule.php");

include_once 'src/Epi.php';
Epi::setPath('base', 'src');
Epi::init('api');

getApi()->get('/news', 'news', EpiApi::external);
getApi()->get('/news/latest', 'latestNews', EpiApi::external);
getApi()->get('/news/(\d+)', 'newsArticle', EpiApi::external);

getApi()->get('/music', 'music', EpiApi::external);
getApi()->get('/music/(\d+)', 'musicGenre', EpiApi::external);
getApi()->get('/music/(\d+)/shows', 'musicShows', EpiApi::external);

getApi()->get('/hosts', 'hosts', EpiApi::external);
getApi()->get('/hosts/(\d+)', 'host', EpiApi::external);
getApi()->get('/hosts/(\d+)/shows', 'hostShows', EpiApi::external);

getApi()->get('/schedule', 'schedule', EpiApi::external);
getApi()->get('/schedule/(\d+)', 'scheduleDay', EpiApi::external);
getApi()->get('/schedule/now-playing', 'nowPlaying', EpiApi::external);

getApi()->get('/days', 'days', EpiApi::external);
getApi()->get('/days/(\d+)', 'day', EpiApi::external);

getApi()->get('/shows/(\d+)', 'show', EpiApi::external);
getApi()->get('/shows/(\d+)/genres', 'showGenres', EpiApi::external);
getApi()->get('/shows/(\d+)/hosts', 'showHosts', EpiApi::external);
getApi()->get('/shows/(\d+)/similar', 'showSimilar', EpiApi::external);

getApi()->get('/videos', 'videos', EpiApi::external);
getApi()->get('/videos/(\d+)', 'video', EpiApi::external);

getRoute()->run();

function news() {
    return getAllNews(true);
}

function latestNews() {
    return getAllNews(true, 4);
}

function newsArticle($id) {
    return getNews($id);
}

function music() {
    return getGenres();
}

function musicGenre($id) {
    return getGenre($id);
}

function musicShows($id) {
    return getGenre($id)->getShows();
}

function hosts() {
    return getHosts();
}

function host($id) {
    return getHost($id);
}

function hostShows($id) {
    return getHost($id)->getShows();
}

function schedule() {
    return getShows("tuesday");
}

function scheduleDay($id) {
    $day = getDay($id);

    return getShows($day->name);
}

function nowPlaying() {
    return getShowOnNow();
}

function days() {
    $days = Array();

    for($day = 1;$day<=7;$day++) {
        array_push($days, getDay($day));
    }

    return $days;
}

function day($id) {
    return getDay($id);
}

function show($id) {
    return getShow($id);
}

function showGenres($id) {
    return getShow($id)->getGenres();
}

function showHosts($id) {
    return getShow($id)->getHosts();
}

function showSimilar($id) {
  return getShow($id)->getSimilar();
}

function videos() {
    return getAllVideos();
}

function video($id) {
    return getVideo($id);
}
?>
