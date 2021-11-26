// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
// eslint-disable-next-line no-undef
module.exports = {
  mount: {
    src: { url: "/" },
    assets: { url: "/", static: true },
  },
  plugins: [
    [
      "@snowpack/plugin-sass",
      {
        compilerOptions: {
          style: "compressed",
          sourceMap: false,
        },
      },
    ],
  ],
  optimize: {
    bundle: true,
    minify: false,
    target: "es2019",
  },
};
