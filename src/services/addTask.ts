import { Queue } from 'bullmq'

const conciliationQueue = new Queue('conciliation', {
  connection: {
    db: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
})

export { conciliationQueue }
