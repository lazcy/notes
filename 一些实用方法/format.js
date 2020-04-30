import { MathMul } from './formatMath';
// 设置/获取 localStorage
export const localItem = (key, value) => {
  if (!value) {
    return localStorage.getItem(key);
  } else {
    return localStorage.setItem(key, value);
  }
};

// 删除localStorage
export const removeLocalItem = key => {
  if (key) {
    return localStorage.removeItem(key);
  } else {
    return localStorage.removeItem();
  }
};

export const formatTime = str => {
  var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth() + 1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间
  return oTime;
};
//补0操作
function getzf(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
}
export const formatPayTime = obj => {
  let time = obj;
  if (!time) return;
  let lastTime = new Date(time * 1000);
  let years = lastTime.getFullYear();
  let month = lastTime.getMonth() + 1;
  let dates = lastTime.getDate();
  let hours = lastTime.getHours();
  let min = lastTime.getMinutes();
  let second = lastTime.getSeconds();
  let oas = '';
  if (lastTime.getHours() < 12) {
    oas = '上午';
  } else if (lastTime.getHours() > 12 && lastTime.getHours() <= 18) {
    oas = '下午';
  } else {
    oas = '晚上';
  }

  month < 10 ? (month = '0' + month) : month;
  dates < 10 ? (dates = '0' + dates) : dates;
  hours < 10 ? (hours = '0' + hours) : hours;
  min < 10 ? (min = '0' + min) : min;
  second < 10 ? (second = '0' + second) : second;
  return `${years}/${month}/${dates} ${oas} ${hours}:${min}:${second}`;
};
// 秒转换时分秒
export const secondsToHMS = seconds => {
  if (seconds < 0) {
    return false;
  }
  var theTime = parseInt(seconds);
  var theTime1 = 0;
  var theTime2 = 0;
  if (theTime >= 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 >= 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  theTime < 10 ? (theTime = '0' + theTime) : (theTime = '' + theTime);
  theTime1 < 10 ? (theTime1 = '0' + theTime1) : (theTime1 = '' + theTime1);
  theTime2 < 10 ? (theTime2 = '0' + theTime2) : (theTime2 = '' + theTime2);
  var result = [theTime2, theTime1, theTime];
  return result;
};
//数字保留两位小数，位数不足0来补
export const changeTwoDecimal_f = x => {
  var f_x = parseFloat(x);
  if (isNaN(f_x)) {
    alert('function:changeTwoDecimal->parameter error');
    return false;
  }
  var f_x = Math.round(x * 100) / 100;
  var s_x = f_x.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return s_x;
};

//计算时间
/**
 *
 * @param {*} time1
 * @param {*} time2
 * 首先判断两条消息间隔是否在五分钟以上，然后判断最后一条消息与当前时间的显示
 * t < 5分钟               return ''
 * t >= 5分钟              return '13:23';//(时:分)
 * t > 1天 && t < 2天      return '昨天 13:23';
 * t >= 2天 && t < 1周     return '2018/9/10 :13:23';
 */
export const getFormatTime = (time1, time2) => {
  //5分钟，1天和一周的毫秒值
  let fiveMin = MathMul(MathMul(1000, 60), 5);
  let day = MathMul(MathMul(MathMul(1000, 60), 60), 24);
  let week = MathMul(MathMul(MathMul(MathMul(1000, 60), 60), 24), 7);
  let now = Date.now();
  let weekArr = ['一', '二', '三', '四', '五', '六', '七'];
  let r = formatTime(time2);
  // console.log(time2 - time1 - fiveMin, 2222222222222, r);
  //当前时间
  if (time1 == 0) {
    return r.substring(r.length - 8, r.length - 3);
  }
  //两个时间间隔小于5分钟返回空
  if (time2 - time1 < fiveMin) {
    return '';
  }
  //当天的判断
  if (now - time2 >= fiveMin && now - time2 < day) {
    return r.substring(r.length - 8, r.length - 3);
  }
  //昨天
  if (now - time2 >= day && now - time2 < MathMul(day, 2)) {
    return '昨天 ' + r.substring(r.length - 8, r.length - 3);
  }
  //一周内
  if (now - time2 >= MathMul(day, 2) && now - time2 < week) {
    return '周' + weekArr[new Date(time2).getDay()] + ' ' + r.substring(r.length - 8, r.length - 3);
  }
  //一周以上
  if (now - time2 >= week) {
    return time.replace(new RegExp('-', 'gm'), '/');
  }
};
//处理输入内容
export const formatHtml = arr => {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    //nodeType 3为文本类型
    if (arr[i].nodeType == 3) {
      if (arr[i].textContent) {
        let msg = arr[i].textContent.replace(/(^\s*)|(\s*$)/g, '');
        let obj = {
          type: 'text',
          value: msg
        };
        res.push(obj);
      }
    } else {
      if (arr[i].nodeType == 1 && arr[i].nodeName == 'IMG') {
        let obj = {
          type: 'img',
          value: arr[i].src,
          width: arr[i].naturalWidth,
          height: arr[i].naturalHeight
        };
        res.push(obj);
      } else {
        if (arr[i].textContent) {
          let msg = arr[i].textContent.replace(/(^\s*)|(\s*$)/g, '');
          let obj = {
            type: 'text',
            value: msg
          };
          res.push(obj);
        }
      }
    }
  }
  console.log(res, 'res=============');
  return res;
};
/**
 *
 * 序列化请求参数
 * @export
 * @param {string} url
 * @param {object} query
 * @returns
 */
export function formatUrl(url, query) {
  if (!query || !Object.keys(query).length) {
    return url;
  }
  let params = Object.keys(query)
    .filter(x => query[x] !== '')
    .map(x => {
      if (query[x] instanceof Date) {
        return `${x}=${formatDateToString(query[x])}`;
      }
      return `${x}=${query[x]}`;
    })
    .join('&');
  return `${url}?${params}`;
}
