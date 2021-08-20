import React, { useEffect, useRef } from "react";

/**
 * 获取路由参数的某一个参数值
 *
 * @param { (string) } name - 时间
 */
export const getQueryString = (name: string) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(decodeURI(r[2]));
  }
  return null;
};

//获取路由参数所有参数的映射
export const getAllQuery = () => {
  let search = window.location.search.substr(1);
  const params = search.split("&");
  return params.reduce((total: any, current) => {
    const [key, value] = current.split("=");
    total[key] = value || "";
    return total;
  }, {});
};

//提取当前URL参数的对象
export function getURLParameters(url: string) {
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a: any, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a),
    {}
  );
}

//获取IE版本
export const getIEVersion = () => {
  let ieVersion =
    //@ts-ignore
    (!!window.ActiveXObject && +/msie\s(\d+)/i.exec(navigator.userAgent)![1]) ||
    NaN;
  return ieVersion;
};

// 转换为货币类型
export const getAmountThousand = (amount: string) => {
  if (!amount) {
    return "0";
  }
  return amount.toString().replace(/\d+/, function (s) {
    return s.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  });
};

// 根据剩余毫秒数展示倒计时
export const getRemainByMillisecond = (
  millisecond = 0,
  format = "d天hh:mm:ss"
) => {
  const value = { day: 0, hou: 0, min: 0, sec: 0 };
  const map = { d: "day", h: "hou", m: "min", s: "sec" };

  if (millisecond > 0) {
    //@ts-ignore
    value.day = parseInt(millisecond / (60 * 60 * 24 * 1000));
    //@ts-ignore
    value.hou = parseInt((millisecond / (60 * 60 * 1000)) % 24);
    //@ts-ignore
    value.min = parseInt((millisecond / (60 * 1000)) % 60);
    //@ts-ignore
    value.sec = parseInt((millisecond / 1000) % 60);
  }

  if (value.day <= 0 && format === "d天hh:mm:ss") format = "hh:mm:ss";

  if (format === "d天hh小时mm分钟ss秒") {
    if (value.day <= 0) {
      format = "hh小时mm分钟ss秒";
    }

    if (value.day <= 0 && value.hou <= 0) {
      format = "mm分钟ss秒";
    }

    if (value.day <= 0 && value.hou <= 0 && value.min <= 0) {
      format = "ss秒";
    }
  }

  for (let mapKey in map) {
    let reg = new RegExp(`${mapKey}+`);
    let result = format.match(reg);
    if (result) {
      //@ts-ignore
      let num = value[map[mapKey]];
      let length = Math.max(result[0].length, String(num).length);
      num = (Array(length).join("0") + num).slice(-length);
      format = format.replace(reg, num);
    }
  }

  return format;
};

//金钱展示格式化
export function formatMoney(value: any) {
  let money: any = "0.00";
  if (value != null) {
    money = value;
  }
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

//平滑滚动到顶部
export function scrollToTop() {
  let c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8); //可调整除数来更改滚动速度
  }
}

//递归循环判断两个对象是否相等
function isObjectValueEqual(a: any, b: any) {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  if (aProps.length !== bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];
    const propA = a[propName];
    const propB = b[propName];
    if (typeof propA === "object") {
      if (!isObjectValueEqual(propA, propB)) return false;
    } else if (propA !== propB) {
      return false;
    }
  }
  return true;
}

//深拷贝
function clone(target: any, map = new WeakMap()) {
  if (typeof target === "object") {
    let cloneTarget: any = Array.isArray(target) ? [] : {};
    //检查存储空间是否拷贝过此对象，有则直接返回，没有则进行拷贝,解决循环引用自身的问题
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (let key in target) {
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

//防抖
const debounce = (fn: any, time: number) => {
  let timeout: any = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, [...arguments]);
    }, time);
  };
};

//节流
function throttle(func: Function, wait: number) {
  let timeout: any = null;
  return function () {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        //@ts-ignore
        func.apply(this, [...arguments]);
      }, wait);
    }
  };
}

//柯里化
//@ts-ignore
const curryOne = (fn, arr = []) => {
  //arr数组用于记录已有参数
  // @ts-ignore
  return (...args) => {
    //不定参数，想给多少给多少
    //判断参数总数是否和fn参数个数相等
    if ([...arr, ...args].length === fn.length) {
      return fn(...arr, ...args); //拓展参数，调用fn
    } else {
      //@ts-ignore
      return curryOne(fn, [...arr, ...args]); //迭代，传入现有的所有参数
    }
  };
};
//升级版
const curry = (fn: any, arr = []) => {
  //@ts-ignore
  return (...args) => {
    return ((a) => {
      //@ts-ignore
      return a.length === fn.length ? fn(...a) : curry(fn, a);
    })([...arr, ...args]);
  };
};

//JSONP
//参数:请求url、请求参数、回调函数名
function JSONP({
  url,
  param,
  callback,
}: {
  url: string;
  param: object;
  callback: string;
}) {
  return new Promise((resolve) => {
    let script = document.createElement("script");
    const params = { ...param, callback };
    //@ts-ignore
    window[callback] = function (data: any) {
      resolve(data);
      document.body.removeChild(script);
    };
    let arr = [];
    for (let key in params) {
      //@ts-ignore
      arr.push(`${key}=${params[key]}`);
    }
    script.src = `${url}?${arr.join("&")}`;
    document.body.appendChild(script);
  });
}

//AJAX
{
  const AJAX = function (url: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.responseText));
        }
      };
      xhr.send();
    });
  };
}


//将blob格式数据转换为xsl格式导出
export function downloadFile (file:any, fileName:any) {
	const reader = new FileReader()
	reader.readAsText(file, 'utf-8')
	reader.onload = () => {
	  try {
		if (typeof reader.result === 'string') {
		  const match = reader.result.match(/resultMessage":"(.+?)"/)
		  if (match) {
			return
		  }
		}
		const url = URL.createObjectURL(file)
		const a = document.createElement('a')
		a.target = '_blank'
		if (fileName) {
		  a.download = fileName
		}
		a.href = url
		const event = new MouseEvent('click')
		a.dispatchEvent(event)
		URL.revokeObjectURL(url)
	  } catch (err) {
		console.error(err.message)
	  }
	}
  }