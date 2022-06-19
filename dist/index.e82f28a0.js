// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"eZyLq":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "207a8fdfe82f28a0";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"dV6cC":[function(require,module,exports) {
var _menuJs = require("./menu.js");
/** @format */ "use strict";
class App {
    #currentOrderLog = {};
    constructor(){
        //render Logo, Restaurant Name & Date
        this._render(this._generateInfoMarkup(), ".info", "afterbegin");
        //render UI menu categories
        this._render(this._generateMenuCategMarkup(), ".menu--navbar", "afterbegin");
        //render UI menu items
        this._render(this._generateMenuItemsMarkup(), ".menu", "beforeend");
        const menuItemBtns = document.querySelectorAll(".menu--item__button");
        const menuCategLinks = document.querySelectorAll(".menu--navbar__link");
        menuCategLinks.forEach((categlink)=>categlink.addEventListener("click", this._showMenuCategItems.bind(this, categlink, menuCategLinks)));
        menuItemBtns.forEach((btn)=>btn.addEventListener("click", this._showItemOrderForm.bind(this, btn)));
        // develop "Special Mix" menu item functionality
        const menuSpecialBtn = document.querySelector(".menu--special--item__button");
        const menuSpecialBtnItemId = Number(document.querySelector(".menu--special--item__button").getAttribute("data-item-id"));
        const specialBtnCategId = Number(document.querySelector(".menu--special--item__button").closest(".menu--items").getAttribute("data-category-id"));
        const totalPcs = (0, _menuJs.menuItems)[menuSpecialBtnItemId].qty;
        const specialMixPrice = (0, _menuJs.menuItems)[menuSpecialBtnItemId].price;
        this._render(this._generateSpecialModal(specialBtnCategId, totalPcs), ".menu", "beforeend");
        const modal = document.querySelector(".modal");
        const overlay = document.querySelector(".overlay");
        const btnCloseModal = document.querySelector(".close-modal");
        const btnIncrease = document.querySelectorAll(".order--item__qty-increase");
        const btnDecrease = document.querySelectorAll(".order--item__qty-decrease");
        const btnAdd = document.querySelector(".special-menu--footer .btnAdd");
        const btnSave = document.querySelector(".special-menu--footer .btnSave");
        const itemQty = document.querySelectorAll(".special-menu--items .order--item__qty-num");
        const totalQty = document.querySelector(".special-menu--footer .total-qty");
        this._addModalEventListeners({
            menuSpecialBtn,
            modal,
            overlay,
            btnCloseModal,
            btnIncrease,
            btnDecrease,
            btnAdd,
            btnSave,
            itemQty,
            totalQty,
            totalPcs,
            specialMixPrice
        });
    }
    /*****************************************************************/ /*****************************************************************/ /*                                                               */ /*                        SPECIAL MIX MODAL                      */ /*                                                               */ /*****************************************************************/ /*****************************************************************/ _addModalEventListeners(selectors) {
        const { menuSpecialBtn , modal , overlay , btnCloseModal , btnIncrease , btnDecrease: btnDecrease1 , btnAdd , btnSave , itemQty , totalQty , totalPcs , specialMixPrice ,  } = selectors;
        const closeModal = function() {
            modal.classList.add("hidden");
            overlay.classList.add("hidden");
            // Reset Quantities
            itemQty.forEach(function(el) {
                el.textContent = 0;
            });
            totalQty.textContent = 0;
            // Disable decrease buttons
            btnDecrease1.forEach(function(el) {
                el.classList.add("disabled");
                el.disabled = true;
            });
            // Enable Increase Buttons
            btnIncrease.forEach(function(el) {
                el.classList.remove("disabled");
                el.disabled = false;
            });
            // Disable Add Button
            btnAdd.classList.add("disabled");
            btnAdd.disabled = true;
            btnAdd.classList.remove("hidden");
            btnSave.classList.add("hidden");
        };
        const openModal = function() {
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
        };
        const updateModal = function(orderSpecialItemsId) {
            openModal();
            // qty counter
            let specialOrderQty = 0;
            // update current quantity in the modal to mtch "Mix Special Item" being edited
            // enable and disable buttons accordingly
            itemQty.forEach((item)=>{
                const specialModalItemId = Number(item.closest(".special-menu--item").getAttribute("data-item-id"));
                const btnDecrease = item.previousElementSibling;
                orderSpecialItemsId.forEach((specialItem)=>{
                    /* match the corresponding order in the mix with 
          the modal itemid to update the quantity when editing */ if (Number(specialItem.itemId) === specialModalItemId) {
                        item.textContent = String(specialItem.qty);
                        specialOrderQty += specialItem.qty;
                        // enable decrease button
                        btnDecrease.classList.remove("disabled");
                        btnDecrease.disabled = false;
                    }
                });
                // Update Modal quantity
                totalQty.textContent = String(specialOrderQty);
                /* Disbale increase button  and Enable Edit button */ if (specialOrderQty === Number(totalPcs)) {
                    // enable add button
                    // disable increase
                    btnSave.classList.remove("disabled");
                    btnSave.disabled = false;
                    btnIncrease.forEach(function(el) {
                        el.classList.add("disabled");
                        el.disabled = true;
                    });
                }
            });
            //
            btnAdd.classList.add("hidden");
            btnSave.classList.remove("hidden");
        // btnAdd.addEventListener('click', () => {
        //   console.log('test');
        // });
        };
        const changeQty = function(el, inc, totalQtyNum) {
            let itemQtyNum;
            inc ? itemQtyNum = Number(el.previousElementSibling.textContent) : itemQtyNum = Number(el.nextElementSibling.textContent);
            inc ? itemQtyNum++ : itemQtyNum--;
            inc ? totalQtyNum++ : totalQtyNum--;
            inc ? el.previousElementSibling.textContent = String(itemQtyNum) : el.nextElementSibling.textContent = String(itemQtyNum);
            totalQty.textContent = String(totalQtyNum);
            return totalQtyNum;
        };
        menuSpecialBtn.addEventListener("click", openModal);
        btnCloseModal.addEventListener("click", closeModal);
        overlay.addEventListener("click", closeModal);
        btnIncrease.forEach((el1)=>el1.addEventListener("click", function() {
                let totalQtyNum = Number(totalQty.textContent);
                totalQtyNum = changeQty(el1, true, totalQtyNum);
                if (totalQtyNum > 0) btnDecrease1.forEach(function(el) {
                    if (Number(el.nextElementSibling.textContent) > 0) {
                        el.classList.remove("disabled");
                        el.disabled = false;
                    }
                });
                if (totalQtyNum === Number(totalPcs)) {
                    // enable add button
                    // disable increase
                    btnAdd.classList.remove("disabled");
                    btnAdd.disabled = false;
                    btnSave.classList.remove("disabled");
                    btnSave.disabled = false;
                    btnIncrease.forEach(function(el) {
                        el.classList.add("disabled");
                        el.disabled = true;
                    });
                }
            }));
        btnDecrease1.forEach((el2)=>el2.addEventListener("click", function() {
                let totalQtyNum = Number(totalQty.textContent);
                totalQtyNum = changeQty(el2, false, totalQtyNum);
                if (Number(el2.nextElementSibling.textContent) === 0) {
                    el2.classList.add("disabled");
                    el2.disabled = true;
                }
                if (totalQtyNum !== Number(totalPcs)) {
                    // enable add button
                    // disable increase
                    btnAdd.classList.add("disabled");
                    btnAdd.disabled = true;
                    btnSave.classList.add("disabled");
                    btnSave.disabled = true;
                    btnIncrease.forEach(function(el) {
                        el.classList.remove("disabled");
                        el.disabled = false;
                    });
                }
            }));
        btnAdd.addEventListener("click", ()=>{
            const specialEditId = this._showSpecialItemOrderForm(totalPcs, specialMixPrice);
            closeModal();
            this._updateOrderPrice();
            const specialEdit = document.querySelector(`.order--item__edit[data-special-item-id="${specialEditId}"]`);
            specialEdit.addEventListener("click", ()=>{
                // console.log(specialEdit);
                btnSave.setAttribute("data-special-item-id", specialEditId);
                const orderSpecialItemsId = this.#currentOrderLog[specialEditId];
                updateModal(orderSpecialItemsId);
            });
            const specialDeleteBtn = document.querySelector(`.special-container--header .order--item__remove[data-special-item-id="${specialEditId}"]`);
            specialDeleteBtn.addEventListener("click", this._removeItemOrder.bind(this, specialEditId, true));
        });
        btnSave.addEventListener("click", ()=>{
            const specialEditId = btnSave.getAttribute("data-special-item-id");
            console.log(specialEditId);
            this._showSpecialItemOrderForm(totalPcs, specialMixPrice, specialEditId);
            closeModal();
            this._updateOrderPrice();
        });
    }
    _render(markup, className, position) {
        const container = document.querySelector(className);
        container.insertAdjacentHTML(position, markup);
    }
    _showSpecialItemOrderForm(totalPcs, specialMixPrice, specialEditId) {
        const specialMenuItems = document.querySelectorAll(".special-menu--item");
        const specialContainerItems = document.querySelectorAll(`.special-container[data-special-item-id='${specialEditId}'] .order--item`);
        console.log(specialContainerItems);
        specialEditId ? specialContainerItems.forEach((item)=>{
            item.remove();
        }) : (specialEditId = "id" + new Date().getTime(), this._render(this._generateSpecialContainer(totalPcs, specialMixPrice, specialEditId), ".order__details", "afterbegin"));
        this.#currentOrderLog[specialEditId] = [
            {
                mixPrice: specialMixPrice
            }
        ];
        specialMenuItems.forEach((item)=>{
            const itemId = item.getAttribute("data-item-id");
            const name = (0, _menuJs.menuItems)[itemId].name;
            const specialPrice = Number(specialMixPrice / totalPcs).toFixed(2);
            const img = (0, _menuJs.menuItems)[itemId].img;
            const qty = Number(item.querySelector(".order--item__qty-num").textContent);
            const specialItem = true;
            if (qty > 0) {
                this.#currentOrderLog[specialEditId].push({
                    itemId,
                    name,
                    specialPrice,
                    qty,
                    img,
                    specialItem
                });
                this._render(this._generateItemOrderMarkup({
                    itemId,
                    name,
                    priceD: specialPrice,
                    qty,
                    img
                }, true), `.special-container[data-special-item-id='${specialEditId}']`, "beforeend");
            }
        });
        return specialEditId;
    }
    _showMenuCategItems(categLink, categLinks) {
        const menuCategItems = document.querySelectorAll(".menu--items");
        if (categLink.closest("li").classList.contains("menu--navbar__active")) return;
        categLinks.forEach((link)=>{
            link.closest("li").classList.remove("menu--navbar__active");
            if (link.dataset.categoryId === categLink.dataset.categoryId) link.closest("li").classList.add("menu--navbar__active");
        });
        menuCategItems.forEach((categItems)=>{
            categItems.classList.add("hidden");
            if (categLink.dataset.categoryId === categItems.dataset.categoryId) categItems.classList.remove("hidden");
        });
    }
    _showItemOrderForm(btn) {
        /* get data from menuItems object according to item selected on
     "data-item-id" attribute of html element */ const { name , price , qty , img  } = (0, _menuJs.menuItems)[btn.getAttribute("data-item-id")];
        const priceD = price.toFixed(2); //convert price to decimal
        const totalPrice = price;
        const itemId = btn.getAttribute("data-item-id");
        const currItemLog = this.#currentOrderLog[itemId];
        const itemQty = document.querySelector(`.order--item.order--item-normal[data-item-id="${Number(itemId)}"] .itemQty`);
        /* The items selected individually from the menu (meaning not in a "special mix" for instance )
    are not special Items === false*/ const specialItem = false;
        // On selecting an item, check if itemId already exists in current Order List
        // 1- if YES: update Qty & total price
        if (currItemLog) {
            //update qty and total price in #currentOrderLog Object
            currItemLog.qty++;
            currItemLog.totalPrice = currItemLog.price * currItemLog.qty;
            //update UI: item qty & total price
            itemQty.textContent = currItemLog.qty;
            itemQty.parentElement.previousElementSibling.querySelector(".totalPrice").textContent = currItemLog.totalPrice.toFixed(2);
        // 2- if NO: add new item to #currentOrderLog object
        } else {
            this.#currentOrderLog[itemId] = {
                itemId,
                name,
                price,
                qty,
                img,
                specialItem,
                totalPrice
            };
            this._render(this._generateItemOrderMarkup({
                itemId,
                name,
                priceD,
                qty,
                img,
                specialItem
            }, false), ".order__details", "afterbegin");
            const deleteBtn = document.querySelector(".order--item__remove");
            deleteBtn.addEventListener("click", this._removeItemOrder.bind(this, itemId, false));
        }
        console.log(this.#currentOrderLog);
        this._updateOrderPrice();
    }
    _updateOrderPrice() {
        const totalEl = document.querySelector(".order-total--price span");
        let total = 0;
        for (const [key, { totalPrice  }] of Object.entries(this.#currentOrderLog))if (key.startsWith("id")) total += this.#currentOrderLog[key][0].mixPrice;
        else total += totalPrice;
        totalEl.textContent = total.toFixed(2);
    }
    _removeItemOrder(itemId, special) {
        //delete item from CurrentOrderLog Object
        delete this.#currentOrderLog[itemId];
        this._updateOrderPrice();
        //select item to delete from UI
        const orderItem = document.querySelector(`.order--item.order--item-normal[data-item-id="${Number(itemId)}"]`);
        const specialOrderItem = document.querySelector(`.special-container[data-special-item-id= "${itemId}"]`);
        // delete item from UI
        special ? specialOrderItem.remove() : orderItem.remove();
    }
    /*****************************************************************/ /*****************************************************************/ /*                                                               */ /*                            VIEWS                              */ /*                                                               */ /*****************************************************************/ /*****************************************************************/ _generateInfoMarkup() {
        const { logo , title , date  } = (0, _menuJs.info);
        return `
    <div class="info__logo"><img src="${logo}"></div>
    <div class="info__title">${title}</div>
    <div class="info__date">${date}</div>`;
    }
    _generateMenuCategMarkup() {
        let markup = [];
        for (const { id: categoryId , name , active  } of Object.values((0, _menuJs.menuCategories)))markup.push(`<li class="${active ? "menu--navbar__active" : ""}">
          <a class="menu--navbar__link" data-category-id="${categoryId}">${name}</a>
        </li>`);
        return markup.join("");
    }
    _generateMenuItemsMarkup() {
        let markup = [];
        // for each category load corresponsding items and construct markup
        for (const { id: categoryId , active  } of Object.values((0, _menuJs.menuCategories))){
            markup.push(`<div class="menu--items ${active ? "" : "hidden"}" data-category-id="${categoryId}">`);
            for (const [key, { catgId: productCatgId , name , price , qty , img , special_deal  }, ] of Object.entries((0, _menuJs.menuItems)))if (productCatgId === categoryId) markup.push(`<div class="menu--item" data-item-id="${key}">
                          <div class="menu--item__image"><img src="${img}"></div>
                          <div class="menu--item__details">
                            <div class="menu--item__info"><img src="src/img/icon/info.png"></div>
                            <h2 class="menu--item__title">${name}</h2>
                            <div class="menu--item__price">$ ${price}</div>
                            <button class="${special_deal ? "menu--special--item__button" : "menu--item__button"}" data-item-id="${key}">Select</button>
                          </div>
                      </div>`);
            markup.push("</div>");
        }
        return markup.join(" ");
    }
    _generateItemOrderMarkup(itemData, special) {
        return `<div class="order--item ${special ? `order--item-special` : `order--item-normal`}" data-item-id="${itemData.itemId}">
      <div class="item-content__thumb ${special ? `special-content__thumb` : ``}">
          <div class="thumb__image"><img src="${itemData.img}"></div>
          <div class="thumb__title ${special ? `special-thumb__title` : ``}"><span>${itemData.name}</span></div>
        ${special === false ? `<div class="thumb__price"><span>${itemData.priceD}</span></div>` : ""}  
        </div>

       
        <div class="order--item__total">
        ${special === false ? `<span class="item__currency">$ </span> <span class="totalPrice">${itemData.priceD}</span>` : ""}  
        </div>
        <div class="order--item__qty">
        <span class="itemQty">${itemData.qty}</span>
      </div>
        ${special === false ? '<div class="order--item__remove"> <img src="src/img/icon/Trash.png"></div>' : ""}
      
      </div>`;
    }
    _generateSpecialModal(specialBtnCategId, totalPcs) {
        let markup = [];
        markup.push(`<div class="modal hidden" data-category-id="1">
                    <button class="close-modal">×</button>
                    <h1 class="special-menu--header">Select <span>${totalPcs}</span> pcs:</h1>
                    <div class="special-menu--items">`);
        for (const [key, { catgId , name , img , special_deal  }] of Object.entries((0, _menuJs.menuItems)))if (catgId === specialBtnCategId && !special_deal) markup.push(`<div class="special-menu--item" data-item-id="${key}">
                        <img src="${img}">
                        <div class="special-menu--item-name">${name}</div>
                        <div class="order--item__qty">
                          <button type="button" class="order--item__qty-decrease disabled" disabled>&#8722;</button>
                          <span class="order--item__qty-num">0</span>
                          <button type="button" class="order--item__qty-increase">&#43;</button>
                        </div>
                      </div>`);
        markup.push(`</div>
                  <div class="special-menu--footer">
                    <div class="order--item__qty">
                      <span class="total-qty order--item__qty-num">0</span>
                      <p class="order--item__qty-pcs">pcs</p>
                    </div>
                      <button class="btnAdd disabled" disabled>Add</button>
                      <button class="btnSave disabled hidden" disabled data-special-item-id="" >Save</button>
                  </div>
              </div>
              <div class="overlay hidden"></div>`);
        return markup.join(" ");
    }
    _generateSpecialContainer(totalPcs, specialMixPrice, specialItemId) {
        return `<div class="special-container" data-special-item-id="${specialItemId}">
              <div class="special-container--header">
               <h1>MIX ${totalPcs} PCS FOR $ ${specialMixPrice}</h1>
               <div class="order--item__remove" data-special-item-id="${specialItemId}">
                <img src="src/img/icon/Trash.png">
               </div>
               <div class="order--item__edit" data-special-item-id="${specialItemId}">
                <img src="src/img/icon/edit.png">
               </div>               
              </div>
            
            </div>`;
    }
}
const app = new App();

},{"./menu.js":"dTgwB"}]},["eZyLq","dV6cC"], "dV6cC", "parcelRequirea71f")

//# sourceMappingURL=index.e82f28a0.js.map
