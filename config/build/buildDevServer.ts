import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import { BuildOptions } from "./types/types"

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true,
    historyApiFallback: true, // Для роутера, так как навигация через js. Если раздавать статику через nginx, то надо делать проксирование на index.html
    client: {
      overlay: false, // Отключаем оверлей react для ошибок
    },
    hot: true, // hot reload js, но для react нужно еще ReactRefreshWebpackPlugin
  }
}
