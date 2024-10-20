import webpack, { DefinePlugin } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { Configuration } from "webpack"
import { BuildOptions } from "./types/types"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const isDev = options.mode === "development"
  const isProd = options.mode === "production"

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platform),
    }),
  ]

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin()) // Не рекомендуют в проде, так как может сильно замедлять. Показывает процент сборки
    plugins.push(new ForkTsCheckerWebpackPlugin()) // Проверка типов в отдельном процессе, ускоряет сборку, не кладет приложение
    plugins.push(new ReactRefreshWebpackPlugin()) // Для hmr react ts
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    )
  }
  if (options.analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
}
