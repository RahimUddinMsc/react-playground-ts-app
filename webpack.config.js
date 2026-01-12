const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      // ✅ CSS rule (fixed)
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false, // 👈 allows absolute /assets/* paths from public/
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],

  // ✅ devServer fixed (no duplicate static)
  devServer: {
    port: 3000,
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
      },
      {
        directory: path.resolve(__dirname, "public"),
        publicPath: "/",
        watch: true,
      },
    ],
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};
