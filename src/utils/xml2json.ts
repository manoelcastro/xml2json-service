import xml from 'xml2js'

/**
 * Converts an XML document to a JS object.
 *
 * @param {string} document - The XML document to be converted.
 * @return {Promise<object>} A Promise that resolves to the JS object representation
 *                           of the XML document.
 */
export function xml2json(document: string) {
  const parser = new xml.Parser({ explicitArray: false })

  return parser.parseStringPromise(document)
}
