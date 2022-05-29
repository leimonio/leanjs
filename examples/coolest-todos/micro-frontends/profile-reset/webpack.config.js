const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const VirtualModulesPlugin = require("webpack-virtual-modules");
const packageJson = require("./package.json");

const port = 8886;

module.exports = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "profile_reset",
      filename: "remoteEntry.js",
      exposes: {
        "./Index": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
    new VirtualModulesPlugin({
      "./src/index.js": `import("./bootstrap");`,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
  ],
  entry: "./src/index.js",
  resolve: {
    extensions: [".js", ".vue", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          configFile: `${__dirname}/tsconfig.json`,
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};