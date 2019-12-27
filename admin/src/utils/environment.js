const RELEASE = false

const SIT_BASE_URL = ''
const SIT_APP_KEY = 'SAP-WEB'
const SIT_APP_SECRET = 'sf123456'
const SIT_ENV = 'SIT'

const PRD_BASE_URL = 'https://public-gw.sf-express.com'
const PRD_APP_KEY = 'ITAO-EDP'
const PRD_APP_SECRET = 'itao-edp-f7CngwcZ1ZfH'
const PRD_ENV = 'PRD'

const API_URL = '/spsp-admin'

export default {
  BASE_URL: RELEASE ? PRD_BASE_URL : SIT_BASE_URL,
  BASE_API_URL: (RELEASE ? PRD_BASE_URL : SIT_BASE_URL) + API_URL,
  APP_KEY: RELEASE ? PRD_APP_KEY : SIT_APP_KEY,
  APP_SECRET: RELEASE ? PRD_APP_SECRET : SIT_APP_SECRET,
  ENV: RELEASE ? PRD_ENV : SIT_ENV
}
