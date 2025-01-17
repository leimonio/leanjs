// eslint-disable-next-line @typescript-eslint/no-var-requires
const { HostWebpackPlugin } = require("@leanjs/webpack");
const packageJsonDeps = require("./package.json").dependencies;
const withTM = require("next-transpile-modules")([
  "@leanjs/core",
  "@leanjs/react",
  "@my-org/runtime-react",
  "@my-org/runtime-shared",
]);

module.exports = withTM({
  webpack: (config) => {
    config.plugins.push(
      new HostWebpackPlugin({
        shared: {
          react: {
            eager: true,
            requiredVersion: packageJsonDeps.react,
          },
          "react-dom": {
            eager: true,
            requiredVersion: packageJsonDeps["react-dom"],
          },
        },
      })
    );

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
});
