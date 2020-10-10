import Vue from 'vue'

// 字符串截取，默认8个字符
Vue.filter('filterName', (str, len = 8) => {    
  if (str && str.length > len) {
    str = `${str.substr(0, len)}...`
  } 
  return str 
})

// 时间过滤
Vue.filter('formatTime', (time, fmt) => {
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
})

// 取金额整数部分
Vue.filter('filterIntPrice', (number) => {
  if (number == 0 || number == -1) return '0'
  number = number.toFixed(2)
  const pointIndex = number.indexOf('.')
  return number.substr(0, pointIndex)
})

// 取金额小数部分
Vue.filter('filterDotPrice', (number) => {
  if (number == 0 || number == -1) return '.00'
  number = number.toFixed(2)
  const pointIndex = number.indexOf('.')
  const a = number.split('.')
  if (a[1] > 0) {
    return number.substr(pointIndex)
  // eslint-disable-next-line no-else-return
  } else {
    return '.00'
  }
})

Vue.filter('toFixeds', (num) => {
  if (!num) return 0
  if (num >= 1000 && num < 10000) return `${(num / 1000).toFixed(1)}k`   
  if (num >= 10000) return `${(num / 10000).toFixed(1)}w` 
  return num  
})

Vue.filter('useNamePsw', (name) => {  
  if (name) {
    name = `${name.substr(0, 1)}*${name.substr(name.length - 1)}`
  } 
  return name 
})

// 时间过滤
Vue.filter('formatTimeText', (time, type) => {
  if (typeof time == 'string' && time.constructor == String) {
    time = time.toString().replace(/-/g, '/')
  }
  let text = null
  function padStarts(num) {
    if (num >= 10) {
      return num
    }
    return `0${num}`
  }
  
  const day = 24 * 60 * 60 * 1000
  const d = new Date(time)  
  const Y = d.getFullYear()
  const M = d.getMonth()
  const D = d.getDate()
  const H = d.getHours()
  const m = d.getMinutes()
  const t = d.getTime() 

  const CD = new Date()
  const CY = CD.getFullYear()
  const CM = CD.getMonth()
  const Cd = CD.getDate()  
  const ct = CD.getTime()

  const tt = ((ct - t) / day).toFixed(0)
  console.log(tt)
  if (Y == CY && M == CM && D == Cd) { // 是否是当天
    if (type == 'wb') {
      text = '刚刚'
    } else {
      text = `${padStarts(H)}:${padStarts(m)}` 
    }     
  } else if (tt >= 0 && tt < 2) {
    text = '1天前'
  } else if (tt >= 2 && tt < 8) {
    text = `${tt}天前`
  } else {
    text = `${Y}-${padStarts(M + 1)}-${D}`
  }
  return text
})
