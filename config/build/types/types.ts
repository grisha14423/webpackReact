export interface BuildPath {
  entry: string
  output: string
  html: string
  src: string
}

export type BuildMode = "production" | "development"

export interface BuildOptions {
  port: number
  paths: BuildPath
  mode: BuildMode
  analyzer?: boolean
}
