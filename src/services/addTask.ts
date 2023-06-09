import { Queue } from 'bullmq'

const connection = {
  db: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}

const conciliationQueue = new Queue('conciliation', {
  connection,
})

export { conciliationQueue }
