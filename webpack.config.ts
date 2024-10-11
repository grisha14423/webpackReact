import path from "path"
import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin  from "mini-css-extract-plugin"
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"

type Mode = "production" | "development"

interface EnvVariable {
  mode: Mode
  port: number
}

export default (env: EnvVariable) => {
  const isDev = env.mode === "development"
  const isProd = env.mode === "production"

  const config: webpack.Configuration = {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    // entry: {
    //     hello: path.resolve(__dirname, 'src', 'index.js')
    // } // Если несколько точек входа в приложение, создаст файл с названием ключа
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js", // Название файла после сборки
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      isDev && new webpack.ProgressPlugin(), //Не рекомендуют в проде, так как может сильно замедлять. Показывает процент сборки
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      })
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          // ts-loader умеет работать с jsx из коробки
          // Если не использовать, то нужен babel-loader
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: isDev && "inline-source-map",
    devServer: isDev
      ? {
          port: env.port ?? 3000,
          open: true,
          client: {
            overlay: false, // Отключаем оверлей ошибок
          },
        }
      : undefined,
  }
  return config
}
