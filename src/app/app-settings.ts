export class AppSettings {
    public static API_BASE = 'http://www.breakpirates.com/api/';
    public static ARCHIVE_URL = 'https://www.mediafire.com/folder/8nnco4v4bo5pt/archive';
    public static CDN_BASE = 'http://www.breakpirates.com/';

    // Stream server
    public static STREAM_URL_PRIMARY = 'http://bpstream.hostco.de:3000/;';
    public static STREAM_URL_STATS = 'http://bpstream.hostco.de:3000/7.html';
    public static NOW_PLAYING_INTERVAL = 60000; // 60 seconds
    public static SERVER_STATS_INTERVAL = 5000; // 10 seconds

    // Social URLs
    public static FACEBOOK_URL = 'https://www.facebook.com/breakpirates';
    public static TWITTER_URL = 'https://twitter.com/breakpirates';
    public static MIXCLOUD_URL = 'https://www.mixcloud.com/breakpirates';

    // Chat room
    public static IRC_SERVER = 'irc.hostco.de';
    public static IRC_PORT = 6667;
    public static IRC_CHANNEL = 'breakpirates';

    // Asset locations
    public static ASSET_ROOT = 'assets/';
    public static ASSET_NEWS_IMAGE = 'assets/news/';
    public static ASSET_PROFILE_IMAGE = 'assets/profiles/';

    // Google Analytics
    public static GA_PROPERTY_ID = 'UA-111122-1';
}
