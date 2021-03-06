import { isPlainObject } from './util'
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  // console.log(headers)
  normalizeHeaderName(headers, 'Content-Type')
  // console.log(data)
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      // console.log(data)
      headers['Content-Type'] = 'application/json;charset=utf-8'
      console.log(headers)
    }
  }

  return headers
}
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
