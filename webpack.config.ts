import webpack from "webpack"
import path from "path"
import { BuildWebpack } from "./config/build/buildWebpack"
import { BuildMode, BuildPath } from "./config/build/types/types"


interface EnvVariable {
  mode: BuildMode
  port: number
}

export default (env: EnvVariable) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }
  const config: webpack.Configuration = BuildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths
  })
  return config
}
