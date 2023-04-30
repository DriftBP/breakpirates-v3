export class AppSettings {
    public static API_BASE = 'http://www.breakpirates.com/api/';

    // Stream server
    public static STREAM_URL_PRIMARY = 'http://bpstream.hostco.de:3000/;';
    public static NOW_PLAYING_INTERVAL = 60000; // 60 seconds

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
    public static ASSET_SHOW_IMAGE =  'assets/shows/';
    public static ASSET_SHOW_SOUND =  'assets/sounds/';

    // Google Adsense
    public static ADSENSE_CLIENT = 'ca-pub-0817931421481428';

    // Shop
    public static AMAZON_TRACKING_ID = 'breakpirates-21';

    // UI settings
    public static ENABLE_BREADCRUMB = false;
}
