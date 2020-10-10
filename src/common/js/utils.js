/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */

/**
 * 公共方法类
 */
class Utils {
  constructor(...args) {
    this.args = args
    this.appUA = ''
  }

  // 获取UA
  initUA() {
    const appUA = navigator.userAgent // app的UserAgent信息
    if (appUA && appUA.indexOf('appVersion') != -1) {
      this.appUA = JSON.parse(appUA.substring(appUA.indexOf('{')))
    }
  }

  // 字体初始化
  initRem() {  
    this.windowSize(document, window)   
    window.onresize = () => this.windowSize(document, window)   
  }

  // eslint-disable-next-line class-methods-use-this
  windowSize(doc, win) {
    const docEl = doc.documentElement
    const scale = 1
    docEl.dataset.dpr = win.devicePixelRatio
    const metaEl = doc.createElement('meta')
    metaEl.name = 'viewport'
    metaEl.content = `initial-scale=${scale},maximum-scale= ${scale}, minimum-scale=${scale}`
    docEl.firstElementChild.appendChild(metaEl)
    // deviceWidth通过document.documentElement.clientWidth就能取到
    const recalc = () => {
      const { width } = window.screen
      docEl.style.fontSize = `${100 * (width / 750)}px`
    }     
    recalc()
    // eslint-disable-next-line no-useless-return
    if (!doc.addEventListener) return  
  }

  remToPx(remNum) {
    const rootFontSize = Number.parseFloat(document.documentElement.style.fontSize)   
    return remNum * rootFontSize
  }

  // 获取路径参数
  getUrlParams(param) {
    const ps = decodeURI(window.location.href)
    if (ps == '') return ''
    const params = (ps.substr(ps.lastIndexOf('?') + 1)).split('&')
    if (params != null) {
      for (let i = 0; i < params.length; i++) {
        const strs = params[i].split('=')
        if (strs[0] == param && strs[1]) {
          return strs[1]
        }
      }
    }
    return ''
  }

  // 获取设备类型
  getPhoneType() {
    let result = false
    const u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
      result = false
    } else if (u.indexOf('iPhone') > -1) { // 苹果手机
      result = true
    } else if (u.indexOf('Windows Phone') > -1) { // winphone手机
      result = false
    } else if (u.indexOf('iPhone Simulator') > -1) {
      result = true
    }
    return result
  }

  // 是否是iphoneX 系列手机   
  isIphoneXall() {
    // iPhone X、iPhone XS
    const isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.screen.width === 375 && window.screen.height === 812
    // iPhone XS Max
    const isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.screen.width === 414 && window.screen.height === 896
    // iPhone XR
    const isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.screen.width === 414 && window.screen.height === 896
    if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
      return true
    }
    return false    
  }
 
  /**
   * 时间格式化
   * 用法：format(ms,'yyyy-MM-dd hh:mm:ss')
   * @param time 毫秒数
   * @param fmt 要转换的时间格式
   */
  formatNew(time, fmt) {
    if (typeof time == 'string' && time.constructor == String) {
      time = time.toString().replace(/-/g, '/')
    }
    const d = new Date(time)
    const o = {
      'M+': d.getMonth() + 1, // 月份
      'd+': d.getDate(), // 日
      'h+': d.getHours(), // 小时
      'm+': d.getMinutes(), // 分
      's+': d.getSeconds(), // 秒
      'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
      S: d.getMilliseconds() // 毫秒
    }
    // eslint-disable-next-line prefer-template
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (const k in o) { 
      // eslint-disable-next-line prefer-template
      if (new RegExp('(' + k + ')').test(fmt)) {
        // eslint-disable-next-line prefer-template
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) 
      } 
    }
    return fmt
  }

  // 转换成时间戳
  getDateTimes(str) {
    const strs = str.replace(/-/g, '/') // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    const date = new Date(strs) // 构造一个日期型数据，值为传入的字符串
    const times = date.getTime()
    return times
  }

  /**
   * 设置某个缓存
   * @param key 缓存名称
   * @param value 缓存值
   */
  setStorage(key, value) {
    key = key.replace(/\//g, '_')
    if (value === undefined) return
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * 获取某个缓存
   * @param key 通过缓存名称
   */
  getStorage(key) {
    key = key.replace(/\//g, '_')
    return JSON.parse(localStorage.getItem(key))
  }

  /**
   * 清除某个缓存
   * @param key 通过缓存名称
   */
  removeStorage(key) {
    key = key.replace(/\//g, '_')
    localStorage.removeItem(key)
  }

  /**
   * 清除所有缓存
   */
  clearStorage() {
    localStorage.clear()
  }

  /**
   * 设置session某个缓存
   * @param key 缓存名称
   * @param value 缓存值
   */
  setSessionStorage(key, value) {
    key = key.replace(/\//g, '_')
    if (value === undefined) return
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * 获取session某个缓存
   * @param key 通过缓存名称
   */
  getSessionStorage(key) {
    key = key.replace(/\//g, '_')
    return JSON.parse(sessionStorage.getItem(key))
  }

  /**
   * 清除session某个缓存
   * @param key 通过缓存名称
   */
  removeSessionStorage(key) {
    key = key.replace(/\//g, '_')
    sessionStorage.removeItem(key)
  }

  /**
   * 清除session所有缓存
   */
  clearSessionStorage() {
    sessionStorage.clear()
  }

  /**
   * 获取cookie的函数
   */
  getCookie(cookieName) {
    const strCookie = document.cookie
    const arrCookie = strCookie.split('; ')
    for (let i = 0; i < arrCookie.length; i++) {
      const arr = arrCookie[i].split('=')
      if (cookieName == arr[0]) {
        return arr[1]
      }
    }
    return ''
  }

  /**
   * 设置用户登录的cookie 
   */
  setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    const str = `${window.location.host.split('.')[1]}.${window.location.host.split('.')[2]}` 
    document.cookie = `${cname}=${cvalue};expires=${d.toGMTString()};path=/;domain=${str};`  
  }

  /**
   * 清除用户登录的cookie，只有非微信浏览器
   * qq、微博浏览器，或者其他浏览器登录成功才存在此cookie信息
   */
  clearCookie(cname) {
    this.setCookie(cname, '', -1)
  }

  // 是否是微信浏览器，true代表是微信浏览器  
  isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } 
    return false    
  }

  /**
   * 调用app内部方法
   * eg:appCommonRule('20181224','reportLoadingCompletedJs',['1','2'])
   * 版本号日期，方法名，数组格式的参数
   * @param callback 回调传入app方法返回的值
   */
  appCommonRule(appIdForH5, methodName, value, callback) {
    const appCont = this.getUrlParams('appCont') || 0
    let backValue
    if ((parseInt(appCont) == 1 || parseInt(appCont) == 2) && this.appUA && this.appUA.appIdForH5 >= appIdForH5) {
      // eslint-disable-next-line no-undef
      if (typeof (yjapp) != 'undefined' && typeof (yjapp[methodName]) == 'function') {
        if (!value) {
          // eslint-disable-next-line no-new-func         
          backValue = new Function(`return yjapp.${methodName}()`)()         
        } else {
          // backValue=eval("yjapp."+methodName+"("+value+")")
          // eslint-disable-next-line no-new-func
          backValue = new Function('value', `return yjapp.${methodName}(value)`)(value)
        }
        // eslint-disable-next-line no-unused-expressions
        backValue && callback && callback(backValue)
      } else if (!this.getPhoneType()) {
        this.appRule(methodName, value)
      }
    }
  }

  // 安卓新的调用规则
  appCommonRuleAndroid(appIdForH5, methodName, value, callback) {
    const appCont = this.getUrlParams('appCont') || 0
    let backValue
    if ((parseInt(appCont) == 1 || parseInt(appCont) == 2) && this.appUA && this.appUA.appIdForH5 >= appIdForH5) {
      // eslint-disable-next-line no-undef
      if (typeof (yjapp) != 'undefined' && typeof yjapp[methodName] == 'function') {     
        if (value === undefined) {
          // eslint-disable-next-line no-undef         
          backValue = yjapp[methodName]()          
        } else if (Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') {
          // eslint-disable-next-line no-undef
          backValue = yjapp[methodName](JSON.stringify(value))          
        } else {
          // eslint-disable-next-line no-undef
          backValue = yjapp[methodName](value)         
        }
        // eslint-disable-next-line no-unused-expressions
        backValue && callback && callback(backValue)    
      } else if (!this.getPhoneType()) {
        this.appRule(methodName, value)        
      }
    }
  }  

  /**
   * 新的调用app内部方法 iOS内核优化后版本
   * eg:newAppCommonRule('20181224','reportLoadingCompletedJs',{params:params,fun:'fun'})
   * window.webkit.messageHandlers.methodName.postMessage({a:1,b:2,func:''})
   * @param callback 回调传入app方法返回的值
   */
  newAppCommonRule(appIdForH5, methodName, value) {
    const appCont = this.getUrlParams('appCont') || 0
    if ((parseInt(appCont) == 1 || parseInt(appCont) == 2) && this.appUA && this.appUA.appIdForH5 >= appIdForH5) {
      if (JSON.stringify(value) == '{}' || value == undefined || value == '') {
        try {             
          window.webkit.messageHandlers[methodName].postMessage(null)
        } catch (e) {          
          // console.log(e)
        }
      } else {
        try {             
          window.webkit.messageHandlers[methodName].postMessage(value)
        } catch (e) {          
          // console.log(e)
        }
      }
    }
  }  

  /**
   * app的Android低版本手机规则调用
   * eg:appRule('reportLoadingCompletedJs',['1','2'])
   * {methodName:'reportLoadingCompletedJs',value:['1','2']}
   */
  appRule(methodName, value) {
    // eslint-disable-next-line no-alert
    prompt(`{methodName:${methodName},value:${value}}`)   
  }

  /**
   * 格式化倒计时
   * @param time 时间戳
   * return [[0,0], [0,0], [0,0], [1]]
   */
  formatCountDown(time) {
    let h = 0
    let m = 0
    let s = 0
    let ms = 0
    if (time >= 0) {
      h = Math.floor(time / 1000 / 60 / 60)
      m = Math.floor(((time / 1000) / 60) % 60)
      s = Math.floor((time / 1000) % 60)
      ms = Math.floor(time % 1000)
    }    
    h = this.parseDate(h).toString()
    m = this.parseDate(m).toString()
    s = this.parseDate(s).toString()
    ms = Math.floor(ms / 100)
    return {
      h: h,
      m: m,
      s: s,
      ms: ms
    }
  }

  parseDate(t) {
    return t < 10 ? `0${t}` : t
  }
}
export default new Utils()
