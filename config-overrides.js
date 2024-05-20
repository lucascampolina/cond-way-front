const webpack = require('webpack');

module.exports = function override(config, env) {
    config.module.rules = (config.module.rules || []).concat({
        test: /\.mjs$/,
        enforce: 'pre',
        use: ['source-map-loader'],
    });

    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
};