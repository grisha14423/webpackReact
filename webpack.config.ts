import webpack from "webpack"
import path from "path"
import { BuildWebpack } from "./config/build/buildWebpack"
import { BuildMode, BuildPath, BuildPlatform } from "./config/build/types/types"

interface EnvVariable {
  mode?: BuildMode
  port?: number
  analyzer?: boolean
  platform?: BuildPlatform
}

export default (env: EnvVariable) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  }
  const config: webpack.Configuration = BuildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
  })
  return config
}
