const path = require("path");

module.exports = {
  mode: "development",
  entry: "./client/index.js",
  devtool: "inline-source-map",
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          }, //end of options
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build"),
  },
};

// presets: [
//   [
//     "@babel/preset-env",
//     {
//       targets: {
//         esmodules: true,
//       },
//     },
//   ],
//   "@babel/preset-react",
// ], //end of presets
