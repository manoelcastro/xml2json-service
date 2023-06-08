import dotenv from 'dotenv'

import { convertXmlToJsonTracker } from './services/convertXmlToJsonTracker'

dotenv.config()

const source = process.env.SOURCE_PATH
const dest = process.env.DEST_PATH

convertXmlToJsonTracker(source, dest)
