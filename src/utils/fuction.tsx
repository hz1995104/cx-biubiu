import React, { useEffect, useRef } from 'react';

//获取路由参数的某一个参数值
export const getQueryString = (name: string) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(decodeURI(r[2]));
  }
  return null;
};

//获取路由参数所有参数的映射
export const getAllQuery = () => {
  let search = window.location.search.substr(1);
  const params = search.split('&');
  return params.reduce((total:any, current) => {
    const [key, value] = current.split('=');
    total[key] = value || '';
    return total;
  }, {});
};

//获取IE版本
export const getIEVersion = () => {
  let ieVersion =
    //@ts-ignore
    (!!window.ActiveXObject && +/msie\s(\d+)/i.exec(navigator.userAgent)![1]) || NaN;
  return ieVersion;
};

// 转换为货币类型
export const getAmountThousand = (amount: string) => {
  if (!amount) {
    return '0';
  }
  return amount.toString().replace(/\d+/, function(s) {
    return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
};

// 根据毫秒数展示时间
export const millisecondToTimeFormat = (
  //@ts-ignore
  millisecond,
  format = 'd天hh小时mm分ss秒',
) => {
  if (!millisecond || !/^\d*$/.test(millisecond)) {
    return '';
  }
  const value:any = { day: 0, hou: 0, min: 0, sec: 0 };
  const map:any = { d: 'day', h: 'hour', m: 'min', s: 'sec' };
  let day = millisecond / (60 * 60 * 24 * 1000);
  //@ts-ignore
  value.day = day < 1 ? 0 : parseInt(day);
  //@ts-ignore
  value.hour = parseInt((millisecond / (60 * 60 * 1000)) % 24);
  //@ts-ignore
  value.min = parseInt((millisecond / (60 * 1000)) % 60);
  //@ts-ignore
  value.sec = parseInt((millisecond / 1000) % 60);

  if (value.day <= 0) format = 'hh小时mm分ss秒';
  //@ts-ignore
  if (value.day <= 0 && value.hour == 0) format = 'mm分ss秒';
  //@ts-ignore
  if (value.day <= 0 && value.hour == 0 && value.min == 0) format = 'ss秒';

  for (let mapKey in map) {
    let reg = new RegExp(`${mapKey}+`);
    let result = format.match(reg);
    if (result) {
      let num = value[map[mapKey]];
      let length = Math.max(result[0].length, String(num).length);
      num = (Array(length).join('0') + num).slice(-length);
      format = format.replace(reg, num);
    }
  }

  return format;
};


//兼容低版本的事件
export function triggerEvent (el:any, eventName:any) {
  let event;
  if (document.createEvent) {
    event = document.createEvent("MouseEvent");
    event.initEvent(eventName, true, true);
    //@ts-ignore
  } else if (document.createEventObject) {
    // IE < 9
     //@ts-ignore
    event = document.createEventObject();
    event.eventType = eventName;
  }
  if (el.dispatchEvent) {
    el.dispatchEvent(event);
     //@ts-ignore
  } else if (el.fireEvent && window.htmlEvents[`on${eventName}`]) {
    // IE < 9
    el.fireEvent(`on${event.eventType}`, event); // can trigger only real event (e.g. 'click')
  } else if (el[eventName]) {
    el[eventName]();
  } else if (el[`on${eventName}`]) {
    el[`on${eventName}`]();
  }
}

//金钱展示格式化
export function formatMoney (value:any) {
  let money:any = "0.00";
  if (value != null) {
    money = value;
  }
  money = new Number(money);
  if (isNaN(money)) {
    return "0.00";
  }
  money = `${money.toFixed(2)}`;
  let re = /^(-?\d+)(\d{3})(\.?\d*)/;
  while (re.test(money)) {
    money = money.replace(re, "$1,$2$3");
  }
  return money;
}