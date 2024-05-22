module.exports = {
    presets: ['react-app'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '@': './src',
                },
            },
        ],
    ],
};
