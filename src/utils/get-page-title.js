import defaultSettings from '@/setting.js'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
