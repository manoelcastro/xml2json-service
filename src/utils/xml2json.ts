import xml from 'xml2js'

export function xml2json(document: string) {
  const parser = new xml.Parser({ explicitArray: false })

  return parser.parseStringPromise(document)
}
