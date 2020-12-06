const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = {
    mode: 'development',
    entry: {
        // Set the single-spa config as the project entry point
        'single-spa.config': './single-spa.config.js',
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                // Webpack style loader added so we can use materialize
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            }, {
                // This plugin will allow us to use AngularJS HTML templates
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader',
            },
        ],
    },
    resolve: {
        extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '../../node_modules')
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "portal",
            filename: "remoteEntry.js",
            remotes: {
            //   app3: "app3@http://localhost:3003/remoteEntry.js",
              app1: "app1@http://localhost:3000/_next/static/remoteEntryMerged.js",
              sidecar: "sidecar@http://localhost:8080/remoteEntry.js",
            //   next1: "next1@http://localhost:3002/_next/static/runtime/remoteEntry.js",
              // nav: "nav@http://localhost:3003/remoteEntry.js",
            },
            exposes: {},
            // shared: ["react", "react-dom","react-router-dom"],
            shared: {
              ...deps,
              react: {
                eager:true,
                singleton: true,
                requiredVersion: deps.react,
              },
              "react-dom": {
                singleton: true,
                requiredVersion: deps["react-dom"],
              },
            },
        }),
        // new webpack.ProvidePlugin({
        //     "React": "react",
        //  }),
        // new webpack.ProvidePlugin({
        //     React: "React", react: "React", "window.react": "React", "window.React": "React"
        // }),
        // A webpack plugin to remove/clean the output folder before building
        new CleanWebpackPlugin(),
    ],
    devtool: 'source-map',
    // externals: {
    //     'react': 'React'
    // },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 3002
    },
    // alias: {
    //     react: path.resolve(__dirname, "node_modules/react")
    // }
};