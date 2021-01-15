module.exports = {
    plugins: [
        ['snowpack-plugin-markdown-html'],
        ['@snowpack/plugin-sass', {
            style: 'compressed',
            sourceMap: false,
        }],
        ["@snowpack/plugin-babel", {
            transformOptions: {
                "presets": ["@babel/preset-env"]
            }
        }],
        ['snowpack-plugin-minify-html', {
            htmlMinifierOptions: {
                sortAttributes: true,
                removeComments: false,
                collapseWhitespace: true,
            },
        }],
    ],
    "mount": {
        "src": { url: "/" },
    }
};
