// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
import dotenv from 'dotenv'
dotenv.config()

import { convertXmlToJsonTracker } from './services/convertXmlToJsonTracker'

const source = process.env.SOURCE_PATH
const dest = process.env.DEST_PATH

convertXmlToJsonTracker(source, dest)
