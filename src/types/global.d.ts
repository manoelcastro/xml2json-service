declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SOURCE_PATH: string
      DEST_PATH: string
      DB_CONNECTION: number
      DB_HOST: string
      DB_PORT: number
    }
  }
}

export {}
