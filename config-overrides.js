const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');


module.exports = function override(config, env) {
    config.module.rules = (config.module.rules || []).concat({
        test: /\.mjs$/,
        enforce: 'pre',
        use: ['source-map-loader'],
    });
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
    });

    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
};