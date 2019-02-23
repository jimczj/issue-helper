/* eslint-disable no-useless-escape */
import compareVersions from 'compare-versions'
import axios from 'axios'


export const config = window.config

const npmEndpoint = 'https://registry.npm.taobao.org'
const endpoint = 'https://api.github.com'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw new Error(response.statusText)
}

export function fetchVersions () {
  const npmRepo = config.repo.split('/')[1]
  const npmPromise = axios.get(`${npmEndpoint}/${npmRepo}`)
    .then(checkStatus)
    .then(response => response.data)
    .then(({ versions }) => Object
      .keys(versions)
    )
    .then(versions =>
      versions.sort((a, b) => -compareVersions(a, b))
    )
    .then(versions => versions.slice(0, 100))

  const repo = config.repo.toLowerCase()

  return axios.get(`${endpoint}/repos/${repo}/releases?per_page=100`)
    .then(checkStatus)
    .then(response => {
      if (!response.data || !response.data.length) {
        throw Error('github release api is not opened.')
      }
      return response.data
    })
    .then(response => response.filter(r => !r.prerelease))
    .then(releases => releases.map(r => r.tag_name))
    .then(versions => versions.sort((a, b) => -compareVersions(a, b)))
    .catch(err => {
      console.warn(err)
      return npmPromise
    })
}

export function fetchIssues (keyword) {
  const similarIssueCount = config.similarIssueCount || 5
  const q = encodeURIComponent(`is:issue repo:${config.repo} ${keyword}`)
  return axios.get(`${endpoint}/search/issues?q=${q}&per_page=${similarIssueCount}`)
    .then(checkStatus)
    .then(res => res.data.items)
}

export function isURL (str) {
  return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(str)
}

export function getLocale () {
  const cache = localStorage.getItem('locale')
  if (cache) {
    return cache
  }
  return window.navigator.language.toLowerCase() === 'zh-cn' ? 'zh' : 'en'
}

export function getLocaleLabel (Locale) {
  return {
    'en': '中文',
    'zh': 'EN'
  }[Locale]
}
