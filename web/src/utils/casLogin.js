/* eslint-disable */
function CAS() {
  this.url = 'https://public-gw-sit.sf-express.com'
  this.appKey = 'SAP-WEB'
  this.appSecret = 'sf123456'
  this.ENV = 'SIT'
  this.callback = null
  this.casloginURL = 'http://cas.sit.sf-express.com/cas/login'
  this.caslogoutURL = 'http://cas.sit.sf-express.com/cas/logout'
}

CAS.prototype.init = function(url, appKey, appSecret, ENV, callback) {
  this.url = url
  this.appKey = appKey
  this.appSecret = appSecret
  this.ENV = ENV
  this.callback = callback
  this.caslogoutURL = null
  this.casloginURL = null
}

CAS.prototype.casURL = function() {
  if (this.ENV === 'SIT') {
    this.casloginURL = 'http://cas.sit.sf-express.com/cas/login'
    this.caslogoutURL = 'http://cas.sit.sf-express.com/cas/logout'
  } else if (this.ENV === 'PRD') {
    this.casloginURL = 'https://cas.sf-express.com/cas/login'
    this.caslogoutURL = 'http://cas.sf-express.com/cas/logout'
  } else {
    alert('ENV环境参数值只能为SIT或PRD')
  }
}

CAS.prototype.isTicket = function() {
  if (!sessionStorage.ticket) {
    window.location.href = this.casloginURL + '?service=' + sessionStorage.url
  } else {
    // debugger
    if (!localStorage.deviceId) {
      localStorage.deviceId = getDeviceId()
    }
    const that = this
    const xhr = GetXmlHttpObject()
    let params = {
      ticket: sessionStorage.ticket,
      service: sessionStorage.url,
      appKey: that.appKey,
      appSecret: that.appSecret,
      deviceId: localStorage.deviceId
    }
    params = JSON.stringify(params)
    const ticketUrl = that.url + '/user/cas/knock'
    xhr.open('POST', ticketUrl, true)
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(params)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        // var result = xhr.response
        if (xhr.status === 200 && JSON.parse(xhr.response).success === true) {
          sessionStorage.userid = JSON.parse(xhr.response).obj.userid
          sessionStorage.username = JSON.parse(xhr.response).obj.username
          that.checkToken()
        } else if (xhr.status === 430 || xhr.status === 401) {
          sessionStorage.removeItem('ticket')
          // 失败, 跳转到cas
          window.location.href = that.casloginURL + '?service=' + sessionStorage.url
        } else {
          alert('网关' + that.url + 'knock接口访问错误！')
        }
      }
    }
  }
}

CAS.prototype.checkToken = function() {
  const xhr = GetXmlHttpObject()
  const that = this
  const checkTokenUrl = that.url + '/gateway/check_token'
  xhr.open('GET', checkTokenUrl, true)
  xhr.send()
  // debugger
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      // var result = xhr.response
      if (xhr.status === 200) {
        if (JSON.parse(xhr.response).success === true) {
          sessionStorage.userid = JSON.parse(xhr.response).obj.userid
          sessionStorage.username = JSON.parse(xhr.response).obj.username
          console.log('登陆成功！')
          if (typeof that.callback === 'function' && that.callback) {
            that.callback()
          }
        } else if (JSON.parse(xhr.response).success === false) {
          alert(JSON.parse(xhr.response).errorMessage)
        } else {
          alert('网关' + that.url + '/check_token接口访问错误！')
        }
      } else if (xhr.status === 401) {
        // console.log('401xhr: ', xhr)
        that.isTicket()
      } else {
        // console.log('xhr: ', JSON.stringify(xhr))
        alert('网关' + that.url + '/check_token接口访问错误！' + 'error status code: ' + xhr.status)
      }
    }
  }
}

CAS.prototype.casLogout = function() {
  const that = this
  const logoutXHR = GetXmlHttpObject()
  logoutXHR.timeout = 3000
  const logoutUrl = that.url + '/user/auth/logout'
  logoutXHR.open('GET', logoutUrl, true)
  logoutXHR.send()
  logoutXHR.onreadystatechange = function() {
    if (logoutXHR.readyState === 4) {
      const service = sessionStorage.url
      sessionStorage.clear()
      if ((logoutXHR.status === 200 && JSON.parse(logoutXHR.response).success === true) || logoutXHR.status === 401) {
        console.log('网关退出成功')
        window.location.href = that.caslogoutURL + '?service=' + service
      } else {
        console.log('网关' + that.url + '访问错误！')
        window.location.href = that.caslogoutURL + '?service=' + service
      }
    }
  }
}

CAS.prototype.casLogin = function() {
  const that = this
  this.casURL()
  sessionStorage.url = window.location.href.split('?')[0]
  sessionStorage.ticket = getQueryString('ticket')

  // 原来的open方法
  const rawOpen = XMLHttpRequest.prototype.open
  // 重写open方法
  XMLHttpRequest.prototype.open = function() {
    rawOpen.apply(this, arguments)

    // 自定义请求头（需要在open方法后调用）
    try {
      this.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      this.setRequestHeader('Cache-Control', 'no-cache')
    } catch (e) {
      console.log('e', e)
    }

    // 允许跨域携带cookie
    this.withCredentials = true
    this.addEventListener('load', function() {
      if (this.responseURL.indexOf('/user/cas/knock') === -1 && this.responseURL.indexOf('/gateway/check_token') === -1 && this.responseURL.indexOf('/user/auth/logout') === -1) {
        if (this.status === 401) {
          sessionStorage.removeItem('ticket')
          window.location.href = that.casloginURL + '?service=' + sessionStorage.url
        }
      }
    }, false)
  }
  this.checkToken()
}

function GetXmlHttpObject() {
  let xhr
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  if (xhr === null) {
    alert('您的浏览器不支持ajax')
    return
  }
  return xhr
}

function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return r[2]
  return ''
}

function getDeviceId() {
  const s = []
  const hexDigits = 'abcdef'
  for (let i = 0; i < 10; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 6), 1)
  }
  return s.join('') + new Date().getTime()
}

CAS = new CAS()
export default CAS
