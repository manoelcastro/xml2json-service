declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SOURCE_PATH: string
      DEST_PATH: string
    }
  }
}

export {}
