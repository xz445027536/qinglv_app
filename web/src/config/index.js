const config = {
  development: {
    /* 环境 */
    // 名称
    env: 'development',
    CAS_ENV: 'SIT',
    // 请求服务器地址
    CAS_URL: 'https://public-gw-sit.sf-express.com',
    /* http */
    // 请求的host+path
    API_BASE: '/spsp-web',
    /* 网关 */
    APP_KEY: 'SAP-WEB',
    APP_SECRET: 'sf123456',
    SHARE_PREFIX: 'http://pkglab-spsp.sit.sf-express.com/spsp-app/share/index.html?solutionId=',
    ADMIN_URL:'http://pkglab-spsp.sit.sf-express.com'
    // NO_CAS: true
  },
  sit: {
    /* 环境 */
    // 名称
    env: 'sit',
    CAS_ENV: 'SIT',
    // 测试环境下的所有请求均走这个地址
    CAS_URL: 'https://public-gw-sit.sf-express.com',
    /* http */
    // 请求的path
    API_BASE: '/spsp-web/',
    /* 网关 */
    // 在测试环境下, 统一用如下值
    APP_KEY: 'SAP-WEB',
    APP_SECRET: 'sf123456',
    SHARE_PREFIX: 'http://pkglab-spsp.sit.sf-express.com/spsp-app/share/index.html?solutionId=',
    ADMIN_URL:'http://pkglab-spsp.sit.sf-express.com'
  },
  production: {
    env: 'production',
    CAS_ENV: 'PRD',
    // 生产环境下的所有请求均走这个地址
    CAS_URL: 'https://public-gw.sf-express.com',
    /* http */
    // 请求的path
    API_BASE: '/spsp-web/',
    /* 网关 */
    // 每个项目生产环境下的 APP_KEY和APP_SECRET 请联系运维同学
    APP_KEY: 'spsp-web',
    APP_SECRET: 'mDi1X2f9maxWrABg',
    SHARE_PREFIX: 'http://pkglab-spsp.sf-express.com/spsp-app/share/index.html?solutionId=',
    ADMIN_URL:'http://pkglab-spsp.sf-express.com'
  }
}
// export default config.production
export default config.sit
