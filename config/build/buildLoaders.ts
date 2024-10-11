import MiniCssExtractPlugin  from "mini-css-extract-plugin"
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === "development"
    const scssLoader =   {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }

      const tsLoader = {
        // ts-loader умеет работать с jsx из коробки
        // Если не использовать, то нужен babel-loader
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }


    return [
        scssLoader,
        tsLoader,
      ]
}