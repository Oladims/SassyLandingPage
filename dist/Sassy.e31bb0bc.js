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
})({"node_modules/bounds.js/dist/bounds.js":[function(require,module,exports) {
var define;
!(function(e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define(n)
    : (e.bounds = n());
})(this, function() {
  "use strict";
  function i(e, n) {
    for (var t = 0; t < n.length; t++) {
      var i = n[t];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i);
    }
  }
  function s() {
    if (!("IntersectionObserver" in window))
      throw new Error(
        "\n      bounds.js requires IntersectionObserver on the global object.\n      IntersectionObserver is unavailable in IE and other older\n      versions of browsers.\n      See https://github.com/ChrisCavs/bounds.js/blob/master/README.md\n      for more compatibility information.\n    "
      );
  }
  function u() {}
  var n = ((function(e, n, t) {
    return n && i(e.prototype, n), t && i(e, t), e;
  })(
    a,
    [
      {
        key: "watch",
        value: function(e, n, t) {
          var i = {
            el: e,
            onEnter: 1 < arguments.length && void 0 !== n ? n : u,
            onLeave: 2 < arguments.length && void 0 !== t ? t : u
          };
          return this.nodes.push(i), this.observer.observe(e), i;
        }
      },
      {
        key: "unWatch",
        value: function(e) {
          var n = this._findByNode(e, !0);
          return (
            -1 !== n && (this.nodes.splice(n, 1), this.observer.unobserve(e)),
            this
          );
        }
      },
      {
        key: "check",
        value: function(e) {
          return (this._findByNode(e) || {}).history;
        }
      },
      {
        key: "clear",
        value: function() {
          return (this.nodes = []), this.observer.disconnect(), this;
        }
      },
      {
        key: "_emit",
        value: function(e) {
          var i = this,
            n = e.map(function(e) {
              var n = i._findByNode(e.target),
                t = e.intersectionRatio;
              return (
                (n.history = e.isIntersecting),
                e.isIntersecting ? n.onEnter(t) : n.onLeave(t),
                {
                  el: e.target,
                  inside: e.isIntersecting,
                  outside: !e.isIntersecting,
                  ratio: e.intersectionRatio
                }
              );
            });
          this.onEmit(n);
        }
      },
      {
        key: "_findByNode",
        value: function(n, e) {
          var t =
            1 < arguments.length && void 0 !== e && e ? "findIndex" : "find";
          return this.nodes[t](function(e) {
            return e.el.isEqualNode(n);
          });
        }
      }
    ],
    [
      {
        key: "checkCompatibility",
        value: function() {
          s();
        }
      }
    ]
  ),
  a);
  function a(e) {
    var n = e.root,
      t = e.margins,
      i = e.threshold,
      o = e.onEmit;
    !(function(e, n) {
      if (!(e instanceof n))
        throw new TypeError("Cannot call a class as a function");
    })(this, a),
      s();
    var r = {
      root: n || null,
      rootMargin: (function(e) {
        var n = 0 < arguments.length && void 0 !== e ? e : {},
          t = n.top,
          i = void 0 === t ? 0 : t,
          o = n.right,
          r = void 0 === o ? 0 : o,
          s = n.bottom,
          u = void 0 === s ? 0 : s,
          a = n.left;
        return (
          i + "px " + r + "px " + u + "px " + (void 0 === a ? 0 : a) + "px"
        );
      })(t),
      threshold: i || 0
    };
    (this.nodes = []),
      (this.onEmit = o || u),
      (this.observer = new IntersectionObserver(this._emit.bind(this), r));
  }
  return function(e) {
    return new n(e);
  };
});

},{}],"index.js":[function(require,module,exports) {
"use strict";

var _bounds = _interopRequireDefault(require("bounds.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boundary = (0, _bounds.default)({
  margins: {
    top: 100
  }
});
var main3 = document.querySelector(".main3");
var image = document.querySelectorAll("img");

var whenImageEnters = function whenImageEnters(image) {
  return function () {
    console.log(image.dataset.src);
    image.src = image.dataset.src;
    boundary.unWatch(image);
    console.log("show Image");
  };
};

boundary.watch(main3, function () {
  main3.classList.add("reveal");
  console.log("show");
}, main3.classList.remove("reveal"));
image.forEach(function (img) {
  boundary.watch(img, whenImageEnters(img));
});
},{"bounds.js":"node_modules/bounds.js/dist/bounds.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62307" + '/');

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
      }); // Enable HMR for CSS by default.

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
      } else {
        window.location.reload();
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Sassy.e31bb0bc.js.map