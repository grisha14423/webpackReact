import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { ModuleOptions } from "webpack"
import { BuildOptions } from "./types/types"
import ReactRefreshTypeScript from "react-refresh-typescript"

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development"

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }

  const tsLoader = {
    // ts-loader умеет работать с jsx из коробки
    // Если не использовать, то нужен babel-loader
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true, // Убирает проверку типов, убирает ошибки ts, ускоряет сборку. Может работать с ForkTsCheckerWebpackPlugin (отдельный процесс)
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
  }

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true, // Для удобной работы с цветами (меняет для всей картинки)
                },
              },
            ],
          },
        },
      },
    ],
  }

  return [scssLoader, tsLoader, assetLoader, svgrLoader]
}
