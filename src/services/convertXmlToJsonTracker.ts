import AdmZip from 'adm-zip'
import chokidar from 'chokidar'
import fs from 'fs/promises'
import { resolve } from 'path'
import { xml2json } from '../utils/xml2json'
import { conciliationQueue } from './addTask'

/**
 * Converts XML files from a source folder to JSON and saves them to a destination folder
 *
 * @param {string} sourceFolder - path to the source folder containing XML files
 * @param {string} destFolder - path to the destination folder where JSON files will be saved
 * @return {Promise<void>} - nothing is returned, but JSON files are saved to the destination folder
 */
export const convertXmlToJsonTracker = (
  sourceFolder: string,
  destFolder: string
): void => {
  const sourcePath = resolve(__dirname, '..', '..', '..', sourceFolder)

  const watcher = chokidar.watch(sourcePath, {
    persistent: true,
    ignored: /(^|[/\\])\../, // ignore arquivos ocultos
    ignoreInitial: true,
    awaitWriteFinish: true,
  })

  watcher.on('addDir', dir => {
    watcher.on('add', file => {
      if (file.endsWith('.zip')) {
        console.log('dentro do zip', file)

        const zip = new AdmZip(file)
        zip.extractAllTo(resolve(dir))
      }
    })
  })

  watcher.on('add', async path => {
    console.log(`Arquivo adicionado: ${path}`)

    try {
      if (path.endsWith('.xml')) {
        console.log('dentro do xml')
        const xmlDocument = await fs.readFile(path, 'utf-8')
        const json = await xml2json(xmlDocument)

        const { chNFe } = json.nfeProc.protNFe.infProt

        await saveJson(chNFe as string, json)

        await conciliationQueue.add(chNFe as string, json, {
          removeOnComplete: true,
          removeOnFail: 5000,
          attempts: 2,
          jobId: chNFe,
        })
      }
    } catch (err) {
      console.log(err)
    }
  })

  async function saveJson(name: string, data: any) {
    try {
      const jsonDocument = await fs.open(`${destFolder}/${name}.json`, 'w')

      await jsonDocument.writeFile(JSON.stringify(data))
      await jsonDocument.close()

      console.log(`Arquivo salvo: ${name}.json`)
    } catch (err) {
      console.log(err)
    }
  }
}
