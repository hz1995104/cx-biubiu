import React from 'react';

/**
 * 内置方法的手动实现
 * **/


/**
 * call
 * **/
//原理：将函数设置为要绑定this目标的对象的属性，在对象上执行该函数，然后在对象上删除该函数
//@ts-ignore
Function.prototype.myCall = function(context, ...args) {
  const fn = Symbol('fn');        // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
  context = context || window;    // 若没有传入this, 默认绑定window对象
  context[fn] = this;             // this指向调用call的对象,即我们要改变this指向的函数
  const result = context[fn](...args);  // 执行当前函数
  delete context[fn];              // 删除我们声明的fn属性
  return result;                  // 返回函数执行结果
};


/**
 * apply
 * **/
//@ts-ignore
Function.prototype.myApply = function(context, args) {
  const fn = Symbol('fn');
  context = context || window;
  context[fn] = this;
  const result = context[fn](...args);  // 执行当前函数（此处说明一下：虽然apply()接收的是一个数组，但在调用原函数时，依然要展开参数数组。可以对照原生apply()，原函数接收到展开的参数数组）
  delete context[fn];
  return result;
};






/**
 * bind
 * **/
//@ts-ignore
Function.prototype.myBind = function(context, ...args) {
  let self = this;
  let fBound = function() {
    //当返还的函数被new调用作为构造函数时，此时函数内的this指向实例,作为普通函数时，this指向window(严格模式下为undefined)
    // @ts-ignore
    self.apply(this instanceof self ? this : context, args.concat([...arguments]));//这一步的判断是为了 bind 返回的函数作为构造函数的时候,也就是被new调用时，bind 时指定的 this 值会失效，但传入的参数依然生效
  };
  // 继承原型上的属性和方法
  fBound.prototype = Object.create(self.prototype);
  return fBound;
};




/**
 * Object.creat
 * **/
// @ts-ignore
function create(obj: any) {
  function F() {
  }

  F.prototype = obj;
  return new (F as any)();
}




/**
 * new
 * **/
function myNew(foo: any, ...args: any[]) {
  // 创建新对象,并继承构造方法的prototype属性, 这一步是为了把obj挂原型链上, 相当于obj.__proto__ = Foo.prototype
  let obj = Object.create(foo.prototype);

  // 执行构造方法, 并为其绑定新this, 这一步是为了让构造方法能进行this.name = name之类的操作, args是构造方法的入参, 因为这里用myNew模拟, 所以入参从myNew传入
  let result = foo.apply(obj, args);

  // 如果构造方法已经return了一个对象，那么就返回该对象，否则返回myNew创建的新对象（一般情况下，构造方法不会返回新实例，但使用者可以选择返回新实例来覆盖new创建的对象）
  return Object.prototype.toString.call(result) === '[object Object]' ? result : obj;
}


/**
 * instanceof
 * **/
function myInstanceof(left: any, right: any) {
  //基本数据类型直接返回false
  if (typeof left !== 'object' || left === null) return false;
  //getPrototypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    //查找到尽头，还没找到
    if (proto == null) return false;
    //找到相同的原型对象
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}


/**
 * class
 * **/
const myClass = (function() {
  function Constructor() {
  }

  //添加原型方法
  Constructor.prototype.getName = function name() {
    console.log('原型方法getName:');
  };
  //添加原型属性
  Constructor.prototype.age = '原型属性age';
  //添加静态方法
  //@ts-ignore
  Constructor.log = function log() {
    console.log('我是构造器的静态方法log');
  };
  //添加静态属性
  //@ts-ignore
  Constructor.isWho = '构造器静态属性isWho';
  return Constructor;
})();




/**
 * __proto__
 * **/
Object.defineProperty(Object.prototype, '__proto__', {
  get: function() {
    return Object.getPrototypeOf(this);  // 获取引用对象的[[Prototype]]
  },
  set: function(o) {
    Object.setPrototypeOf(this, o); // 设置引用对象[[Prototype]]属性关联的原型为o
    return o;
  },
});





/**
 * push
 * **/
// @ts-ignore
Array.prototype.myPush = function(...items) {
  let O = Object(this);
  let len = this.length >>> 0;
  let argCount = items.length >>> 0;
  // 2 ** 53 - 1 为JS能表示的最大正整数
  if (len + argCount > 2 ** 53 - 1) {
    throw new TypeError('The number of array is over the max value restricted!');
  }
  for (let i = 0; i < argCount; i++) {
    O[len + i] = items[i];
  }
  let newLength = len + argCount;
  O.length = newLength;
  return newLength;
};







/**
 * filter
 * **/
//将原对象数组通过call传入到callback函数中运行，判断是否返回true，是则push到新数组返回
// @ts-ignore
Array.prototype.myFilter = function(callback: any, thisArg: any) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError('Cannot read property \'filter\' of null or undefined');
  }
  // 处理回调类型异常
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  //强制将原数组装换为对象
  let O = Object(this);
  //>>>0 保证len为number，且为正整数
  let len = O.length >>> 0;
  let res = [];
  for (let i = 0; i < len; i++) {
    // 检查i是否在O的属性（会检查原型链）
    if (i in O) {
      // 回调函数调用传参
      if (callback.call(thisArg, O[i], i, O)) {
        res.push(O[i]);
      }
    }
  }
  return res;
};




/**
 *map
 */
//原理同filter,只不过map不会做过滤，每个遍历元素都会返回callback的值
//@ts-ignore
Array.prototype.myMap = function(callback, thisArg) {
  if (this == undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const res = [];
  const O = Object(this);
  const len = O.length >>> 0;
  for (let i = 0; i < len; i++) {
    if (i in O) {
      // 调用回调函数并传入新数组
      res[i] = callback.call(thisArg, O[i], i, this); //同filter的区别
    }
  }
  return res;
};



/**
 *forEach
 */
//原理同map，只不过没有返回值
// @ts-ignore
Array.prototype.myForEach = function(callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  while (k < len) {
    if (k in O) {
      callback.call(thisArg, O[k], k, O);
    }
    k++;
  }
};






/**
 * reduce
 * **/
//@ts-ignore
Array.prototype.myReduce = function(callback, initialValue) {
  if (this == undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = this.length;
  let accumulator = initialValue;
  let k = 0;
  // 如果第二个参数为undefined的情况下
  // 则数组的第一个有效值作为累加器的初始值
  if (accumulator === undefined) {
    // while (k < len && !(k in O)) {
    //   k++;
    // }
    // // 如果超出数组界限还没有找到累加器的初始值，则TypeError
    // if (k >= len) {
    //   throw new TypeError('Reduce of empty array with no initial value');
    // }
    accumulator = O[k++];
  }
  while (k < len) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[k], k, O);
    }
    k++;
  }
  return accumulator;
};




/**
 * iterator迭代器
 * **/
function createIterator(items: any) {
  function addIterator(items: any) {
    let i = 0;
    let done = false;
    return {
      next() {
        done = i >= items.length;
        return {
          value: items[i++],
          done,
        };
      },
    };
  }

  let iterator:any = addIterator(items);
  iterator[Symbol.iterator] = () => addIterator(items);
  return iterator;
}


/**
 * promise A+规范
 * **/

//核心：观察者模式：then收集依赖 -> 异步触发resolve -> resolve执行依赖
//流程：Promise的构造方法接收一个executor()，在new Promise()时就立刻执行这个executor回调
//->executor()内部的异步任务被放入宏/微任务队列，等待执行
//->then()被执行，收集成功/失败回调，放入成功/失败队列
//->executor()的异步任务被执行，触发resolve/reject，从成功/失败队列中取出回调依次执行
{
  //Promise/A+规定的三种状态
  const FULFILLED = 'fulfilled';
  const PENDING = 'pending';
  const REJECT = 'reject';


  class myPromise {
    _resolveQueue: any;
    _rejectQueue: any;
    _status: string;
    _value: any;

    //构造方法接受一个回调
    constructor(executor: any) {
      this._status = PENDING;     //promise的状态
      this._resolveQueue = [];    //成功队列, resolve时触发(实质上只有一个函数)
      this._rejectQueue = [];     //失败队列, reject时触发(实质上只有一个函数)
      this._value=undefined       //储存then回调return的值

      // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
      const _resolve = (val: any) => {
        //把resolve执行回调的操作封装成一个函数,放进setTimeout里,以兼容executor是同步代码的情况，防止在执行then()之前执行了成功或失败回调，这时，队列中为空
        const run = () => {
          if (this._status !== PENDING) return;   // 对应规范中的"状态只能由pending到fulfilled或rejected"
          this._status = FULFILLED; // 变更状态
          this._value = val;    // 储存当前value
          while (this._resolveQueue.length) {
            const callback = this._resolveQueue.shift();
            callback(val);
          }
        };
        setTimeout(run);

      };
      const _reject = (val: any) => {
        const run = () => {
          if (this._status !== PENDING) return;
          this._status = REJECT;
          this._value = val;
          while (this._rejectQueue.length) {
            const callback = this._rejectQueue.shift();
            callback(val);
          }
        };
        setTimeout(run);
      };

      // new Promise()时立即执行executor,并传入resolve和reject
      executor(_resolve, _reject);
    }

    //catch方法其实就是执行一下then的第二个回调
    catch(rejectFn: any) {
      return this.then(undefined, rejectFn);
    }

    finally(callback: any) {
      return this.then((v: any) => callback(v), (e: any) => callback(e));
    }

    //之所以用静态表示，是为了只能在类上调用而不能被实例或子类调用
    static resolve(val: any) {
      if (val instanceof myPromise) return val;
      return new myPromise((resolve: any) => resolve(val));
    }

    static  reject(e: any) {
      return new myPromise((resolve:any,reject: any) => reject(e));
    }


    static all(promiseArr: any) {
      let result: any = [];
      let index = 0;
      return new myPromise((resolve: any, reject: any) => {
        promiseArr.forEach((p: any) => {
          myPromise.resolve(p).then((val: any) => {
            result.push(val);
            index++;
            if (result.length === index) {
              resolve(result);
            }
          }, (e: any) => {
            reject(e);
          });
        });
      });
    }

    static race(promiseArr: any) {

      return new myPromise((resolve: any, reject: any) => {
        for (let v of promiseArr) {
          myPromise.resolve(v).then((val: any) => {
            resolve(val);
          }, (e: any) => {
            reject(e);
          });
        }
      });
    }

// then方法,接收一个成功的回调和一个失败的回调
    then(resolveFn: any, rejectFn?: any) {
      // 根据规范，实现值穿透，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
      typeof resolveFn !== 'function' ? resolveFn = (v: any) => v : null;
      typeof rejectFn !== 'function' ? rejectFn = (reason:any) => {
        throw new Error(reason instanceof Error? reason.message:reason);
      } : null

      // return一个新的promise,实现可链式调用
      return new myPromise((resolve: any, reject: any) => {
        // 把resolveFn重新包装一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论
        const new_resolveFn = (val: any) => {
          try {
            // 执行第一个(当前的)Promise的成功回调,并获取返回值
            const value = resolveFn(val);
            // 分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
            value instanceof myPromise ? value.then(resolve, reject) : resolve(value);
          } catch (e) {
            reject(e);
          }
        };
        const new_rejectFn = (val: any) => {
          try {
            const value = rejectFn(val);
            value instanceof myPromise ? value.then(resolve, reject) : resolve(value);
          } catch (e) {
            reject(e);
          }
        };
        switch (this._status) {
          // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
          case PENDING:
            this._resolveQueue.push(new_resolveFn);
            this._rejectQueue.push(new_rejectFn);
            break;
          // 当状态已经变为resolve/reject时,直接执行then回调
          //例如：Promise.resolve().then()，如果这个时候还把then()回调push进resolve/reject的执行队列里，那么回调将不会被执行，因此对于状态已经变为fulfilled或rejected的情况，我们直接执行then回调
          case FULFILLED:
            new_resolveFn(this._value);
            break;
          case  REJECT:
            new_rejectFn(this._value);
        }
      });

    }


  }
}


/**
 * 异步加载组件（懒加载）原理实现HOC
 * **/
export default function AsyncRouter(loadRouter:any) {
  return class Content extends React.Component {
    state = {Component: null}
    componentDidMount() {
      if (this.state.Component) return
      loadRouter()
      //@ts-ignore
        .then(module => module.default)
        //@ts-ignore
        .then(Component => this.setState({Component},
         ))
    }
    render() {
      const {Component} = this.state
      //@ts-ignore
      return Component ? <Component {
      ...this.props
      }
      /> : null
    }
  }
}





