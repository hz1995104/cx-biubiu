/**
 * 公用方法集
 * **/

//提取当前URL参数的对象
const getURLParameters = (url: string) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a: any, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

//平滑滚动到顶部
function scrollToTop() {
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
  if (aProps.length != bProps.length) {
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

//对象数组去重
const responseList: { id: number; a: number }[] = [
  { id: 1, a: 1 },
  { id: 2, a: 2 },
  { id: 3, a: 3 },
  { id: 1, a: 4 },
];
const result = responseList.reduce((acc: { id: number; a: number }[], cur) => {
  const ids = acc.map((item) => item.id);
  return ids.includes(cur.id) ? acc : [...acc, cur];
}, []);
console.log(result); // -> [ { id: 1, a: 1}, {id: 2, a: 2}, {id: 3, a: 3} ]

//一个判断数据类型的函数
function getType(obj: any) {
  if (obj === null) return String(obj);
  return typeof obj === "object"
    ? Object.prototype.toString
        .call(obj)
        .replace("[object ", "")
        .replace("]", "")
        .toLowerCase()
    : typeof obj;
}

//判断两个对象的值是否相等（不考虑引用地址，只判断值）
function isEqual(A: any, B: any) {
  const keysA = Object.keys(A);
  const keysB = Object.keys(B);

  // 健长不一致的话就更谈不上相等了
  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];

    // 类型不等的话直接就不相等了
    if (typeof A[key] !== typeof B[key]) return false;

    // 当都不是对象的时候直接判断值是否相等
    if (
      typeof A[key] !== "object" &&
      typeof B[key] !== "object" &&
      A[key] !== B[key]
    ) {
      return false;
    }

    if (Array.isArray(A[key]) && Array.isArray(B[key])) {
      if (!arrayEqual(A[key], B[key])) return false;
    }

    // 递归判断
    if (typeof A[key] === "object" && typeof B[key] === "object") {
      if (!isEqual(A[key], B[key])) return false;
    }
  }

  return true;
}

function arrayEqual(arr1: any, arr2: any) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

/**
 * 数组扁平化(深flat)
 * **/
//递归
{
  let res5 = [];
  const flat = (arr: any) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flat(arr[i]);
      } else {
        res5.push(arr[i]);
      }
    }
  };
}

//reduce
function flatTwo(arr: any) {
  return arr.reduce((prev: any, cur: any) => {
    return prev.concat(cur instanceof Array ? flatTwo(cur) : cur);
  }, []);
}

//迭代加展开运算符
{
  let arr: any = [1, [1, 2], [1, 2, 3, [4, 4, 4]]];
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
}

/**
 * 深拷贝(递归实现)
 * **/
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

/***
 * 防抖
 * */
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

/**
 * 节流
 * **/
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

/**
 * 函数柯里化
 * **/
//基础版
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

/**
 * 偏函数
 * **/
export function partial(fn: any) {
  let _ = {};
  let args: any = [].slice.call(arguments, 1);
  return function () {
    let position = 0,
      len = args.length;
    for (let i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i];
    }
    while (position < arguments.length) args.push(arguments[position++]);
    //@ts-ignore
    return fn.apply(this, args);
  };
}

//ES6简化版
export function partialEs(func: any, ...argsBound: any) {
  return function (...args: any) {
    //@ts-ignore
    return func.call(this, ...argsBound, ...args);
  };
}

/**
 * JSONP
 * **/
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

/**
 * Ajax
 * **/

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

/**
 * 图片懒加载
 * **/

function lazyload() {
  const imgs = document.getElementsByTagName("img");
  const len = imgs.length;
  // 视口的高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeight =
    document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop;
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = imgs[i].dataset.src;
      //@ts-ignore
      imgs[i].src = src;
    }
  }
}

/**
 * 滑动加载
 * **/
{
  window.addEventListener(
    "scroll",
    function () {
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      if (clientHeight + scrollTop >= scrollHeight) {
        // 检测到滚动至页面底部，进行后续操作
        // ...
      }
    },
    false
  );
}

/**
 * 渲染几万条数据(createDocumentFragment和requestAnimationFrame实现)
 * **/
setTimeout(() => {
  // 插入十万条数据
  const total = 100000;
  // 一次插入的数据
  const once = 20;
  // 插入数据需要的次数
  const loopCount = Math.ceil(total / once);
  let countOfRender = 0;
  const ul = document.querySelector("ul");
  // 添加数据的方法
  function add() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < once; i++) {
      const li = document.createElement("li");
      //@ts-ignore
      li.innerText = Math.floor(Math.random() * total);
      fragment.appendChild(li);
    }
    //@ts-ignore
    ul.appendChild(fragment);
    countOfRender += 1;
    loop();
  }
  function loop() {
    if (countOfRender < loopCount) {
      window.requestAnimationFrame(add);
    }
  }
  loop();
}, 0);

/**
 * 快排
 * **/
{
  const quickSort: any = (array: any) => {
    if (array.length < 2) {
      return array;
    }
    const target = array[0];
    const left = [];
    const right = [];
    for (let i = 1; i < array.length; i++) {
      if (array[i] < target) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }
    return quickSort(left).concat([target], quickSort(right));
  };
}
