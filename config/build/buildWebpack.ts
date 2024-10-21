import webpack from "webpack"
import { buildDevServer } from "./buildDevServer"
import { buildLoaders } from "./buildLoaders"
import { buildPlugins } from "./buildPlugins"
import { buildResolvers } from "./buildResolvers"
import { BuildOptions } from "./types/types"

export function BuildWebpack(options: BuildOptions): webpack.Configuration {
  const isDev = options.mode === "development"
  const { mode, paths } = options

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    // entry: {
    //     hello: path.resolve(__dirname, 'src', 'index.js')
    // } // Если несколько точек входа в приложение, создаст файл с названием ключа
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js", // Название файла после сборки
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev && "inline-source-map", // Для отладки, в консоли в source будет читабельный код. Есть разные, под разные условия. Это классический
    // devtool: isDev && "eval-cheap-module-source-map", // Это для разработки лучше
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
