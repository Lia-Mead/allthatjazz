const path = require("path");
const webpack = require("webpack");
// const { API_KEY } = require("./google");

if (process.env.NODE_ENV !== "production") {
    // Already set on heroku production
    process.env.apiKey = require("./google.json");
}

// process.env.apiKey = process.env.apiKey || JSON.stringify("./google.json");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
    entry: [
        "@babel/polyfill",
        path.join(__dirname, "client", "style.css"),
        path.join(__dirname, "client", "src", "start.js"),
    ],
    output: {
        path: path.join(__dirname, "client", "public"),
        filename: "bundle.js",
    },
    performance: {
        hints: false,
    },
    devServer: {
        contentBase: path.join(__dirname, "client", "public"),
        proxy: {
            "/": {
                target: "http://localhost:3001",
            },
            "/socket.io": {
                target: "http://localhost:3001",
                ws: true,
            },
        },
        port: "3000",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
        new webpack.DefinePlugin({
            apiKey: JSON.stringify(require("./google.json")),
        }),
    ],
});

// new webpack.DefinePlugin({
//     apiKey:
//         process.env.apiKey || JSON.stringify(require("./google.json")),
// }),
// new webpack.EnvironmentPlugin([
//     "apiKey",
//     process.env.apiKey || JSON.stringify(require("./google.json")),
// ]),
// new webpack.EnvironmentPlugin(["apiKey"]),
// new webpack.DefinePlugin({
//     apiKey: JSON.stringify(require("./google.json")),
// }),
