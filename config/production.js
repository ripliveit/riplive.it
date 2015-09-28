var config = {
    wp_uri: process.env.WP_URI,
    admin_uri: process.env.ADMIN_URI,
    memcache_uri: process.env.MEMCACHE_URI,
    static_folder: 'public'
};

module.exports = config;
