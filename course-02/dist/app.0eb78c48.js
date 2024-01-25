// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/scripts/app.js":[function(require,module,exports) {
// --------- import & export ---------

// react中的拓展名通常被省略（构建过程中会自动填充）
// import { apiKey } from './util.js'

// 导入默认导出的值时，可以使用任意变量名接收值
// import apiKey from './util.js'

// 导入多个值
// import { abc, efg as content } from './util.js'
// import * as util from './util.js'

// console.log(apiKey)
// console.log(util.abc)
// console.log(util.efg)

// --------- import & export ---------

// --------- Revisiting Variables & Values ---------
// let userMessage = 'Hello World!'
// console.log(userMessage)

// const constanceValue = '恒数'
// console.log(constanceValue)

// --------- Revisiting Variables & Values ---------

// --------- Revisiting Functions & Parameters ---------
// const combine = (a, b, c) => {
//   return (a * b) / c
// }

// console.log(combine(5, 4, 3))

// --------- Revisiting Functions & Parameters ---------

// --------- Revisiting Objects & Classes ---------
// const user = {
//   name: 'Max',
//   age: 34,
//   greet() {
//     console.log('Hello')
//     console.log(this.name)
//   },
// }

// console.log(user)
// user.greet()

// // 首字母大写
// class User {

//   constructor(name, age) {
//     this.name = name
//     this.age = age
//   }

//   greet() {
//     console.log('Hi!')
//   }
// }

// const user1 = new User('Manual', 35)
// console.log(user1)
// user1.greet()

// --------- Revisiting Objects & Classes ---------

// --------- Arrays & Array Methods like map() ---------
// const hobbies = ['Sports', 'Cooking', 'Reading']
// console.log(hobbies[0]) // Sports

// const index = hobbies.findIndex((item) => item === 'Sports')
// console.log(index)

// hobbies.map((item, index) => {
//   console.log(item)
//   console.log(index)
// })

// // const editedHobbies = hobbies.map((item) => item + '!')
// // 返回对象时注意使用括号
// const editedHobbies = hobbies.map((item) => ({ text: item }))
// console.log(editedHobbies)

// --------- Arrays & Array Methods like map() ---------

// --------- Destructing ---------
// const userNameData = ['Max', 'Schwarzmuller']
// const firstNmae = userNameData[0]
// const lastNmae = userNameData[1]

// 解构数组
// const [firstNmae, lastNmae] = ['Max', 'Schwarzmuller']
// console.log(firstNmae)
// console.log(lastNmae)

// const user = {
//   name: 'Max',
//   age: 34,
// }

// const name = user.name
// const age = user.age

// 解构对象
// 必须使用同名参数，利用":"可以起别名
// const { name: userName, age } = {
//   name: 'Max',
//   age: 34,
// }

// console.log(userName)
// console.log(age)

// --------- Destructing ---------

// --------- Spread Operator ---------
// const hobbies = ['Sports', 'Cooking']
// const newHobbies = ['Reading']

// // 合并数组
// const mergedHobbies = [...hobbies, ...newHobbies]
// console.log(mergedHobbies) // ['Sports', 'Cooking', 'Reading']

// const user = {
//   name: 'Max',
//   age: 34,
// }

// // 合并对象
// const extendedUser = {
//   isAdmin: true,
//   ...user,
// }

// console.log(extendedUser) // {isAdmin: true, name: 'Max', age: 34}

// --------- Spread Operator ---------

// --------- Revisiting Control Structures ---------
// 浏览器会提示输入
// const password = prompt('Your password')

// if (password === 'Hello') {
//   console.log('Hello works')
// } else if (password === 'hello') {
//   console.log('hello works')
// } else {
//   console.log('Access not granted')
// }

// const hobbies = ['Sports', 'Cooking']

// for (const hobby of hobbies) {
//   console.log(hobby)
// }

// --------- Revisiting Control Structures ---------

// --------- Defining Function Inside Of Functions ---------
// function init() {
//   function greet() {
//     console.log('Hi!')
//   }

//   greet()
// }

// 不可以在外部执行该函数
// greet()

// --------- Defining Function Inside Of Functions ---------

// --------- Reference vs Primitive Values ---------
var hobbies = ['Sports', 'Cooking'];
// hobbies = [] // 报错

// --------- Reference vs Primitive Values ---------
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59625" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/scripts/app.js"], null)
//# sourceMappingURL=/app.0eb78c48.js.map