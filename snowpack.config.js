module.exports = {
    mount: {
        "src": { url: "/" },
        "assets": { url: "/", static: true }
    },
    plugins: [
        ['@snowpack/plugin-sass', {
            style: "compressed",
            sourceMap: false,
        }],
        ['@snowpack/plugin-babel', {
            transformOptions: {
                presets: ['@babel/preset-env']
            }
        }],
        ["@snowpack/plugin-optimize"],
    ],
};
