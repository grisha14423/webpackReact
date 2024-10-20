export interface BuildPath {
  entry: string
  output: string
  html: string
  src: string
}

export type BuildMode = "production" | "development"
export type BuildPlatform = "mobile" | "desktop"

export interface BuildOptions {
  port: number
  paths: BuildPath
  mode: BuildMode
  platform: BuildPlatform
  analyzer?: boolean
}
