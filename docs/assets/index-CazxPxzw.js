(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();const cn=()=>{};var Ze={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},ln=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const o=t[n++];e[s++]=String.fromCharCode((r&31)<<6|o&63)}else if(r>239&&r<365){const o=t[n++],i=t[n++],a=t[n++],c=((r&7)<<18|(o&63)<<12|(i&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const o=t[n++],i=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(o&63)<<6|i&63)}}return e.join("")},ve={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const o=t[r],i=r+1<t.length,a=i?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,f=o>>2,h=(o&3)<<4|a>>4;let m=(a&15)<<2|l>>6,p=l&63;c||(p=64,i||(m=64)),s.push(n[f],n[h],n[m],n[p])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(It(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ln(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const o=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,o==null||a==null||l==null||h==null)throw new dn;const m=o<<2|a>>4;if(s.push(m),l!==64){const p=a<<4&240|l>>2;if(s.push(p),h!==64){const _=l<<6&192|h;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class dn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const un=function(t){const e=It(t);return ve.encodeByteArray(e,!0)},Tt=function(t){return un(t).replace(/\./g,"")},hn=function(t){try{return ve.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(t){return At(void 0,t)}function At(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!fn(n)||(t[n]=At(t[n],e[n]));return t}function fn(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn=()=>ke().__FIREBASE_DEFAULTS__,gn=()=>{if(typeof process>"u"||typeof Ze>"u")return;const t=Ze.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},mn=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&hn(t[1]);return e&&JSON.parse(e)},En=()=>{try{return cn()||pn()||gn()||mn()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ct=()=>{var t;return(t=En())==null?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}function Pe(){try{return typeof indexedDB=="object"}catch{return!1}}function bn(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var o;e(((o=r.error)==null?void 0:o.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n="FirebaseError";class G extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=_n,Object.setPrototypeOf(this,G.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ne.prototype.create)}}class Ne{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,o=this.errors[e],i=o?yn(o,s):"Error",a=`${this.serviceName}: ${i} (${r}).`;return new G(r,a,s)}}function yn(t,e){try{let n=0,s="";for(;n<t.length;){const r=t.indexOf("{$",n);if(r===-1){s+=t.substring(n);break}const o=t.indexOf("}",r+2);if(o===-1){s+=t.substring(n);break}const i=t.substring(r+2,o),a=e[i];s+=t.substring(n,r)+(a!=null?String(a):`<${i}?>`),n=o+1}return s}catch{return t}}function _e(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const o=t[r],i=e[r];if(et(o)&&et(i)){if(!_e(o,i))return!1}else if(o!==i)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function et(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn=1e3,In=2,Tn=14400*1e3,An=.5;function Cn(t,e=wn,n=In){const s=e*Math.pow(n,t),r=Math.round(An*s*(Math.random()-.5)*2);return Math.min(Tn,s+r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ot(t){return t&&t._delegate?t._delegate:t}class F{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Y;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Sn(e))try{this.getOrInitializeService({instanceIdentifier:L})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:r});s.resolve(o)}catch{}}}}clearInstance(e=L){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=L){return this.instances.has(e)}getOptions(e=L){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[o,i]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(o);s===a&&i.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Rn(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=L){return this.component?this.component.multipleInstances?e:L:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Rn(t){return t===L?void 0:t}function Sn(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new On(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var g;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(g||(g={}));const vn={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},kn=g.INFO,Pn={[g.DEBUG]:"log",[g.VERBOSE]:"log",[g.INFO]:"info",[g.WARN]:"warn",[g.ERROR]:"error"},Nn=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=Pn[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Le{constructor(e){this.name=e,this._logLevel=kn,this._logHandler=Nn,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in g))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vn[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,g.DEBUG,...e),this._logHandler(this,g.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,g.VERBOSE,...e),this._logHandler(this,g.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,g.INFO,...e),this._logHandler(this,g.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,g.WARN,...e),this._logHandler(this,g.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,g.ERROR,...e),this._logHandler(this,g.ERROR,...e)}}const Ln=(t,e)=>e.some(n=>t instanceof n);let tt,nt;function Mn(){return tt||(tt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $n(){return nt||(nt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Rt=new WeakMap,ye=new WeakMap,St=new WeakMap,ce=new WeakMap,Me=new WeakMap;function xn(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",o),t.removeEventListener("error",i)},o=()=>{n(N(t.result)),r()},i=()=>{s(t.error),r()};t.addEventListener("success",o),t.addEventListener("error",i)});return e.then(n=>{n instanceof IDBCursor&&Rt.set(n,t)}).catch(()=>{}),Me.set(e,t),e}function Fn(t){if(ye.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",i),t.removeEventListener("abort",i)},o=()=>{n(),r()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",o),t.addEventListener("error",i),t.addEventListener("abort",i)});ye.set(t,e)}let we={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ye.get(t);if(e==="objectStoreNames")return t.objectStoreNames||St.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return N(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Bn(t){we=t(we)}function Un(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(le(this),e,...n);return St.set(s,e.sort?e.sort():[e]),N(s)}:$n().includes(t)?function(...e){return t.apply(le(this),e),N(Rt.get(this))}:function(...e){return N(t.apply(le(this),e))}}function Hn(t){return typeof t=="function"?Un(t):(t instanceof IDBTransaction&&Fn(t),Ln(t,Mn())?new Proxy(t,we):t)}function N(t){if(t instanceof IDBRequest)return xn(t);if(ce.has(t))return ce.get(t);const e=Hn(t);return e!==t&&(ce.set(t,e),Me.set(e,t)),e}const le=t=>Me.get(t);function Vn(t,e,{blocked:n,upgrade:s,blocking:r,terminated:o}={}){const i=indexedDB.open(t,e),a=N(i);return s&&i.addEventListener("upgradeneeded",c=>{s(N(i.result),c.oldVersion,c.newVersion,N(i.transaction),c)}),n&&i.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{o&&c.addEventListener("close",()=>o()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Gn=["get","getKey","getAll","getAllKeys","count"],jn=["put","add","delete","clear"],de=new Map;function st(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(de.get(e))return de.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=jn.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Gn.includes(n)))return;const o=async function(i,...a){const c=this.transaction(i,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return de.set(e,o),o}Bn(t=>({...t,get:(e,n,s)=>st(e,n)||t.get(e,n,s),has:(e,n)=>!!st(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(zn(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function zn(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ie="@firebase/app",rt="0.16.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C=new Le("@firebase/app"),Kn="@firebase/app-compat",qn="@firebase/analytics-compat",Yn="@firebase/analytics",Jn="@firebase/app-check-compat",Xn="@firebase/app-check",Qn="@firebase/auth",Zn="@firebase/auth-compat",es="@firebase/crashlytics",ts="@firebase/database",ns="@firebase/data-connect",ss="@firebase/database-compat",rs="@firebase/functions",os="@firebase/functions-compat",is="@firebase/installations",as="@firebase/installations-compat",cs="@firebase/messaging",ls="@firebase/messaging-compat",ds="@firebase/performance",us="@firebase/performance-compat",hs="@firebase/remote-config",fs="@firebase/remote-config-compat",ps="@firebase/storage",gs="@firebase/storage-compat",ms="@firebase/firestore",Es="@firebase/ai",bs="@firebase/firestore-compat",_s="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Te="[DEFAULT]",ys={[Ie]:"fire-core",[Kn]:"fire-core-compat",[Yn]:"fire-analytics",[qn]:"fire-analytics-compat",[Xn]:"fire-app-check",[Jn]:"fire-app-check-compat",[Qn]:"fire-auth",[Zn]:"fire-auth-compat",[es]:"fire-cls",[ts]:"fire-rtdb",[ns]:"fire-data-connect",[ss]:"fire-rtdb-compat",[rs]:"fire-fn",[os]:"fire-fn-compat",[is]:"fire-iid",[as]:"fire-iid-compat",[cs]:"fire-fcm",[ls]:"fire-fcm-compat",[ds]:"fire-perf",[us]:"fire-perf-compat",[hs]:"fire-rc",[fs]:"fire-rc-compat",[ps]:"fire-gcs",[gs]:"fire-gcs-compat",[ms]:"fire-fst",[bs]:"fire-fst-compat",[Es]:"fire-vertex","fire-js":"fire-js",[_s]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ne=new Map,ws=new Map,Ae=new Map;function ot(t,e){try{t.container.addComponent(e)}catch(n){C.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function H(t){const e=t.name;if(Ae.has(e))return C.debug(`There were multiple attempts to register component ${e}.`),!1;Ae.set(e,t);for(const n of ne.values())ot(n,t);for(const n of ws.values())ot(n,t);return!0}function $e(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Is(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},D=new Ne("app","Firebase",Ts);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new F("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}}function Dt(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Te,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw D.create("bad-app-name",{appName:String(r)});if(n||(n=Ct()),!n)throw D.create("no-options");const o=ne.get(r);if(o)if(_e(n,o.options)){if(_e(s,o.config))return o;throw D.create("duplicate-app",{appName:r,mismatchedParam:"config",oldValue:JSON.stringify(o.config),newValue:JSON.stringify(s)})}else throw D.create("duplicate-app",{appName:r,mismatchedParam:"options",oldValue:JSON.stringify(o.options),newValue:JSON.stringify(n)});const i=new Dn(r);for(const c of Ae.values())i.addComponent(c);const a=new As(n,s,i);return ne.set(r,a),a}function vt(t=Te){const e=ne.get(t);if(!e&&t===Te&&Ct())return Dt();if(!e)throw D.create("no-app",{appName:t});return e}function x(t,e,n){let s=ys[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const i=[`Unable to register library "${s}" with version "${e}":`];r&&i.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&i.push("and"),o&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),C.warn(i.join(" "));return}H(new F(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs="firebase-heartbeat-database",Os=1,J="firebase-heartbeat-store";let ue=null;function kt(){return ue||(ue=Vn(Cs,Os,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(J)}catch(n){console.warn(n)}}}}).catch(t=>{throw D.create("idb-open",{originalErrorMessage:t.message})})),ue}async function Rs(t){try{const n=(await kt()).transaction(J),s=await n.objectStore(J).get(Pt(t));return await n.done,s}catch(e){if(e instanceof G)C.warn(e.message);else{const n=D.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});C.warn(n.message)}}}async function it(t,e){try{const s=(await kt()).transaction(J,"readwrite");await s.objectStore(J).put(e,Pt(t)),await s.done}catch(n){if(n instanceof G)C.warn(n.message);else{const s=D.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});C.warn(s.message)}}}function Pt(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss=1024,Ds=30;class vs{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ps(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=at();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(i=>i.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:r}),this._heartbeatsCache.heartbeats.length>Ds){const i=Ns(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){C.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=at(),{heartbeatsToSend:s,unsentEntries:r}=ks(this._heartbeatsCache.heartbeats),o=Tt(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return C.warn(n),""}}}function at(){return new Date().toISOString().substring(0,10)}function ks(t,e=Ss){const n=[];let s=t.slice();for(const r of t){const o=n.find(i=>i.agent===r.agent);if(o){if(o.dates.push(r.date),ct(n)>e){o.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),ct(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class Ps{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pe()?bn().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Rs(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return it(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return it(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ct(t){return Tt(JSON.stringify({version:2,heartbeats:t})).length}function Ns(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t){H(new F("platform-logger",e=>new Wn(e),"PRIVATE")),H(new F("heartbeat",e=>new vs(e),"PRIVATE")),x(Ie,rt,t),x(Ie,rt,"esm2020"),x("fire-js","")}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ce="firebase-js-sdk-policy",Ms=["https://www.googletagmanager.com/gtag/js","https://apis.google.com/js/api.js","https://www.google.com/recaptcha/api.js","https://www.google.com/recaptcha/enterprise.js"];let Q,Nt=!1;function Lt(t){if(!Ms.some(n=>t.startsWith(n)&&(t.length===n.length||t.charAt(n.length)==="?")))throw new TypeError(`Firebase: Refusing to load untrusted script URL: ${t}`);return t}function $s(){if(Q===void 0){Q=null;const t=typeof window<"u"?window.trustedTypes:void 0;if(t!=null&&t.createPolicy)try{Q=t.createPolicy(Ce,{createScriptURL:Lt})}catch{Nt=!0}}return Q}function xs(t,e){Lt(e);const n=$s();if(n){t.src=n.createScriptURL(e);return}try{t.src=e}catch(s){throw Nt&&C.error(`Unable to load ${e} because this page requires Trusted Types for scripts but does not allow the "${Ce}" Trusted Types policy. To fix this, add "${Ce}" to the trusted-types directive of the page's Content-Security-Policy.`),s}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ls("");var Fs="firebase",Bs="13.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */x(Fs,Bs,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe=new Map,Mt={activated:!1,tokenObservers:[]},Us={initialized:!1,enabled:!1};function b(t){return Oe.get(t)||{...Mt}}function Hs(t,e){return Oe.set(t,e),Oe.get(t)}function oe(){return Us}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $t="https://content-firebaseappcheck.googleapis.com/v1",Vs="exchangeRecaptchaV3Token",Gs="exchangeDebugToken",lt={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},js=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e,n,s,r,o){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=r,r>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Y,this.pending.promise.catch(n=>{}),await zs(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Y,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function zs(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},T=new Ne("appCheck","AppCheck",Ks);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(t=!1){var e;return t?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function xe(t){if(!b(t).activated)throw T.create("use-before-activation",{appName:t.name})}function xt(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-s*3600)/60),o=e-n*3600*24-s*3600-r*60;let i="";return n&&(i+=Z(n)+"d:"),s&&(i+=Z(s)+"h:"),i+=Z(r)+"m:"+Z(o)+"s",i}function Z(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fe({url:t,body:e},n){const s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const h=await r.getHeartbeatsHeader();h&&(s["X-Firebase-Client"]=h)}const o={method:"POST",body:JSON.stringify(e),headers:s};let i;try{i=await fetch(t,o)}catch(h){throw T.create("fetch-network-error",{originalErrorMessage:h==null?void 0:h.message})}if(i.status!==200)throw T.create("fetch-status-error",{httpStatus:i.status});let a;try{a=await i.json()}catch(h){throw T.create("fetch-parse-error",{originalErrorMessage:h==null?void 0:h.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw T.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,f=Date.now();return{token:a.token,expireTimeMillis:f+l,issuedAtTimeMillis:f}}function qs(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${$t}/projects/${n}/apps/${s}:${Vs}?key=${r}`,body:{recaptcha_v3_token:e}}}function Ft(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${$t}/projects/${n}/apps/${s}:${Gs}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys="firebase-app-check-database",Js=1,X="firebase-app-check-store",Bt="debug-token";let ee=null;function Ut(){return ee||(ee=new Promise((t,e)=>{try{const n=indexedDB.open(Ys,Js);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{var r;e(T.create("storage-open",{originalErrorMessage:(r=s.target.error)==null?void 0:r.message}))},n.onupgradeneeded=s=>{const r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(X,{keyPath:"compositeKey"})}}}catch(n){e(T.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),ee)}function Xs(t){return Vt(Gt(t))}function Qs(t,e){return Ht(Gt(t),e)}function Zs(t){return Ht(Bt,t)}function er(){return Vt(Bt)}async function Ht(t,e){const s=(await Ut()).transaction(X,"readwrite"),o=s.objectStore(X).put({compositeKey:t,value:e});return new Promise((i,a)=>{o.onsuccess=c=>{i()},s.onerror=c=>{var l;a(T.create("storage-set",{originalErrorMessage:(l=c.target.error)==null?void 0:l.message}))}})}async function Vt(t){const n=(await Ut()).transaction(X,"readonly"),r=n.objectStore(X).get(t);return new Promise((o,i)=>{r.onsuccess=a=>{const c=a.target.result;o(c?c.value:void 0)},n.onerror=a=>{var c;i(T.create("storage-get",{originalErrorMessage:(c=a.target.error)==null?void 0:c.message}))}})}function Gt(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P=new Le("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(t){if(Pe()){let e;try{e=await Xs(t)}catch(n){P.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function he(t,e){return Pe()?Qs(t,e).catch(n=>{P.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function nr(t){let e;try{e=await er()}catch{}if(e)return e;{const n=crypto.randomUUID();let s=`To use this token for app debugging, register it with your project.

Firebase App Check debug token: ${n}

`;const r=t==null?void 0:t.options.appId,o=t==null?void 0:t.options.projectId;return o&&r?s+=`You can do so in the Firebase Console:
https://console.firebase.google.com/project/${o}/appcheck/apps?selectedAppId=${r}

Or using the Firebase CLI:
firebase appcheck:debugtokens:create ${n} --project ${o} --app ${r}

`:s+=`You will need to add it to your app's App Check settings in the Firebase Console for it to work.

`,s+=`Note: To keep your project secure, please revoke and delete this token using the
Firebase Console or the CLI (\`firebase appcheck:debugtokens:delete\`) when you finish debugging.

Warning: This debug token is a secret and should not be shared or uploaded to source code.

Debug Token Guide: https://firebase.google.com/docs/app-check/web/debug-provider
Firebase CLI install instructions: https://firebase.google.com/docs/cli
`,console.log(s),Zs(n).catch(i=>P.warn(`Failed to persist debug token to IndexedDB. Error: ${i}`)),n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Be(){return oe().enabled}async function Ue(){const t=oe();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function sr(t){const e=ke(),n=oe();if(n.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;n.enabled=!0;const s=new Y;n.token=s,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?s.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):s.resolve(nr(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr={error:"UNKNOWN_ERROR"};function or(t){return ve.encodeString(JSON.stringify(t),!1)}async function Re(t,e=!1,n=!1){const s=t.app;xe(s);const r=b(s);let o=r.token,i;if(o&&!U(o)&&(r.token=void 0,o=void 0),!o){const l=await r.cachedTokenPromise;l&&(U(l)?o=l:await he(s,void 0))}if(!e&&o&&U(o))return{token:o.token};let a=!1;if(Be())try{const l=await Ue();r.exchangeTokenPromise||(r.exchangeTokenPromise=Fe(Ft(s,l),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const f=await r.exchangeTokenPromise;return await he(s,f),r.token=f,{token:f.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?P.warn(l.message):n&&P.error(l),fe(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),o=await b(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?P.warn(l.message):n&&P.error(l),i=l}let c;return o?i?U(o)?c={token:o.token,internalError:i}:c=fe(i):(c={token:o.token},r.token=o,await he(s,o)):c=fe(i),a&&zt(s,c),c}async function ir(t){const e=t.app;xe(e);const{provider:n}=b(e);if(Be()){const s=await Ue(),r=Ft(e,s);r.body.limited_use=!0;const{token:o}=await Fe(r,t.heartbeatServiceProvider);return{token:o}}else{const{token:s}=await n.getToken(!0);return{token:s}}}function jt(t,e,n,s){const{app:r}=t,o=b(r),i={next:n,error:s,type:e};if(o.tokenObservers=[...o.tokenObservers,i],o.token&&U(o.token)){const a=o.token;Promise.resolve().then(()=>{n({token:a.token}),ut(t)}).catch(()=>{})}o.cachedTokenPromise.then(()=>ut(t))}function Wt(t,e){const n=b(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function ut(t){const{app:e}=t,n=b(e);let s=n.tokenRefresher;s||(s=ar(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function ar(t){const{app:e}=t;return new Ws(async()=>{const n=b(e);let s;if(n.token?s=await Re(t,!0):s=await Re(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=b(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-300*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},lt.RETRIAL_MIN_WAIT,lt.RETRIAL_MAX_WAIT)}function zt(t,e){const n=b(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function U(t){return t.expireTimeMillis-Date.now()>0}function fe(t){return{token:or(rr),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=b(this.app);for(const n of e)Wt(this.app,n.next);return Promise.resolve()}}function lr(t,e){return new cr(t,e)}function dr(t){return{getToken:e=>Re(t,e),getLimitedUseToken:()=>ir(t),addTokenListener:e=>jt(t,"INTERNAL",e),removeTokenListener:e=>Wt(t.app,e)}}const ur="@firebase/app-check",hr="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr="https://www.google.com/recaptcha/api.js";function pr(t,e){const n=new Y,s=b(t);s.reCAPTCHAState={initialized:n};const r=gr(t),o=dt(!1);return o?ht(t,e,o,r,n):br(()=>{const i=dt(!1);if(!i)throw new Error("no recaptcha");ht(t,e,i,r,n)}),n.promise}function ht(t,e,n,s,r){n.ready(()=>{Er(t,e,n,s),r.resolve(n)})}function gr(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function mr(t){xe(t);const n=await b(t).reCAPTCHAState.initialized.promise;return new Promise((s,r)=>{const o=b(t).reCAPTCHAState;n.ready(()=>{s(n.execute(o.widgetId,{action:"fire_app_check"}))})})}function Er(t,e,n,s){const r=n.render(s,{sitekey:e,size:"invisible",callback:()=>{b(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{b(t).reCAPTCHAState.succeeded=!1}}),o=b(t);o.reCAPTCHAState={...o.reCAPTCHAState,widgetId:r}}function br(t){const e=document.createElement("script");xs(e,fr),e.onload=t,document.head.appendChild(e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){var r,o,i;yr(this._throttleData);const n=await mr(this._app).catch(a=>{throw T.create("recaptcha-error")});if(!((r=b(this._app).reCAPTCHAState)!=null&&r.succeeded))throw T.create("recaptcha-error");let s;try{const a=qs(this._app,n);e&&(a.body.limited_use=!0),s=await Fe(a,this._heartbeatServiceProvider)}catch(a){throw(o=a.code)!=null&&o.includes("fetch-status-error")?(this._throttleData=_r(Number((i=a.customData)==null?void 0:i.httpStatus),this._throttleData),T.create("initial-throttle",{time:xt(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=$e(e,"heartbeat"),pr(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof He?this._siteKey===e._siteKey:!1}}function _r(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+js,httpStatus:t};{const n=e?e.backoffCount:0,s=Cn(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function yr(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw T.create("throttled",{time:xt(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(t=vt(),e){var r;t=Ot(t);const n=$e(t,"app-check");if(oe().initialized||sr(t),Be()&&Ue().then(o=>{console.log(`Firebase App Check debug token: ${o}`)}),n.isInitialized()){const o=n.getImmediate(),i=n.getOptions();if(i&&!!i.isTokenAutoRefreshEnabled==!!e.isTokenAutoRefreshEnabled&&((r=i.provider)!=null&&r.isEqual(e.provider)))return o;throw T.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return Ir(t,e.provider,e.isTokenAutoRefreshEnabled),b(t).isTokenAutoRefreshEnabled&&jt(s,"INTERNAL",()=>{}),s}function Ir(t,e,n=!1){const s=Hs(t,{...Mt});s.activated=!0,s.provider=e,s.cachedTokenPromise=tr(t).then(r=>(r&&U(r)&&(s.token=r,zt(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&P.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr="app-check",ft="app-check-internal";function Ar(){H(new F(Tr,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return lr(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(ft).initialize()})),H(new F(ft,t=>{const e=t.getProvider("app-check").getImmediate();return dr(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),x(ur,hr)}Ar();const Cr={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_FIREBASE_API_KEY:"AIzaSyANcZTv2swEvhldyvco2RzVv6GAk7J3yK4",VITE_FIREBASE_APPCHECK_DEBUG_TOKEN:"6e59f193-9b6c-4323-9d74-f7afec35714a",VITE_FIREBASE_APP_ID:"1:449627774619:web:61aca4d8f3666cbef5703e",VITE_FIREBASE_AUTH_DOMAIN:"warungai-hybrid.firebaseapp.com",VITE_FIREBASE_MESSAGING_SENDER_ID:"449627774619",VITE_FIREBASE_PROJECT_ID:"warungai-hybrid",VITE_FIREBASE_STORAGE_BUCKET:"warungai-hybrid.firebasestorage.app"},B=(t,e)=>Cr[`VITE_FIREBASE_${t}`]??e,Se={apiKey:B("API_KEY","REPLACE_WITH_YOUR_FIREBASE_API_KEY"),authDomain:B("AUTH_DOMAIN","REPLACE_WITH_YOUR_PROJECT.firebaseapp.com"),projectId:B("PROJECT_ID","REPLACE_WITH_YOUR_PROJECT_ID"),storageBucket:B("STORAGE_BUCKET","REPLACE_WITH_YOUR_PROJECT.appspot.com"),messagingSenderId:B("MESSAGING_SENDER_ID","REPLACE_WITH_YOUR_SENDER_ID"),appId:B("APP_ID","REPLACE_WITH_YOUR_APP_ID")},Or=!Se.apiKey.startsWith("REPLACE_WITH_")&&!Se.projectId.startsWith("REPLACE_WITH_");let j=null;function Rr(){if(j)return j;j=Dt(Se);const t="6e59f193-9b6c-4323-9d74-f7afec35714a";return self.FIREBASE_APPCHECK_DEBUG_TOKEN=t,wr(j,{provider:new He("debug-placeholder-key"),isTokenAutoRefreshEnabled:!0}),j}var pt="@firebase/ai",De="3.1.0";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V="AI",Sr="global",Dr="firebasevertexai.googleapis.com",se="v1beta",gt=De,vr="gl-js",kr="hybrid",Pr=180*1e3,Nr="gemini-3.5-flash-lite";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u extends G{constructor(e,n,s){const r=V,o=`${r}/${e}`,i=`${r}: ${n} (${o})`;super(e,i),this.code=e,this.customErrorData=s,Error.captureStackTrace&&Error.captureStackTrace(this,u),Object.setPrototypeOf(this,u.prototype),this.toString=()=>i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=["user","model","function","system"],Kt={HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"},w={SAFETY:"SAFETY",RECITATION:"RECITATION",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"},I={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},k={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",ALREADY_INITIALIZED:"already-initialized",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v={AGENT_PLATFORM:"AGENT_PLATFORM",GOOGLE_AI:"GOOGLE_AI"};/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.backendType=e}}class ie extends qt{constructor(){super(v.GOOGLE_AI)}_getModelPath(e,n){return`/${se}/projects/${e}/${n}`}_getTemplatePath(e,n){return`/${se}/projects/${e}/templates/${n}`}}class Yt extends qt{constructor(e){super(v.AGENT_PLATFORM),this.location=Sr,e&&(this.location=e)}_getModelPath(e,n){return`/${se}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${se}/projects/${e}/locations/${this.location}/templates/${n}`}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lr(t){if(t instanceof ie)return`${V}/googleai`;if(t instanceof Yt)return`${V}/agentplatform/${t.location}`;throw new u(d.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function Mr(t){const e=t.split("/");if(e[0]!==V)throw new u(d.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"agentplatform":const s=e[2];if(!s)throw new u(d.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new Yt(s);case"googleai":return new ie;default:throw new u(d.ERROR,`Invalid instance identifier string: '${t}'`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E=new Le("@firebase/ai");var R;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(R||(R={}));/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt={type:"text",languages:["en"]},pe=[Jt,{type:"image"}],ge=[Jt];class A{constructor(e,n,s){this.languageModelProvider=e,this.mode=n,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:pe,expectedOutputs:ge}},s&&(this.onDeviceParams=s,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=pe),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=ge)):this.onDeviceParams.createOptions={expectedInputs:pe,expectedOutputs:ge})}async isAvailable(e){var s;if(!this.mode)return E.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===I.ONLY_IN_CLOUD)return E.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;const n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));if(this.mode===I.ONLY_ON_DEVICE){if(n===R.UNAVAILABLE)throw new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(n===R.DOWNLOADABLE||n===R.DOWNLOADING){E.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(r){throw new u(d.ERROR,r.message)}return!0}return!0}return n!==R.AVAILABLE?(E.debug(`On-device inference unavailable because availability is "${n}".`),!1):A.isOnDeviceRequest(e)?!0:(E.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(A.toLanguageModelMessage)),r=await n.prompt(s,this.onDeviceParams.promptOptions);return A.toResponse(r)}async generateContentStream(e){const n=await this.createSession(),s=await Promise.all(e.contents.map(A.toLanguageModelMessage)),r=n.promptStreaming(s,this.onDeviceParams.promptOptions);return A.toStreamResponse(r)}async countTokens(e){throw new u(d.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return E.debug("Empty prompt rejected for on-device inference."),!1;for(const n of e.contents){if(n.parts.some(s=>"functionResponse"in s))return E.debug("Content with a function response part rejected for on-device inference."),!1;for(const s of n.parts)if("inlineData"in s&&s.inlineData&&A.SUPPORTED_MIME_TYPES.indexOf(s.inlineData.mimeType)===-1)return E.debug(`Unsupported mime type "${s.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){var s;const n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));return(n===R.DOWNLOADABLE||n===R.DOWNLOADING)&&this.download(e),n}download(e){var s;if(this.downloadPromise)return;const n={...this.onDeviceParams.createOptions};n&&!n.monitor&&e&&(n.monitor=r=>{r.addEventListener("downloadprogress",o=>{e(o.loaded)})}),this.downloadPromise=(s=this.languageModelProvider)==null?void 0:s.create(n).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){const n=await Promise.all(e.parts.map(A.toLanguageModelMessageContent));return{role:A.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if("text"in e&&typeof e.text=="string")return{type:"text",value:e.text};if("inlineData"in e&&e.inlineData){const s=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(s)}}throw new u(d.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new u(d.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");const e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){const n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(s,r){const o=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:s}]}}]});r.enqueue(n.encode(`data: ${o}

`))}}))}}}A.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function $r(t,e,n){const r=(e||ke()).LanguageModel;if(r&&t)return new A(r,t,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e,n,s,r,o){this.app=e,this.backend=n,this.chromeAdapterFactory=o;const i=r==null?void 0:r.getImmediate({optional:!0}),a=s==null?void 0:s.getImmediate({optional:!0});this.auth=a||null,this.appCheck=i||null}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fr(t,{instanceIdentifier:e}){if(!e)throw new u(d.ERROR,"AIService instance identifier is undefined.");const n=Mr(e),s=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),o=t.getProvider("app-check-internal");return new xr(s,n,r,o,$r)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(t){var n,s,r,o,i,a,c;if((s=(n=t.app)==null?void 0:n.options)!=null&&s.apiKey)if((o=(r=t.app)==null?void 0:r.options)!=null&&o.projectId){if(!((a=(i=t.app)==null?void 0:i.options)!=null&&a.appId))throw new u(d.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new u(d.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new u(d.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');const e={apiKey:t.app.options.apiKey,project:t.app.options.projectId,appId:t.app.options.appId,automaticDataCollectionEnabled:t.app.automaticDataCollectionEnabled,backend:t.backend};if(Is(t.app)&&t.app.settings.appCheckToken){const l=t.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:l})}else t.appCheck&&((c=t.options)!=null&&c.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>t.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>t.appCheck.getToken());return t.auth&&(e.getAuthToken=()=>t.auth.getToken()),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e,n){this._apiSettings=Br(e),this.model=z.normalizeModelName(n,this._apiSettings.backend.backendType)}static normalizeModelName(e,n){return n===v.GOOGLE_AI?z.normalizeGoogleAIModelName(e):z.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur="Timeout has expired.",me="AbortError";class Hr{constructor(e){this.params=e}toString(){const e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){var e;return((e=this.params.singleRequestOptions)==null?void 0:e.baseUrl)??`https://${Dr}`}get queryParams(){const e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}}function Vr(t){const e=[];return e.push(`${vr}/${gt}`),e.push(`fire/${gt}`),(t.params.apiSettings.inferenceMode===I.PREFER_ON_DEVICE||t.params.apiSettings.inferenceMode===I.PREFER_IN_CLOUD)&&e.push(kr),e.join(" ")}async function Gr(t){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",Vr(t)),e.append("x-goog-api-key",t.params.apiSettings.apiKey),t.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.params.apiSettings.appId),t.params.apiSettings.getAppCheckToken){const n=await t.params.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&E.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.params.apiSettings.getAuthToken){const n=await t.params.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function Ve(t,e){var l,f;const n=new Hr(t);let s;const r=(l=t.singleRequestOptions)==null?void 0:l.signal,o=((f=t.singleRequestOptions)==null?void 0:f.timeout)!=null&&t.singleRequestOptions.timeout>=0?t.singleRequestOptions.timeout:Pr,i=new AbortController,a=setTimeout(()=>{i.abort(new DOMException(Ur,me)),E.debug(`Aborting request to ${n} due to timeout (${o}ms)`)},o),c=AbortSignal.any(r?[r,i.signal]:[i.signal]);if(r&&r.aborted)throw clearTimeout(a),new DOMException(r.reason??"Aborted externally before fetch",me);try{const h={method:"POST",headers:await Gr(n),signal:c,body:e};if(s=await fetch(n.toString(),h),!s.ok){let m="",p;try{const _=await s.json();m=_.error.message,_.error.details&&(m+=` ${JSON.stringify(_.error.details)}`,p=_.error.details)}catch{}throw s.status===403&&p&&p.some(_=>_.reason==="SERVICE_DISABLED")&&p.some(_=>{var Xe,Qe;return(Qe=(Xe=_.links)==null?void 0:Xe[0])==null?void 0:Qe.description.includes("Google developers console API activation")})?new u(d.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${n.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:s.status,statusText:s.statusText,errorDetails:p}):new u(d.FETCH_ERROR,`Error fetching from ${n}: [${s.status} ${s.statusText}] ${m}`,{status:s.status,statusText:s.statusText,errorDetails:p})}}catch(h){let m=h;throw h.code!==d.FETCH_ERROR&&h.code!==d.API_NOT_ENABLED&&h instanceof Error&&h.name!==me&&(m=new u(d.ERROR,`Error fetching from ${n.toString()}: ${h.message}`),m.stack=h.stack),m}finally{clearTimeout(a)}return s}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&E.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Qt(t.candidates[0]))throw new u(d.RESPONSE_ERROR,`Response error: ${M(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function O(t){return"type"in t&&t.type?t:t.text!==void 0?{...t,type:"text"}:t.inlineData!==void 0?{...t,type:"inlineData"}:t.functionCall!==void 0?{...t,type:"functionCall"}:t.functionResponse!==void 0?{...t,type:"functionResponse"}:t.fileData!==void 0?{...t,type:"fileData"}:t.executableCode!==void 0?{...t,type:"executableCode"}:t.codeExecutionResult!==void 0?{...t,type:"codeExecutionResult"}:t}function re(t,e=k.IN_CLOUD){var s,r;if((s=t.candidates)!=null&&s[0]&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0),t.candidates)for(const o of t.candidates)(r=o.content)!=null&&r.parts&&(o.content.parts=o.content.parts.map(O));const n=jr(t);return n.inferenceSource=e,n}function jr(t){return t.text=()=>{if(te(t))return Et(t,e=>!("thought"in e&&e.thought));if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Text not available. ${M(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(te(t)){const e=Et(t,n=>!!("thought"in n&&n.thought));return e===""?void 0:e}else if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Thought summary not available. ${M(t)}`,{response:t})},t.inlineDataParts=()=>{if(te(t))return Wr(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Data not available. ${M(t)}`,{response:t})},t.functionCalls=()=>{if(te(t))return Xt(t);if(t.promptFeedback)throw new u(d.RESPONSE_ERROR,`Function call not available. ${M(t)}`,{response:t})},t}function Et(t,e){var s,r,o,i;const n=[];if((r=(s=t.candidates)==null?void 0:s[0].content)!=null&&r.parts)for(const a of(i=(o=t.candidates)==null?void 0:o[0].content)==null?void 0:i.parts){const c=O(a);c.type==="text"&&e(c)&&n.push(c.text)}return n.length>0?n.join(""):""}function Xt(t){var n,s,r,o;if(!t)return;const e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(const i of(o=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:o.parts){const a=O(i);a.type==="functionCall"&&e.push(a.functionCall)}if(e.length>0)return e}function Wr(t){var n,s,r,o;const e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(const i of(o=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:o.parts){const a=O(i);a.type==="inlineData"&&e.push(a)}if(e.length>0)return e}const zr=[w.RECITATION,w.SAFETY,w.BLOCKLIST,w.PROHIBITED_CONTENT,w.SPII,w.MALFORMED_FUNCTION_CALL,w.IMAGE_SAFETY,w.IMAGE_PROHIBITED_CONTENT,w.IMAGE_OTHER,w.NO_IMAGE,w.IMAGE_RECITATION,w.LANGUAGE,w.UNEXPECTED_TOOL_CALL,w.TOO_MANY_TOOL_CALLS,w.MISSING_THOUGHT_SIGNATURE,w.MALFORMED_RESPONSE];function Qt(t){return!!t.finishReason&&zr.some(e=>e===t.finishReason)}function M(t){var n,s,r;let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",(n=t.promptFeedback)!=null&&n.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),(s=t.promptFeedback)!=null&&s.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if((r=t.candidates)!=null&&r[0]){const o=t.candidates[0];Qt(o)&&(e+=`Candidate was blocked due to ${o.finishReason}`,o.finishMessage&&(e+=`: ${o.finishMessage}`))}return e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{type:"text",text:t}]};if(t.type==="text"||"text"in t&&typeof t.text=="string")return{role:"system",parts:[$(O(t))]};if(t.parts){const e=t.parts.map(n=>$(O(n)));return t.role?{...t,parts:e}:{role:"system",parts:e}}}}function W(t){let e=[];if(typeof t=="string")e=[{type:"text",text:t}];else for(const n of t)typeof n=="string"?e.push({type:"text",text:n}):e.push($(O(n)));return Kr(e)}function Kr(t){const e={role:"user",parts:[]};let n=!1,s=!1;for(const r of t)r.type==="functionResponse"||"functionResponse"in r?s=!0:n=!0,e.parts.push(r);if(n&&s)throw new u(d.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!s)throw new u(d.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function Ee(t){let e;if(t.contents){const n=t;e={...n,contents:n.contents.map(s=>({...s,parts:s.parts?s.parts.map(O):[]}))}}else e={contents:[W(t)]};return t.systemInstruction&&(e.systemInstruction=Ge(t.systemInstruction)),e}function qr(t){return t.parts&&Array.isArray(t.parts)?{...t,parts:t.parts.map(je)}:t}function je(t){let e;if("type"in t){const{type:n,...s}=t;e=s}else e=t;return e.functionResponse&&(e={...e,functionResponse:qr(e.functionResponse)}),e}function We(t){return t.parts?{...t,parts:t.parts.map(je)}:t}function Zt(t){return t==null||typeof t=="string"?t:"parts"in t&&Array.isArray(t.parts)?We(t):je(t)}function en(t){const e={...t};return e.contents&&(e.contents=e.contents.map(We)),e.systemInstruction&&(e.systemInstruction=Zt(e.systemInstruction)),e}function Yr(t){const e={...t};return e.contents&&(e.contents=e.contents.map(We)),e.systemInstruction&&(e.systemInstruction=Zt(e.systemInstruction)),e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tn(t){var e,n;if((e=t.safetySettings)==null||e.forEach(s=>{if(s.method)throw new u(d.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),(n=t.generationConfig)!=null&&n.topK){const s=Math.round(t.generationConfig.topK);s!==t.generationConfig.topK&&(E.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=s)}return t}function ze(t){return{candidates:t.candidates?Xr(t.candidates):void 0,promptFeedback:t.promptFeedback?Qr(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function Jr(t,e){return{generateContentRequest:{model:e,...t}}}function Xr(t){const e=[];let n;return e&&t.forEach(s=>{var i,a;let r;if(s.citationMetadata&&(r={citations:s.citationMetadata.citationSources}),s.safetyRatings&&(n=s.safetyRatings.map(c=>({...c,severity:c.severity??Kt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:c.probabilityScore??0,severityScore:c.severityScore??0}))),(a=(i=s.content)==null?void 0:i.parts)!=null&&a.some(c=>"videoMetadata"in c&&c.videoMetadata))throw new u(d.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");const o={index:s.index,content:s.content,finishReason:s.finishReason,finishMessage:s.finishMessage,safetyRatings:n,citationMetadata:r,groundingMetadata:s.groundingMetadata,urlContextMetadata:s.urlContextMetadata};e.push(o)}),e}function Qr(t){const e=[];return(t.safetyRatings??[]).forEach(s=>{e.push({category:s.category,probability:s.probability,severity:s.severity??Kt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:s.probabilityScore??0,severityScore:s.severityScore??0,blocked:s.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bt=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function Zr(t,e,n){const s=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),r=so(s),[o,i]=r.tee(),{response:a,firstValue:c}=await eo(i,e,n);return{stream:no(o,e,n),response:a,firstValue:c}}async function eo(t,e,n){const[s,r]=t.tee(),o=s.getReader(),{value:i}=await o.read();return{firstValue:i,response:to(r,e,n)}}async function to(t,e,n){const s=[],r=t.getReader();for(;;){const{done:o,value:i}=await r.read();if(o){let a=ro(s);return e.backend.backendType===v.GOOGLE_AI&&(a=ze(a)),re(a,n)}s.push(i)}}async function*no(t,e,n){var r,o;const s=t.getReader();for(;;){const{value:i,done:a}=await s.read();if(a)break;let c;e.backend.backendType===v.GOOGLE_AI?c=re(ze(i),n):c=re(i,n);const l=(r=c.candidates)==null?void 0:r[0];!((o=l==null?void 0:l.content)!=null&&o.parts)&&!(l!=null&&l.finishReason)&&!(l!=null&&l.citationMetadata)&&!(l!=null&&l.urlContextMetadata)||(yield c)}}function so(t){const e=t.getReader();return new ReadableStream({start(s){let r="";return o();function o(){return e.read().then(({value:i,done:a})=>{if(a){if(r.trim()){s.error(new u(d.PARSE_FAILED,"Failed to parse stream"));return}s.close();return}r+=i;let c=r.match(bt),l;for(;c;){try{l=JSON.parse(c[1])}catch{s.error(new u(d.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}s.enqueue(l),r=r.substring(c[0].length),c=r.match(bt)}return o()})}}})}function ro(t){const e=t[t.length-1],n={promptFeedback:e==null?void 0:e.promptFeedback};for(const s of t)if(s.candidates)for(const r of s.candidates){const o=r.index||0;n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:r.index}),n.candidates[o].citationMetadata=r.citationMetadata,n.candidates[o].finishReason=r.finishReason,n.candidates[o].finishMessage=r.finishMessage,n.candidates[o].safetyRatings=r.safetyRatings,n.candidates[o].groundingMetadata=r.groundingMetadata;const i=r.urlContextMetadata;if(typeof i=="object"&&i!==null&&Object.keys(i).length>0&&(n.candidates[o].urlContextMetadata=i),r.content){if(!r.content.parts)continue;n.candidates[o].content||(n.candidates[o].content={role:r.content.role||"user",parts:[]});for(const a of r.content.parts){if("text"in a&&a.text==="")continue;if(Object.keys(a).length===0)throw new u(d.INVALID_CONTENT,"Part should have at least one property, but there are none. This is likely caused by a malformed response from the backend.");const c=O({...a});Object.keys(c).length>0&&n.candidates[o].content.parts.push(c)}}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oo=[d.FETCH_ERROR,d.ERROR,d.API_NOT_ENABLED];async function nn(t,e,n,s){if(!e)return{response:await s(),inferenceSource:k.IN_CLOUD};switch(e.mode){case I.ONLY_ON_DEVICE:if(await e.isAvailable(t))return{response:await n(),inferenceSource:k.ON_DEVICE};throw new u(d.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case I.ONLY_IN_CLOUD:return{response:await s(),inferenceSource:k.IN_CLOUD};case I.PREFER_IN_CLOUD:try{return{response:await s(),inferenceSource:k.IN_CLOUD}}catch(r){if(r instanceof u&&oo.includes(r.code)&&await e.isAvailable(t))return{response:await n(),inferenceSource:k.ON_DEVICE};throw r}case I.PREFER_ON_DEVICE:return await e.isAvailable(t)?{response:await n(),inferenceSource:k.ON_DEVICE}:{response:await s(),inferenceSource:k.IN_CLOUD};default:throw new u(d.ERROR,`Unexpected infererence mode: ${e.mode}`)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function io(t,e,n,s){return n=en(n),t.backend.backendType===v.GOOGLE_AI&&(n=tn(n)),Ve({task:"streamGenerateContent",model:e,apiSettings:t,stream:!0,singleRequestOptions:s},JSON.stringify(n))}async function sn(t,e,n,s,r){const o=await nn(n,s,()=>s.generateContentStream(n),()=>io(t,e,n,r));return Zr(o.response,t,o.inferenceSource)}async function ao(t,e,n,s){return n=en(n),t.backend.backendType===v.GOOGLE_AI&&(n=tn(n)),Ve({model:e,task:"generateContent",apiSettings:t,stream:!1,singleRequestOptions:s},JSON.stringify(n))}async function rn(t,e,n,s,r){const o=await nn(n,s,()=>s.generateContent(n),()=>ao(t,e,n,r)),i=await co(o.response,t);return{response:re(i,o.inferenceSource)}}async function co(t,e){const n=await t.json();return e.backend.backendType===v.GOOGLE_AI?ze(n):n}/**
 * @license
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t="SILENT_ERROR",yt=10;class lo{constructor(e,n,s){this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,$(this._history).map(e=>({...e,parts:e.parts?e.parts.map(O):[]}))}async _sendMessage(e,n){let s={};await this._sendPromise;const r=[];return this._sendPromise=this._sendPromise.then(async()=>{var c,l,f;let o,i=0;const a=((c=this.requestOptions)==null?void 0:c.maxSequentialFunctionCalls)??yt;do{let h;if(o){i++;const _=await this._callFunctionsAsNeeded(o);h=W(_)}else h=W(e);const m=this._formatRequest(h,[...r]);r.push(h);const p=await this._callGenerateContent(m,n);if(p)if(s=p,o=this._getCallableFunctionCalls(p.response),p.response.candidates&&p.response.candidates.length>0){const _={parts:((l=p.response.candidates)==null?void 0:l[0].content.parts)||[],role:((f=p.response.candidates)==null?void 0:f[0].content.role)||"model"};r.push($(_))}else{const _=M(p.response);_&&E.warn(`sendMessage() was unsuccessful. ${_}. Inspect response object for details.`)}else o=void 0}while(o&&i<a);o&&i>=a&&E.warn(`Automatic function calling exceeded the limit of ${a} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(r),s}async _sendMessageStream(e,n){await this._sendPromise;const s=[],o=(async()=>{var f;let i,a=0;const c=((f=this.requestOptions)==null?void 0:f.maxSequentialFunctionCalls)??yt;let l;do{let h;if(i){a++;const p=await this._callFunctionsAsNeeded(i);h=W(p)}else h=W(e);const m=this._formatRequest(h,[...s]);if(s.push(h),l=await this._callGenerateContentStream(m,n),i=this._getCallableFunctionCalls(l.firstValue),i&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){const p={...l.firstValue.candidates[0].content};p.role||(p.role="model"),s.push(p)}}while(i&&a<c);return i&&a>=c&&E.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>o).catch(i=>{throw new Error(_t)}).then(i=>i.response).then(i=>{if(i.candidates&&i.candidates.length>0){this._history=this._history.concat(s);const a={...i.candidates[0].content};a.role||(a.role="model"),this._history.push($(a))}else{const a=M(i);a&&E.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)}}).catch(i=>{i.message!==_t&&i.name!=="AbortError"&&E.error(i)}),o}_getCallableFunctionCalls(e){var r,o,i;const n=(o=(r=this.params)==null?void 0:r.tools)==null?void 0:o.find(a=>a.functionDeclarations);if(!(n!=null&&n.functionDeclarations))return;const s=Xt(e);if(s){for(const a of s)if(!((i=n.functionDeclarations)==null?void 0:i.some(l=>l.name===a.name&&typeof l.functionReference=="function")))return;return s}}async _callFunctionsAsNeeded(e){var o,i;const n=[],s=[],r=(i=(o=this.params)==null?void 0:o.tools)==null?void 0:i.find(a=>a.functionDeclarations);if(r&&r.functionDeclarations){for(const c of e){const l=r.functionDeclarations.find(f=>f.name===c.name);if(l!=null&&l.functionReference){const f=Promise.resolve(l.functionReference(c.args)).catch(h=>{const m=new u(d.ERROR,`Error in user-defined function "${l.name}": ${h.message}`);throw m.stack=h.stack,m});n.push({name:c.name,id:c.id,results:f}),s.push(f)}}await Promise.all(s);const a=[];for(const{name:c,id:l,results:f}of n){const h={name:c,response:await f};l&&(h.id=l),a.push({type:"functionResponse",functionResponse:h})}return a}else throw new u(d.REQUEST_ERROR,'No function declarations were provided in "tools".')}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],ho={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},wt={user:["model"],function:["model"],model:["user","function"],system:[]};function fo(t){let e=null;for(const n of t){const{role:s,parts:r}=n;if(!e&&s!=="user")throw new u(d.INVALID_CONTENT,`First Content should be with role 'user', got ${s}`);if(!mt.includes(s))throw new u(d.INVALID_CONTENT,`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(mt)}`);if(!Array.isArray(r))throw new u(d.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(r.length===0)throw new u(d.INVALID_CONTENT,"Each Content should have at least one part");const o={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const a of r){if(a.type)o[a.type]+=1;else for(const c of["text","inlineData","functionCall","functionResponse","fileData","executableCode","codeExecutionResult"])c in a&&(o[c]+=1);"thought"in a&&a.thought&&(o.thought+=1),"thoughtSignature"in a&&a.thoughtSignature&&(o.thoughtSignature+=1)}const i=ho[s];for(const a of uo)if(!i.includes(a)&&o[a]>0)throw new u(d.INVALID_CONTENT,`Content with role '${s}' can't contain '${a}' part`);if(e&&!wt[s].includes(e.role))throw new u(d.INVALID_CONTENT,`Content with role '${s}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(wt)}`);e=n}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po extends lo{constructor(e,n,s,r,o){var i;super(e,r,o),this.model=n,this.chromeAdapter=s,this.params=r,this.requestOptions=o,r!=null&&r.history&&(fo(r.history),this._history=$(r.history)),((i=this.params)==null?void 0:i.systemInstruction)!=null&&(this.params={...this.params,systemInstruction:Ge(this.params.systemInstruction)})}_formatRequest(e,n){var s,r,o,i,a;return{safetySettings:(s=this.params)==null?void 0:s.safetySettings,generationConfig:(r=this.params)==null?void 0:r.generationConfig,tools:(o=this.params)==null?void 0:o.tools,toolConfig:(i=this.params)==null?void 0:i.toolConfig,systemInstruction:(a=this.params)==null?void 0:a.systemInstruction,contents:[...this._history,...n,e]}}_callGenerateContent(e,n){return rn(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}_callGenerateContentStream(e,n){return sn(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}async sendMessage(e,n){return this._sendMessage(e,n)}async sendMessageStream(e,n){return this._sendMessageStream(e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function go(t,e,n,s){n=Yr(n);let r="";if(t.backend.backendType===v.GOOGLE_AI){const i=Jr(n,e);r=JSON.stringify(i)}else r=JSON.stringify(n);return(await Ve({model:e,task:"countTokens",apiSettings:t,stream:!1,singleRequestOptions:s},r)).json()}async function mo(t,e,n,s,r){if((s==null?void 0:s.mode)===I.ONLY_ON_DEVICE)throw new u(d.UNSUPPORTED,"countTokens() is not supported for on-device models.");return go(t,e,n,r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo extends z{constructor(e,n,s,r){super(e,n.model),this.chromeAdapter=r,this.generationConfig=n.generationConfig||{},bo(this.generationConfig),this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=Ge(n.systemInstruction),this.requestOptions=s||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===I.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===R.UNAVAILABLE){const s=new u(d.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===I.ONLY_ON_DEVICE)throw s;E.debug(s.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,n){const s=Ee(e);return rn(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n})}async generateContentStream(e,n){const s=Ee(e),{stream:r,response:o}=await sn(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n});return{stream:r,response:o}}startChat(e){return new po(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,n){const s=Ee(e);return mo(this._apiSettings,this.model,s,this.chromeAdapter,{...this.requestOptions,...n})}}function bo(t){var e,n;if(((e=t.thinkingConfig)==null?void 0:e.thinkingBudget)!=null&&((n=t.thinkingConfig)!=null&&n.thinkingLevel))throw new u(d.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(t.responseSchema!=null&&t.responseJsonSchema!=null)throw new u(d.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((t.responseSchema!=null||t.responseJsonSchema!=null)&&t.responseMimeType!=="application/json"&&t.responseMimeType!=="text/x.enum")throw new u(d.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _o(t=vt(),e){t=Ot(t);const n=$e(t,V),s=(e==null?void 0:e.backend)??new ie,r=Lr(s),o=n.getImmediate({identifier:r}),i=o.options;if(i){const a=e==null?void 0:e.useLimitedUseAppCheckTokens,c=!!i.useLimitedUseAppCheckTokens;if(a!=null&&!!a!==c)throw new u(d.ALREADY_INITIALIZED,`getAI() has already been called for app "${t.name}" and this backend with useLimitedUseAppCheckTokens: ${c}. This option cannot be changed after the AI instance has been initialized. Pass the desired options to the first getAI() call for this app and backend, or omit useLimitedUseAppCheckTokens to reuse the existing instance.`);return o}return o.options={useLimitedUseAppCheckTokens:(e==null?void 0:e.useLimitedUseAppCheckTokens)??!1},o}const yo=["mode","onDeviceParams","inCloudParams"];function wo(t,e,n){var a;const s=e;let r;if(s.mode){for(const c of Object.keys(e))yo.includes(c)||E.warn(`When a hybrid inference mode is specified (mode is currently set to ${s.mode}), "${c}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);r=s.inCloudParams||{model:Nr}}else r=e;if(!r.model)throw new u(d.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");const o=(a=t.chromeAdapterFactory)==null?void 0:a.call(t,s.mode,typeof window>"u"?void 0:window,s.onDeviceParams),i=new Eo(t,r,n,o);return i._apiSettings.inferenceMode=s.mode,i}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Io(){H(new F(V,Fr,"PUBLIC").setMultipleInstances(!0)),x(pt,De),x(pt,De,"esm2020")}Io();const To="gemini-3.5-flash-lite",S={ON_DEVICE:"ON_DEVICE",IN_CLOUD:"IN_CLOUD",UNKNOWN:"UNKNOWN"};class on extends Error{constructor(e){super("On-device model is not available on this device/browser, and this feature refuses to send your data to the cloud."),this.name="OnDeviceUnavailableError",this.code="ON_DEVICE_UNAVAILABLE",this.cause=e}}let K=null;const be=new Map;function Ao(t){return K||(K=_o(t,{backend:new ie})),K}function ae(t){if(!K)throw new Error("AI service not initialized. Call initAI() first.");if(!be.has(t)){const e={mode:t};t!==I.ONLY_ON_DEVICE&&(e.inCloudParams={model:To}),be.set(t,wo(K,e))}return be.get(t)}async function Co(){const t=self.LanguageModel;if(!t||typeof t.availability!="function")return"unsupported";try{return await t.availability()}catch{return"unavailable"}}async function Oo(t){await ae(I.PREFER_ON_DEVICE).initializeDeviceModel(n=>{typeof t=="function"&&t(n)})}function Ro(t){if(!t)return S.UNKNOWN;const e=String(t).toUpperCase();return e.includes("DEVICE")?S.ON_DEVICE:e.includes("CLOUD")?S.IN_CLOUD:S.UNKNOWN}async function Ke(t,e){const s=(await t.generateContent(e)).response;return{text:s.text(),inferenceSource:Ro(s.inferenceSource)}}async function So(t){const e=ae(I.ONLY_ON_DEVICE),n=["You are WarungAI, an assistant for Indonesian micro-shops (warung / UMKM).","Turn the shop owner's messy daily sales notes into a clean, structured summary.","","Rules:","- Reply in the same language as the notes (Indonesian or English).","- List one line per item: Item | Qty | Unit price | Amount.","- Compute each line amount when quantity and price are present, and end with a TOTAL line (use Rp if the notes use Rupiah).",'- If a quantity or price is missing or unclear, write "?" for it and add a short "needs checking" note. Never guess or invent items, quantities, or prices.',"- Keep the output compact, with a one-line closing remark about the day.","","Sales notes:",'"""',t,'"""'].join(`
`);try{return await e.initializeDeviceModel(()=>{}),await Ke(e,n)}catch(s){throw new on(s)}}async function Do({product:t,customerMessage:e,details:n}){const s=ae(I.PREFER_ON_DEVICE),r=["You are WarungAI, an assistant for Indonesian micro-shops (warung / UMKM).","Produce TWO things for the shop owner:","",'1. A "WhatsApp reply" draft the owner can copy-paste to the customer: warm, polite, concise, in the language of the customer message (Indonesian or English).','2. A "Product description": 2-3 attractive sentences for the product, suitable for a marketplace or WhatsApp catalogue, in the same language.',"",`Product: ${t||"(not specified)"}`,`Customer message / situation: ${e||"(general enquiry)"}`,`Extra details from the owner: ${n||"(none)"}`,"","Format the answer with exactly these two headings:","WhatsApp reply:","Product description:"].join(`
`);return await s.initializeDeviceModel(()=>{}),Ke(s,r)}async function vo({product:t,audience:e,occasion:n}){const s=ae(I.PREFER_IN_CLOUD),r=["You are WarungAI, a creative marketing assistant for Indonesian micro-shops (warung / UMKM) with very small budgets.","",`Product / shop: ${t||"(a small neighbourhood warung)"}`,`Target customers: ${e||"local neighbourhood customers"}`,`Occasion / moment: ${n||"a normal week (no special event)"}`,"","Produce, in English with Indonesian content where asked:","1. Three promo ideas — each with a catchy name and a one-line mechanic that a tiny shop can actually afford to run.","2. Two ready-to-post social media captions for the same promo: one in Bahasa Indonesia and one in English (a translation pair).","3. One short WhatsApp broadcast message in Bahasa Indonesia.","Only use concrete discounts or prices if they were provided above; otherwise use placeholders like [10%]."].join(`
`);return Ke(s,r)}const y=t=>document.getElementById(t),ko=Rr();Ao(ko);const Po=y("firebase-status");Po.textContent=Or?"Connected — project config loaded":"Placeholder config — add your Firebase project values to run live cloud requests (see README)";const No={available:"Available — Gemini Nano is ready on this device",downloadable:"Downloadable — use the button below to fetch it (one-time)",downloading:"Downloading — please wait…",unavailable:"Unavailable on this device",unsupported:"Not supported in this browser — needs Chrome desktop 139+ (Prompt API)"};async function an(){const t=await Co();return y("device-status").textContent=No[t]??`Unknown (${t})`,t}an();y("prepare-device-btn").addEventListener("click",async t=>{const e=t.currentTarget,n=y("prepare-progress");e.disabled=!0,n.hidden=!1,n.textContent="Preparing on-device model…";try{await Oo(s=>{n.textContent=`Downloading on-device model: ${Math.round(s*100)}%`}),n.textContent="On-device model is ready."}catch(s){n.textContent="Could not prepare the on-device model here. Hybrid features will use the cloud instead. Details: "+((s==null?void 0:s.message)??s)}finally{e.disabled=!1,an()}});function qe(t,e){switch(t){case"sales":return e===S.ON_DEVICE?{cls:"badge-device",label:"🟢 Ran on-device — nothing left this device"}:{cls:"badge-unknown",label:`Source: ${e}`};case"reply":return e===S.ON_DEVICE?{cls:"badge-device",label:"🟢 On-device"}:e===S.IN_CLOUD?{cls:"badge-fallback",label:"🟠 Fallback — answered by the cloud"}:{cls:"badge-unknown",label:`Source: ${e}`};case"promo":return e===S.IN_CLOUD?{cls:"badge-cloud",label:"🔵 Cloud"}:e===S.ON_DEVICE?{cls:"badge-device",label:"🟢 On-device (offline fallback)"}:{cls:"badge-unknown",label:`Source: ${e}`};default:return{cls:"badge-unknown",label:`Source: ${e}`}}}function Ye(t,e,n){t.hidden=!1,t.classList.remove("error"),t.innerHTML="";const s=document.createElement("span");s.className=`badge ${e.cls}`,s.textContent=e.label;const r=document.createElement("pre");r.textContent=n,t.append(s,r)}function q(t,e){t.hidden=!1,t.classList.add("error"),t.textContent=e}async function Je(t,e,n){const s=t.textContent;t.disabled=!0,t.textContent="Working…",e.hidden=!0;try{await n()}finally{t.disabled=!1,t.textContent=s}}y("sales-btn").addEventListener("click",t=>{const e=t.currentTarget,n=y("sales-result");Je(e,n,async()=>{var r;const s=y("sales-input").value.trim();if(!s){q(n,"Please paste some sales notes first.");return}try{const{text:o,inferenceSource:i}=await So(s);Ye(n,qe("sales",i),o)}catch(o){o instanceof on?q(n,`🔒 Blocked on purpose. The on-device model is not available in this browser right now, and Private Sales Notes never sends your numbers to the cloud — that is the whole point of this feature. Open this page in Chrome desktop 139+, prepare the on-device model with the button at the top, and try again. The other two features are allowed to use the cloud.

Technical detail: `+(((r=o.cause)==null?void 0:r.message)??o.message)):q(n,"Something went wrong: "+((o==null?void 0:o.message)??o))}})});y("reply-btn").addEventListener("click",t=>{const e=t.currentTarget,n=y("reply-result");Je(e,n,async()=>{try{const{text:s,inferenceSource:r}=await Do({product:y("reply-product").value.trim(),customerMessage:y("reply-message").value.trim(),details:y("reply-details").value.trim()});Ye(n,qe("reply",r),s)}catch(s){q(n,`Could not draft that just now (on-device and cloud both failed). Check the Firebase configuration and your connection.

Technical detail: `+((s==null?void 0:s.message)??s))}})});y("promo-btn").addEventListener("click",t=>{const e=t.currentTarget,n=y("promo-result");Je(e,n,async()=>{try{const{text:s,inferenceSource:r}=await vo({product:y("promo-product").value.trim(),audience:y("promo-audience").value.trim(),occasion:y("promo-occasion").value.trim()});Ye(n,qe("promo",r),s)}catch(s){q(n,`Could not generate promo ideas just now. Check the Firebase configuration and your connection.

Technical detail: `+((s==null?void 0:s.message)??s))}})});
