
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/**
 * 判断是否是jpg或者是png图片
 * @param {String} fileType file对象的name
 */
export const isJpgPng = fileType => {
  let reg = /(.*)\.(jpg|jpeg|png|PNG)$/
  return reg.test(fileType)
}
