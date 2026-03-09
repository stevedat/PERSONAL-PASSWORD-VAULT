var gn=Object.defineProperty;var yn=(a,r,e)=>r in a?gn(a,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[r]=e;var Ge=(a,r,e)=>yn(a,typeof r!="symbol"?r+"":r,e);import{b as mn,a as L,d as bn,c as he,f as X,t as fr}from"./77rr9voM.js";import{i as $t}from"./CcXAMrm0.js";import{ai as da,h as Fe,a as J0,b as u,ak as _n,au as Bn,al as rs,a4 as Ot,am as Dt,a1 as Lt,aO as ci,aV as En,aG as as,af as Qt,Y as dr,aX as bt,ae as vr,aY as wn,ah as Cn,r as An,aZ as ua,aU as va,a_ as kn,a$ as Dn,m as te,v as ss,b0 as Fn,D as Sn,aa as fi,ad as di,ab as U0,b1 as $n,aS as Pn,ag as Tn,ac as o0,aP as ea,Z as xa,b2 as ui,aq as vi,b3 as Mn,b4 as zn,aj as Rn,X as Nn,b5 as In,i as Hn,t as xi,b6 as Ln,aJ as On,b7 as pi,ao as pa,b8 as Un,b9 as Wn,ba as Vn,bb as mr,bc as qn,bd as jn,be as Kn,bf as Gn,bg as Yn,bh as Xn,bi as Zn,bj as Qn,bk as Jn,a7 as hi,u as pe,ap as eo,bl as to,K as _t,O as Bt,T as S,I as Ie,Q as _,M as oe,R as b,a9 as gi,bm as ro,U as br,c as P,aH as ye,N as Ae,V as Ft,W as tr,bn as ao,bo as pt,bp as so,w as io,bq as no,br as oo}from"./D2ZqyTCt.js";import{i as lo,a as co,d as fo,b as uo,c as vo,n as xo,e as po,s as q,f as Q}from"./cXiGhmoZ.js";import{B as ho,i as ae,c as qt,_ as d0,b as go}from"./D9rXnPce.js";import{l as _e,p as rt,b as we,a as gt,s as yi}from"./CVN8ntQu.js";import{s as Be,b as l0,v as yt,i as ta,a as is,c as At,e as c0,f as ra,g as ns,h as os,j as yo,k as mo,l as bo,d as ls,m as cs,n as ht,r as fs,o as _o}from"./BBU9XKCy.js";function u0(a,r){return r}function Bo(a,r,e){for(var t=[],s=r.length,i,c=r.length,o=0;o<s;o++){let g=r[o];di(g,()=>{if(i){if(i.pending.delete(g),i.done.add(g),i.pending.size===0){var f=a.outrogroups;aa(a,va(i.done)),f.delete(i),f.size===0&&(a.outrogroups=null)}}else c-=1},!1)}if(c===0){var d=t.length===0&&e!==null;if(d){var n=e,l=n.parentNode;Pn(l),l.append(n),a.items.clear()}aa(a,r,!d)}else i={pending:new Set(r),done:new Set},(a.outrogroups??(a.outrogroups=new Set)).add(i)}function aa(a,r,e=!0){var t;if(a.pending.size>0){t=new Set;for(const c of a.pending.values())for(const o of c)t.add(a.items.get(o).e)}for(var s=0;s<r.length;s++){var i=r[s];if(t!=null&&t.has(i)){i.f|=bt;const c=document.createDocumentFragment();Tn(i,c)}else o0(r[s],e)}}var ds;function xr(a,r,e,t,s,i=null){var c=a,o=new Map,d=(r&ui)!==0;if(d){var n=a;c=Fe?Ot(xa(n)):n.appendChild(dr())}Fe&&J0();var l=null,g=An(()=>{var h=e();return ua(h)?h:h==null?[]:va(h)}),f,x=new Map,y=!0;function B(h){(p.effect.f&Sn)===0&&(p.pending.delete(h),p.fallback=l,Eo(p,f,c,r,t),l!==null&&(f.length===0?(l.f&bt)===0?fi(l):(l.f^=bt,lr(l,null,c)):di(l,()=>{l=null})))}function v(h){p.pending.delete(h)}var w=da(()=>{f=u(g);var h=f.length;let m=!1;if(Fe){var D=_n(c)===Bn;D!==(h===0)&&(c=rs(),Ot(c),Dt(!1),m=!0)}for(var E=new Set,C=Qt,k=Cn(),N=0;N<h;N+=1){Fe&&Lt.nodeType===ci&&Lt.data===En&&(c=Lt,m=!0,Dt(!1));var A=f[N],F=t(A,N),T=y?null:o.get(F);T?(T.v&&as(T.v,A),T.i&&as(T.i,N),k&&C.unskip_effect(T.e)):(T=wo(o,y?c:ds??(ds=dr()),A,F,N,s,r,e),y||(T.e.f|=bt),o.set(F,T)),E.add(F)}if(h===0&&i&&!l&&(y?l=vr(()=>i(c)):(l=vr(()=>i(ds??(ds=dr()))),l.f|=bt)),h>E.size&&wn(),Fe&&h>0&&Ot(rs()),!y)if(x.set(C,E),k){for(const[I,V]of o)E.has(I)||C.skip_effect(V.e);C.oncommit(B),C.ondiscard(v)}else B(C);m&&Dt(!0),u(g)}),p={effect:w,items:o,pending:x,outrogroups:null,fallback:l};y=!1,Fe&&(c=Lt)}function ir(a){for(;a!==null&&(a.f&$n)===0;)a=a.next;return a}function Eo(a,r,e,t,s){var A,F,T,I,V,K,Y,se,ee;var i=(t&Mn)!==0,c=r.length,o=a.items,d=ir(a.effect.first),n,l=null,g,f=[],x=[],y,B,v,w;if(i)for(w=0;w<c;w+=1)y=r[w],B=s(y,w),v=o.get(B).e,(v.f&bt)===0&&((F=(A=v.nodes)==null?void 0:A.a)==null||F.measure(),(g??(g=new Set)).add(v));for(w=0;w<c;w+=1){if(y=r[w],B=s(y,w),v=o.get(B).e,a.outrogroups!==null)for(const J of a.outrogroups)J.pending.delete(v),J.done.delete(v);if((v.f&bt)!==0)if(v.f^=bt,v===d)lr(v,null,e);else{var p=l?l.next:d;v===a.effect.last&&(a.effect.last=v.prev),v.prev&&(v.prev.next=v.next),v.next&&(v.next.prev=v.prev),Nt(a,l,v),Nt(a,v,p),lr(v,p,e),l=v,f=[],x=[],d=ir(l.next);continue}if((v.f&U0)!==0&&(fi(v),i&&((I=(T=v.nodes)==null?void 0:T.a)==null||I.unfix(),(g??(g=new Set)).delete(v))),v!==d){if(n!==void 0&&n.has(v)){if(f.length<x.length){var h=x[0],m;l=h.prev;var D=f[0],E=f[f.length-1];for(m=0;m<f.length;m+=1)lr(f[m],h,e);for(m=0;m<x.length;m+=1)n.delete(x[m]);Nt(a,D.prev,E.next),Nt(a,l,D),Nt(a,E,h),d=h,l=E,w-=1,f=[],x=[]}else n.delete(v),lr(v,d,e),Nt(a,v.prev,v.next),Nt(a,v,l===null?a.effect.first:l.next),Nt(a,l,v),l=v;continue}for(f=[],x=[];d!==null&&d!==v;)(n??(n=new Set)).add(d),x.push(d),d=ir(d.next);if(d===null)continue}(v.f&bt)===0&&f.push(v),l=v,d=ir(v.next)}if(a.outrogroups!==null){for(const J of a.outrogroups)J.pending.size===0&&(aa(a,va(J.done)),(V=a.outrogroups)==null||V.delete(J));a.outrogroups.size===0&&(a.outrogroups=null)}if(d!==null||n!==void 0){var C=[];if(n!==void 0)for(v of n)(v.f&U0)===0&&C.push(v);for(;d!==null;)(d.f&U0)===0&&d!==a.fallback&&C.push(d),d=ir(d.next);var k=C.length;if(k>0){var N=(t&ui)!==0&&c===0?e:null;if(i){for(w=0;w<k;w+=1)(Y=(K=C[w].nodes)==null?void 0:K.a)==null||Y.measure();for(w=0;w<k;w+=1)(ee=(se=C[w].nodes)==null?void 0:se.a)==null||ee.fix()}Bo(a,C,N)}}i&&vi(()=>{var J,j;if(g!==void 0)for(v of g)(j=(J=v.nodes)==null?void 0:J.a)==null||j.apply()})}function wo(a,r,e,t,s,i,c,o){var d=(c&kn)!==0?(c&Dn)===0?te(e,!1,!1):ss(e):null,n=(c&Fn)!==0?ss(s):null;return{v:d,i:n,e:vr(()=>(i(r,d??e,n??s,o),()=>{a.delete(t)}))}}function lr(a,r,e){if(a.nodes)for(var t=a.nodes.start,s=a.nodes.end,i=r&&(r.f&bt)===0?r.nodes.start:e;t!==null;){var c=ea(t);if(i.before(t),t===s)return;t=c}}function Nt(a,r,e){r===null?a.effect.first=e:r.next=e,e===null?a.effect.last=r:e.prev=r}function Co(a,r,e,t,s,i){let c=Fe;Fe&&J0();var o=null;Fe&&Lt.nodeType===zn&&(o=Lt,J0());var d=Fe?Lt:a,n=new ho(d,!1);da(()=>{const l=r()||null;var g=In;if(l===null){n.ensure(null,null);return}return n.ensure(l,f=>{if(l){if(o=Fe?o:Nn(l,g),mn(o,o),t){Fe&&lo(l)&&o.append(document.createComment(""));var x=Fe?xa(o):o.appendChild(dr());Fe&&(x===null?Dt(!1):Ot(x)),t(o,x)}Hn.nodes.end=o,f.before(o)}Fe&&Ot(f)}),()=>{}},Rn),xi(()=>{}),c&&(Dt(!0),Ot(d))}function Ao(a,r){let e=null,t=Fe;var s;if(Fe){e=Lt;for(var i=xa(document.head);i!==null&&(i.nodeType!==ci||i.data!==a);)i=ea(i);if(i===null)Dt(!1);else{var c=ea(i);i.remove(),Ot(c)}}Fe||(s=document.head.appendChild(dr()));try{da(()=>r(s),Ln|On)}finally{t&&(Dt(!0),Ot(e))}}function ko(a,r){var e=void 0,t;pi(()=>{e!==(e=r())&&(t&&(o0(t),t=null),e&&(t=vr(()=>{pa(()=>e(a))})))})}function mi(a){var r,e,t="";if(typeof a=="string"||typeof a=="number")t+=a;else if(typeof a=="object")if(Array.isArray(a)){var s=a.length;for(r=0;r<s;r++)a[r]&&(e=mi(a[r]))&&(t&&(t+=" "),t+=e)}else for(e in a)a[e]&&(t&&(t+=" "),t+=e);return t}function Do(){for(var a,r,e=0,t="",s=arguments.length;e<s;e++)(a=arguments[e])&&(r=mi(a))&&(t&&(t+=" "),t+=r);return t}function Fo(a){return typeof a=="object"?Do(a):a??""}const us=[...` 	
\r\f \v\uFEFF`];function So(a,r,e){var t=a==null?"":""+a;if(r&&(t=t?t+" "+r:r),e){for(var s of Object.keys(e))if(e[s])t=t?t+" "+s:s;else if(t.length)for(var i=s.length,c=0;(c=t.indexOf(s,c))>=0;){var o=c+i;(c===0||us.includes(t[c-1]))&&(o===t.length||us.includes(t[o]))?t=(c===0?"":t.substring(0,c))+t.substring(o+1):c=o}}return t===""?null:t}function vs(a,r=!1){var e=r?" !important;":";",t="";for(var s of Object.keys(a)){var i=a[s];i!=null&&i!==""&&(t+=" "+s+": "+i+e)}return t}function W0(a){return a[0]!=="-"||a[1]!=="-"?a.toLowerCase():a}function $o(a,r){if(r){var e="",t,s;if(Array.isArray(r)?(t=r[0],s=r[1]):t=r,a){a=String(a).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var i=!1,c=0,o=!1,d=[];t&&d.push(...Object.keys(t).map(W0)),s&&d.push(...Object.keys(s).map(W0));var n=0,l=-1;const B=a.length;for(var g=0;g<B;g++){var f=a[g];if(o?f==="/"&&a[g-1]==="*"&&(o=!1):i?i===f&&(i=!1):f==="/"&&a[g+1]==="*"?o=!0:f==='"'||f==="'"?i=f:f==="("?c++:f===")"&&c--,!o&&i===!1&&c===0){if(f===":"&&l===-1)l=g;else if(f===";"||g===B-1){if(l!==-1){var x=W0(a.substring(n,l).trim());if(!d.includes(x)){f!==";"&&g++;var y=a.substring(n,g).trim();e+=" "+y+";"}}n=g+1,l=-1}}}}return t&&(e+=vs(t)),s&&(e+=vs(s,!0)),e=e.trim(),e===""?null:e}return a==null?null:String(a)}function pr(a,r,e,t,s,i){var c=a.__className;if(Fe||c!==e||c===void 0){var o=So(e,t,i);(!Fe||o!==a.getAttribute("class"))&&(o==null?a.removeAttribute("class"):r?a.className=o:a.setAttribute("class",o)),a.__className=e}else if(i&&s!==i)for(var d in i){var n=!!i[d];(s==null||n!==!!s[d])&&a.classList.toggle(d,n)}return i}function V0(a,r={},e,t){for(var s in e){var i=e[s];r[s]!==i&&(e[s]==null?a.style.removeProperty(s):a.style.setProperty(s,i,t))}}function sa(a,r,e,t){var s=a.__style;if(Fe||s!==r){var i=$o(r,t);(!Fe||i!==a.getAttribute("style"))&&(i==null?a.removeAttribute("style"):a.style.cssText=i),a.__style=r}else t&&(Array.isArray(t)?(V0(a,e==null?void 0:e[0],t[0]),V0(a,e==null?void 0:e[1],t[1],"important")):V0(a,e,t));return t}function ia(a,r,e=!1){if(a.multiple){if(r==null)return;if(!ua(r))return Un();for(var t of a.options)t.selected=r.includes(xs(t));return}for(t of a.options){var s=xs(t);if(Wn(s,r)){t.selected=!0;return}}(!e||r!==void 0)&&(a.selectedIndex=-1)}function Po(a){var r=new MutationObserver(()=>{ia(a,a.__value)});r.observe(a,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),xi(()=>{r.disconnect()})}function xs(a){return"__value"in a?a.__value:a.value}const nr=Symbol("class"),or=Symbol("style"),bi=Symbol("is custom element"),_i=Symbol("is html"),To=mr?"link":"LINK",Mo=mr?"input":"INPUT",zo=mr?"option":"OPTION",Ro=mr?"select":"SELECT",No=mr?"progress":"PROGRESS";function kt(a){if(Fe){var r=!1,e=()=>{if(!r){if(r=!0,a.hasAttribute("value")){var t=a.value;Ue(a,"value",null),a.value=t}if(a.hasAttribute("checked")){var s=a.checked;Ue(a,"checked",null),a.checked=s}}};a.__on_r=e,vi(e),Gn()}}function Io(a,r){var e=ha(a);e.value===(e.value=r??void 0)||a.value===r&&(r!==0||a.nodeName!==No)||(a.value=r??"")}function Ho(a,r){r?a.hasAttribute("selected")||a.setAttribute("selected",""):a.removeAttribute("selected")}function Ue(a,r,e,t){var s=ha(a);Fe&&(s[r]=a.getAttribute(r),r==="src"||r==="srcset"||r==="href"&&a.nodeName===To)||s[r]!==(s[r]=e)&&(r==="loading"&&(a[Zn]=e),e==null?a.removeAttribute(r):typeof e!="string"&&Bi(a).includes(r)?a[r]=e:a.setAttribute(r,e))}function Lo(a,r,e,t,s=!1,i=!1){if(Fe&&s&&a.nodeName===Mo){var c=a,o=c.type==="checkbox"?"defaultChecked":"defaultValue";o in e||kt(c)}var d=ha(a),n=d[bi],l=!d[_i];let g=Fe&&n;g&&Dt(!1);var f=r||{},x=a.nodeName===zo;for(var y in r)y in e||(e[y]=null);e.class?e.class=Fo(e.class):e[nr]&&(e.class=null),e[or]&&(e.style??(e.style=null));var B=Bi(a);for(const E in e){let C=e[E];if(x&&E==="value"&&C==null){a.value=a.__value="",f[E]=C;continue}if(E==="class"){var v=a.namespaceURI==="http://www.w3.org/1999/xhtml";pr(a,v,C,t,r==null?void 0:r[nr],e[nr]),f[E]=C,f[nr]=e[nr];continue}if(E==="style"){sa(a,C,r==null?void 0:r[or],e[or]),f[E]=C,f[or]=e[or];continue}var w=f[E];if(!(C===w&&!(C===void 0&&a.hasAttribute(E)))){f[E]=C;var p=E[0]+E[1];if(p!=="$$")if(p==="on"){const k={},N="$$"+E;let A=E.slice(2);var h=po(A);if(co(A)&&(A=A.slice(0,-7),k.capture=!0),!h&&w){if(C!=null)continue;a.removeEventListener(A,f[N],k),f[N]=null}if(h)fo(A,a,C),uo([A]);else if(C!=null){let F=function(T){f[E].call(this,T)};f[N]=vo(A,a,F,k)}}else if(E==="style")Ue(a,E,C);else if(E==="autofocus")jn(a,!!C);else if(!n&&(E==="__value"||E==="value"&&C!=null))a.value=a.__value=C;else if(E==="selected"&&x)Ho(a,C);else{var m=E;l||(m=xo(m));var D=m==="defaultValue"||m==="defaultChecked";if(C==null&&!n&&!D)if(d[E]=null,m==="value"||m==="checked"){let k=a;const N=r===void 0;if(m==="value"){let A=k.defaultValue;k.removeAttribute(m),k.defaultValue=A,k.value=k.__value=N?A:null}else{let A=k.defaultChecked;k.removeAttribute(m),k.defaultChecked=A,k.checked=N?A:!1}}else a.removeAttribute(E);else D||B.includes(m)&&(n||typeof C!="string")?(a[m]=C,m in d&&(d[m]=Kn)):typeof C!="function"&&Ue(a,m,C)}}}return g&&Dt(!0),f}function ps(a,r,e=[],t=[],s=[],i,c=!1,o=!1){Vn(s,e,t,d=>{var n=void 0,l={},g=a.nodeName===Ro,f=!1;if(pi(()=>{var y=r(...d.map(u)),B=Lo(a,n,y,i,c,o);f&&g&&"value"in y&&ia(a,y.value);for(let w of Object.getOwnPropertySymbols(l))y[w]||o0(l[w]);for(let w of Object.getOwnPropertySymbols(y)){var v=y[w];w.description===qn&&(!n||v!==n[w])&&(l[w]&&o0(l[w]),l[w]=vr(()=>ko(a,()=>v))),B[w]=v}n=B}),g){var x=a;pa(()=>{ia(x,n.value,!0),Po(x)})}f=!0})}function ha(a){return a.__attributes??(a.__attributes={[bi]:a.nodeName.includes("-"),[_i]:a.namespaceURI===Yn})}var hs=new Map;function Bi(a){var r=a.getAttribute("is")||a.nodeName,e=hs.get(r);if(e)return e;hs.set(r,e=[]);for(var t,s=a,i=Element.prototype;i!==s;){t=Qn(s);for(var c in t)t[c].set&&e.push(c);s=Xn(s)}return e}function Ht(a,r,e=r){var t=new WeakSet;Jn(a,"input",async s=>{var i=s?a.defaultValue:a.value;if(i=q0(a)?j0(i):i,e(i),Qt!==null&&t.add(Qt),await hi(),i!==(i=r())){var c=a.selectionStart,o=a.selectionEnd,d=a.value.length;if(a.value=i??"",o!==null){var n=a.value.length;c===o&&o===d&&n>d?(a.selectionStart=n,a.selectionEnd=n):(a.selectionStart=c,a.selectionEnd=Math.min(o,n))}}}),(Fe&&a.defaultValue!==a.value||pe(r)==null&&a.value)&&(e(q0(a)?j0(a.value):a.value),Qt!==null&&t.add(Qt)),eo(()=>{var s=r();if(a===document.activeElement){var i=to??Qt;if(t.has(i))return}q0(a)&&s===j0(a.value)||a.type==="date"&&!s&&!a.value||s!==a.value&&(a.value=s??"")})}function q0(a){var r=a.type;return r==="number"||r==="range"}function j0(a){return a===""?null:+a}function na(a){return function(...r){var e=r[0];e.target===this&&(a==null||a.apply(this,r))}}function Oo(a){return function(...r){var e=r[0];return e.stopPropagation(),a==null?void 0:a.apply(this,r)}}function Uo(a){return function(...r){var e=r[0];return e.preventDefault(),a==null?void 0:a.apply(this,r)}}function Wo(a,r){var i;var e=(i=a.$$events)==null?void 0:i[r.type],t=ua(e)?e.slice():e==null?[]:[e];for(var s of t)s.call(this,r)}var K0=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Vo(a){if(Object.prototype.hasOwnProperty.call(a,"__esModule"))return a;var r=a.default;if(typeof r=="function"){var e=function t(){return this instanceof t?Reflect.construct(r,arguments,this.constructor):r.apply(this,arguments)};e.prototype=r.prototype}else e={};return Object.defineProperty(e,"__esModule",{value:!0}),Object.keys(a).forEach(function(t){var s=Object.getOwnPropertyDescriptor(a,t);Object.defineProperty(e,t,s.get?s:{enumerable:!0,get:function(){return a[t]}})}),e}var Cr={exports:{}};function qo(a){throw new Error('Could not dynamically require "'+a+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ar={exports:{}};const jo={},Ko=Object.freeze(Object.defineProperty({__proto__:null,default:jo},Symbol.toStringTag,{value:"Module"})),Go=Vo(Ko);var Yo=Ar.exports,gs;function be(){return gs||(gs=1,(function(a,r){(function(e,t){a.exports=t()})(Yo,function(){var e=e||(function(t,s){var i;if(typeof window<"u"&&window.crypto&&(i=window.crypto),typeof self<"u"&&self.crypto&&(i=self.crypto),typeof globalThis<"u"&&globalThis.crypto&&(i=globalThis.crypto),!i&&typeof window<"u"&&window.msCrypto&&(i=window.msCrypto),!i&&typeof K0<"u"&&K0.crypto&&(i=K0.crypto),!i&&typeof qo=="function")try{i=Go}catch{}var c=function(){if(i){if(typeof i.getRandomValues=="function")try{return i.getRandomValues(new Uint32Array(1))[0]}catch{}if(typeof i.randomBytes=="function")try{return i.randomBytes(4).readInt32LE()}catch{}}throw new Error("Native crypto module could not be used to get secure random number.")},o=Object.create||(function(){function p(){}return function(h){var m;return p.prototype=h,m=new p,p.prototype=null,m}})(),d={},n=d.lib={},l=n.Base=(function(){return{extend:function(p){var h=o(this);return p&&h.mixIn(p),(!h.hasOwnProperty("init")||this.init===h.init)&&(h.init=function(){h.$super.init.apply(this,arguments)}),h.init.prototype=h,h.$super=this,h},create:function(){var p=this.extend();return p.init.apply(p,arguments),p},init:function(){},mixIn:function(p){for(var h in p)p.hasOwnProperty(h)&&(this[h]=p[h]);p.hasOwnProperty("toString")&&(this.toString=p.toString)},clone:function(){return this.init.prototype.extend(this)}}})(),g=n.WordArray=l.extend({init:function(p,h){p=this.words=p||[],h!=s?this.sigBytes=h:this.sigBytes=p.length*4},toString:function(p){return(p||x).stringify(this)},concat:function(p){var h=this.words,m=p.words,D=this.sigBytes,E=p.sigBytes;if(this.clamp(),D%4)for(var C=0;C<E;C++){var k=m[C>>>2]>>>24-C%4*8&255;h[D+C>>>2]|=k<<24-(D+C)%4*8}else for(var N=0;N<E;N+=4)h[D+N>>>2]=m[N>>>2];return this.sigBytes+=E,this},clamp:function(){var p=this.words,h=this.sigBytes;p[h>>>2]&=4294967295<<32-h%4*8,p.length=t.ceil(h/4)},clone:function(){var p=l.clone.call(this);return p.words=this.words.slice(0),p},random:function(p){for(var h=[],m=0;m<p;m+=4)h.push(c());return new g.init(h,p)}}),f=d.enc={},x=f.Hex={stringify:function(p){for(var h=p.words,m=p.sigBytes,D=[],E=0;E<m;E++){var C=h[E>>>2]>>>24-E%4*8&255;D.push((C>>>4).toString(16)),D.push((C&15).toString(16))}return D.join("")},parse:function(p){for(var h=p.length,m=[],D=0;D<h;D+=2)m[D>>>3]|=parseInt(p.substr(D,2),16)<<24-D%8*4;return new g.init(m,h/2)}},y=f.Latin1={stringify:function(p){for(var h=p.words,m=p.sigBytes,D=[],E=0;E<m;E++){var C=h[E>>>2]>>>24-E%4*8&255;D.push(String.fromCharCode(C))}return D.join("")},parse:function(p){for(var h=p.length,m=[],D=0;D<h;D++)m[D>>>2]|=(p.charCodeAt(D)&255)<<24-D%4*8;return new g.init(m,h)}},B=f.Utf8={stringify:function(p){try{return decodeURIComponent(escape(y.stringify(p)))}catch{throw new Error("Malformed UTF-8 data")}},parse:function(p){return y.parse(unescape(encodeURIComponent(p)))}},v=n.BufferedBlockAlgorithm=l.extend({reset:function(){this._data=new g.init,this._nDataBytes=0},_append:function(p){typeof p=="string"&&(p=B.parse(p)),this._data.concat(p),this._nDataBytes+=p.sigBytes},_process:function(p){var h,m=this._data,D=m.words,E=m.sigBytes,C=this.blockSize,k=C*4,N=E/k;p?N=t.ceil(N):N=t.max((N|0)-this._minBufferSize,0);var A=N*C,F=t.min(A*4,E);if(A){for(var T=0;T<A;T+=C)this._doProcessBlock(D,T);h=D.splice(0,A),m.sigBytes-=F}return new g.init(h,F)},clone:function(){var p=l.clone.call(this);return p._data=this._data.clone(),p},_minBufferSize:0});n.Hasher=v.extend({cfg:l.extend(),init:function(p){this.cfg=this.cfg.extend(p),this.reset()},reset:function(){v.reset.call(this),this._doReset()},update:function(p){return this._append(p),this._process(),this},finalize:function(p){p&&this._append(p);var h=this._doFinalize();return h},blockSize:16,_createHelper:function(p){return function(h,m){return new p.init(m).finalize(h)}},_createHmacHelper:function(p){return function(h,m){return new w.HMAC.init(p,m).finalize(h)}}});var w=d.algo={};return d})(Math);return e})})(Ar)),Ar.exports}var kr={exports:{}},Xo=kr.exports,ys;function v0(){return ys||(ys=1,(function(a,r){(function(e,t){a.exports=t(be())})(Xo,function(e){return(function(t){var s=e,i=s.lib,c=i.Base,o=i.WordArray,d=s.x64={};d.Word=c.extend({init:function(n,l){this.high=n,this.low=l}}),d.WordArray=c.extend({init:function(n,l){n=this.words=n||[],l!=t?this.sigBytes=l:this.sigBytes=n.length*8},toX32:function(){for(var n=this.words,l=n.length,g=[],f=0;f<l;f++){var x=n[f];g.push(x.high),g.push(x.low)}return o.create(g,this.sigBytes)},clone:function(){for(var n=c.clone.call(this),l=n.words=this.words.slice(0),g=l.length,f=0;f<g;f++)l[f]=l[f].clone();return n}})})(),e})})(kr)),kr.exports}var Dr={exports:{}},Zo=Dr.exports,ms;function Qo(){return ms||(ms=1,(function(a,r){(function(e,t){a.exports=t(be())})(Zo,function(e){return(function(){if(typeof ArrayBuffer=="function"){var t=e,s=t.lib,i=s.WordArray,c=i.init,o=i.init=function(d){if(d instanceof ArrayBuffer&&(d=new Uint8Array(d)),(d instanceof Int8Array||typeof Uint8ClampedArray<"u"&&d instanceof Uint8ClampedArray||d instanceof Int16Array||d instanceof Uint16Array||d instanceof Int32Array||d instanceof Uint32Array||d instanceof Float32Array||d instanceof Float64Array)&&(d=new Uint8Array(d.buffer,d.byteOffset,d.byteLength)),d instanceof Uint8Array){for(var n=d.byteLength,l=[],g=0;g<n;g++)l[g>>>2]|=d[g]<<24-g%4*8;c.call(this,l,n)}else c.apply(this,arguments)};o.prototype=i}})(),e.lib.WordArray})})(Dr)),Dr.exports}var Fr={exports:{}},Jo=Fr.exports,bs;function el(){return bs||(bs=1,(function(a,r){(function(e,t){a.exports=t(be())})(Jo,function(e){return(function(){var t=e,s=t.lib,i=s.WordArray,c=t.enc;c.Utf16=c.Utf16BE={stringify:function(d){for(var n=d.words,l=d.sigBytes,g=[],f=0;f<l;f+=2){var x=n[f>>>2]>>>16-f%4*8&65535;g.push(String.fromCharCode(x))}return g.join("")},parse:function(d){for(var n=d.length,l=[],g=0;g<n;g++)l[g>>>1]|=d.charCodeAt(g)<<16-g%2*16;return i.create(l,n*2)}},c.Utf16LE={stringify:function(d){for(var n=d.words,l=d.sigBytes,g=[],f=0;f<l;f+=2){var x=o(n[f>>>2]>>>16-f%4*8&65535);g.push(String.fromCharCode(x))}return g.join("")},parse:function(d){for(var n=d.length,l=[],g=0;g<n;g++)l[g>>>1]|=o(d.charCodeAt(g)<<16-g%2*16);return i.create(l,n*2)}};function o(d){return d<<8&4278255360|d>>>8&16711935}})(),e.enc.Utf16})})(Fr)),Fr.exports}var Sr={exports:{}},tl=Sr.exports,_s;function jt(){return _s||(_s=1,(function(a,r){(function(e,t){a.exports=t(be())})(tl,function(e){return(function(){var t=e,s=t.lib,i=s.WordArray,c=t.enc;c.Base64={stringify:function(d){var n=d.words,l=d.sigBytes,g=this._map;d.clamp();for(var f=[],x=0;x<l;x+=3)for(var y=n[x>>>2]>>>24-x%4*8&255,B=n[x+1>>>2]>>>24-(x+1)%4*8&255,v=n[x+2>>>2]>>>24-(x+2)%4*8&255,w=y<<16|B<<8|v,p=0;p<4&&x+p*.75<l;p++)f.push(g.charAt(w>>>6*(3-p)&63));var h=g.charAt(64);if(h)for(;f.length%4;)f.push(h);return f.join("")},parse:function(d){var n=d.length,l=this._map,g=this._reverseMap;if(!g){g=this._reverseMap=[];for(var f=0;f<l.length;f++)g[l.charCodeAt(f)]=f}var x=l.charAt(64);if(x){var y=d.indexOf(x);y!==-1&&(n=y)}return o(d,n,g)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};function o(d,n,l){for(var g=[],f=0,x=0;x<n;x++)if(x%4){var y=l[d.charCodeAt(x-1)]<<x%4*2,B=l[d.charCodeAt(x)]>>>6-x%4*2,v=y|B;g[f>>>2]|=v<<24-f%4*8,f++}return i.create(g,f)}})(),e.enc.Base64})})(Sr)),Sr.exports}var $r={exports:{}},rl=$r.exports,Bs;function al(){return Bs||(Bs=1,(function(a,r){(function(e,t){a.exports=t(be())})(rl,function(e){return(function(){var t=e,s=t.lib,i=s.WordArray,c=t.enc;c.Base64url={stringify:function(d,n){n===void 0&&(n=!0);var l=d.words,g=d.sigBytes,f=n?this._safe_map:this._map;d.clamp();for(var x=[],y=0;y<g;y+=3)for(var B=l[y>>>2]>>>24-y%4*8&255,v=l[y+1>>>2]>>>24-(y+1)%4*8&255,w=l[y+2>>>2]>>>24-(y+2)%4*8&255,p=B<<16|v<<8|w,h=0;h<4&&y+h*.75<g;h++)x.push(f.charAt(p>>>6*(3-h)&63));var m=f.charAt(64);if(m)for(;x.length%4;)x.push(m);return x.join("")},parse:function(d,n){n===void 0&&(n=!0);var l=d.length,g=n?this._safe_map:this._map,f=this._reverseMap;if(!f){f=this._reverseMap=[];for(var x=0;x<g.length;x++)f[g.charCodeAt(x)]=x}var y=g.charAt(64);if(y){var B=d.indexOf(y);B!==-1&&(l=B)}return o(d,l,f)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_safe_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"};function o(d,n,l){for(var g=[],f=0,x=0;x<n;x++)if(x%4){var y=l[d.charCodeAt(x-1)]<<x%4*2,B=l[d.charCodeAt(x)]>>>6-x%4*2,v=y|B;g[f>>>2]|=v<<24-f%4*8,f++}return i.create(g,f)}})(),e.enc.Base64url})})($r)),$r.exports}var Pr={exports:{}},sl=Pr.exports,Es;function Kt(){return Es||(Es=1,(function(a,r){(function(e,t){a.exports=t(be())})(sl,function(e){return(function(t){var s=e,i=s.lib,c=i.WordArray,o=i.Hasher,d=s.algo,n=[];(function(){for(var B=0;B<64;B++)n[B]=t.abs(t.sin(B+1))*4294967296|0})();var l=d.MD5=o.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(B,v){for(var w=0;w<16;w++){var p=v+w,h=B[p];B[p]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360}var m=this._hash.words,D=B[v+0],E=B[v+1],C=B[v+2],k=B[v+3],N=B[v+4],A=B[v+5],F=B[v+6],T=B[v+7],I=B[v+8],V=B[v+9],K=B[v+10],Y=B[v+11],se=B[v+12],ee=B[v+13],J=B[v+14],j=B[v+15],$=m[0],R=m[1],H=m[2],z=m[3];$=g($,R,H,z,D,7,n[0]),z=g(z,$,R,H,E,12,n[1]),H=g(H,z,$,R,C,17,n[2]),R=g(R,H,z,$,k,22,n[3]),$=g($,R,H,z,N,7,n[4]),z=g(z,$,R,H,A,12,n[5]),H=g(H,z,$,R,F,17,n[6]),R=g(R,H,z,$,T,22,n[7]),$=g($,R,H,z,I,7,n[8]),z=g(z,$,R,H,V,12,n[9]),H=g(H,z,$,R,K,17,n[10]),R=g(R,H,z,$,Y,22,n[11]),$=g($,R,H,z,se,7,n[12]),z=g(z,$,R,H,ee,12,n[13]),H=g(H,z,$,R,J,17,n[14]),R=g(R,H,z,$,j,22,n[15]),$=f($,R,H,z,E,5,n[16]),z=f(z,$,R,H,F,9,n[17]),H=f(H,z,$,R,Y,14,n[18]),R=f(R,H,z,$,D,20,n[19]),$=f($,R,H,z,A,5,n[20]),z=f(z,$,R,H,K,9,n[21]),H=f(H,z,$,R,j,14,n[22]),R=f(R,H,z,$,N,20,n[23]),$=f($,R,H,z,V,5,n[24]),z=f(z,$,R,H,J,9,n[25]),H=f(H,z,$,R,k,14,n[26]),R=f(R,H,z,$,I,20,n[27]),$=f($,R,H,z,ee,5,n[28]),z=f(z,$,R,H,C,9,n[29]),H=f(H,z,$,R,T,14,n[30]),R=f(R,H,z,$,se,20,n[31]),$=x($,R,H,z,A,4,n[32]),z=x(z,$,R,H,I,11,n[33]),H=x(H,z,$,R,Y,16,n[34]),R=x(R,H,z,$,J,23,n[35]),$=x($,R,H,z,E,4,n[36]),z=x(z,$,R,H,N,11,n[37]),H=x(H,z,$,R,T,16,n[38]),R=x(R,H,z,$,K,23,n[39]),$=x($,R,H,z,ee,4,n[40]),z=x(z,$,R,H,D,11,n[41]),H=x(H,z,$,R,k,16,n[42]),R=x(R,H,z,$,F,23,n[43]),$=x($,R,H,z,V,4,n[44]),z=x(z,$,R,H,se,11,n[45]),H=x(H,z,$,R,j,16,n[46]),R=x(R,H,z,$,C,23,n[47]),$=y($,R,H,z,D,6,n[48]),z=y(z,$,R,H,T,10,n[49]),H=y(H,z,$,R,J,15,n[50]),R=y(R,H,z,$,A,21,n[51]),$=y($,R,H,z,se,6,n[52]),z=y(z,$,R,H,k,10,n[53]),H=y(H,z,$,R,K,15,n[54]),R=y(R,H,z,$,E,21,n[55]),$=y($,R,H,z,I,6,n[56]),z=y(z,$,R,H,j,10,n[57]),H=y(H,z,$,R,F,15,n[58]),R=y(R,H,z,$,ee,21,n[59]),$=y($,R,H,z,N,6,n[60]),z=y(z,$,R,H,Y,10,n[61]),H=y(H,z,$,R,C,15,n[62]),R=y(R,H,z,$,V,21,n[63]),m[0]=m[0]+$|0,m[1]=m[1]+R|0,m[2]=m[2]+H|0,m[3]=m[3]+z|0},_doFinalize:function(){var B=this._data,v=B.words,w=this._nDataBytes*8,p=B.sigBytes*8;v[p>>>5]|=128<<24-p%32;var h=t.floor(w/4294967296),m=w;v[(p+64>>>9<<4)+15]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360,v[(p+64>>>9<<4)+14]=(m<<8|m>>>24)&16711935|(m<<24|m>>>8)&4278255360,B.sigBytes=(v.length+1)*4,this._process();for(var D=this._hash,E=D.words,C=0;C<4;C++){var k=E[C];E[C]=(k<<8|k>>>24)&16711935|(k<<24|k>>>8)&4278255360}return D},clone:function(){var B=o.clone.call(this);return B._hash=this._hash.clone(),B}});function g(B,v,w,p,h,m,D){var E=B+(v&w|~v&p)+h+D;return(E<<m|E>>>32-m)+v}function f(B,v,w,p,h,m,D){var E=B+(v&p|w&~p)+h+D;return(E<<m|E>>>32-m)+v}function x(B,v,w,p,h,m,D){var E=B+(v^w^p)+h+D;return(E<<m|E>>>32-m)+v}function y(B,v,w,p,h,m,D){var E=B+(w^(v|~p))+h+D;return(E<<m|E>>>32-m)+v}s.MD5=o._createHelper(l),s.HmacMD5=o._createHmacHelper(l)})(Math),e.MD5})})(Pr)),Pr.exports}var Tr={exports:{}},il=Tr.exports,ws;function Ei(){return ws||(ws=1,(function(a,r){(function(e,t){a.exports=t(be())})(il,function(e){return(function(){var t=e,s=t.lib,i=s.WordArray,c=s.Hasher,o=t.algo,d=[],n=o.SHA1=c.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(l,g){for(var f=this._hash.words,x=f[0],y=f[1],B=f[2],v=f[3],w=f[4],p=0;p<80;p++){if(p<16)d[p]=l[g+p]|0;else{var h=d[p-3]^d[p-8]^d[p-14]^d[p-16];d[p]=h<<1|h>>>31}var m=(x<<5|x>>>27)+w+d[p];p<20?m+=(y&B|~y&v)+1518500249:p<40?m+=(y^B^v)+1859775393:p<60?m+=(y&B|y&v|B&v)-1894007588:m+=(y^B^v)-899497514,w=v,v=B,B=y<<30|y>>>2,y=x,x=m}f[0]=f[0]+x|0,f[1]=f[1]+y|0,f[2]=f[2]+B|0,f[3]=f[3]+v|0,f[4]=f[4]+w|0},_doFinalize:function(){var l=this._data,g=l.words,f=this._nDataBytes*8,x=l.sigBytes*8;return g[x>>>5]|=128<<24-x%32,g[(x+64>>>9<<4)+14]=Math.floor(f/4294967296),g[(x+64>>>9<<4)+15]=f,l.sigBytes=g.length*4,this._process(),this._hash},clone:function(){var l=c.clone.call(this);return l._hash=this._hash.clone(),l}});t.SHA1=c._createHelper(n),t.HmacSHA1=c._createHmacHelper(n)})(),e.SHA1})})(Tr)),Tr.exports}var Mr={exports:{}},nl=Mr.exports,Cs;function ga(){return Cs||(Cs=1,(function(a,r){(function(e,t){a.exports=t(be())})(nl,function(e){return(function(t){var s=e,i=s.lib,c=i.WordArray,o=i.Hasher,d=s.algo,n=[],l=[];(function(){function x(w){for(var p=t.sqrt(w),h=2;h<=p;h++)if(!(w%h))return!1;return!0}function y(w){return(w-(w|0))*4294967296|0}for(var B=2,v=0;v<64;)x(B)&&(v<8&&(n[v]=y(t.pow(B,1/2))),l[v]=y(t.pow(B,1/3)),v++),B++})();var g=[],f=d.SHA256=o.extend({_doReset:function(){this._hash=new c.init(n.slice(0))},_doProcessBlock:function(x,y){for(var B=this._hash.words,v=B[0],w=B[1],p=B[2],h=B[3],m=B[4],D=B[5],E=B[6],C=B[7],k=0;k<64;k++){if(k<16)g[k]=x[y+k]|0;else{var N=g[k-15],A=(N<<25|N>>>7)^(N<<14|N>>>18)^N>>>3,F=g[k-2],T=(F<<15|F>>>17)^(F<<13|F>>>19)^F>>>10;g[k]=A+g[k-7]+T+g[k-16]}var I=m&D^~m&E,V=v&w^v&p^w&p,K=(v<<30|v>>>2)^(v<<19|v>>>13)^(v<<10|v>>>22),Y=(m<<26|m>>>6)^(m<<21|m>>>11)^(m<<7|m>>>25),se=C+Y+I+l[k]+g[k],ee=K+V;C=E,E=D,D=m,m=h+se|0,h=p,p=w,w=v,v=se+ee|0}B[0]=B[0]+v|0,B[1]=B[1]+w|0,B[2]=B[2]+p|0,B[3]=B[3]+h|0,B[4]=B[4]+m|0,B[5]=B[5]+D|0,B[6]=B[6]+E|0,B[7]=B[7]+C|0},_doFinalize:function(){var x=this._data,y=x.words,B=this._nDataBytes*8,v=x.sigBytes*8;return y[v>>>5]|=128<<24-v%32,y[(v+64>>>9<<4)+14]=t.floor(B/4294967296),y[(v+64>>>9<<4)+15]=B,x.sigBytes=y.length*4,this._process(),this._hash},clone:function(){var x=o.clone.call(this);return x._hash=this._hash.clone(),x}});s.SHA256=o._createHelper(f),s.HmacSHA256=o._createHmacHelper(f)})(Math),e.SHA256})})(Mr)),Mr.exports}var zr={exports:{}},ol=zr.exports,As;function ll(){return As||(As=1,(function(a,r){(function(e,t,s){a.exports=t(be(),ga())})(ol,function(e){return(function(){var t=e,s=t.lib,i=s.WordArray,c=t.algo,o=c.SHA256,d=c.SHA224=o.extend({_doReset:function(){this._hash=new i.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var n=o._doFinalize.call(this);return n.sigBytes-=4,n}});t.SHA224=o._createHelper(d),t.HmacSHA224=o._createHmacHelper(d)})(),e.SHA224})})(zr)),zr.exports}var Rr={exports:{}},cl=Rr.exports,ks;function wi(){return ks||(ks=1,(function(a,r){(function(e,t,s){a.exports=t(be(),v0())})(cl,function(e){return(function(){var t=e,s=t.lib,i=s.Hasher,c=t.x64,o=c.Word,d=c.WordArray,n=t.algo;function l(){return o.create.apply(o,arguments)}var g=[l(1116352408,3609767458),l(1899447441,602891725),l(3049323471,3964484399),l(3921009573,2173295548),l(961987163,4081628472),l(1508970993,3053834265),l(2453635748,2937671579),l(2870763221,3664609560),l(3624381080,2734883394),l(310598401,1164996542),l(607225278,1323610764),l(1426881987,3590304994),l(1925078388,4068182383),l(2162078206,991336113),l(2614888103,633803317),l(3248222580,3479774868),l(3835390401,2666613458),l(4022224774,944711139),l(264347078,2341262773),l(604807628,2007800933),l(770255983,1495990901),l(1249150122,1856431235),l(1555081692,3175218132),l(1996064986,2198950837),l(2554220882,3999719339),l(2821834349,766784016),l(2952996808,2566594879),l(3210313671,3203337956),l(3336571891,1034457026),l(3584528711,2466948901),l(113926993,3758326383),l(338241895,168717936),l(666307205,1188179964),l(773529912,1546045734),l(1294757372,1522805485),l(1396182291,2643833823),l(1695183700,2343527390),l(1986661051,1014477480),l(2177026350,1206759142),l(2456956037,344077627),l(2730485921,1290863460),l(2820302411,3158454273),l(3259730800,3505952657),l(3345764771,106217008),l(3516065817,3606008344),l(3600352804,1432725776),l(4094571909,1467031594),l(275423344,851169720),l(430227734,3100823752),l(506948616,1363258195),l(659060556,3750685593),l(883997877,3785050280),l(958139571,3318307427),l(1322822218,3812723403),l(1537002063,2003034995),l(1747873779,3602036899),l(1955562222,1575990012),l(2024104815,1125592928),l(2227730452,2716904306),l(2361852424,442776044),l(2428436474,593698344),l(2756734187,3733110249),l(3204031479,2999351573),l(3329325298,3815920427),l(3391569614,3928383900),l(3515267271,566280711),l(3940187606,3454069534),l(4118630271,4000239992),l(116418474,1914138554),l(174292421,2731055270),l(289380356,3203993006),l(460393269,320620315),l(685471733,587496836),l(852142971,1086792851),l(1017036298,365543100),l(1126000580,2618297676),l(1288033470,3409855158),l(1501505948,4234509866),l(1607167915,987167468),l(1816402316,1246189591)],f=[];(function(){for(var y=0;y<80;y++)f[y]=l()})();var x=n.SHA512=i.extend({_doReset:function(){this._hash=new d.init([new o.init(1779033703,4089235720),new o.init(3144134277,2227873595),new o.init(1013904242,4271175723),new o.init(2773480762,1595750129),new o.init(1359893119,2917565137),new o.init(2600822924,725511199),new o.init(528734635,4215389547),new o.init(1541459225,327033209)])},_doProcessBlock:function(y,B){for(var v=this._hash.words,w=v[0],p=v[1],h=v[2],m=v[3],D=v[4],E=v[5],C=v[6],k=v[7],N=w.high,A=w.low,F=p.high,T=p.low,I=h.high,V=h.low,K=m.high,Y=m.low,se=D.high,ee=D.low,J=E.high,j=E.low,$=C.high,R=C.low,H=k.high,z=k.low,M=N,O=A,W=F,U=T,re=I,ue=V,xe=K,ce=Y,ve=se,Z=ee,me=J,ie=j,Se=$,Pe=R,Le=H,ze=z,ke=0;ke<80;ke++){var Ee,Te,at=f[ke];if(ke<16)Te=at.high=y[B+ke*2]|0,Ee=at.low=y[B+ke*2+1]|0;else{var Ze=f[ke-15],Me=Ze.high,He=Ze.low,je=(Me>>>1|He<<31)^(Me>>>8|He<<24)^Me>>>7,De=(He>>>1|Me<<31)^(He>>>8|Me<<24)^(He>>>7|Me<<25),Qe=f[ke-2],We=Qe.high,Re=Qe.low,Ke=(We>>>19|Re<<13)^(We<<3|Re>>>29)^We>>>6,Je=(Re>>>19|We<<13)^(Re<<3|We>>>29)^(Re>>>6|We<<26),ft=f[ke-7],ge=ft.high,fe=ft.low,Ne=f[ke-16],it=Ne.high,dt=Ne.low;Ee=De+fe,Te=je+ge+(Ee>>>0<De>>>0?1:0),Ee=Ee+Je,Te=Te+Ke+(Ee>>>0<Je>>>0?1:0),Ee=Ee+dt,Te=Te+it+(Ee>>>0<dt>>>0?1:0),at.high=Te,at.low=Ee}var ut=ve&me^~ve&Se,vt=Z&ie^~Z&Pe,Pt=M&W^M&re^W&re,Et=O&U^O&ue^U&ue,rr=(M>>>28|O<<4)^(M<<30|O>>>2)^(M<<25|O>>>7),Yt=(O>>>28|M<<4)^(O<<30|M>>>2)^(O<<25|M>>>7),ar=(ve>>>14|Z<<18)^(ve>>>18|Z<<14)^(ve<<23|Z>>>9),Tt=(Z>>>14|ve<<18)^(Z>>>18|ve<<14)^(Z<<23|ve>>>9),Mt=g[ke],Wt=Mt.high,zt=Mt.low,Ve=ze+Tt,ot=Le+ar+(Ve>>>0<ze>>>0?1:0),Ve=Ve+vt,ot=ot+ut+(Ve>>>0<vt>>>0?1:0),Ve=Ve+zt,ot=ot+Wt+(Ve>>>0<zt>>>0?1:0),Ve=Ve+Ee,ot=ot+Te+(Ve>>>0<Ee>>>0?1:0),Rt=Yt+Et,Xt=rr+Pt+(Rt>>>0<Yt>>>0?1:0);Le=Se,ze=Pe,Se=me,Pe=ie,me=ve,ie=Z,Z=ce+Ve|0,ve=xe+ot+(Z>>>0<ce>>>0?1:0)|0,xe=re,ce=ue,re=W,ue=U,W=M,U=O,O=Ve+Rt|0,M=ot+Xt+(O>>>0<Ve>>>0?1:0)|0}A=w.low=A+O,w.high=N+M+(A>>>0<O>>>0?1:0),T=p.low=T+U,p.high=F+W+(T>>>0<U>>>0?1:0),V=h.low=V+ue,h.high=I+re+(V>>>0<ue>>>0?1:0),Y=m.low=Y+ce,m.high=K+xe+(Y>>>0<ce>>>0?1:0),ee=D.low=ee+Z,D.high=se+ve+(ee>>>0<Z>>>0?1:0),j=E.low=j+ie,E.high=J+me+(j>>>0<ie>>>0?1:0),R=C.low=R+Pe,C.high=$+Se+(R>>>0<Pe>>>0?1:0),z=k.low=z+ze,k.high=H+Le+(z>>>0<ze>>>0?1:0)},_doFinalize:function(){var y=this._data,B=y.words,v=this._nDataBytes*8,w=y.sigBytes*8;B[w>>>5]|=128<<24-w%32,B[(w+128>>>10<<5)+30]=Math.floor(v/4294967296),B[(w+128>>>10<<5)+31]=v,y.sigBytes=B.length*4,this._process();var p=this._hash.toX32();return p},clone:function(){var y=i.clone.call(this);return y._hash=this._hash.clone(),y},blockSize:1024/32});t.SHA512=i._createHelper(x),t.HmacSHA512=i._createHmacHelper(x)})(),e.SHA512})})(Rr)),Rr.exports}var Nr={exports:{}},fl=Nr.exports,Ds;function dl(){return Ds||(Ds=1,(function(a,r){(function(e,t,s){a.exports=t(be(),v0(),wi())})(fl,function(e){return(function(){var t=e,s=t.x64,i=s.Word,c=s.WordArray,o=t.algo,d=o.SHA512,n=o.SHA384=d.extend({_doReset:function(){this._hash=new c.init([new i.init(3418070365,3238371032),new i.init(1654270250,914150663),new i.init(2438529370,812702999),new i.init(355462360,4144912697),new i.init(1731405415,4290775857),new i.init(2394180231,1750603025),new i.init(3675008525,1694076839),new i.init(1203062813,3204075428)])},_doFinalize:function(){var l=d._doFinalize.call(this);return l.sigBytes-=16,l}});t.SHA384=d._createHelper(n),t.HmacSHA384=d._createHmacHelper(n)})(),e.SHA384})})(Nr)),Nr.exports}var Ir={exports:{}},ul=Ir.exports,Fs;function vl(){return Fs||(Fs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),v0())})(ul,function(e){return(function(t){var s=e,i=s.lib,c=i.WordArray,o=i.Hasher,d=s.x64,n=d.Word,l=s.algo,g=[],f=[],x=[];(function(){for(var v=1,w=0,p=0;p<24;p++){g[v+5*w]=(p+1)*(p+2)/2%64;var h=w%5,m=(2*v+3*w)%5;v=h,w=m}for(var v=0;v<5;v++)for(var w=0;w<5;w++)f[v+5*w]=w+(2*v+3*w)%5*5;for(var D=1,E=0;E<24;E++){for(var C=0,k=0,N=0;N<7;N++){if(D&1){var A=(1<<N)-1;A<32?k^=1<<A:C^=1<<A-32}D&128?D=D<<1^113:D<<=1}x[E]=n.create(C,k)}})();var y=[];(function(){for(var v=0;v<25;v++)y[v]=n.create()})();var B=l.SHA3=o.extend({cfg:o.cfg.extend({outputLength:512}),_doReset:function(){for(var v=this._state=[],w=0;w<25;w++)v[w]=new n.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(v,w){for(var p=this._state,h=this.blockSize/2,m=0;m<h;m++){var D=v[w+2*m],E=v[w+2*m+1];D=(D<<8|D>>>24)&16711935|(D<<24|D>>>8)&4278255360,E=(E<<8|E>>>24)&16711935|(E<<24|E>>>8)&4278255360;var C=p[m];C.high^=E,C.low^=D}for(var k=0;k<24;k++){for(var N=0;N<5;N++){for(var A=0,F=0,T=0;T<5;T++){var C=p[N+5*T];A^=C.high,F^=C.low}var I=y[N];I.high=A,I.low=F}for(var N=0;N<5;N++)for(var V=y[(N+4)%5],K=y[(N+1)%5],Y=K.high,se=K.low,A=V.high^(Y<<1|se>>>31),F=V.low^(se<<1|Y>>>31),T=0;T<5;T++){var C=p[N+5*T];C.high^=A,C.low^=F}for(var ee=1;ee<25;ee++){var A,F,C=p[ee],J=C.high,j=C.low,$=g[ee];$<32?(A=J<<$|j>>>32-$,F=j<<$|J>>>32-$):(A=j<<$-32|J>>>64-$,F=J<<$-32|j>>>64-$);var R=y[f[ee]];R.high=A,R.low=F}var H=y[0],z=p[0];H.high=z.high,H.low=z.low;for(var N=0;N<5;N++)for(var T=0;T<5;T++){var ee=N+5*T,C=p[ee],M=y[ee],O=y[(N+1)%5+5*T],W=y[(N+2)%5+5*T];C.high=M.high^~O.high&W.high,C.low=M.low^~O.low&W.low}var C=p[0],U=x[k];C.high^=U.high,C.low^=U.low}},_doFinalize:function(){var v=this._data,w=v.words;this._nDataBytes*8;var p=v.sigBytes*8,h=this.blockSize*32;w[p>>>5]|=1<<24-p%32,w[(t.ceil((p+1)/h)*h>>>5)-1]|=128,v.sigBytes=w.length*4,this._process();for(var m=this._state,D=this.cfg.outputLength/8,E=D/8,C=[],k=0;k<E;k++){var N=m[k],A=N.high,F=N.low;A=(A<<8|A>>>24)&16711935|(A<<24|A>>>8)&4278255360,F=(F<<8|F>>>24)&16711935|(F<<24|F>>>8)&4278255360,C.push(F),C.push(A)}return new c.init(C,D)},clone:function(){for(var v=o.clone.call(this),w=v._state=this._state.slice(0),p=0;p<25;p++)w[p]=w[p].clone();return v}});s.SHA3=o._createHelper(B),s.HmacSHA3=o._createHmacHelper(B)})(Math),e.SHA3})})(Ir)),Ir.exports}var Hr={exports:{}},xl=Hr.exports,Ss;function pl(){return Ss||(Ss=1,(function(a,r){(function(e,t){a.exports=t(be())})(xl,function(e){/** @preserve
			(c) 2012 by Cédric Mesnil. All rights reserved.

			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
			*/return(function(t){var s=e,i=s.lib,c=i.WordArray,o=i.Hasher,d=s.algo,n=c.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),l=c.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),g=c.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),f=c.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),x=c.create([0,1518500249,1859775393,2400959708,2840853838]),y=c.create([1352829926,1548603684,1836072691,2053994217,0]),B=d.RIPEMD160=o.extend({_doReset:function(){this._hash=c.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(E,C){for(var k=0;k<16;k++){var N=C+k,A=E[N];E[N]=(A<<8|A>>>24)&16711935|(A<<24|A>>>8)&4278255360}var F=this._hash.words,T=x.words,I=y.words,V=n.words,K=l.words,Y=g.words,se=f.words,ee,J,j,$,R,H,z,M,O,W;H=ee=F[0],z=J=F[1],M=j=F[2],O=$=F[3],W=R=F[4];for(var U,k=0;k<80;k+=1)U=ee+E[C+V[k]]|0,k<16?U+=v(J,j,$)+T[0]:k<32?U+=w(J,j,$)+T[1]:k<48?U+=p(J,j,$)+T[2]:k<64?U+=h(J,j,$)+T[3]:U+=m(J,j,$)+T[4],U=U|0,U=D(U,Y[k]),U=U+R|0,ee=R,R=$,$=D(j,10),j=J,J=U,U=H+E[C+K[k]]|0,k<16?U+=m(z,M,O)+I[0]:k<32?U+=h(z,M,O)+I[1]:k<48?U+=p(z,M,O)+I[2]:k<64?U+=w(z,M,O)+I[3]:U+=v(z,M,O)+I[4],U=U|0,U=D(U,se[k]),U=U+W|0,H=W,W=O,O=D(M,10),M=z,z=U;U=F[1]+j+O|0,F[1]=F[2]+$+W|0,F[2]=F[3]+R+H|0,F[3]=F[4]+ee+z|0,F[4]=F[0]+J+M|0,F[0]=U},_doFinalize:function(){var E=this._data,C=E.words,k=this._nDataBytes*8,N=E.sigBytes*8;C[N>>>5]|=128<<24-N%32,C[(N+64>>>9<<4)+14]=(k<<8|k>>>24)&16711935|(k<<24|k>>>8)&4278255360,E.sigBytes=(C.length+1)*4,this._process();for(var A=this._hash,F=A.words,T=0;T<5;T++){var I=F[T];F[T]=(I<<8|I>>>24)&16711935|(I<<24|I>>>8)&4278255360}return A},clone:function(){var E=o.clone.call(this);return E._hash=this._hash.clone(),E}});function v(E,C,k){return E^C^k}function w(E,C,k){return E&C|~E&k}function p(E,C,k){return(E|~C)^k}function h(E,C,k){return E&k|C&~k}function m(E,C,k){return E^(C|~k)}function D(E,C){return E<<C|E>>>32-C}s.RIPEMD160=o._createHelper(B),s.HmacRIPEMD160=o._createHmacHelper(B)})(),e.RIPEMD160})})(Hr)),Hr.exports}var Lr={exports:{}},hl=Lr.exports,$s;function ya(){return $s||($s=1,(function(a,r){(function(e,t){a.exports=t(be())})(hl,function(e){(function(){var t=e,s=t.lib,i=s.Base,c=t.enc,o=c.Utf8,d=t.algo;d.HMAC=i.extend({init:function(n,l){n=this._hasher=new n.init,typeof l=="string"&&(l=o.parse(l));var g=n.blockSize,f=g*4;l.sigBytes>f&&(l=n.finalize(l)),l.clamp();for(var x=this._oKey=l.clone(),y=this._iKey=l.clone(),B=x.words,v=y.words,w=0;w<g;w++)B[w]^=1549556828,v[w]^=909522486;x.sigBytes=y.sigBytes=f,this.reset()},reset:function(){var n=this._hasher;n.reset(),n.update(this._iKey)},update:function(n){return this._hasher.update(n),this},finalize:function(n){var l=this._hasher,g=l.finalize(n);l.reset();var f=l.finalize(this._oKey.clone().concat(g));return f}})})()})})(Lr)),Lr.exports}var Or={exports:{}},gl=Or.exports,Ps;function yl(){return Ps||(Ps=1,(function(a,r){(function(e,t,s){a.exports=t(be(),ga(),ya())})(gl,function(e){return(function(){var t=e,s=t.lib,i=s.Base,c=s.WordArray,o=t.algo,d=o.SHA256,n=o.HMAC,l=o.PBKDF2=i.extend({cfg:i.extend({keySize:128/32,hasher:d,iterations:25e4}),init:function(g){this.cfg=this.cfg.extend(g)},compute:function(g,f){for(var x=this.cfg,y=n.create(x.hasher,g),B=c.create(),v=c.create([1]),w=B.words,p=v.words,h=x.keySize,m=x.iterations;w.length<h;){var D=y.update(f).finalize(v);y.reset();for(var E=D.words,C=E.length,k=D,N=1;N<m;N++){k=y.finalize(k),y.reset();for(var A=k.words,F=0;F<C;F++)E[F]^=A[F]}B.concat(D),p[0]++}return B.sigBytes=h*4,B}});t.PBKDF2=function(g,f,x){return l.create(x).compute(g,f)}})(),e.PBKDF2})})(Or)),Or.exports}var Ur={exports:{}},ml=Ur.exports,Ts;function Ut(){return Ts||(Ts=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Ei(),ya())})(ml,function(e){return(function(){var t=e,s=t.lib,i=s.Base,c=s.WordArray,o=t.algo,d=o.MD5,n=o.EvpKDF=i.extend({cfg:i.extend({keySize:128/32,hasher:d,iterations:1}),init:function(l){this.cfg=this.cfg.extend(l)},compute:function(l,g){for(var f,x=this.cfg,y=x.hasher.create(),B=c.create(),v=B.words,w=x.keySize,p=x.iterations;v.length<w;){f&&y.update(f),f=y.update(l).finalize(g),y.reset();for(var h=1;h<p;h++)f=y.finalize(f),y.reset();B.concat(f)}return B.sigBytes=w*4,B}});t.EvpKDF=function(l,g,f){return n.create(f).compute(l,g)}})(),e.EvpKDF})})(Ur)),Ur.exports}var Wr={exports:{}},bl=Wr.exports,Ms;function Xe(){return Ms||(Ms=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Ut())})(bl,function(e){e.lib.Cipher||(function(t){var s=e,i=s.lib,c=i.Base,o=i.WordArray,d=i.BufferedBlockAlgorithm,n=s.enc;n.Utf8;var l=n.Base64,g=s.algo,f=g.EvpKDF,x=i.Cipher=d.extend({cfg:c.extend(),createEncryptor:function(A,F){return this.create(this._ENC_XFORM_MODE,A,F)},createDecryptor:function(A,F){return this.create(this._DEC_XFORM_MODE,A,F)},init:function(A,F,T){this.cfg=this.cfg.extend(T),this._xformMode=A,this._key=F,this.reset()},reset:function(){d.reset.call(this),this._doReset()},process:function(A){return this._append(A),this._process()},finalize:function(A){A&&this._append(A);var F=this._doFinalize();return F},keySize:128/32,ivSize:128/32,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:(function(){function A(F){return typeof F=="string"?N:E}return function(F){return{encrypt:function(T,I,V){return A(I).encrypt(F,T,I,V)},decrypt:function(T,I,V){return A(I).decrypt(F,T,I,V)}}}})()});i.StreamCipher=x.extend({_doFinalize:function(){var A=this._process(!0);return A},blockSize:1});var y=s.mode={},B=i.BlockCipherMode=c.extend({createEncryptor:function(A,F){return this.Encryptor.create(A,F)},createDecryptor:function(A,F){return this.Decryptor.create(A,F)},init:function(A,F){this._cipher=A,this._iv=F}}),v=y.CBC=(function(){var A=B.extend();A.Encryptor=A.extend({processBlock:function(T,I){var V=this._cipher,K=V.blockSize;F.call(this,T,I,K),V.encryptBlock(T,I),this._prevBlock=T.slice(I,I+K)}}),A.Decryptor=A.extend({processBlock:function(T,I){var V=this._cipher,K=V.blockSize,Y=T.slice(I,I+K);V.decryptBlock(T,I),F.call(this,T,I,K),this._prevBlock=Y}});function F(T,I,V){var K,Y=this._iv;Y?(K=Y,this._iv=t):K=this._prevBlock;for(var se=0;se<V;se++)T[I+se]^=K[se]}return A})(),w=s.pad={},p=w.Pkcs7={pad:function(A,F){for(var T=F*4,I=T-A.sigBytes%T,V=I<<24|I<<16|I<<8|I,K=[],Y=0;Y<I;Y+=4)K.push(V);var se=o.create(K,I);A.concat(se)},unpad:function(A){var F=A.words[A.sigBytes-1>>>2]&255;A.sigBytes-=F}};i.BlockCipher=x.extend({cfg:x.cfg.extend({mode:v,padding:p}),reset:function(){var A;x.reset.call(this);var F=this.cfg,T=F.iv,I=F.mode;this._xformMode==this._ENC_XFORM_MODE?A=I.createEncryptor:(A=I.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==A?this._mode.init(this,T&&T.words):(this._mode=A.call(I,this,T&&T.words),this._mode.__creator=A)},_doProcessBlock:function(A,F){this._mode.processBlock(A,F)},_doFinalize:function(){var A,F=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(F.pad(this._data,this.blockSize),A=this._process(!0)):(A=this._process(!0),F.unpad(A)),A},blockSize:128/32});var h=i.CipherParams=c.extend({init:function(A){this.mixIn(A)},toString:function(A){return(A||this.formatter).stringify(this)}}),m=s.format={},D=m.OpenSSL={stringify:function(A){var F,T=A.ciphertext,I=A.salt;return I?F=o.create([1398893684,1701076831]).concat(I).concat(T):F=T,F.toString(l)},parse:function(A){var F,T=l.parse(A),I=T.words;return I[0]==1398893684&&I[1]==1701076831&&(F=o.create(I.slice(2,4)),I.splice(0,4),T.sigBytes-=16),h.create({ciphertext:T,salt:F})}},E=i.SerializableCipher=c.extend({cfg:c.extend({format:D}),encrypt:function(A,F,T,I){I=this.cfg.extend(I);var V=A.createEncryptor(T,I),K=V.finalize(F),Y=V.cfg;return h.create({ciphertext:K,key:T,iv:Y.iv,algorithm:A,mode:Y.mode,padding:Y.padding,blockSize:A.blockSize,formatter:I.format})},decrypt:function(A,F,T,I){I=this.cfg.extend(I),F=this._parse(F,I.format);var V=A.createDecryptor(T,I).finalize(F.ciphertext);return V},_parse:function(A,F){return typeof A=="string"?F.parse(A,this):A}}),C=s.kdf={},k=C.OpenSSL={execute:function(A,F,T,I,V){if(I||(I=o.random(64/8)),V)var K=f.create({keySize:F+T,hasher:V}).compute(A,I);else var K=f.create({keySize:F+T}).compute(A,I);var Y=o.create(K.words.slice(F),T*4);return K.sigBytes=F*4,h.create({key:K,iv:Y,salt:I})}},N=i.PasswordBasedCipher=E.extend({cfg:E.cfg.extend({kdf:k}),encrypt:function(A,F,T,I){I=this.cfg.extend(I);var V=I.kdf.execute(T,A.keySize,A.ivSize,I.salt,I.hasher);I.iv=V.iv;var K=E.encrypt.call(this,A,F,V.key,I);return K.mixIn(V),K},decrypt:function(A,F,T,I){I=this.cfg.extend(I),F=this._parse(F,I.format);var V=I.kdf.execute(T,A.keySize,A.ivSize,F.salt,I.hasher);I.iv=V.iv;var K=E.decrypt.call(this,A,F,V.key,I);return K}})})()})})(Wr)),Wr.exports}var Vr={exports:{}},_l=Vr.exports,zs;function Bl(){return zs||(zs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(_l,function(e){return e.mode.CFB=(function(){var t=e.lib.BlockCipherMode.extend();t.Encryptor=t.extend({processBlock:function(i,c){var o=this._cipher,d=o.blockSize;s.call(this,i,c,d,o),this._prevBlock=i.slice(c,c+d)}}),t.Decryptor=t.extend({processBlock:function(i,c){var o=this._cipher,d=o.blockSize,n=i.slice(c,c+d);s.call(this,i,c,d,o),this._prevBlock=n}});function s(i,c,o,d){var n,l=this._iv;l?(n=l.slice(0),this._iv=void 0):n=this._prevBlock,d.encryptBlock(n,0);for(var g=0;g<o;g++)i[c+g]^=n[g]}return t})(),e.mode.CFB})})(Vr)),Vr.exports}var qr={exports:{}},El=qr.exports,Rs;function wl(){return Rs||(Rs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(El,function(e){return e.mode.CTR=(function(){var t=e.lib.BlockCipherMode.extend(),s=t.Encryptor=t.extend({processBlock:function(i,c){var o=this._cipher,d=o.blockSize,n=this._iv,l=this._counter;n&&(l=this._counter=n.slice(0),this._iv=void 0);var g=l.slice(0);o.encryptBlock(g,0),l[d-1]=l[d-1]+1|0;for(var f=0;f<d;f++)i[c+f]^=g[f]}});return t.Decryptor=s,t})(),e.mode.CTR})})(qr)),qr.exports}var jr={exports:{}},Cl=jr.exports,Ns;function Al(){return Ns||(Ns=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(Cl,function(e){/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */return e.mode.CTRGladman=(function(){var t=e.lib.BlockCipherMode.extend();function s(o){if((o>>24&255)===255){var d=o>>16&255,n=o>>8&255,l=o&255;d===255?(d=0,n===255?(n=0,l===255?l=0:++l):++n):++d,o=0,o+=d<<16,o+=n<<8,o+=l}else o+=1<<24;return o}function i(o){return(o[0]=s(o[0]))===0&&(o[1]=s(o[1])),o}var c=t.Encryptor=t.extend({processBlock:function(o,d){var n=this._cipher,l=n.blockSize,g=this._iv,f=this._counter;g&&(f=this._counter=g.slice(0),this._iv=void 0),i(f);var x=f.slice(0);n.encryptBlock(x,0);for(var y=0;y<l;y++)o[d+y]^=x[y]}});return t.Decryptor=c,t})(),e.mode.CTRGladman})})(jr)),jr.exports}var Kr={exports:{}},kl=Kr.exports,Is;function Dl(){return Is||(Is=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(kl,function(e){return e.mode.OFB=(function(){var t=e.lib.BlockCipherMode.extend(),s=t.Encryptor=t.extend({processBlock:function(i,c){var o=this._cipher,d=o.blockSize,n=this._iv,l=this._keystream;n&&(l=this._keystream=n.slice(0),this._iv=void 0),o.encryptBlock(l,0);for(var g=0;g<d;g++)i[c+g]^=l[g]}});return t.Decryptor=s,t})(),e.mode.OFB})})(Kr)),Kr.exports}var Gr={exports:{}},Fl=Gr.exports,Hs;function Sl(){return Hs||(Hs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(Fl,function(e){return e.mode.ECB=(function(){var t=e.lib.BlockCipherMode.extend();return t.Encryptor=t.extend({processBlock:function(s,i){this._cipher.encryptBlock(s,i)}}),t.Decryptor=t.extend({processBlock:function(s,i){this._cipher.decryptBlock(s,i)}}),t})(),e.mode.ECB})})(Gr)),Gr.exports}var Yr={exports:{}},$l=Yr.exports,Ls;function Pl(){return Ls||(Ls=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})($l,function(e){return e.pad.AnsiX923={pad:function(t,s){var i=t.sigBytes,c=s*4,o=c-i%c,d=i+o-1;t.clamp(),t.words[d>>>2]|=o<<24-d%4*8,t.sigBytes+=o},unpad:function(t){var s=t.words[t.sigBytes-1>>>2]&255;t.sigBytes-=s}},e.pad.Ansix923})})(Yr)),Yr.exports}var Xr={exports:{}},Tl=Xr.exports,Os;function Ml(){return Os||(Os=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(Tl,function(e){return e.pad.Iso10126={pad:function(t,s){var i=s*4,c=i-t.sigBytes%i;t.concat(e.lib.WordArray.random(c-1)).concat(e.lib.WordArray.create([c<<24],1))},unpad:function(t){var s=t.words[t.sigBytes-1>>>2]&255;t.sigBytes-=s}},e.pad.Iso10126})})(Xr)),Xr.exports}var Zr={exports:{}},zl=Zr.exports,Us;function Rl(){return Us||(Us=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(zl,function(e){return e.pad.Iso97971={pad:function(t,s){t.concat(e.lib.WordArray.create([2147483648],1)),e.pad.ZeroPadding.pad(t,s)},unpad:function(t){e.pad.ZeroPadding.unpad(t),t.sigBytes--}},e.pad.Iso97971})})(Zr)),Zr.exports}var Qr={exports:{}},Nl=Qr.exports,Ws;function Il(){return Ws||(Ws=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(Nl,function(e){return e.pad.ZeroPadding={pad:function(t,s){var i=s*4;t.clamp(),t.sigBytes+=i-(t.sigBytes%i||i)},unpad:function(t){for(var s=t.words,i=t.sigBytes-1,i=t.sigBytes-1;i>=0;i--)if(s[i>>>2]>>>24-i%4*8&255){t.sigBytes=i+1;break}}},e.pad.ZeroPadding})})(Qr)),Qr.exports}var Jr={exports:{}},Hl=Jr.exports,Vs;function Ll(){return Vs||(Vs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(Hl,function(e){return e.pad.NoPadding={pad:function(){},unpad:function(){}},e.pad.NoPadding})})(Jr)),Jr.exports}var e0={exports:{}},Ol=e0.exports,qs;function Ul(){return qs||(qs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),Xe())})(Ol,function(e){return(function(t){var s=e,i=s.lib,c=i.CipherParams,o=s.enc,d=o.Hex,n=s.format;n.Hex={stringify:function(l){return l.ciphertext.toString(d)},parse:function(l){var g=d.parse(l);return c.create({ciphertext:g})}}})(),e.format.Hex})})(e0)),e0.exports}var t0={exports:{}},Wl=t0.exports,js;function Vl(){return js||(js=1,(function(a,r){(function(e,t,s){a.exports=t(be(),jt(),Kt(),Ut(),Xe())})(Wl,function(e){return(function(){var t=e,s=t.lib,i=s.BlockCipher,c=t.algo,o=[],d=[],n=[],l=[],g=[],f=[],x=[],y=[],B=[],v=[];(function(){for(var h=[],m=0;m<256;m++)m<128?h[m]=m<<1:h[m]=m<<1^283;for(var D=0,E=0,m=0;m<256;m++){var C=E^E<<1^E<<2^E<<3^E<<4;C=C>>>8^C&255^99,o[D]=C,d[C]=D;var k=h[D],N=h[k],A=h[N],F=h[C]*257^C*16843008;n[D]=F<<24|F>>>8,l[D]=F<<16|F>>>16,g[D]=F<<8|F>>>24,f[D]=F;var F=A*16843009^N*65537^k*257^D*16843008;x[C]=F<<24|F>>>8,y[C]=F<<16|F>>>16,B[C]=F<<8|F>>>24,v[C]=F,D?(D=k^h[h[h[A^k]]],E^=h[h[E]]):D=E=1}})();var w=[0,1,2,4,8,16,32,64,128,27,54],p=c.AES=i.extend({_doReset:function(){var h;if(!(this._nRounds&&this._keyPriorReset===this._key)){for(var m=this._keyPriorReset=this._key,D=m.words,E=m.sigBytes/4,C=this._nRounds=E+6,k=(C+1)*4,N=this._keySchedule=[],A=0;A<k;A++)A<E?N[A]=D[A]:(h=N[A-1],A%E?E>6&&A%E==4&&(h=o[h>>>24]<<24|o[h>>>16&255]<<16|o[h>>>8&255]<<8|o[h&255]):(h=h<<8|h>>>24,h=o[h>>>24]<<24|o[h>>>16&255]<<16|o[h>>>8&255]<<8|o[h&255],h^=w[A/E|0]<<24),N[A]=N[A-E]^h);for(var F=this._invKeySchedule=[],T=0;T<k;T++){var A=k-T;if(T%4)var h=N[A];else var h=N[A-4];T<4||A<=4?F[T]=h:F[T]=x[o[h>>>24]]^y[o[h>>>16&255]]^B[o[h>>>8&255]]^v[o[h&255]]}}},encryptBlock:function(h,m){this._doCryptBlock(h,m,this._keySchedule,n,l,g,f,o)},decryptBlock:function(h,m){var D=h[m+1];h[m+1]=h[m+3],h[m+3]=D,this._doCryptBlock(h,m,this._invKeySchedule,x,y,B,v,d);var D=h[m+1];h[m+1]=h[m+3],h[m+3]=D},_doCryptBlock:function(h,m,D,E,C,k,N,A){for(var F=this._nRounds,T=h[m]^D[0],I=h[m+1]^D[1],V=h[m+2]^D[2],K=h[m+3]^D[3],Y=4,se=1;se<F;se++){var ee=E[T>>>24]^C[I>>>16&255]^k[V>>>8&255]^N[K&255]^D[Y++],J=E[I>>>24]^C[V>>>16&255]^k[K>>>8&255]^N[T&255]^D[Y++],j=E[V>>>24]^C[K>>>16&255]^k[T>>>8&255]^N[I&255]^D[Y++],$=E[K>>>24]^C[T>>>16&255]^k[I>>>8&255]^N[V&255]^D[Y++];T=ee,I=J,V=j,K=$}var ee=(A[T>>>24]<<24|A[I>>>16&255]<<16|A[V>>>8&255]<<8|A[K&255])^D[Y++],J=(A[I>>>24]<<24|A[V>>>16&255]<<16|A[K>>>8&255]<<8|A[T&255])^D[Y++],j=(A[V>>>24]<<24|A[K>>>16&255]<<16|A[T>>>8&255]<<8|A[I&255])^D[Y++],$=(A[K>>>24]<<24|A[T>>>16&255]<<16|A[I>>>8&255]<<8|A[V&255])^D[Y++];h[m]=ee,h[m+1]=J,h[m+2]=j,h[m+3]=$},keySize:256/32});t.AES=i._createHelper(p)})(),e.AES})})(t0)),t0.exports}var r0={exports:{}},ql=r0.exports,Ks;function jl(){return Ks||(Ks=1,(function(a,r){(function(e,t,s){a.exports=t(be(),jt(),Kt(),Ut(),Xe())})(ql,function(e){return(function(){var t=e,s=t.lib,i=s.WordArray,c=s.BlockCipher,o=t.algo,d=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],n=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],l=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],g=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],f=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],x=o.DES=c.extend({_doReset:function(){for(var w=this._key,p=w.words,h=[],m=0;m<56;m++){var D=d[m]-1;h[m]=p[D>>>5]>>>31-D%32&1}for(var E=this._subKeys=[],C=0;C<16;C++){for(var k=E[C]=[],N=l[C],m=0;m<24;m++)k[m/6|0]|=h[(n[m]-1+N)%28]<<31-m%6,k[4+(m/6|0)]|=h[28+(n[m+24]-1+N)%28]<<31-m%6;k[0]=k[0]<<1|k[0]>>>31;for(var m=1;m<7;m++)k[m]=k[m]>>>(m-1)*4+3;k[7]=k[7]<<5|k[7]>>>27}for(var A=this._invSubKeys=[],m=0;m<16;m++)A[m]=E[15-m]},encryptBlock:function(w,p){this._doCryptBlock(w,p,this._subKeys)},decryptBlock:function(w,p){this._doCryptBlock(w,p,this._invSubKeys)},_doCryptBlock:function(w,p,h){this._lBlock=w[p],this._rBlock=w[p+1],y.call(this,4,252645135),y.call(this,16,65535),B.call(this,2,858993459),B.call(this,8,16711935),y.call(this,1,1431655765);for(var m=0;m<16;m++){for(var D=h[m],E=this._lBlock,C=this._rBlock,k=0,N=0;N<8;N++)k|=g[N][((C^D[N])&f[N])>>>0];this._lBlock=C,this._rBlock=E^k}var A=this._lBlock;this._lBlock=this._rBlock,this._rBlock=A,y.call(this,1,1431655765),B.call(this,8,16711935),B.call(this,2,858993459),y.call(this,16,65535),y.call(this,4,252645135),w[p]=this._lBlock,w[p+1]=this._rBlock},keySize:64/32,ivSize:64/32,blockSize:64/32});function y(w,p){var h=(this._lBlock>>>w^this._rBlock)&p;this._rBlock^=h,this._lBlock^=h<<w}function B(w,p){var h=(this._rBlock>>>w^this._lBlock)&p;this._lBlock^=h,this._rBlock^=h<<w}t.DES=c._createHelper(x);var v=o.TripleDES=c.extend({_doReset:function(){var w=this._key,p=w.words;if(p.length!==2&&p.length!==4&&p.length<6)throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");var h=p.slice(0,2),m=p.length<4?p.slice(0,2):p.slice(2,4),D=p.length<6?p.slice(0,2):p.slice(4,6);this._des1=x.createEncryptor(i.create(h)),this._des2=x.createEncryptor(i.create(m)),this._des3=x.createEncryptor(i.create(D))},encryptBlock:function(w,p){this._des1.encryptBlock(w,p),this._des2.decryptBlock(w,p),this._des3.encryptBlock(w,p)},decryptBlock:function(w,p){this._des3.decryptBlock(w,p),this._des2.encryptBlock(w,p),this._des1.decryptBlock(w,p)},keySize:192/32,ivSize:64/32,blockSize:64/32});t.TripleDES=c._createHelper(v)})(),e.TripleDES})})(r0)),r0.exports}var a0={exports:{}},Kl=a0.exports,Gs;function Gl(){return Gs||(Gs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),jt(),Kt(),Ut(),Xe())})(Kl,function(e){return(function(){var t=e,s=t.lib,i=s.StreamCipher,c=t.algo,o=c.RC4=i.extend({_doReset:function(){for(var l=this._key,g=l.words,f=l.sigBytes,x=this._S=[],y=0;y<256;y++)x[y]=y;for(var y=0,B=0;y<256;y++){var v=y%f,w=g[v>>>2]>>>24-v%4*8&255;B=(B+x[y]+w)%256;var p=x[y];x[y]=x[B],x[B]=p}this._i=this._j=0},_doProcessBlock:function(l,g){l[g]^=d.call(this)},keySize:256/32,ivSize:0});function d(){for(var l=this._S,g=this._i,f=this._j,x=0,y=0;y<4;y++){g=(g+1)%256,f=(f+l[g])%256;var B=l[g];l[g]=l[f],l[f]=B,x|=l[(l[g]+l[f])%256]<<24-y*8}return this._i=g,this._j=f,x}t.RC4=i._createHelper(o);var n=c.RC4Drop=o.extend({cfg:o.cfg.extend({drop:192}),_doReset:function(){o._doReset.call(this);for(var l=this.cfg.drop;l>0;l--)d.call(this)}});t.RC4Drop=i._createHelper(n)})(),e.RC4})})(a0)),a0.exports}var s0={exports:{}},Yl=s0.exports,Ys;function Xl(){return Ys||(Ys=1,(function(a,r){(function(e,t,s){a.exports=t(be(),jt(),Kt(),Ut(),Xe())})(Yl,function(e){return(function(){var t=e,s=t.lib,i=s.StreamCipher,c=t.algo,o=[],d=[],n=[],l=c.Rabbit=i.extend({_doReset:function(){for(var f=this._key.words,x=this.cfg.iv,y=0;y<4;y++)f[y]=(f[y]<<8|f[y]>>>24)&16711935|(f[y]<<24|f[y]>>>8)&4278255360;var B=this._X=[f[0],f[3]<<16|f[2]>>>16,f[1],f[0]<<16|f[3]>>>16,f[2],f[1]<<16|f[0]>>>16,f[3],f[2]<<16|f[1]>>>16],v=this._C=[f[2]<<16|f[2]>>>16,f[0]&4294901760|f[1]&65535,f[3]<<16|f[3]>>>16,f[1]&4294901760|f[2]&65535,f[0]<<16|f[0]>>>16,f[2]&4294901760|f[3]&65535,f[1]<<16|f[1]>>>16,f[3]&4294901760|f[0]&65535];this._b=0;for(var y=0;y<4;y++)g.call(this);for(var y=0;y<8;y++)v[y]^=B[y+4&7];if(x){var w=x.words,p=w[0],h=w[1],m=(p<<8|p>>>24)&16711935|(p<<24|p>>>8)&4278255360,D=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360,E=m>>>16|D&4294901760,C=D<<16|m&65535;v[0]^=m,v[1]^=E,v[2]^=D,v[3]^=C,v[4]^=m,v[5]^=E,v[6]^=D,v[7]^=C;for(var y=0;y<4;y++)g.call(this)}},_doProcessBlock:function(f,x){var y=this._X;g.call(this),o[0]=y[0]^y[5]>>>16^y[3]<<16,o[1]=y[2]^y[7]>>>16^y[5]<<16,o[2]=y[4]^y[1]>>>16^y[7]<<16,o[3]=y[6]^y[3]>>>16^y[1]<<16;for(var B=0;B<4;B++)o[B]=(o[B]<<8|o[B]>>>24)&16711935|(o[B]<<24|o[B]>>>8)&4278255360,f[x+B]^=o[B]},blockSize:128/32,ivSize:64/32});function g(){for(var f=this._X,x=this._C,y=0;y<8;y++)d[y]=x[y];x[0]=x[0]+1295307597+this._b|0,x[1]=x[1]+3545052371+(x[0]>>>0<d[0]>>>0?1:0)|0,x[2]=x[2]+886263092+(x[1]>>>0<d[1]>>>0?1:0)|0,x[3]=x[3]+1295307597+(x[2]>>>0<d[2]>>>0?1:0)|0,x[4]=x[4]+3545052371+(x[3]>>>0<d[3]>>>0?1:0)|0,x[5]=x[5]+886263092+(x[4]>>>0<d[4]>>>0?1:0)|0,x[6]=x[6]+1295307597+(x[5]>>>0<d[5]>>>0?1:0)|0,x[7]=x[7]+3545052371+(x[6]>>>0<d[6]>>>0?1:0)|0,this._b=x[7]>>>0<d[7]>>>0?1:0;for(var y=0;y<8;y++){var B=f[y]+x[y],v=B&65535,w=B>>>16,p=((v*v>>>17)+v*w>>>15)+w*w,h=((B&4294901760)*B|0)+((B&65535)*B|0);n[y]=p^h}f[0]=n[0]+(n[7]<<16|n[7]>>>16)+(n[6]<<16|n[6]>>>16)|0,f[1]=n[1]+(n[0]<<8|n[0]>>>24)+n[7]|0,f[2]=n[2]+(n[1]<<16|n[1]>>>16)+(n[0]<<16|n[0]>>>16)|0,f[3]=n[3]+(n[2]<<8|n[2]>>>24)+n[1]|0,f[4]=n[4]+(n[3]<<16|n[3]>>>16)+(n[2]<<16|n[2]>>>16)|0,f[5]=n[5]+(n[4]<<8|n[4]>>>24)+n[3]|0,f[6]=n[6]+(n[5]<<16|n[5]>>>16)+(n[4]<<16|n[4]>>>16)|0,f[7]=n[7]+(n[6]<<8|n[6]>>>24)+n[5]|0}t.Rabbit=i._createHelper(l)})(),e.Rabbit})})(s0)),s0.exports}var i0={exports:{}},Zl=i0.exports,Xs;function Ql(){return Xs||(Xs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),jt(),Kt(),Ut(),Xe())})(Zl,function(e){return(function(){var t=e,s=t.lib,i=s.StreamCipher,c=t.algo,o=[],d=[],n=[],l=c.RabbitLegacy=i.extend({_doReset:function(){var f=this._key.words,x=this.cfg.iv,y=this._X=[f[0],f[3]<<16|f[2]>>>16,f[1],f[0]<<16|f[3]>>>16,f[2],f[1]<<16|f[0]>>>16,f[3],f[2]<<16|f[1]>>>16],B=this._C=[f[2]<<16|f[2]>>>16,f[0]&4294901760|f[1]&65535,f[3]<<16|f[3]>>>16,f[1]&4294901760|f[2]&65535,f[0]<<16|f[0]>>>16,f[2]&4294901760|f[3]&65535,f[1]<<16|f[1]>>>16,f[3]&4294901760|f[0]&65535];this._b=0;for(var v=0;v<4;v++)g.call(this);for(var v=0;v<8;v++)B[v]^=y[v+4&7];if(x){var w=x.words,p=w[0],h=w[1],m=(p<<8|p>>>24)&16711935|(p<<24|p>>>8)&4278255360,D=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360,E=m>>>16|D&4294901760,C=D<<16|m&65535;B[0]^=m,B[1]^=E,B[2]^=D,B[3]^=C,B[4]^=m,B[5]^=E,B[6]^=D,B[7]^=C;for(var v=0;v<4;v++)g.call(this)}},_doProcessBlock:function(f,x){var y=this._X;g.call(this),o[0]=y[0]^y[5]>>>16^y[3]<<16,o[1]=y[2]^y[7]>>>16^y[5]<<16,o[2]=y[4]^y[1]>>>16^y[7]<<16,o[3]=y[6]^y[3]>>>16^y[1]<<16;for(var B=0;B<4;B++)o[B]=(o[B]<<8|o[B]>>>24)&16711935|(o[B]<<24|o[B]>>>8)&4278255360,f[x+B]^=o[B]},blockSize:128/32,ivSize:64/32});function g(){for(var f=this._X,x=this._C,y=0;y<8;y++)d[y]=x[y];x[0]=x[0]+1295307597+this._b|0,x[1]=x[1]+3545052371+(x[0]>>>0<d[0]>>>0?1:0)|0,x[2]=x[2]+886263092+(x[1]>>>0<d[1]>>>0?1:0)|0,x[3]=x[3]+1295307597+(x[2]>>>0<d[2]>>>0?1:0)|0,x[4]=x[4]+3545052371+(x[3]>>>0<d[3]>>>0?1:0)|0,x[5]=x[5]+886263092+(x[4]>>>0<d[4]>>>0?1:0)|0,x[6]=x[6]+1295307597+(x[5]>>>0<d[5]>>>0?1:0)|0,x[7]=x[7]+3545052371+(x[6]>>>0<d[6]>>>0?1:0)|0,this._b=x[7]>>>0<d[7]>>>0?1:0;for(var y=0;y<8;y++){var B=f[y]+x[y],v=B&65535,w=B>>>16,p=((v*v>>>17)+v*w>>>15)+w*w,h=((B&4294901760)*B|0)+((B&65535)*B|0);n[y]=p^h}f[0]=n[0]+(n[7]<<16|n[7]>>>16)+(n[6]<<16|n[6]>>>16)|0,f[1]=n[1]+(n[0]<<8|n[0]>>>24)+n[7]|0,f[2]=n[2]+(n[1]<<16|n[1]>>>16)+(n[0]<<16|n[0]>>>16)|0,f[3]=n[3]+(n[2]<<8|n[2]>>>24)+n[1]|0,f[4]=n[4]+(n[3]<<16|n[3]>>>16)+(n[2]<<16|n[2]>>>16)|0,f[5]=n[5]+(n[4]<<8|n[4]>>>24)+n[3]|0,f[6]=n[6]+(n[5]<<16|n[5]>>>16)+(n[4]<<16|n[4]>>>16)|0,f[7]=n[7]+(n[6]<<8|n[6]>>>24)+n[5]|0}t.RabbitLegacy=i._createHelper(l)})(),e.RabbitLegacy})})(i0)),i0.exports}var n0={exports:{}},Jl=n0.exports,Zs;function ec(){return Zs||(Zs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),jt(),Kt(),Ut(),Xe())})(Jl,function(e){return(function(){var t=e,s=t.lib,i=s.BlockCipher,c=t.algo;const o=16,d=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],n=[[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946],[1266315497,3048417604,3681880366,3289982499,290971e4,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055],[3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504],[976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409e3,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462]];var l={pbox:[],sbox:[]};function g(v,w){let p=w>>24&255,h=w>>16&255,m=w>>8&255,D=w&255,E=v.sbox[0][p]+v.sbox[1][h];return E=E^v.sbox[2][m],E=E+v.sbox[3][D],E}function f(v,w,p){let h=w,m=p,D;for(let E=0;E<o;++E)h=h^v.pbox[E],m=g(v,h)^m,D=h,h=m,m=D;return D=h,h=m,m=D,m=m^v.pbox[o],h=h^v.pbox[o+1],{left:h,right:m}}function x(v,w,p){let h=w,m=p,D;for(let E=o+1;E>1;--E)h=h^v.pbox[E],m=g(v,h)^m,D=h,h=m,m=D;return D=h,h=m,m=D,m=m^v.pbox[1],h=h^v.pbox[0],{left:h,right:m}}function y(v,w,p){for(let C=0;C<4;C++){v.sbox[C]=[];for(let k=0;k<256;k++)v.sbox[C][k]=n[C][k]}let h=0;for(let C=0;C<o+2;C++)v.pbox[C]=d[C]^w[h],h++,h>=p&&(h=0);let m=0,D=0,E=0;for(let C=0;C<o+2;C+=2)E=f(v,m,D),m=E.left,D=E.right,v.pbox[C]=m,v.pbox[C+1]=D;for(let C=0;C<4;C++)for(let k=0;k<256;k+=2)E=f(v,m,D),m=E.left,D=E.right,v.sbox[C][k]=m,v.sbox[C][k+1]=D;return!0}var B=c.Blowfish=i.extend({_doReset:function(){if(this._keyPriorReset!==this._key){var v=this._keyPriorReset=this._key,w=v.words,p=v.sigBytes/4;y(l,w,p)}},encryptBlock:function(v,w){var p=f(l,v[w],v[w+1]);v[w]=p.left,v[w+1]=p.right},decryptBlock:function(v,w){var p=x(l,v[w],v[w+1]);v[w]=p.left,v[w+1]=p.right},blockSize:64/32,keySize:128/32,ivSize:64/32});t.Blowfish=i._createHelper(B)})(),e.Blowfish})})(n0)),n0.exports}var tc=Cr.exports,Qs;function rc(){return Qs||(Qs=1,(function(a,r){(function(e,t,s){a.exports=t(be(),v0(),Qo(),el(),jt(),al(),Kt(),Ei(),ga(),ll(),wi(),dl(),vl(),pl(),ya(),yl(),Ut(),Xe(),Bl(),wl(),Al(),Dl(),Sl(),Pl(),Ml(),Rl(),Il(),Ll(),Ul(),Vl(),jl(),Gl(),Xl(),Ql(),ec())})(tc,function(e){return e})})(Cr)),Cr.exports}var Vt=rc();function G0(a){const r=a.sigBytes,e=new ArrayBuffer(r),t=new Uint8Array(e);for(let s=0;s<r;s++)t[s]=a.words[s>>>2]>>>24-s%4*8&255;return e}function Y0(a){const r=new Uint8Array(a),e=r.length,t=[];for(let s=0;s<e;s++)t[s>>>2]|=r[s]<<24-s%4*8;return Vt.lib.WordArray.create(t,e)}var wr;let ac=(wr=class{static deriveKey(r,e){return Vt.PBKDF2(r,e,{keySize:this.KEY_SIZE,iterations:this.ITERATIONS})}static async encrypt(r,e){const t=Vt.lib.WordArray.random(16),s=this.deriveKey(e,t),i=Vt.lib.WordArray.random(128/8),c=Vt.AES.encrypt(JSON.stringify(r),s,{iv:i}),o={data:G0(c.ciphertext),salt:G0(t),iv:G0(i)};return JSON.stringify(o,(d,n)=>n instanceof ArrayBuffer?{type:"Buffer",data:Array.from(new Uint8Array(n))}:n)}static async decrypt(r,e){const t=JSON.parse(r,(l,g)=>g&&g.type==="Buffer"?new Uint8Array(g.data).buffer:g),s=Y0(t.salt),i=Y0(t.iv),c=this.deriveKey(e,s),o=Y0(t.data),n=Vt.AES.decrypt({ciphertext:o},c,{iv:i}).toString(Vt.enc.Utf8);if(!n)throw new Error("Decryption failed. Invalid password?");return JSON.parse(n)}static async verifyPassword(r,e){try{return await this.decrypt(r,e),!0}catch{return!1}}},Ge(wr,"KEY_SIZE",256/32),Ge(wr,"ITERATIONS",6e5),wr);const St=ac;class Ct{static async exportVault(r,e,t={}){const s={format:"standard",includeMetadata:!0,testAfterExport:!1,...t};try{const i=await St.encrypt(r,e),c=this.arrayBufferToBase64(i.data),o=this.arrayBufferToBase64(i.iv),d=this.arrayBufferToBase64(i.salt),n=await this.calculateChecksum(c),l={version:this.VERSION,app:this.APP_NAME,created:new Date().toISOString(),platform:this.detectPlatform(),itemCount:r.length,data:c,iv:o,salt:d,checksum:n},g=new Blob([JSON.stringify(l,null,2)],{type:"application/json"}),f=this.generateFileName();if(s.testAfterExport){const x=await this.verifyBackup(g,e);if(!x.valid)throw console.error("[BackupManager] Verification failed:",x.error),new Error(x.error||"Backup verification failed")}return{success:!0,filename:f,size:g.size,timestamp:new Date}}catch(i){const c=i instanceof Error?i.message:"Unknown error";throw console.error("[BackupManager] Export failed:",i),new Error(`Export failed: ${c}`)}}static async quickExport(r,e){await new Promise(l=>setTimeout(l,0));const t=await St.encrypt(r,e);await new Promise(l=>setTimeout(l,0));const s=this.arrayBufferToBase64(t.data),i=this.arrayBufferToBase64(t.iv),c=this.arrayBufferToBase64(t.salt);await new Promise(l=>setTimeout(l,0));const o=await this.calculateChecksum(s);await new Promise(l=>setTimeout(l,0));const d={version:this.VERSION,app:this.APP_NAME,created:new Date().toISOString(),platform:this.detectPlatform(),itemCount:r.length,data:s,iv:i,salt:c,checksum:o};return new Blob([JSON.stringify(d,null,2)],{type:"application/json"})}static async verifyBackup(r,e){try{const t=await r.text(),s=JSON.parse(t);if(!s.app||s.app!==this.APP_NAME)return{valid:!1,error:"Invalid vault file format"};if(await this.calculateChecksum(s.data)!==s.checksum)return{valid:!1,error:"File integrity check failed (checksum mismatch)"};const c={data:this.base64ToArrayBuffer(s.data),iv:this.base64ToArrayBuffer(s.iv),salt:this.base64ToArrayBuffer(s.salt)};return{valid:!0,itemCount:(await St.decrypt(c,e)).length,version:s.version}}catch(t){const s=t instanceof Error?t.message:"Unknown error";return console.error("[BackupManager] Verification error:",t),{valid:!1,error:s}}}static generateFileName(){return`pocketvault-backup-${new Date().toISOString().split("T")[0]}.vault`}static triggerDownload(r,e){if(typeof window>"u")return;const t=URL.createObjectURL(r),s=document.createElement("a");s.href=t,s.download=e,s.click(),URL.revokeObjectURL(t)}static async calculateChecksum(r){if(typeof window>"u")return"";const t=new TextEncoder().encode(r),s=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(s)).map(c=>c.toString(16).padStart(2,"0")).join("")}static detectPlatform(){if(typeof window>"u")return"unknown";const r=navigator.userAgent.toLowerCase();return/iphone|ipad|ipod/.test(r)?"ios":/android/.test(r)?"android":"desktop"}static arrayBufferToBase64(r){const e=new Uint8Array(r);if(e.byteLength<1024*1024){let i="";for(let c=0;c<e.byteLength;c++)i+=String.fromCharCode(e[c]);return btoa(i)}const t=8192;let s="";for(let i=0;i<e.byteLength;i+=t){const c=e.slice(i,i+t);for(let o=0;o<c.length;o++)s+=String.fromCharCode(c[o])}return btoa(s)}static base64ToArrayBuffer(r){const e=atob(r),t=new Uint8Array(e.length);for(let s=0;s<e.length;s++)t[s]=e.charCodeAt(s);return t.buffer}}Ge(Ct,"APP_NAME","PocketVault"),Ge(Ct,"VERSION",1);class hr{static async importVault(r,e,t=[]){try{const s=await this.validateVaultFile(r);if(!s.valid)throw console.error("[RestoreManager] Validation failed:",s.error),new Error(s.error||"Invalid vault file");const i=await r.text();if(!i||i.trim().length===0)throw new Error("File is empty");let c;try{c=JSON.parse(i)}catch(g){throw console.error("[RestoreManager] JSON parse error:",g),new Error("Invalid JSON format in vault file")}if(!c.data||!c.iv||!c.salt)throw new Error("Missing encryption data in vault file");let o;try{o={data:this.base64ToArrayBuffer(c.data),iv:this.base64ToArrayBuffer(c.iv),salt:this.base64ToArrayBuffer(c.salt)}}catch(g){throw console.error("[RestoreManager] Base64 decode error:",g),new Error("Invalid encryption data format")}let d;try{d=await St.decrypt(o,e)}catch(g){throw console.error("[RestoreManager] Decryption error:",g),new Error("Wrong password or corrupted vault file")}if(!Array.isArray(d))throw new Error("Invalid vault data structure");for(const g of d)if(!g.id||!g.title)throw new Error("Invalid item structure in vault");const n=this.previewMerge(d,t),l=this.applyMerge(n);return{success:!0,stats:n.stats,items:l}}catch(s){const i=s instanceof Error?s.message:"Unknown error";throw console.error("[RestoreManager] Import failed:",s),new Error(i)}}static async validateVaultFile(r){try{if(r.size===0)return{valid:!1,error:"File is empty"};if(r.size>10*1024*1024)return{valid:!1,error:"File too large (max 10MB)"};if(!r.name.endsWith(".vault"))return{valid:!1,error:"Invalid file extension. Expected .vault file"};let e;try{e=await r.text()}catch(s){return console.error("[RestoreManager] File read error:",s),{valid:!1,error:"Cannot read file"}}if(!e||e.trim().length===0)return{valid:!1,error:"File is empty"};let t;try{t=JSON.parse(e)}catch(s){return console.error("[RestoreManager] JSON parse error:",s),{valid:!1,error:"Invalid JSON format"}}if(!t.app||t.app!==this.APP_NAME)return{valid:!1,error:"Not a valid PocketVault file"};if(!t.version||!this.SUPPORTED_VERSIONS.includes(t.version))return{valid:!1,error:`Unsupported version: ${t.version}. Supported: ${this.SUPPORTED_VERSIONS.join(", ")}`};if(!t.data||typeof t.data!="string")return{valid:!1,error:"Missing or invalid encryption data"};if(!t.iv||typeof t.iv!="string")return{valid:!1,error:"Missing or invalid encryption IV"};if(!t.salt||typeof t.salt!="string")return{valid:!1,error:"Missing or invalid encryption salt"};if(t.checksum)try{if(await this.calculateChecksum(t.data)!==t.checksum)return{valid:!1,error:"File integrity check failed. File may be corrupted"}}catch(s){return console.error("[RestoreManager] Checksum calculation error:",s),{valid:!1,error:"Cannot verify file integrity"}}return{valid:!0,format:"standard",version:t.version}}catch(e){const t=e instanceof Error?e.message:"Unknown error";return console.error("[RestoreManager] Validation error:",e),{valid:!1,error:`File validation failed: ${t}`}}}static previewMerge(r,e){const t=[],s=[],i=[],c=new Map;e.forEach(d=>c.set(d.id,d));for(const d of r)c.has(d.id)?(s.push(d),c.delete(d.id)):t.push(d);c.forEach(d=>i.push(d));const o={newCount:t.length,updatedCount:s.length,unchangedCount:i.length,totalCount:t.length+s.length+i.length};return{newItems:t,updatedItems:s,unchangedItems:i,stats:o}}static applyMerge(r){return[...r.newItems,...r.updatedItems,...r.unchangedItems]}static async calculateChecksum(r){if(typeof window>"u")return"";const t=new TextEncoder().encode(r),s=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(s)).map(c=>c.toString(16).padStart(2,"0")).join("")}static base64ToArrayBuffer(r){const e=atob(r),t=new Uint8Array(e.length);for(let s=0;s<e.length;s++)t[s]=e.charCodeAt(s);return t.buffer}}Ge(hr,"APP_NAME","PocketVault"),Ge(hr,"SUPPORTED_VERSIONS",[1]);const sc="PocketVaultDB",ic=1,It="vault";class Ye{static async openDB(){if(typeof window>"u")throw new Error("Ứng dụng chỉ hoạt động trên trình duyệt");return this.db?this.db:new Promise((r,e)=>{const t=indexedDB.open(sc,ic);t.onerror=()=>e(t.error),t.onsuccess=()=>{this.db=t.result,r(t.result)},t.onupgradeneeded=s=>{const i=s.target.result;i.objectStoreNames.contains(It)||i.createObjectStore(It)}})}static async saveVault(r,e){const t=new Promise((i,c)=>setTimeout(()=>c(new Error("Save timeout after 10 seconds")),1e4)),s=(async()=>{const i=await this.openDB(),c=await St.encrypt(r,e),o={data:this.arrayBufferToBase64(c.data),iv:this.arrayBufferToBase64(c.iv),salt:this.arrayBufferToBase64(c.salt),timestamp:Date.now()};return new Promise((d,n)=>{const l=i.transaction([It],"readwrite"),f=l.objectStore(It).put(o,"vault");l.oncomplete=()=>{d()},l.onerror=()=>{console.error("[Storage] Transaction error:",l.error),n(l.error||new Error("Transaction failed"))},l.onabort=()=>{console.error("[Storage] Transaction aborted"),n(new Error("Transaction aborted"))},f.onsuccess=()=>{},f.onerror=()=>{console.error("[Storage] Request error:",f.error),n(f.error||new Error("Put request failed"))}})})();try{await Promise.race([s,t])}catch(i){throw console.error("[Storage] Save failed:",i),i}}static async loadVault(r){const e=Date.now(),t=new Promise((i,c)=>setTimeout(()=>c(new Error("Load timeout after 10 seconds")),1e4)),s=(async()=>{const i=await this.openDB();return new Promise((c,o)=>{const d=i.transaction([It],"readonly"),l=d.objectStore(It).get("vault");d.onerror=()=>{console.error("[Storage] Transaction error:",d.error),o(d.error)},l.onerror=()=>{console.error("[Storage] Request error:",l.error),o(l.error)},l.onsuccess=async()=>{if(!l.result){c([]);return}try{const g={data:this.base64ToArrayBuffer(l.result.data),iv:this.base64ToArrayBuffer(l.result.iv),salt:this.base64ToArrayBuffer(l.result.salt)},f=await St.decrypt(g,r);c(f)}catch(g){console.error("[Storage] Decrypt error:",g),o(g)}}})})();try{return await Promise.race([s,t])}catch(i){throw console.error("[Storage] Load failed:",i),i}}static async hasVault(){if(typeof window>"u")return!1;const r=await this.openDB();return new Promise((e,t)=>{const c=r.transaction([It],"readonly").objectStore(It).get("vault");c.onerror=()=>t(c.error),c.onsuccess=()=>e(!!c.result)})}static async exportVault(r){const e=await this.loadVault(r);return Ct.quickExport(e,r)}static async importVault(r,e){return(await hr.importVault(r,e,[])).items}static arrayBufferToBase64(r){const e=new Uint8Array(r);let t="";for(let s=0;s<e.byteLength;s++)t+=String.fromCharCode(e[s]);return btoa(t)}static base64ToArrayBuffer(r){const e=atob(r),t=new Uint8Array(e.length);for(let s=0;s<e.length;s++)t[s]=e.charCodeAt(s);return t.buffer}}Ge(Ye,"db",null);class mt{static isSupported(){return typeof window>"u"?!1:"credentials"in navigator&&"create"in navigator.credentials}static async isAvailable(){if(typeof window>"u"||!this.isSupported())return!1;try{return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()}catch(r){return console.log("Biometric check failed:",r),!1}}static async register(r="pocketvault-user"){if(typeof window>"u"||!await this.isAvailable())throw new Error("Biometric authentication not available");const e=crypto.getRandomValues(new Uint8Array(32)),t=crypto.getRandomValues(new Uint8Array(32)),s={challenge:e,rp:{name:"PocketVault",id:window.location.hostname},user:{id:t,name:r,displayName:"PocketVault User"},pubKeyCredParams:[{alg:-7,type:"public-key"}],authenticatorSelection:{authenticatorAttachment:"platform",userVerification:"required"},timeout:6e4,attestation:"direct"};try{const i=await navigator.credentials.create({publicKey:s}),c=Array.from(new Uint8Array(i.rawId)).map(o=>o.toString(16).padStart(2,"0")).join("");return localStorage.setItem("pv_biometric_id",c),localStorage.setItem("pv_biometric_enabled","true"),{success:!0,credentialId:c,credential:i}}catch(i){throw console.error("Biometric registration failed:",i),new Error("Failed to register biometric authentication")}}static async authenticate(){if(typeof window>"u")throw new Error("Biometric authentication not available on server");const r=localStorage.getItem("pv_biometric_id");if(!r||!await this.isAvailable())throw new Error("Biometric authentication not set up");const e=crypto.getRandomValues(new Uint8Array(32)),t=new Uint8Array(r.match(/.{2}/g).map(i=>parseInt(i,16))),s={challenge:e,allowCredentials:[{id:t,type:"public-key"}],userVerification:"required",timeout:6e4};try{return{success:!0,assertion:await navigator.credentials.get({publicKey:s})}}catch(i){throw console.error("Biometric authentication failed:",i),new Error("Biometric authentication failed")}}static isEnabled(){return typeof window>"u"?!1:localStorage.getItem("pv_biometric_enabled")==="true"}static disable(){typeof window>"u"||(localStorage.removeItem("pv_biometric_id"),localStorage.removeItem("pv_biometric_enabled"))}static getBiometricType(){if(typeof window>"u")return"Biometric";const r=navigator.userAgent;return/iPhone|iPad|iPod/.test(r)?/iPhone1[0-9]|iPad/.test(r)?"FaceID":"TouchID":"Biometric"}}class qe{static shouldShowReminder(){if(typeof window>"u")return null;const r=this.loadPreferences(),e=this.getStats();return console.log("[ReminderSystem] Checking reminder conditions:",{enabled:r.enabled,neverShow:r.neverShow,shownThisSession:r.shownThisSession,passwordsSinceBackup:e.passwordsSinceBackup,daysSinceBackup:e.daysSinceBackup,lastBackupDate:e.lastBackupDate}),!r.enabled||r.neverShow?(console.log("[ReminderSystem] Reminders disabled"),null):r.shownThisSession?(console.log("[ReminderSystem] Already shown this session"),null):e.passwordsSinceBackup>=r.passwordThreshold?(console.log("[ReminderSystem] Triggering password-count reminder"),"password-count"):e.daysSinceBackup>=r.dayThreshold?(console.log("[ReminderSystem] Triggering time-based reminder"),"time-based"):e.lastBackupDate===null&&e.passwordsSinceBackup>0?(console.log("[ReminderSystem] Triggering first-time reminder"),"first-time"):(console.log("[ReminderSystem] No reminder needed"),null)}static markShownThisSession(){if(typeof window>"u")return;const r=this.loadPreferences();r.shownThisSession=!0,this.savePreferences(r)}static dismissReminder(r){if(typeof window>"u")return;console.log("[ReminderSystem] Dismissing reminder with option:",r);const e=this.loadPreferences(),t=this.getStats();switch(r){case"later":e.shownThisSession=!0,t.remindersDismissed++,console.log("[ReminderSystem] Reminder postponed");break;case"never":e.neverShow=!0,e.enabled=!1,console.log("[ReminderSystem] Reminders disabled permanently");break;case"done":console.log("[ReminderSystem] Backup completed, resetting counters"),this.recordBackup();return}this.savePreferences(e),this.saveStats(t)}static recordBackup(){if(typeof window>"u")return;console.log("[ReminderSystem] Recording backup");const r={passwordsSinceBackup:0,daysSinceBackup:0,lastBackupDate:new Date,remindersDismissed:0};this.saveStats(r);const e=this.loadPreferences();e.shownThisSession=!1,this.savePreferences(e),console.log("[ReminderSystem] Backup recorded, counters reset")}static recordPasswordAdd(){if(typeof window>"u")return;const r=this.getStats();r.passwordsSinceBackup++,this.saveStats(r),console.log("[ReminderSystem] Password added, count:",r.passwordsSinceBackup)}static getStats(){if(typeof window>"u")return this.getDefaultStats();try{const r=localStorage.getItem(this.STATS_KEY);if(!r)return this.getDefaultStats();const e=JSON.parse(r);if(e.lastBackupDate){const t=new Date(e.lastBackupDate),i=Math.abs(new Date().getTime()-t.getTime());e.daysSinceBackup=Math.floor(i/(1e3*60*60*24))}return e}catch{return this.getDefaultStats()}}static loadPreferences(){if(typeof window>"u")return this.getDefaultPreferences();try{const r=localStorage.getItem(this.STORAGE_KEY);return r?{...this.getDefaultPreferences(),...JSON.parse(r)}:this.getDefaultPreferences()}catch{return this.getDefaultPreferences()}}static savePreferences(r){if(!(typeof window>"u"))try{localStorage.setItem(this.STORAGE_KEY,JSON.stringify(r))}catch(e){console.error("Failed to save reminder preferences:",e)}}static saveStats(r){if(!(typeof window>"u"))try{localStorage.setItem(this.STATS_KEY,JSON.stringify(r))}catch(e){console.error("Failed to save reminder stats:",e)}}static getDefaultPreferences(){return{enabled:!0,passwordThreshold:this.DEFAULT_PASSWORD_THRESHOLD,dayThreshold:this.DEFAULT_DAY_THRESHOLD,neverShow:!1,shownThisSession:!1}}static getDefaultStats(){return{passwordsSinceBackup:0,daysSinceBackup:0,lastBackupDate:null,remindersDismissed:0}}static resetSession(){if(typeof window>"u")return;const r=this.loadPreferences();r.shownThisSession=!1,this.savePreferences(r)}static enableReminders(){if(typeof window>"u")return;const r=this.loadPreferences();r.enabled=!0,r.neverShow=!1,this.savePreferences(r)}static getReminderMessage(r){const e=this.getStats();switch(r){case"password-count":return`You've added ${e.passwordsSinceBackup} passwords since your last backup. Consider backing up your vault.`;case"time-based":return`It's been ${e.daysSinceBackup} days since your last backup. Keep your data safe with a backup.`;case"first-time":return`You have ${e.passwordsSinceBackup} passwords in your vault. Create your first backup to keep them safe.`;default:return"Consider backing up your vault to keep your passwords safe."}}}Ge(qe,"STORAGE_KEY","pv_reminder_prefs"),Ge(qe,"STATS_KEY","pv_reminder_stats"),Ge(qe,"DEFAULT_PASSWORD_THRESHOLD",5),Ge(qe,"DEFAULT_DAY_THRESHOLD",30);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2026 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const nc={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2026 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const oc=a=>{for(const r in a)if(r.startsWith("aria-")||r==="role"||r==="title")return!0;return!1};/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2026 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const Js=(...a)=>a.filter((r,e,t)=>!!r&&r.trim()!==""&&t.indexOf(r)===e).join(" ").trim();var lc=bn("<svg><!><!></svg>");function Ce(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]),t=_e(e,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);_t(r,!1);let s=rt(r,"name",8,void 0),i=rt(r,"color",8,"currentColor"),c=rt(r,"size",8,24),o=rt(r,"strokeWidth",8,2),d=rt(r,"absoluteStrokeWidth",8,!1),n=rt(r,"iconNode",24,()=>[]);$t();var l=lc();ps(l,(x,y,B)=>({...nc,...x,...t,width:c(),height:c(),stroke:i(),"stroke-width":y,class:B}),[()=>oc(t)?void 0:{"aria-hidden":"true"},()=>(Ie(d()),Ie(o()),Ie(c()),pe(()=>d()?Number(o())*24/Number(c()):o())),()=>(Ie(Js),Ie(s()),Ie(e),pe(()=>Js("lucide-icon","lucide",s()?`lucide-${s()}`:"",e.class)))]);var g=_(l);xr(g,1,n,u0,(x,y)=>{var B=gi(()=>ro(u(y),2));let v=()=>u(B)[0],w=()=>u(B)[1];var p=he(),h=oe(p);Co(h,v,!0,(m,D)=>{ps(m,()=>({...w()}))}),L(x,p)});var f=S(g);Be(f,r,"default",{}),b(l),L(a,l),Bt()}function f0(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M12 7v14"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}]];Ce(a,we({name:"book-open"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function ma(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2"}]];Ce(a,we({name:"briefcase"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function cc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"m6 9 6 6 6-6"}]];Ce(a,we({name:"chevron-down"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function Ci(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];Ce(a,we({name:"download"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function Ai(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];Ce(a,we({name:"eye-off"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function oa(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];Ce(a,we({name:"eye"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function la(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"}],["path",{d:"M14 13.12c0 2.38 0 6.38-1 8.88"}],["path",{d:"M17.29 21.02c.12-.6.43-2.3.5-3.02"}],["path",{d:"M2 12a10 10 0 0 1 18-6"}],["path",{d:"M2 16h.01"}],["path",{d:"M21.8 16c.2-2 .131-5.354 0-6"}],["path",{d:"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"}],["path",{d:"M8.65 22c.21-.66.45-1.32.57-2"}],["path",{d:"M9 6.8a6 6 0 0 1 9 5.2v2"}]];Ce(a,we({name:"fingerprint-pattern"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function ba(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]];Ce(a,we({name:"folder"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function _a(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["line",{x1:"6",x2:"10",y1:"11",y2:"11"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"}]];Ce(a,we({name:"gamepad-2"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function Ba(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];Ce(a,we({name:"globe"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function fc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M10 16h.01"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}],["path",{d:"M21.946 12.013H2.054"}],["path",{d:"M6 16h.01"}]];Ce(a,we({name:"hard-drive"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function Ea(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M10 18v-7"}],["path",{d:"M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"}],["path",{d:"M14 18v-7"}],["path",{d:"M18 18v-7"}],["path",{d:"M3 22h18"}],["path",{d:"M6 18v-7"}]];Ce(a,we({name:"landmark"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function dc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"m5 8 6 6"}],["path",{d:"m4 14 6-6 2-3"}],["path",{d:"M2 5h12"}],["path",{d:"M7 2h1"}],["path",{d:"m22 22-5-10-5 10"}],["path",{d:"M14 18h6"}]];Ce(a,we({name:"languages"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function uc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];Ce(a,we({name:"layout-grid"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function gr(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]];Ce(a,we({name:"lock-keyhole"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function ki(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];Ce(a,we({name:"lock"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function wa(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}]];Ce(a,we({name:"mail"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function vc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];Ce(a,we({name:"moon"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function xc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];Ce(a,we({name:"pencil"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function pc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];Ce(a,we({name:"plus"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function ca(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2"}],["path",{d:"M9 9h.01"}],["path",{d:"M15 9h.01"}]];Ce(a,we({name:"scan-face"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function ei(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"m13.5 8.5-5 5"}],["path",{d:"m8.5 8.5 5 5"}],["circle",{cx:"11",cy:"11",r:"8"}],["path",{d:"m21 21-4.3-4.3"}]];Ce(a,we({name:"search-x"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function Di(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]];Ce(a,we({name:"shield-alert"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function Zt(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];Ce(a,we({name:"shield"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function yr(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2"}],["path",{d:"M12 18h.01"}]];Ce(a,we({name:"smartphone"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function hc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];Ce(a,we({name:"sun"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function gc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];Ce(a,we({name:"trash-2"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function Fi(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];Ce(a,we({name:"triangle-alert"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function Si(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];Ce(a,we({name:"upload"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function yc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];Ce(a,we({name:"x"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}function mc(a,r){const e=_e(r,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.575.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const t=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];Ce(a,we({name:"zap"},()=>e,{get iconNode(){return t},children:(s,i)=>{var c=he(),o=oe(c);Be(o,r,"default",{}),L(s,c)},$$slots:{default:!0}}))}var bc=X('<span style="display: flex; align-items: center; justify-content: center;"><!></span>'),_c=X('<span style="display: flex; align-items: center; justify-content: center;"><!></span>'),Bc=X('<span style="display: flex; align-items: center; justify-content: center;"><!></span>'),Ec=X('<div class="glass animate-fade-in" style="background: rgba(255,107,107,0.2); border: 1px solid rgba(255,107,107,0.3); color: #ff6b6b; padding: 0.75rem; border-radius: 12px; font-size: 0.875rem; text-align: center;"> </div>'),wc=X('<div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;"><div class="glass-spinner"></div> <span>Setting up...</span></div>'),Cc=X('<div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem;"><div class="glass-modal"><div style="text-align: center; margin-bottom: 1.5rem;"><div style="font-size: 3.75rem; margin-bottom: 1rem;" class="animate-bounce-subtle"><!></div> <h1 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 0.5rem 0;" class="text-glass"> </h1> <p class="text-glass-secondary"> </p></div> <div style="display: flex; flex-direction: column; gap: 1rem;"><!> <button class="glass-btn-primary haptic-medium" style="width: 100%; padding: 1rem; font-size: 1.125rem;"><!></button> <button class="glass-btn haptic-light" style="width: 100%; padding: 0.75rem;">Skip for now</button> <div style="text-align: center;"><p style="font-size: 0.75rem; margin: 0;" class="text-glass-secondary">You can enable this later in settings</p></div></div></div></div>'),Ac=X('<button class="glass-btn-primary haptic-medium" style="width: 100%; padding: 1rem; font-size: 1.125rem;"><div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem;"><div style="font-size: 1.25rem; display: flex; align-items: center; justify-content: center;"><!></div> <span> </span></div></button> <div style="position: relative;"><div style="position: absolute; inset: 0; display: flex; align-items: center;"><div style="width: 100%; border-top: 1px solid #e2e8f0;" class="dark:border-zinc-800"></div></div> <div style="position: relative; display: flex; justify-content: center; font-size: 0.875rem;"><span class="glass text-glass-secondary" style="padding: 0 1rem; font-size: 0.75rem;">or</span></div></div>',1),kc=X('<div class="glass animate-fade-in" style="background: rgba(255,107,107,0.2); border: 1px solid rgba(255,107,107,0.3); color: #ff6b6b; padding: 0.75rem; border-radius: 12px; font-size: 0.875rem; text-align: center;"> </div>'),Dc=X('<div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;"><div class="glass-spinner"></div> <span>Unlocking...</span></div>'),Fc=X(`<div class="glass" style="padding: 1rem; text-align: center;"><p style="font-size: 0.75rem; margin: 0; line-height: 1.6;" class="text-glass-secondary">Choose a strong master password. This cannot be recovered if
              forgotten.</p></div>`),Sc=X('<div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem;"><div class="glass-modal"><div style="text-align: center; margin-bottom: 2rem;"><div style="font-size: 3.75rem; margin-bottom: 1rem; display: flex; justify-content: center;" class="animate-bounce-subtle flex justify-center w-full"><!></div> <h1 style="font-size: 1.875rem; font-weight: 700; margin: 0 0 0.5rem 0;" class="text-glass">PocketVault</h1> <p class="text-glass-secondary">Secure Password Manager</p></div> <div style="display: flex; flex-direction: column; gap: 1rem;"><!> <input type="password" class="glass-input" style="font-size: 1.125rem; padding: 1rem;"/> <!> <button class="glass-btn-primary haptic-heavy" style="width: 100%; padding: 1rem; font-size: 1.125rem;"><!></button> <!></div></div></div>');function $c(a,r){_t(r,!1);let e=te(""),t=te(""),s=te(!1),i=te(!1),c=te(!1),o=!1,d=te("Biometric");async function n(){typeof window>"u"||(P(i,await Ye.hasVault()),o=await mt.isAvailable(),l0.set(mt.isEnabled()),P(d,mt.getBiometricType()))}async function l(){if(!u(e).trim()){P(t,"Please enter your master password");return}P(s,!0),P(t,"");try{const D=await Ye.loadVault(u(e));sessionStorage.setItem("pv_master_key",u(e)),yt.set(D),ta.set(!0),is(),qe.resetSession();const E=qe.shouldShowReminder();E&&(At.set(E),qe.markShownThisSession()),o&&!mt.isEnabled()&&P(c,!0),P(e,"")}catch{P(t,"Invalid master password")}finally{P(s,!1)}}async function g(){if(!mt.isEnabled()){P(t,"Biometric authentication not set up");return}P(s,!0),P(t,"");try{await mt.authenticate();const D=sessionStorage.getItem("pv_temp_password");D?(P(e,D),await l(),sessionStorage.removeItem("pv_temp_password")):(P(t,"Please enter your master password to complete unlock"),P(s,!1))}catch{P(t,`${u(d)} authentication failed`),P(s,!1)}}async function f(){if(!u(e).trim()){P(t,"Please enter your master password first");return}try{await mt.register(),l0.set(!0),sessionStorage.setItem("pv_temp_password",u(e)),P(c,!1),await l()}catch{P(t,`Failed to set up ${u(d)}`)}}function x(){P(c,!1)}function y(D){const E=[];return D.trim()?(D.length<8&&E.push("ít nhất 8 ký tự"),/[A-Z]/.test(D)||E.push("ít nhất 1 chữ hoa"),/[a-z]/.test(D)||E.push("ít nhất 1 chữ thường"),/[0-9]/.test(D)||E.push("ít nhất 1 số"),/[!@#$%^&*(),.?":{}|<>]/.test(D)||E.push("ít nhất 1 ký tự đặc biệt"),E.length>0?`Mật khẩu phải có: ${E.join(", ")}`:null):"Vui lòng nhập mật khẩu chính"}async function B(){const D=y(u(e));if(D){P(t,D);return}P(s,!0),P(t,"");try{await Ye.saveVault([],u(e)),sessionStorage.setItem("pv_master_key",u(e)),yt.set([]),ta.set(!0),is(),o&&P(c,!0),P(e,"")}catch{P(t,"Failed to create vault")}finally{P(s,!1)}}function v(D){D.key==="Enter"&&(u(c)?f():u(i)?l():B())}br(()=>{n()}),$t();var w=he(),p=oe(w);{var h=D=>{var E=Cc(),C=_(E),k=_(C),N=_(k),A=_(N);{var F=O=>{var W=bc(),U=_(W);ca(U,{size:60,strokeWidth:1,color:"currentColor"}),b(W),L(O,W)},T=O=>{var W=_c(),U=_(W);la(U,{size:60,strokeWidth:1,color:"currentColor"}),b(W),L(O,W)},I=O=>{var W=Bc(),U=_(W);gr(U,{size:60,strokeWidth:1,color:"currentColor"}),b(W),L(O,W)};ae(A,O=>{u(d)==="FaceID"?O(F):u(d)==="TouchID"?O(T,1):O(I,-1)})}b(N);var V=S(N,2),K=_(V);b(V);var Y=S(V,2),se=_(Y);b(Y),b(k);var ee=S(k,2),J=_(ee);{var j=O=>{var W=Ec(),U=_(W,!0);b(W),Ae(()=>q(U,u(t))),L(O,W)};ae(J,O=>{u(t)&&O(j)})}var $=S(J,2),R=_($);{var H=O=>{var W=wc();L(O,W)},z=O=>{var W=fr();Ae(()=>q(W,`Enable ${u(d)??""}`)),L(O,W)};ae(R,O=>{u(s)?O(H):O(z,-1)})}b($);var M=S($,2);ye(2),b(ee),b(C),b(E),Ae(()=>{q(K,`Set up ${u(d)??""}`),q(se,`Enable ${u(d)??""} for quick and secure access`),$.disabled=u(s)}),Q("click",$,f),Q("click",M,x),L(D,E)},m=D=>{var E=Sc(),C=_(E),k=_(C),N=_(k),A=_(N);Di(A,{size:60,strokeWidth:1.5,color:"#3b82f6"}),b(N),ye(4),b(k);var F=S(k,2),T=_(F);{var I=M=>{var O=Ac(),W=oe(O),U=_(W),re=_(U),ue=_(re);{var xe=ie=>{ca(ie,{size:20,strokeWidth:1.5})},ce=ie=>{la(ie,{size:20,strokeWidth:1.5})},ve=ie=>{gr(ie,{size:20,strokeWidth:1.5})};ae(ue,ie=>{u(d)==="FaceID"?ie(xe):u(d)==="TouchID"?ie(ce,1):ie(ve,-1)})}b(re);var Z=S(re,2),me=_(Z);b(Z),b(U),b(W),ye(2),Ae(()=>{W.disabled=u(s),q(me,`Unlock with ${u(d)??""}`)}),Q("click",W,g),L(M,O)},V=gi(()=>mt.isEnabled()&&u(i));ae(T,M=>{u(V)&&M(I)})}var K=S(T,2);kt(K);var Y=S(K,2);{var se=M=>{var O=kc(),W=_(O,!0);b(O),Ae(()=>q(W,u(t))),L(M,O)};ae(Y,M=>{u(t)&&M(se)})}var ee=S(Y,2),J=_(ee);{var j=M=>{var O=Dc();L(M,O)},$=M=>{var O=fr("Unlock Vault");L(M,O)},R=M=>{var O=fr("Create Vault");L(M,O)};ae(J,M=>{u(s)?M(j):u(i)?M($,1):M(R,-1)})}b(ee);var H=S(ee,2);{var z=M=>{var O=Fc();L(M,O)};ae(H,M=>{u(i)||M(z)})}b(F),b(C),b(E),Ae(M=>{Ue(K,"placeholder",u(i)?"Enter master password":"Create master password"),K.disabled=u(s),ee.disabled=M},[()=>u(s)||!u(e).trim()]),Ht(K,()=>u(e),M=>P(e,M)),Q("keydown",K,v),Q("click",ee,function(...M){var O;(O=u(i)?l:B)==null||O.apply(this,M)}),L(D,E)};ae(p,D=>{u(c)?D(h):D(m,-1)})}L(a,w),Bt()}var Pc=X('<span><span style="display: flex; align-items: center;" class="svelte-1fcth03"><!></span> </span>'),Tc=X('<div class="field-group svelte-1fcth03"><label class="field-label text-glass-secondary svelte-1fcth03">Note</label> <div class="field-content glass-field field-note svelte-1fcth03"><span class="field-value text-glass svelte-1fcth03"> </span></div></div>'),Mc=X('<div class="card-body svelte-1fcth03"><div class="field-group svelte-1fcth03"><label class="field-label text-glass-secondary svelte-1fcth03">Username</label> <div class="field-content glass-field svelte-1fcth03"><span class="field-value text-glass svelte-1fcth03"> </span> <button class="field-btn glass-btn-primary haptic-medium svelte-1fcth03"> </button></div></div> <div class="field-group svelte-1fcth03"><label class="field-label text-glass-secondary svelte-1fcth03">Password</label> <div class="field-content glass-field svelte-1fcth03"><span class="field-value text-glass svelte-1fcth03"> </span> <div class="field-actions svelte-1fcth03"><button class="field-btn-icon glass-btn haptic-light svelte-1fcth03"><span class="action-icon svelte-1fcth03" style="display: flex; align-items: center; justify-content: center;"><!></span></button> <button class="field-btn glass-btn-primary haptic-medium svelte-1fcth03"> </button></div></div></div> <!></div>'),zc=X('<div class="verify-error svelte-1fcth03" role="alert"><span style="display: flex; align-items: center;" class="svelte-1fcth03"><!></span> <span class="svelte-1fcth03"> </span></div>'),Rc=X('<div class="verify-backdrop svelte-1fcth03" aria-label="Close verification popup"><div class="verify-popup glass svelte-1fcth03" role="dialog" aria-modal="true" aria-labelledby="verify-title" tabindex="-1"><div class="verify-header svelte-1fcth03"><div class="verify-icon svelte-1fcth03" style="display: flex; align-items: center; justify-content: center;"><!></div> <h3 id="verify-title" class="verify-title text-glass svelte-1fcth03">Verify Master Password</h3> <p class="verify-subtitle text-glass-secondary svelte-1fcth03">Enter your master password to view this password</p></div> <div class="verify-body svelte-1fcth03"><label class="sr-only svelte-1fcth03">Master password</label> <input type="password" placeholder="Master password" class="glass-input verify-input svelte-1fcth03" aria-label="Master password for verification"/> <!></div> <div class="verify-actions svelte-1fcth03"><button class="glass-btn verify-btn-cancel haptic-light svelte-1fcth03">Cancel</button> <button class="glass-btn-primary verify-btn-confirm haptic-medium svelte-1fcth03"> </button></div></div></div>'),Nc=X('<div><div class="card-header svelte-1fcth03"><div class="card-title-section svelte-1fcth03"><h3 class="card-title text-glass svelte-1fcth03"> </h3> <!></div> <div class="card-actions svelte-1fcth03"><button class="action-btn haptic-light svelte-1fcth03" style="background: transparent;"><span class="action-icon svelte-1fcth03"><!></span></button> <button class="action-btn action-btn-edit haptic-light svelte-1fcth03" title="Edit"><span class="action-icon svelte-1fcth03" style="display: flex; align-items: center; justify-content: center;"><!></span></button> <button class="action-btn action-btn-delete haptic-heavy svelte-1fcth03" title="Delete"><span class="action-icon svelte-1fcth03" style="display: flex; align-items: center; justify-content: center;"><!></span></button></div></div> <!></div> <!>',1);function Ic(a,r){_t(r,!1);const e=te(),t=te();let s=rt(r,"item",8),i=rt(r,"onDelete",8),c=te(!1),o=te(!1);function d(){P(o,!u(o)),u(o)||P(c,!1)}let n=te({}),l=te(!1),g=te(""),f=te(""),x=te(!1),y=te(),B=te(),v=te(),w=te();br(()=>{const Z=`item-${s().id}`;P(y,`${Z}-username`),P(B,`${Z}-password`),P(v,`${Z}-note`),P(w,`${Z}-verify`)});const p={email:wa,banking:Ea,app:yr,website:Ba,work:ma,games:_a,other:ba},h={email:"Email",banking:"Banking",app:"App",website:"Website",work:"Work",games:"Games",other:"Other"};async function m(Z,me){try{await navigator.clipboard.writeText(Z),pt(n,u(n)[me]=!0),setTimeout(()=>{pt(n,u(n)[me]=!1),P(n,{...u(n)})},1500)}catch(ie){console.error("Failed to copy:",ie)}}function D(){c0.set(s())}function E(){u(c)?P(c,!1):(P(l,!0),P(g,""),P(f,""))}async function C(){if(!u(g).trim()){P(f,"Please enter master password");return}P(x,!0),P(f,"");try{await Ye.loadVault(u(g)),P(c,!0),P(l,!1),P(g,""),setTimeout(()=>{P(c,!1)},3e4)}catch{P(f,"Incorrect master password"),P(g,"")}finally{P(x,!1)}}function k(){P(l,!1),P(g,""),P(f,"")}function N(Z){Z.key==="Enter"&&C()}function A(Z){Z.key==="Escape"&&u(l)&&k()}Ft(()=>Ie(s()),()=>{P(e,p[s().category||"other"]||p.other)}),Ft(()=>Ie(s()),()=>{P(t,h[s().category||"other"]||h.other)}),tr(),$t();var F=Nc();Q("keydown",ao,A);var T=oe(F);let I;var V=_(T),K=_(V),Y=_(K),se=_(Y,!0);b(Y);var ee=S(Y,2);{var J=Z=>{var me=Pc(),ie=_(me),Se=_(ie);qt(Se,()=>u(e),(Le,ze)=>{ze(Le,{size:14,strokeWidth:1.5})}),b(ie);var Pe=S(ie);b(me),Ae(()=>{pr(me,1,`category-tag category-${Ie(s()),pe(()=>s().category)??""}`,"svelte-1fcth03"),q(Pe,` ${u(t)??""}`)}),L(Z,me)};ae(ee,Z=>{Ie(s()),pe(()=>s().category)&&Z(J)})}b(K);var j=S(K,2),$=_(j),R=_($),H=_(R);cc(H,{size:18,strokeWidth:1.5}),b(R),b($);var z=S($,2),M=_(z),O=_(M);xc(O,{size:18,strokeWidth:1.5}),b(M),b(z);var W=S(z,2),U=_(W),re=_(U);gc(re,{size:18,strokeWidth:1.5}),b(U),b(W),b(j),b(V);var ue=S(V,2);{var xe=Z=>{var me=Mc(),ie=_(me),Se=_(ie),Pe=S(Se,2),Le=_(Pe),ze=_(Le,!0);b(Le);var ke=S(Le,2),Ee=_(ke,!0);b(ke),b(Pe),b(ie);var Te=S(ie,2),at=_(Te),Ze=S(at,2),Me=_(Ze),He=_(Me,!0);b(Me);var je=S(Me,2),De=_(je),Qe=_(De),We=_(Qe);qt(We,()=>u(c)?Ai:oa,(ge,fe)=>{fe(ge,{size:18,strokeWidth:1.5})}),b(Qe),b(De);var Re=S(De,2),Ke=_(Re,!0);b(Re),b(je),b(Ze),b(Te);var Je=S(Te,2);{var ft=ge=>{var fe=Tc(),Ne=_(fe),it=S(Ne,2),dt=_(it),ut=_(dt,!0);b(dt),b(it),b(fe),Ae(()=>{Ue(Ne,"for",u(v)),Ue(dt,"id",u(v)),q(ut,(Ie(s()),pe(()=>s().note)))}),L(ge,fe)};ae(Je,ge=>{Ie(s()),pe(()=>s().note)&&ge(ft)})}b(me),Ae(()=>{Ue(Se,"for",u(y)),Ue(Le,"id",u(y)),q(ze,(Ie(s()),pe(()=>s().username))),Ue(ke,"aria-label",`Copy username for ${Ie(s()),pe(()=>s().title)??""}`),q(Ee,(u(n),pe(()=>u(n).username?"✓ Copied!":"Copy"))),Ue(at,"for",u(B)),Ue(Me,"id",u(B)),q(He,(u(c),Ie(s()),pe(()=>u(c)?s().password:"••••••••••••"))),Ue(De,"title",u(c)?"Hide password":"Show password"),Ue(De,"aria-label",`${u(c)?"Hide":"Show"} password for ${Ie(s()),pe(()=>s().title)??""}`),Ue(Re,"aria-label",`Copy password for ${Ie(s()),pe(()=>s().title)??""}`),q(Ke,(u(n),pe(()=>u(n).password?"✓ Copied!":"Copy")))}),Q("click",ke,()=>m(s().username,"username")),Q("click",De,E),Q("click",Re,()=>m(s().password||"","password")),L(Z,me)};ae(ue,Z=>{u(o)&&Z(xe)})}b(T);var ce=S(T,2);{var ve=Z=>{var me=Rc(),ie=_(me),Se=_(ie),Pe=_(Se),Le=_(Pe);gr(Le,{size:48,strokeWidth:1}),b(Pe),ye(4),b(Se);var ze=S(Se,2),ke=_(ze),Ee=S(ke,2);kt(Ee);var Te=S(Ee,2);{var at=De=>{var Qe=zc(),We=_(Qe),Re=_(We);Fi(Re,{size:16,strokeWidth:1.5}),b(We);var Ke=S(We,2),Je=_(Ke,!0);b(Ke),b(Qe),Ae(()=>q(Je,u(f))),L(De,Qe)};ae(Te,De=>{u(f)&&De(at)})}b(ze);var Ze=S(ze,2),Me=_(Ze),He=S(Me,2),je=_(He,!0);b(He),b(Ze),b(ie),b(me),Ae(De=>{Ue(ke,"for",u(w)),Ue(Ee,"id",u(w)),Ee.disabled=u(x),Me.disabled=u(x),He.disabled=De,q(je,u(x)?"Verifying...":"Verify")},[()=>(u(x),u(g),pe(()=>u(x)||!u(g).trim()))]),Ht(Ee,()=>u(g),De=>P(g,De)),Q("keydown",Ee,N),Q("click",Me,k),Q("click",He,C),Q("click",me,na(k)),Q("keydown",me,De=>De.key==="Escape"&&k()),L(Z,me)};ae(ce,Z=>{u(l)&&Z(ve)})}Ae(()=>{I=pr(T,1,"vault-card glass animate-slide-up svelte-1fcth03",null,I,{expanded:u(o)}),sa(V,`cursor: pointer; margin-bottom: ${u(o)?"1rem":"0"}; align-items: center;`),q(se,(Ie(s()),pe(()=>s().title))),Ue($,"title",u(o)?"Collapse":"Expand"),sa(R,`display: flex; align-items: center; justify-content: center; transform: rotate(${u(o)?"180deg":"0deg"}); transition: transform 0.3s;`),Ue(z,"aria-label",`Edit password for ${Ie(s()),pe(()=>s().title)??""}`),Ue(W,"aria-label",`Delete password for ${Ie(s()),pe(()=>s().title)??""}`)}),Q("click",$,d),Q("click",z,D),Q("click",W,()=>i()(s().id)),Q("click",j,Oo(function(Z){Wo.call(this,r,Z)})),Q("click",V,d),L(a,F),Bt()}var Hc=X('<button type="button"><span style="display: flex; align-items: center; justify-content: center;" class="svelte-ig2ixd"><!></span> <span class="svelte-ig2ixd"> </span></button>'),Lc=X('<input id="password" type="text" placeholder="Password" class="glass-input svelte-ig2ixd" style="width: 100%; padding-right: 3rem;" required=""/>'),Oc=X('<input id="password" type="password" placeholder="Password" class="glass-input svelte-ig2ixd" style="width: 100%; padding-right: 3rem;" required=""/>'),Uc=X('<p style="font-size: 0.75rem; margin: 0; opacity: 0.7; display: flex; align-items: center; gap: 0.25rem;" class="text-glass-secondary svelte-ig2ixd"><!> Click <!> to verify master password and edit</p>'),Wc=X('<div class="modal-backdrop svelte-ig2ixd" aria-label="Close modal"><div class="glass-modal svelte-ig2ixd" role="document" tabindex="-1"><div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;" class="svelte-ig2ixd"><h2 id="form-title" style="margin: 0; font-size: 1.25rem;" class="text-glass svelte-ig2ixd"> </h2> <button class="close-btn haptic-light svelte-ig2ixd" type="button" aria-label="Close"><span style="display: flex; align-items: center; justify-content: center;" class="svelte-ig2ixd"><!></span></button></div> <form style="display: flex; flex-direction: column; gap: 1rem;" class="svelte-ig2ixd"><div style="display: flex; flex-direction: column; gap: 0.5rem;" class="svelte-ig2ixd"><label for="title" style="font-size: 0.875rem; font-weight: 500;" class="text-glass-secondary svelte-ig2ixd">Title *</label> <input id="title" type="text" placeholder="e.g., Gmail, Facebook" class="glass-input svelte-ig2ixd" required=""/></div> <fieldset style="border: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;" class="svelte-ig2ixd"><legend style="font-size: 0.875rem; font-weight: 500; padding: 0;" class="text-glass-secondary svelte-ig2ixd">Category</legend> <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;" class="svelte-ig2ixd"></div></fieldset> <div style="display: flex; flex-direction: column; gap: 0.5rem;" class="svelte-ig2ixd"><label for="username" style="font-size: 0.875rem; font-weight: 500;" class="text-glass-secondary svelte-ig2ixd">Username *</label> <input id="username" type="text" placeholder="Username or email" class="glass-input svelte-ig2ixd" required=""/></div> <div style="display: flex; flex-direction: column; gap: 0.5rem;" class="svelte-ig2ixd"><label for="password" style="font-size: 0.875rem; font-weight: 500;" class="text-glass-secondary svelte-ig2ixd">Password *</label> <div style="display: flex; gap: 0.5rem;" class="svelte-ig2ixd"><div style="position: relative; flex: 1;" class="svelte-ig2ixd"><!> <button type="button" class="password-toggle-btn haptic-light svelte-ig2ixd"><span style="display: flex; align-items: center; justify-content: center;" class="svelte-ig2ixd"><!></span></button></div> <button type="button" class="generate-btn haptic-medium svelte-ig2ixd" aria-label="Generate password"><span class="generate-icon svelte-ig2ixd" style="display: flex; align-items: center; justify-content: center;"><!></span> <span class="generate-text svelte-ig2ixd">Generate</span></button></div> <!></div> <div style="display: flex; flex-direction: column; gap: 0.5rem;" class="svelte-ig2ixd"><label for="note" style="font-size: 0.875rem; font-weight: 500;" class="text-glass-secondary svelte-ig2ixd">Note</label> <textarea id="note" placeholder="Optional note" rows="3" class="glass-input svelte-ig2ixd" style="resize: vertical; min-height: 4rem;"></textarea></div> <div style="display: flex; gap: 1rem; margin-top: 1rem;" class="svelte-ig2ixd"><button type="button" class="glass-btn haptic-light svelte-ig2ixd" style="flex: 1; padding: 0.75rem;">Cancel</button> <button type="submit" class="glass-btn-primary haptic-medium svelte-ig2ixd" style="flex: 1; padding: 0.75rem; font-weight: 600;"> </button></div></form></div></div>'),Vc=X('<div class="verify-error svelte-ig2ixd" role="alert"><span style="display: flex; align-items: center; justify-content: center;" class="svelte-ig2ixd"><!></span> <span class="svelte-ig2ixd"> </span></div>'),qc=X('<div class="verify-backdrop svelte-ig2ixd" aria-label="Close verification popup"><div class="verify-popup glass svelte-ig2ixd" role="document" tabindex="-1"><div class="verify-header svelte-ig2ixd"><div class="verify-icon svelte-ig2ixd" style="display: flex; align-items: center; justify-content: center;"><!></div> <h3 id="verify-title" class="verify-title text-glass svelte-ig2ixd">Verify Master Password</h3> <p class="verify-subtitle text-glass-secondary svelte-ig2ixd">Enter your master password to edit this password</p></div> <div class="verify-body svelte-ig2ixd"><label for="verify-password" class="sr-only svelte-ig2ixd">Master password for verification</label> <input id="verify-password" type="password" placeholder="Master password" class="glass-input verify-input svelte-ig2ixd"/> <!></div> <div class="verify-actions svelte-ig2ixd"><button class="glass-btn verify-btn-cancel haptic-light svelte-ig2ixd">Cancel</button> <button class="glass-btn-primary verify-btn-confirm haptic-medium svelte-ig2ixd"> </button></div></div></div>'),jc=X("<!> <!>",1);function Kc(a,r){_t(r,!1);const e=()=>gt(c0,"$editingItem",s),t=()=>gt(ra,"$showAddForm",s),[s,i]=yi();let c=rt(r,"onSave",8),o=te(""),d=te(""),n=te(""),l=te(""),g=te("other"),f=te(!1),x=te(""),y=te(null),B=te(!1),v=te(!1),w=te(""),p=te(""),h=te(!1),m=te(!1);const D=[{value:"email",label:"Email",icon:wa},{value:"banking",label:"Banking",icon:Ea},{value:"app",label:"App",icon:yr},{value:"website",label:"Website",icon:Ba},{value:"work",label:"Work",icon:ma},{value:"games",label:"Games",icon:_a},{value:"other",label:"Other",icon:ba}];let E=te(!1);function C(){const j="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";let $="";for(let R=0;R<16;R++)$+=j.charAt(Math.floor(Math.random()*j.length));P(n,$),P(B,!0)}function k(){u(f)&&!u(m)?(P(v,!0),P(w,""),P(p,"")):P(B,!u(B))}async function N(){if(!u(w).trim()){P(p,"Please enter master password");return}P(h,!0),P(p,"");try{await Ye.loadVault(u(w)),P(m,!0),P(B,!0),P(v,!1),P(w,"")}catch{P(p,"Incorrect master password"),P(w,"")}finally{P(h,!1)}}function A(){P(v,!1),P(w,""),P(p,"")}function F(j){j.key==="Enter"?N():j.key==="Escape"&&A()}function T(j){u(f)&&!u(m)&&(j.preventDefault(),P(v,!0),P(w,""),P(p,""))}function I(){const j={id:u(f)?u(x):St.generateId(),title:u(o).trim(),username:u(d).trim(),password:u(n).trim(),note:u(l).trim()||void 0,category:u(g),last_modified:Date.now()};c()(j),V()}function V(){P(o,""),P(d,""),P(n,""),P(l,""),P(g,"other"),P(f,!1),P(x,""),P(y,null),P(B,!1),P(m,!1),P(v,!1),P(w,""),P(p,""),ra.set(!1),c0.set(null)}Ft(()=>(e(),u(y),u(o),u(d),u(n),u(l),u(g),u(E),t()),()=>{e()&&e().id!==u(y)?(P(y,e().id),P(f,!0),P(x,e().id),P(o,e().title),P(d,e().username),P(n,e().password||""),P(l,e().note||""),P(g,e().category||"other"),P(B,!1),P(m,!1),P(E,!1)):t()&&!e()&&!u(E)?(P(f,!1),P(x,""),P(y,null),P(B,!1),P(m,!1),P(E,!0),(u(o)||u(d)||u(n)||u(l)||u(g)!=="other")&&(P(o,""),P(d,""),P(n,""),P(l,""),P(g,"other"))):!t()&&!e()&&P(E,!1)}),tr(),$t();var K=jc(),Y=oe(K);{var se=j=>{var $=Wc(),R=_($),H=_(R),z=_(H),M=_(z);b(z);var O=S(z,2),W=_(O),U=_(W);yc(U,{size:20,strokeWidth:1.5}),b(W),b(O),b(H);var re=S(H,2),ue=_(re),xe=S(_(ue),2);kt(xe),b(ue);var ce=S(ue,2),ve=S(_(ce),2);xr(ve,5,()=>D,u0,(ge,fe)=>{var Ne=Hc(),it=_(Ne),dt=_(it);qt(dt,()=>u(fe).icon,(Pt,Et)=>{Et(Pt,{size:16,strokeWidth:1.5})}),b(it);var ut=S(it,2),vt=_(ut,!0);b(ut),b(Ne),Ae(()=>{pr(Ne,1,`category-tag category-${u(fe),pe(()=>u(fe).value)??""} haptic-light ${u(g),u(fe),pe(()=>u(g)===u(fe).value?"selected":"")??""}`,"svelte-ig2ixd"),q(vt,(u(fe),pe(()=>u(fe).label)))}),Q("click",Ne,()=>P(g,u(fe).value)),L(ge,Ne)}),b(ve),b(ce);var Z=S(ce,2),me=S(_(Z),2);kt(me),b(Z);var ie=S(Z,2),Se=S(_(ie),2),Pe=_(Se),Le=_(Pe);{var ze=ge=>{var fe=Lc();kt(fe),Ae(()=>fe.readOnly=u(f)&&!u(m)),Ht(fe,()=>u(n),Ne=>P(n,Ne)),Q("focus",fe,T),L(ge,fe)},ke=ge=>{var fe=Oc();kt(fe),Ae(()=>fe.readOnly=u(f)&&!u(m)),Ht(fe,()=>u(n),Ne=>P(n,Ne)),Q("focus",fe,T),L(ge,fe)};ae(Le,ge=>{u(B)?ge(ze):ge(ke,-1)})}var Ee=S(Le,2),Te=_(Ee),at=_(Te);qt(at,()=>u(B)?Ai:oa,(ge,fe)=>{fe(ge,{size:18,strokeWidth:1.5})}),b(Te),b(Ee),b(Pe);var Ze=S(Pe,2),Me=_(Ze),He=_(Me);mc(He,{size:18,strokeWidth:2}),b(Me),ye(2),b(Ze),b(Se);var je=S(Se,2);{var De=ge=>{var fe=Uc(),Ne=_(fe);ki(Ne,{size:12,strokeWidth:2});var it=S(Ne,2);oa(it,{size:12,strokeWidth:2}),ye(),b(fe),L(ge,fe)};ae(je,ge=>{u(f)&&!u(m)&&ge(De)})}b(ie);var Qe=S(ie,2),We=S(_(Qe),2);so(We),b(Qe);var Re=S(Qe,2),Ke=_(Re),Je=S(Ke,2),ft=_(Je,!0);b(Je),b(Re),b(re),b(R),b($),Ae(ge=>{q(M,`${u(f)?"Edit":"Add"} Password`),Ue(Ee,"aria-label",u(B)?"Hide password":"Show password"),Je.disabled=ge,q(ft,u(f)?"Update":"Save")},[()=>(u(o),u(d),u(n),pe(()=>!u(o).trim()||!u(d).trim()||!u(n).trim()))]),Q("click",O,V),Ht(xe,()=>u(o),ge=>P(o,ge)),Ht(me,()=>u(d),ge=>P(d,ge)),Q("click",Ee,k),Q("click",Ze,C),Ht(We,()=>u(l),ge=>P(l,ge)),Q("click",Ke,V),Q("submit",re,Uo(I)),Q("click",$,na(V)),Q("keydown",$,ge=>ge.key==="Escape"&&V()),L(j,$)};ae(Y,j=>{(t()||e())&&j(se)})}var ee=S(Y,2);{var J=j=>{var $=qc(),R=_($),H=_(R),z=_(H),M=_(z);gr(M,{size:48,strokeWidth:1}),b(z),ye(4),b(H);var O=S(H,2),W=S(_(O),2);kt(W);var U=S(W,2);{var re=Z=>{var me=Vc(),ie=_(me),Se=_(ie);Fi(Se,{size:16,strokeWidth:1.5}),b(ie);var Pe=S(ie,2),Le=_(Pe,!0);b(Pe),b(me),Ae(()=>q(Le,u(p))),L(Z,me)};ae(U,Z=>{u(p)&&Z(re)})}b(O);var ue=S(O,2),xe=_(ue),ce=S(xe,2),ve=_(ce,!0);b(ce),b(ue),b(R),b($),Ae(Z=>{W.disabled=u(h),xe.disabled=u(h),ce.disabled=Z,q(ve,u(h)?"Verifying...":"Verify")},[()=>(u(h),u(w),pe(()=>u(h)||!u(w).trim()))]),Ht(W,()=>u(w),Z=>P(w,Z)),Q("keydown",W,F),Q("click",xe,A),Q("click",ce,N),Q("click",$,na(A)),Q("keydown",$,Z=>Z.key==="Escape"&&A()),L(j,$)};ae(ee,j=>{u(v)&&j(J)})}L(a,K),Bt(),i()}var Gc=X(`<div class="glass animate-fade-in" style="background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); padding: 1rem; border-radius: 18px; margin-bottom: 1rem;"><div style="display: flex; align-items: start; gap: 0.75rem;"><div style="font-size: 1.5rem; flex-shrink: 0;">💾</div> <div style="flex: 1;"><p style="margin: 0 0 0.75rem 0; color: rgba(255,255,255,0.9); font-size: 0.875rem;"> </p> <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;"><button class="glass-btn-primary haptic-medium" style="padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem;">Backup Now</button> <button class="glass-btn haptic-light" style="padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem;">Remind Later</button> <button class="glass-btn haptic-light" style="padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem; opacity: 0.7;">Don't Remind</button></div></div></div></div>`);function Yc(a,r){_t(r,!1);const e=te();let t=rt(r,"reminderType",8,null),s=rt(r,"onBackupNow",8,()=>{});async function i(){qe.dismissReminder("later"),await hi(),At.set(null)}function c(){confirm("Are you sure you want to disable backup reminders?")&&(qe.dismissReminder("never"),At.set(null))}function o(){s()(),qe.dismissReminder("done"),At.set(null)}Ft(()=>(Ie(t()),qe),()=>{P(e,t()?qe.getReminderMessage(t()):"")}),tr(),$t();var d=Gc(),n=_(d),l=S(_(n),2),g=_(l),f=_(g,!0);b(g);var x=S(g,2),y=_(x),B=S(y,2),v=S(B,2);b(x),b(l),b(n),b(d),Ae(()=>q(f,u(e))),Q("click",y,o),Q("click",B,i),Q("click",v,c),L(a,d),Bt()}var Xc=X('<p class="prompt-subtitle text-glass-secondary svelte-wh6tnt">Tap <span class="share-icon svelte-wh6tnt">⬆️</span> then "Add to Home Screen"</p>'),Zc=X('<p class="prompt-subtitle text-glass-secondary svelte-wh6tnt">Install app for quick access and offline use</p>'),Qc=X('<button class="prompt-btn prompt-btn-install glass-btn-primary haptic-medium svelte-wh6tnt">Install</button>'),Jc=X('<div class="install-prompt glass animate-slide-up svelte-wh6tnt"><div class="prompt-content svelte-wh6tnt"><div class="prompt-icon svelte-wh6tnt">📱</div> <div class="prompt-text svelte-wh6tnt"><h3 class="prompt-title text-glass svelte-wh6tnt">Install PocketVault</h3> <!></div></div> <div class="prompt-actions svelte-wh6tnt"><button class="prompt-btn prompt-btn-dismiss glass-btn haptic-light svelte-wh6tnt">Not now</button> <!></div></div>');function ef(a,r){_t(r,!1);let e=te(!1),t=null,s=te(!1),i=!1;br(()=>{i=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0,P(s,/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream);const g=localStorage.getItem("pwa-install-dismissed");!i&&!g&&(u(s)&&P(e,!0),window.addEventListener("beforeinstallprompt",f=>{f.preventDefault(),t=f,P(e,!0)}))});async function c(){if(u(s)||!t)return;t.prompt();const{outcome:g}=await t.userChoice;g==="accepted"&&console.log("User accepted the install prompt"),t=null,P(e,!1)}function o(){P(e,!1),localStorage.setItem("pwa-install-dismissed","true")}$t();var d=he(),n=oe(d);{var l=g=>{var f=Jc(),x=_(f),y=S(_(x),2),B=S(_(y),2);{var v=E=>{var C=Xc();L(E,C)},w=E=>{var C=Zc();L(E,C)};ae(B,E=>{u(s)?E(v):E(w,-1)})}b(y),b(x);var p=S(x,2),h=_(p),m=S(h,2);{var D=E=>{var C=Qc();Q("click",C,c),L(E,C)};ae(m,E=>{u(s)||E(D)})}b(p),b(f),Q("click",h,o),L(g,f)};ae(n,g=>{u(e)&&g(l)})}L(a,d),Bt()}var tf=X('<div class="update-banner glass animate-slide-down svelte-m7sngy"><div class="update-content svelte-m7sngy"><div class="update-icon svelte-m7sngy">🎉</div> <div class="update-text svelte-m7sngy"><h3 class="update-title text-glass svelte-m7sngy">Update Available!</h3> <p class="update-subtitle text-glass-secondary svelte-m7sngy"><!></p></div></div> <div class="update-actions svelte-m7sngy"><button class="update-btn update-btn-dismiss glass-btn haptic-light svelte-m7sngy">Later</button> <button class="update-btn update-btn-reload glass-btn-primary haptic-medium svelte-m7sngy"> </button></div></div>');function rf(a,r){_t(r,!1);let e=te(!1),t=te(""),s=te(!1);br(()=>{"serviceWorker"in navigator&&(navigator.serviceWorker.addEventListener("message",l=>{l.data&&l.data.type==="SW_UPDATED"&&(console.log("[UpdateNotification] New version available:",l.data.version),P(t,l.data.version),P(e,!0))}),navigator.serviceWorker.ready.then(l=>{setInterval(()=>{console.log("[UpdateNotification] Checking for updates..."),l.update()},6e4),l.update()}),navigator.serviceWorker.addEventListener("controllerchange",()=>{console.log("[UpdateNotification] Controller changed, new version active"),u(e)||P(e,!0)}))});function i(){P(s,!0),console.log("[UpdateNotification] Reloading app to apply updates..."),"caches"in window&&caches.keys().then(l=>{l.forEach(g=>{console.log("[UpdateNotification] Clearing cache:",g)})}),setTimeout(()=>{window.location.reload()},500)}function c(){P(e,!1),console.log("[UpdateNotification] Update dismissed")}$t();var o=he(),d=oe(o);{var n=l=>{var g=tf(),f=_(g),x=S(_(f),2),y=S(_(x),2),B=_(y);{var v=E=>{var C=fr();Ae(()=>q(C,`Version ${u(t)??""} is ready`)),L(E,C)},w=E=>{var C=fr("New features and improvements");L(E,C)};ae(B,E=>{u(t)?E(v):E(w,-1)})}b(y),b(x),b(f);var p=S(f,2),h=_(p),m=S(h,2),D=_(m,!0);b(m),b(p),b(g),Ae(()=>{h.disabled=u(s),m.disabled=u(s),q(D,u(s)?"Updating...":"Update Now")}),Q("click",h,c),Q("click",m,i),L(l,g)};ae(d,l=>{u(e)&&l(n)})}L(a,o),Bt()}var af=X('<li class="tooltip-step text-glass-secondary svelte-9yvcm9"><span class="step-number svelte-9yvcm9"></span> <span> </span></li>'),sf=X('<div class="tooltip glass animate-fade-in svelte-9yvcm9"><div class="tooltip-header svelte-9yvcm9"><span class="tooltip-icon svelte-9yvcm9"> </span> <h4 class="tooltip-title text-glass svelte-9yvcm9"> </h4></div> <ul class="tooltip-steps svelte-9yvcm9"></ul> <div class="tooltip-security svelte-9yvcm9"><span class="security-badge svelte-9yvcm9"> </span></div> <div class="tooltip-hint svelte-9yvcm9"><span style="font-size: 0.6875rem; opacity: 0.6;">Tap to close</span></div></div>');function ti(a,r){_t(r,!1);const e=te();let t=rt(r,"type",8,"export"),s=rt(r,"show",8,!1),i=rt(r,"onClose",8,()=>{});const c={export:{icon:"📤",title:"Export Backup",steps:["Creates encrypted backup file","Save to iCloud/Google Drive","File is AES-256 encrypted","Only you can decrypt it"],security:"🔒 Military-grade encryption"},import:{icon:"📥",title:"Import Backup",steps:["Select your .vault file","Enter master password","Choose merge or replace","Data restored securely"],security:"✅ Verified & decrypted"}};function o(g){g.stopPropagation(),i()()}Ft(()=>Ie(t()),()=>{P(e,c[t()])}),tr(),$t();var d=he(),n=oe(d);{var l=g=>{var f=sf(),x=_(f),y=_(x),B=_(y,!0);b(y);var v=S(y,2),w=_(v,!0);b(v),b(x);var p=S(x,2);xr(p,5,()=>(u(e),pe(()=>u(e).steps)),u0,(E,C,k)=>{var N=af(),A=_(N);A.textContent=k+1;var F=S(A,2),T=_(F,!0);b(F),b(N),Ae(()=>q(T,u(C))),L(E,N)}),b(p);var h=S(p,2),m=_(h),D=_(m,!0);b(m),b(h),ye(2),b(f),Ae(()=>{q(B,(u(e),pe(()=>u(e).icon))),q(w,(u(e),pe(()=>u(e).title))),q(D,(u(e),pe(()=>u(e).security)))}),Q("click",f,o),L(g,f)};ae(n,g=>{s()&&g(l)})}L(a,d),Bt()}class tt{static async openDB(){if(typeof window>"u")throw new Error("IndexedDB not available on server");return this.db?this.db:new Promise((r,e)=>{const t=indexedDB.open(this.DB_NAME,2);t.onerror=()=>e(t.error),t.onsuccess=()=>{this.db=t.result,r(t.result)},t.onupgradeneeded=s=>{const i=s.target.result;i.objectStoreNames.contains(this.STORE_NAME)||i.createObjectStore(this.STORE_NAME,{keyPath:"id"}).createIndex("timestamp","timestamp",{unique:!1})}})}static async createBackup(r,e){const t=this.getConfig();if(t.enabled)try{const s=new Promise((c,o)=>setTimeout(()=>o(new Error("Auto-backup timeout after 10 seconds")),1e4)),i=this.performBackup(r,e,t);await Promise.race([i,s])}catch(s){const i=s instanceof Error?s.message:"Unknown error";console.error("[AutoBackup] Backup creation failed:",i)}}static async performBackup(r,e,t){const s=await this.openDB(),i=await St.encrypt(r,e),c={data:this.arrayBufferToBase64(i.data),iv:this.arrayBufferToBase64(i.iv),salt:this.arrayBufferToBase64(i.salt)},o={id:this.generateId(),timestamp:Date.now(),vault:c,itemCount:r.length,size:JSON.stringify(c).length};await new Promise((d,n)=>{try{const l=s.transaction([this.STORE_NAME],"readwrite"),g=l.objectStore(this.STORE_NAME);l.oncomplete=()=>{d()},l.onerror=x=>{console.error("[AutoBackup] Transaction failed:",l.error||x),n(l.error||new Error("Transaction failed"))},l.onabort=x=>{console.error("[AutoBackup] Transaction aborted:",x),n(new Error("Transaction aborted"))};const f=g.put(o);f.onsuccess=()=>{},f.onerror=x=>{console.error("[AutoBackup] Put operation failed:",f.error||x),n(f.error||new Error("Put operation failed"))}}catch(l){console.error("[AutoBackup] Synchronous error in transaction setup:",l),n(l)}}),t.autoRotate&&await this.rotateBackups()}static async listBackups(){try{const r=await this.openDB();return new Promise((e,t)=>{const o=r.transaction([this.STORE_NAME],"readonly").objectStore(this.STORE_NAME).index("timestamp").openCursor(null,"prev"),d=[];o.onsuccess=()=>{const n=o.result;if(n){const l=n.value;d.push({id:l.id,timestamp:l.timestamp,itemCount:l.itemCount,size:l.size}),n.continue()}else e(d)},o.onerror=()=>t(o.error)})}catch(r){return console.error("Failed to list backups:",r),[]}}static async restoreBackup(r,e){try{const t=await this.openDB();return new Promise((s,i)=>{const d=t.transaction([this.STORE_NAME],"readonly").objectStore(this.STORE_NAME).get(r);d.onsuccess=async()=>{if(!d.result){i(new Error("Backup not found"));return}try{const n=d.result,l={data:this.base64ToArrayBuffer(n.vault.data),iv:this.base64ToArrayBuffer(n.vault.iv),salt:this.base64ToArrayBuffer(n.vault.salt)},g=await St.decrypt(l,e);s(g)}catch(n){i(n)}},d.onerror=()=>i(d.error)})}catch(t){const s=t instanceof Error?t.message:"Unknown error";throw new Error(`Restore failed: ${s}`)}}static async deleteBackup(r){try{const e=await this.openDB();return new Promise((t,s)=>{const o=e.transaction([this.STORE_NAME],"readwrite").objectStore(this.STORE_NAME).delete(r);o.onsuccess=()=>t(),o.onerror=()=>s(o.error)})}catch(e){console.error("Failed to delete backup:",e)}}static async rotateBackups(){const r=this.getConfig(),e=await this.listBackups();if(e.length>r.maxBackups){const t=e.slice(r.maxBackups);for(const s of t)await this.deleteBackup(s.id)}}static getConfig(){if(typeof window>"u")return this.getDefaultConfig();try{const r=localStorage.getItem(this.CONFIG_KEY);return r?{...this.getDefaultConfig(),...JSON.parse(r)}:this.getDefaultConfig()}catch{return this.getDefaultConfig()}}static updateConfig(r){if(typeof window>"u")return;const t={...this.getConfig(),...r};try{localStorage.setItem(this.CONFIG_KEY,JSON.stringify(t))}catch(s){console.error("Failed to save auto-backup config:",s)}}static getDefaultConfig(){return{enabled:!0,maxBackups:this.DEFAULT_MAX_BACKUPS,autoRotate:!0}}static generateId(){return`backup_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}static arrayBufferToBase64(r){const e=new Uint8Array(r);let t="";for(let s=0;s<e.byteLength;s++)t+=String.fromCharCode(e[s]);return btoa(t)}static base64ToArrayBuffer(r){const e=atob(r),t=new Uint8Array(e.length);for(let s=0;s<e.length;s++)t[s]=e.charCodeAt(s);return t.buffer}}Ge(tt,"DB_NAME","PocketVaultDB"),Ge(tt,"STORE_NAME","auto-backups"),Ge(tt,"CONFIG_KEY","pv_autobackup_config"),Ge(tt,"DEFAULT_MAX_BACKUPS",3),Ge(tt,"db",null);const X0={info:"#3b82f6",success:"#22c55e",error:"#ef4444"},nf={BackupManager:"#10b981",RestoreManager:"#06b6d4",ReminderSystem:"#f59e0b",AutoBackup:"#8b5cf6",Main:"#3b82f6"};function _r(a){return nf[a]||X0.info,{info:(...r)=>{},success:(...r)=>{console.log(`%c[${a}] ✓`,`color: ${X0.success}; font-weight: bold`,...r)},error:(...r)=>{console.error(`%c[${a}] ✗`,`color: ${X0.error}; font-weight: bold`,...r)},warn:(...r)=>{},debug:(...r)=>{},group:r=>{},groupEnd:()=>{}}}_r("BackupManager");_r("RestoreManager");_r("ReminderSystem");_r("AutoBackup");_r("Main");function of(){const a=["chrome-extension://","extension","completion_list.html","extensionState.js","heuristicsRedefinitions.js","mfbcdcnpokpoajjciilocoachedjkima"];window.addEventListener("error",r=>{if(r.error&&r.error.message){const e=r.error.message.toLowerCase();if(a.some(t=>e.includes(t.toLowerCase())))return r.preventDefault(),!1}if(r.filename){const e=r.filename.toLowerCase();if(a.some(t=>e.includes(t.toLowerCase())))return r.preventDefault(),!1}},!0),window.addEventListener("error",r=>{const e=r.target;if(e&&(e.tagName==="SCRIPT"||e.tagName==="LINK")){const t=e.src||e.href||"";if(a.some(s=>t.includes(s)))return r.preventDefault(),!1}},!0),console.log("%c[System] Extension error suppression enabled","color: #6b7280; font-style: italic")}/*! Capacitor: https://capacitorjs.com/ - MIT License */const lf=a=>{const r=new Map;r.set("web",{name:"web"});const e=a.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:r},t=(i,c)=>{e.platforms.set(i,c)},s=i=>{e.platforms.has(i)&&(e.currentPlatform=e.platforms.get(i))};return e.addPlatform=t,e.setPlatform=s,e},cf=a=>a.CapacitorPlatforms=lf(a),$i=cf(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});$i.addPlatform;$i.setPlatform;var Jt;(function(a){a.Unimplemented="UNIMPLEMENTED",a.Unavailable="UNAVAILABLE"})(Jt||(Jt={}));class Z0 extends Error{constructor(r,e,t){super(r),this.message=r,this.code=e,this.data=t}}const ff=a=>{var r,e;return a!=null&&a.androidBridge?"android":!((e=(r=a==null?void 0:a.webkit)===null||r===void 0?void 0:r.messageHandlers)===null||e===void 0)&&e.bridge?"ios":"web"},df=a=>{var r,e,t,s,i;const c=a.CapacitorCustomPlatform||null,o=a.Capacitor||{},d=o.Plugins=o.Plugins||{},n=a.CapacitorPlatforms,l=()=>c!==null?c.name:ff(a),g=((r=n==null?void 0:n.currentPlatform)===null||r===void 0?void 0:r.getPlatform)||l,f=()=>g()!=="web",x=((e=n==null?void 0:n.currentPlatform)===null||e===void 0?void 0:e.isNativePlatform)||f,y=C=>{const k=m.get(C);return!!(k!=null&&k.platforms.has(g())||w(C))},B=((t=n==null?void 0:n.currentPlatform)===null||t===void 0?void 0:t.isPluginAvailable)||y,v=C=>{var k;return(k=o.PluginHeaders)===null||k===void 0?void 0:k.find(N=>N.name===C)},w=((s=n==null?void 0:n.currentPlatform)===null||s===void 0?void 0:s.getPluginHeader)||v,p=C=>a.console.error(C),h=(C,k,N)=>Promise.reject(`${N} does not have an implementation of "${k}".`),m=new Map,D=(C,k={})=>{const N=m.get(C);if(N)return console.warn(`Capacitor plugin "${C}" already registered. Cannot register plugins twice.`),N.proxy;const A=g(),F=w(C);let T;const I=async()=>(!T&&A in k?T=typeof k[A]=="function"?T=await k[A]():T=k[A]:c!==null&&!T&&"web"in k&&(T=typeof k.web=="function"?T=await k.web():T=k.web),T),V=(j,$)=>{var R,H;if(F){const z=F==null?void 0:F.methods.find(M=>$===M.name);if(z)return z.rtype==="promise"?M=>o.nativePromise(C,$.toString(),M):(M,O)=>o.nativeCallback(C,$.toString(),M,O);if(j)return(R=j[$])===null||R===void 0?void 0:R.bind(j)}else{if(j)return(H=j[$])===null||H===void 0?void 0:H.bind(j);throw new Z0(`"${C}" plugin is not implemented on ${A}`,Jt.Unimplemented)}},K=j=>{let $;const R=(...H)=>{const z=I().then(M=>{const O=V(M,j);if(O){const W=O(...H);return $=W==null?void 0:W.remove,W}else throw new Z0(`"${C}.${j}()" is not implemented on ${A}`,Jt.Unimplemented)});return j==="addListener"&&(z.remove=async()=>$()),z};return R.toString=()=>`${j.toString()}() { [capacitor code] }`,Object.defineProperty(R,"name",{value:j,writable:!1,configurable:!1}),R},Y=K("addListener"),se=K("removeListener"),ee=(j,$)=>{const R=Y({eventName:j},$),H=async()=>{const M=await R;se({eventName:j,callbackId:M},$)},z=new Promise(M=>R.then(()=>M({remove:H})));return z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await H()},z},J=new Proxy({},{get(j,$){switch($){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return F?ee:Y;case"removeListener":return se;default:return K($)}}});return d[C]=J,m.set(C,{name:C,proxy:J,platforms:new Set([...Object.keys(k),...F?[A]:[]])}),J},E=((i=n==null?void 0:n.currentPlatform)===null||i===void 0?void 0:i.registerPlugin)||D;return o.convertFileSrc||(o.convertFileSrc=C=>C),o.getPlatform=g,o.handleError=p,o.isNativePlatform=x,o.isPluginAvailable=B,o.pluginMethodNoop=h,o.registerPlugin=E,o.Exception=Z0,o.DEBUG=!!o.DEBUG,o.isLoggingEnabled=!!o.isLoggingEnabled,o.platform=o.getPlatform(),o.isNative=o.isNativePlatform(),o},uf=a=>a.Capacitor=df(a),er=uf(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Gt=er.registerPlugin;er.Plugins;class Pi{constructor(r){this.listeners={},this.retainedEventArguments={},this.windowListeners={},r&&(console.warn(`Capacitor WebPlugin "${r.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=r)}addListener(r,e){let t=!1;this.listeners[r]||(this.listeners[r]=[],t=!0),this.listeners[r].push(e);const i=this.windowListeners[r];i&&!i.registered&&this.addWindowListener(i),t&&this.sendRetainedArgumentsForEvent(r);const c=async()=>this.removeListener(r,e);return Promise.resolve({remove:c})}async removeAllListeners(){this.listeners={};for(const r in this.windowListeners)this.removeWindowListener(this.windowListeners[r]);this.windowListeners={}}notifyListeners(r,e,t){const s=this.listeners[r];if(!s){if(t){let i=this.retainedEventArguments[r];i||(i=[]),i.push(e),this.retainedEventArguments[r]=i}return}s.forEach(i=>i(e))}hasListeners(r){return!!this.listeners[r].length}registerWindowListener(r,e){this.windowListeners[e]={registered:!1,windowEventName:r,pluginEventName:e,handler:t=>{this.notifyListeners(e,t)}}}unimplemented(r="not implemented"){return new er.Exception(r,Jt.Unimplemented)}unavailable(r="not available"){return new er.Exception(r,Jt.Unavailable)}async removeListener(r,e){const t=this.listeners[r];if(!t)return;const s=t.indexOf(e);this.listeners[r].splice(s,1),this.listeners[r].length||this.removeWindowListener(this.windowListeners[r])}addWindowListener(r){window.addEventListener(r.windowEventName,r.handler),r.registered=!0}removeWindowListener(r){r&&(window.removeEventListener(r.windowEventName,r.handler),r.registered=!1)}sendRetainedArgumentsForEvent(r){const e=this.retainedEventArguments[r];e&&(delete this.retainedEventArguments[r],e.forEach(t=>{this.notifyListeners(r,t)}))}}const ri=a=>encodeURIComponent(a).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ai=a=>a.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class vf extends Pi{async getCookies(){const r=document.cookie,e={};return r.split(";").forEach(t=>{if(t.length<=0)return;let[s,i]=t.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=ai(s).trim(),i=ai(i).trim(),e[s]=i}),e}async setCookie(r){try{const e=ri(r.key),t=ri(r.value),s=`; expires=${(r.expires||"").replace("expires=","")}`,i=(r.path||"/").replace("path=",""),c=r.url!=null&&r.url.length>0?`domain=${r.url}`:"";document.cookie=`${e}=${t||""}${s}; path=${i}; ${c};`}catch(e){return Promise.reject(e)}}async deleteCookie(r){try{document.cookie=`${r.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{const r=document.cookie.split(";")||[];for(const e of r)document.cookie=e.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(r){return Promise.reject(r)}}async clearAllCookies(){try{await this.clearCookies()}catch(r){return Promise.reject(r)}}}Gt("CapacitorCookies",{web:()=>new vf});const xf=async a=>new Promise((r,e)=>{const t=new FileReader;t.onload=()=>{const s=t.result;r(s.indexOf(",")>=0?s.split(",")[1]:s)},t.onerror=s=>e(s),t.readAsDataURL(a)}),pf=(a={})=>{const r=Object.keys(a);return Object.keys(a).map(s=>s.toLocaleLowerCase()).reduce((s,i,c)=>(s[i]=a[r[c]],s),{})},hf=(a,r=!0)=>a?Object.entries(a).reduce((t,s)=>{const[i,c]=s;let o,d;return Array.isArray(c)?(d="",c.forEach(n=>{o=r?encodeURIComponent(n):n,d+=`${i}=${o}&`}),d.slice(0,-1)):(o=r?encodeURIComponent(c):c,d=`${i}=${o}`),`${t}&${d}`},"").substr(1):null,gf=(a,r={})=>{const e=Object.assign({method:a.method||"GET",headers:a.headers},r),s=pf(a.headers)["content-type"]||"";if(typeof a.data=="string")e.body=a.data;else if(s.includes("application/x-www-form-urlencoded")){const i=new URLSearchParams;for(const[c,o]of Object.entries(a.data||{}))i.set(c,o);e.body=i.toString()}else if(s.includes("multipart/form-data")||a.data instanceof FormData){const i=new FormData;if(a.data instanceof FormData)a.data.forEach((o,d)=>{i.append(d,o)});else for(const o of Object.keys(a.data))i.append(o,a.data[o]);e.body=i;const c=new Headers(e.headers);c.delete("content-type"),e.headers=c}else(s.includes("application/json")||typeof a.data=="object")&&(e.body=JSON.stringify(a.data));return e};class yf extends Pi{async request(r){const e=gf(r,r.webFetchExtra),t=hf(r.params,r.shouldEncodeUrlParams),s=t?`${r.url}?${t}`:r.url,i=await fetch(s,e),c=i.headers.get("content-type")||"";let{responseType:o="text"}=i.ok?r:{};c.includes("application/json")&&(o="json");let d,n;switch(o){case"arraybuffer":case"blob":n=await i.blob(),d=await xf(n);break;case"json":d=await i.json();break;case"document":case"text":default:d=await i.text()}const l={};return i.headers.forEach((g,f)=>{l[f]=g}),{data:d,headers:l,status:i.status,url:i.url}}async get(r){return this.request(Object.assign(Object.assign({},r),{method:"GET"}))}async post(r){return this.request(Object.assign(Object.assign({},r),{method:"POST"}))}async put(r){return this.request(Object.assign(Object.assign({},r),{method:"PUT"}))}async patch(r){return this.request(Object.assign(Object.assign({},r),{method:"PATCH"}))}async delete(r){return this.request(Object.assign(Object.assign({},r),{method:"DELETE"}))}}Gt("CapacitorHttp",{web:()=>new yf});const Er=Gt("App",{web:()=>d0(()=>import("./CyKtH3Nz.js"),[],import.meta.url).then(a=>new a.AppWeb)});var fa;(function(a){a.Dark="DARK",a.Light="LIGHT",a.Default="DEFAULT"})(fa||(fa={}));var si;(function(a){a.None="NONE",a.Slide="SLIDE",a.Fade="FADE"})(si||(si={}));const ii=Gt("StatusBar"),mf=Gt("SplashScreen",{web:()=>d0(()=>import("./DZ8eyEzs.js"),[],import.meta.url).then(a=>new a.SplashScreenWeb)});var ur;(function(a){a.Documents="DOCUMENTS",a.Data="DATA",a.Library="LIBRARY",a.Cache="CACHE",a.External="EXTERNAL",a.ExternalStorage="EXTERNAL_STORAGE"})(ur||(ur={}));var ni;(function(a){a.UTF8="utf8",a.ASCII="ascii",a.UTF16="utf16"})(ni||(ni={}));const Q0=Gt("Filesystem",{web:()=>d0(()=>import("./dj1CGeAe.js"),[],import.meta.url).then(a=>new a.FilesystemWeb)}),bf=Gt("Share",{web:()=>d0(()=>import("./DtWgQKh_.js"),[],import.meta.url).then(a=>new a.ShareWeb)});class cr{static isNative(){return er.isNativePlatform()}static getPlatform(){return er.getPlatform()}static async initialize(){if(!(this.initialized||!this.isNative()))try{await this.setupStatusBar(),await mf.hide(),this.setupAppListeners(),this.initialized=!0,console.log("[Native] App initialized successfully")}catch(r){console.error("[Native] Initialization error:",r)}}static async setupStatusBar(){if(this.isNative())try{await ii.setStyle({style:fa.Dark}),await ii.setBackgroundColor({color:"#1a1a2e"})}catch(r){console.error("[Native] StatusBar setup error:",r)}}static setupAppListeners(){Er.addListener("appStateChange",({isActive:r})=>{console.log("[Native] App state changed:",r?"active":"background"),r||this.lockApp()}),Er.addListener("backButton",({canGoBack:r})=>{r?window.history.back():Er.exitApp()})}static lockApp(){sessionStorage.removeItem("pv_master_key"),console.log("[Native] App locked")}static async exportToFile(r,e){if(!this.isNative())return{success:!1,error:"Not running as native app"};try{const t=await this.blobToBase64(e),s=await Q0.writeFile({path:r,data:t,directory:ur.Documents,recursive:!0});return console.log("[Native] File exported:",s.uri),{success:!0,path:s.uri}}catch(t){const s=t instanceof Error?t.message:"Unknown error";return console.error("[Native] Export error:",t),{success:!1,error:s}}}static async importFromFile(r){if(!this.isNative())return{success:!1,error:"Not running as native app"};try{const e=await Q0.readFile({path:r,directory:ur.Documents});return{success:!0,data:this.base64ToBlob(e.data,"application/json")}}catch(e){const t=e instanceof Error?e.message:"Unknown error";return console.error("[Native] Import error:",e),{success:!1,error:t}}}static async shareFile(r,e){if(!this.isNative())return{success:!1,error:"Not running as native app"};try{const t=await this.blobToBase64(e),s=await Q0.writeFile({path:r,data:t,directory:ur.Cache,recursive:!0});return await bf.share({title:"PocketVault Backup",text:"Share your encrypted vault backup",url:s.uri,dialogTitle:"Share Backup File"}),{success:!0}}catch(t){const s=t instanceof Error?t.message:"Unknown error";return console.error("[Native] Share error:",t),{success:!1,error:s}}}static async getAppInfo(){if(!this.isNative())return{name:"PocketVault",id:"com.pocketvault.app",version:"1.0.0",build:"1"};const r=await Er.getInfo();return{name:r.name,id:r.id,version:r.version,build:r.build}}static blobToBase64(r){return new Promise((e,t)=>{const s=new FileReader;s.onloadend=()=>{const c=s.result.split(",")[1];e(c)},s.onerror=t,s.readAsDataURL(r)})}static base64ToBlob(r,e){const t=atob(r),s=new Array(t.length);for(let c=0;c<t.length;c++)s[c]=t.charCodeAt(c);const i=new Uint8Array(s);return new Blob([i],{type:e})}static async requestPermissions(){this.isNative()&&console.log("[Native] Permissions checked")}}Ge(cr,"initialized",!1);var _f=X('<li class="svelte-17fy0f">✅ Bảo vệ dữ liệu khi mất thiết bị</li> <li class="svelte-17fy0f">✅ Chuyển mật khẩu sang máy mới</li> <li class="svelte-17fy0f">✅ Khôi phục khi xóa nhầm</li> <li class="svelte-17fy0f">✅ Lưu trữ offline an toàn</li>',1),Bf=X('<li class="svelte-17fy0f">✅ Protect data when device is lost</li> <li class="svelte-17fy0f">✅ Transfer passwords to new device</li> <li class="svelte-17fy0f">✅ Restore when accidentally deleted</li> <li class="svelte-17fy0f">✅ Safe offline storage</li>',1),Ef=X('<li class="svelte-17fy0f">Nhấn nút <strong>"Export Vault"</strong> ở góc trên bên phải</li> <li class="svelte-17fy0f">Nhập Master Password để xác nhận</li> <li class="svelte-17fy0f">File backup sẽ được tải xuống với tên: <code class="svelte-17fy0f">pocketvault-backup-YYYY-MM-DD.vault</code></li> <li class="svelte-17fy0f">File được mã hóa AES-256-GCM - an toàn tuyệt đối!</li>',1),wf=X('<li class="svelte-17fy0f">Click <strong>"Export Vault"</strong> button in top right corner</li> <li class="svelte-17fy0f">Enter Master Password to confirm</li> <li class="svelte-17fy0f">Backup file will be downloaded as: <code class="svelte-17fy0f">pocketvault-backup-YYYY-MM-DD.vault</code></li> <li class="svelte-17fy0f">File is encrypted with AES-256-GCM - absolutely secure!</li>',1),Cf=X('<li class="svelte-17fy0f">📱 Chuyển sang máy mới</li> <li class="svelte-17fy0f">🔄 Cài đặt lại app</li> <li class="svelte-17fy0f">💾 Khôi phục từ backup cũ</li> <li class="svelte-17fy0f">🔀 Gộp mật khẩu từ nhiều thiết bị</li>',1),Af=X('<li class="svelte-17fy0f">📱 Moving to new device</li> <li class="svelte-17fy0f">🔄 Reinstalling app</li> <li class="svelte-17fy0f">💾 Restoring from old backup</li> <li class="svelte-17fy0f">🔀 Merging passwords from multiple devices</li>',1),kf=X('<li class="svelte-17fy0f">Nhấn nút <strong>"Import Vault"</strong> ở góc trên bên phải</li> <li class="svelte-17fy0f">Chọn file backup (.vault)</li> <li class="svelte-17fy0f">Nhập Master Password của file backup</li> <li class="svelte-17fy0f">Chọn cách gộp dữ liệu: <ul class="svelte-17fy0f"><li class="svelte-17fy0f"><strong>Merge:</strong> Gộp với mật khẩu hiện tại</li> <li class="svelte-17fy0f"><strong>Replace:</strong> Thay thế hoàn toàn</li></ul></li>',1),Df=X('<li class="svelte-17fy0f">Click <strong>"Import Vault"</strong> button in top right corner</li> <li class="svelte-17fy0f">Select backup file (.vault)</li> <li class="svelte-17fy0f">Enter Master Password of the backup file</li> <li class="svelte-17fy0f">Choose merge method: <ul class="svelte-17fy0f"><li class="svelte-17fy0f"><strong>Merge:</strong> Combine with current passwords</li> <li class="svelte-17fy0f"><strong>Replace:</strong> Replace completely</li></ul></li>',1),Ff=X('<li class="svelte-17fy0f">✅ Offline hoàn toàn - không bị hack</li> <li class="svelte-17fy0f">✅ Kiểm soát 100%</li> <li class="svelte-17fy0f">✅ Không giới hạn dung lượng</li> <li class="svelte-17fy0f">⚠️ Cần bảo quản cẩn thận</li>',1),Sf=X('<li class="svelte-17fy0f">✅ Completely offline - cannot be hacked</li> <li class="svelte-17fy0f">✅ 100% control</li> <li class="svelte-17fy0f">✅ Unlimited storage</li> <li class="svelte-17fy0f">⚠️ Requires careful storage</li>',1),$f=X('<li class="svelte-17fy0f">✅ Truy cập mọi lúc mọi nơi</li> <li class="svelte-17fy0f">✅ Tự động đồng bộ</li> <li class="svelte-17fy0f">✅ File đã được mã hóa AES-256</li> <li class="svelte-17fy0f">⚠️ Cần internet</li>',1),Pf=X('<li class="svelte-17fy0f">✅ Access anytime, anywhere</li> <li class="svelte-17fy0f">✅ Auto sync</li> <li class="svelte-17fy0f">✅ File already encrypted with AES-256</li> <li class="svelte-17fy0f">⚠️ Requires internet</li>',1),Tf=X('<li class="svelte-17fy0f">✅ Dễ dàng và nhanh chóng</li> <li class="svelte-17fy0f">✅ Luôn có sẵn</li> <li class="svelte-17fy0f">⚠️ Giới hạn kích thước file</li> <li class="svelte-17fy0f">⚠️ Cần quản lý email cẩn thận</li>',1),Mf=X('<li class="svelte-17fy0f">✅ Easy and quick</li> <li class="svelte-17fy0f">✅ Always available</li> <li class="svelte-17fy0f">⚠️ File size limit</li> <li class="svelte-17fy0f">⚠️ Requires careful email management</li>',1),zf=X('<li class="svelte-17fy0f">3 bản backup</li> <li class="svelte-17fy0f">2 loại phương tiện khác nhau (USB + Cloud)</li> <li class="svelte-17fy0f">1 bản lưu ở nơi khác (nhà bạn bè, két sắt...)</li>',1),Rf=X(`<li class="svelte-17fy0f">3 backup copies</li> <li class="svelte-17fy0f">2 different media types (USB + Cloud)</li> <li class="svelte-17fy0f">1 copy stored elsewhere (friend's house, safe...)</li>`,1),Nf=X('<li class="svelte-17fy0f">✅ Tối thiểu 12 ký tự</li> <li class="svelte-17fy0f">✅ Kết hợp chữ hoa, chữ thường, số, ký tự đặc biệt</li> <li class="svelte-17fy0f">✅ Không dùng từ điển, tên, ngày sinh</li> <li class="svelte-17fy0f">✅ Duy nhất - không dùng lại ở đâu khác</li>',1),If=X(`<li class="svelte-17fy0f">✅ Minimum 12 characters</li> <li class="svelte-17fy0f">✅ Mix uppercase, lowercase, numbers, special characters</li> <li class="svelte-17fy0f">✅ Don't use dictionary words, names, birthdays</li> <li class="svelte-17fy0f">✅ Unique - don't reuse elsewhere</li>`,1),Hf=X('<li class="svelte-17fy0f">Export vault ra file backup</li> <li class="svelte-17fy0f">Lưu file vào cloud hoặc gửi email cho chính mình</li> <li class="svelte-17fy0f">Ghi nhớ Master Password</li>',1),Lf=X('<li class="svelte-17fy0f">Export vault to backup file</li> <li class="svelte-17fy0f">Save file to cloud or email to yourself</li> <li class="svelte-17fy0f">Remember Master Password</li>',1),Of=X('<li class="svelte-17fy0f">Cài đặt PocketVault</li> <li class="svelte-17fy0f">Tải file backup về</li> <li class="svelte-17fy0f">Import vault</li> <li class="svelte-17fy0f">Nhập Master Password</li> <li class="svelte-17fy0f">Hoàn tất! ✅</li>',1),Uf=X('<li class="svelte-17fy0f">Install PocketVault</li> <li class="svelte-17fy0f">Download backup file</li> <li class="svelte-17fy0f">Import vault</li> <li class="svelte-17fy0f">Enter Master Password</li> <li class="svelte-17fy0f">Done! ✅</li>',1),Wf=X('<div class="guide-container svelte-17fy0f"><div class="guide-header svelte-17fy0f"><!> <h1 class="svelte-17fy0f"> </h1> <p class="guide-subtitle svelte-17fy0f"> </p></div> <div class="guide-content svelte-17fy0f"><section class="guide-section svelte-17fy0f"><div class="section-header svelte-17fy0f"><!> <h2 class="svelte-17fy0f"> </h2></div> <div class="section-content svelte-17fy0f"><h3 class="svelte-17fy0f"> </h3> <p class="svelte-17fy0f"> </p> <ul class="svelte-17fy0f"><!></ul> <h3 class="svelte-17fy0f"> </h3> <ol class="svelte-17fy0f"><!></ol> <div class="tip-box success svelte-17fy0f"><!> <div class="svelte-17fy0f"><strong class="svelte-17fy0f"> </strong> </div></div></div></section> <section class="guide-section svelte-17fy0f"><div class="section-header svelte-17fy0f"><!> <h2 class="svelte-17fy0f"> </h2></div> <div class="section-content svelte-17fy0f"><h3 class="svelte-17fy0f"> </h3> <ul class="svelte-17fy0f"><!></ul> <h3 class="svelte-17fy0f"> </h3> <ol class="svelte-17fy0f"><!></ol> <div class="tip-box warning svelte-17fy0f"><!> <div class="svelte-17fy0f"><strong class="svelte-17fy0f"> </strong> </div></div></div></section> <section class="guide-section svelte-17fy0f"><div class="section-header svelte-17fy0f"><!> <h2 class="svelte-17fy0f"> </h2></div> <div class="section-content svelte-17fy0f"><h3 class="svelte-17fy0f"> </h3> <div class="storage-option svelte-17fy0f"><h4 class="svelte-17fy0f"> </h4> <ul class="svelte-17fy0f"><!></ul></div> <div class="storage-option svelte-17fy0f"><h4 class="svelte-17fy0f"> </h4> <ul class="svelte-17fy0f"><!></ul> <p class="svelte-17fy0f"><em class="svelte-17fy0f"> </em></p></div> <div class="storage-option svelte-17fy0f"><h4 class="svelte-17fy0f"> </h4> <ul class="svelte-17fy0f"><!></ul></div> <div class="tip-box info svelte-17fy0f"><!> <div class="svelte-17fy0f"><strong class="svelte-17fy0f"> </strong> <ul class="svelte-17fy0f"><!></ul></div></div></div></section> <section class="guide-section svelte-17fy0f"><div class="section-header svelte-17fy0f"><!> <h2 class="svelte-17fy0f"> </h2></div> <div class="section-content svelte-17fy0f"><h3 class="svelte-17fy0f"> </h3> <ul class="svelte-17fy0f"><li class="svelte-17fy0f">🔐 <strong>AES-256-GCM:</strong> </li> <li class="svelte-17fy0f">🔑 <strong>PBKDF2:</strong> </li> <li class="svelte-17fy0f">✅ <strong>Checksum:</strong> </li> <li class="svelte-17fy0f">🔒 <strong>Zero-cloud:</strong> </li></ul> <h3 class="svelte-17fy0f"> </h3> <ul class="svelte-17fy0f"><!></ul> <div class="tip-box success svelte-17fy0f"><!> <div class="svelte-17fy0f"><strong class="svelte-17fy0f"> </strong> <code class="svelte-17fy0f">My$ecur3P@ssw0rd!2024</code> <br/> <em> </em></div></div></div></section> <section class="guide-section svelte-17fy0f"><div class="section-header svelte-17fy0f"><!> <h2 class="svelte-17fy0f"> </h2></div> <div class="section-content svelte-17fy0f"><h3 class="svelte-17fy0f"> </h3> <ol class="svelte-17fy0f"><li class="svelte-17fy0f"><strong> </strong> <ul class="svelte-17fy0f"><!></ul></li> <li class="svelte-17fy0f"><strong> </strong> <ul class="svelte-17fy0f"><!></ul></li></ol> <div class="tip-box info svelte-17fy0f"><!> <div class="svelte-17fy0f"><strong class="svelte-17fy0f"> </strong> </div></div></div></section> <section class="guide-section svelte-17fy0f"><div class="section-header svelte-17fy0f"><!> <h2 class="svelte-17fy0f"> </h2></div> <div class="section-content svelte-17fy0f"><div class="faq-item svelte-17fy0f"><h4 class="svelte-17fy0f"> </h4> <p class="svelte-17fy0f"> </p></div> <div class="faq-item svelte-17fy0f"><h4 class="svelte-17fy0f"> </h4> <p class="svelte-17fy0f"> </p></div> <div class="faq-item svelte-17fy0f"><h4 class="svelte-17fy0f"> </h4> <p class="svelte-17fy0f"> </p></div> <div class="faq-item svelte-17fy0f"><h4 class="svelte-17fy0f"> </h4> <p class="svelte-17fy0f"> </p></div> <div class="faq-item svelte-17fy0f"><h4 class="svelte-17fy0f"> </h4> <p class="svelte-17fy0f"> </p></div></div></section> <div class="guide-footer svelte-17fy0f"><!> <p class="svelte-17fy0f"><strong class="svelte-17fy0f">PocketVault</strong> <br/> </p> <div class="creator-info svelte-17fy0f"><h3 class="svelte-17fy0f"> </h3> <p class="creator-name svelte-17fy0f">Đạt Trần</p> <div class="creator-links svelte-17fy0f"><a href="https://www.linkedin.com/in/stevedat/" target="_blank" rel="noopener noreferrer" class="creator-link svelte-17fy0f"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="svelte-17fy0f"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg> LinkedIn</a> <a href="mailto:eduflows.app@gmail.com" class="creator-link svelte-17fy0f"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="svelte-17fy0f"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Email</a> <a href="https://github.com/stevedat/PERSONAL-PASSWORD-VAULT" target="_blank" rel="noopener noreferrer" class="creator-link svelte-17fy0f"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="svelte-17fy0f"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg> GitHub</a></div></div></div></div></div>');function Vf(a,r){_t(r,!1);const e=te();let t=rt(r,"lang",8,"en");Ft(()=>Ie(t()),()=>{P(e,t()==="vi")}),tr();var s=Wf(),i=_(s),c=_(i);f0(c,{size:48,class:"guide-icon"});var o=S(c,2),d=_(o,!0);b(o);var n=S(o,2),l=_(n,!0);b(n),b(i);var g=S(i,2),f=_(g),x=_(f),y=_(x);Ci(y,{size:32});var B=S(y,2),v=_(B,!0);b(B),b(x);var w=S(x,2),p=_(w),h=_(p,!0);b(p);var m=S(p,2),D=_(m,!0);b(m);var E=S(m,2),C=_(E);{var k=G=>{var ne=_f();ye(6),L(G,ne)},N=G=>{var ne=Bf();ye(6),L(G,ne)};ae(C,G=>{u(e)?G(k):G(N,-1)})}b(E);var A=S(E,2),F=_(A,!0);b(A);var T=S(A,2),I=_(T);{var V=G=>{var ne=Ef();ye(6),L(G,ne)},K=G=>{var ne=wf();ye(6),L(G,ne)};ae(I,G=>{u(e)?G(V):G(K,-1)})}b(T);var Y=S(T,2),se=_(Y);Zt(se,{size:20});var ee=S(se,2),J=_(ee),j=_(J,!0);b(J);var $=S(J);b(ee),b(Y),b(w),b(f);var R=S(f,2),H=_(R),z=_(H);Si(z,{size:32});var M=S(z,2),O=_(M,!0);b(M),b(H);var W=S(H,2),U=_(W),re=_(U,!0);b(U);var ue=S(U,2),xe=_(ue);{var ce=G=>{var ne=Cf();ye(6),L(G,ne)},ve=G=>{var ne=Af();ye(6),L(G,ne)};ae(xe,G=>{u(e)?G(ce):G(ve,-1)})}b(ue);var Z=S(ue,2),me=_(Z,!0);b(Z);var ie=S(Z,2),Se=_(ie);{var Pe=G=>{var ne=kf();ye(6),L(G,ne)},Le=G=>{var ne=Df();ye(6),L(G,ne)};ae(Se,G=>{u(e)?G(Pe):G(Le,-1)})}b(ie);var ze=S(ie,2),ke=_(ze);Zt(ke,{size:20});var Ee=S(ke,2),Te=_(Ee),at=_(Te,!0);b(Te);var Ze=S(Te);b(Ee),b(ze),b(W),b(R);var Me=S(R,2),He=_(Me),je=_(He);fc(je,{size:32});var De=S(je,2),Qe=_(De,!0);b(De),b(He);var We=S(He,2),Re=_(We),Ke=_(Re,!0);b(Re);var Je=S(Re,2),ft=_(Je),ge=_(ft,!0);b(ft);var fe=S(ft,2),Ne=_(fe);{var it=G=>{var ne=Ff();ye(6),L(G,ne)},dt=G=>{var ne=Sf();ye(6),L(G,ne)};ae(Ne,G=>{u(e)?G(it):G(dt,-1)})}b(fe),b(Je);var ut=S(Je,2),vt=_(ut),Pt=_(vt,!0);b(vt);var Et=S(vt,2),rr=_(Et);{var Yt=G=>{var ne=$f();ye(6),L(G,ne)},ar=G=>{var ne=Pf();ye(6),L(G,ne)};ae(rr,G=>{u(e)?G(Yt):G(ar,-1)})}b(Et);var Tt=S(Et,2),Mt=_(Tt),Wt=_(Mt,!0);b(Mt),b(Tt),b(ut);var zt=S(ut,2),Ve=_(zt),ot=_(Ve,!0);b(Ve);var Rt=S(Ve,2),Xt=_(Rt);{var Br=G=>{var ne=Tf();ye(6),L(G,ne)},de=G=>{var ne=Mf();ye(6),L(G,ne)};ae(Xt,G=>{u(e)?G(Br):G(de,-1)})}b(Rt),b(zt);var le=S(zt,2),$e=_(le);Zt($e,{size:20});var st=S($e,2),lt=_(st),et=_(lt,!0);b(lt);var Oe=S(lt,2),nt=_(Oe);{var xt=G=>{var ne=zf();ye(4),L(G,ne)},ct=G=>{var ne=Rf();ye(4),L(G,ne)};ae(nt,G=>{u(e)?G(xt):G(ct,-1)})}b(Oe),b(st),b(le),b(We),b(Me);var wt=S(Me,2),sr=_(wt),Ca=_(sr);Zt(Ca,{size:32});var Aa=S(Ca,2),Ti=_(Aa,!0);b(Aa),b(sr);var ka=S(sr,2),x0=_(ka),Mi=_(x0,!0);b(x0);var p0=S(x0,2),h0=_(p0),zi=S(_(h0),2);b(h0);var g0=S(h0,2),Ri=S(_(g0),2);b(g0);var y0=S(g0,2),Ni=S(_(y0),2);b(y0);var Da=S(y0,2),Ii=S(_(Da),2);b(Da),b(p0);var m0=S(p0,2),Hi=_(m0,!0);b(m0);var b0=S(m0,2),Li=_(b0);{var Oi=G=>{var ne=Nf();ye(6),L(G,ne)},Ui=G=>{var ne=If();ye(6),L(G,ne)};ae(Li,G=>{u(e)?G(Oi):G(Ui,-1)})}b(b0);var Fa=S(b0,2),Sa=_(Fa);Zt(Sa,{size:20});var $a=S(Sa,2),_0=_($a),Wi=_(_0,!0);b(_0);var Pa=S(_0,6),Vi=_(Pa,!0);b(Pa),b($a),b(Fa),b(ka),b(wt);var B0=S(wt,2),E0=_(B0),Ta=_(E0);yr(Ta,{size:32});var Ma=S(Ta,2),qi=_(Ma,!0);b(Ma),b(E0);var za=S(E0,2),w0=_(za),ji=_(w0,!0);b(w0);var C0=S(w0,2),A0=_(C0),k0=_(A0),Ki=_(k0,!0);b(k0);var Ra=S(k0,2),Gi=_(Ra);{var Yi=G=>{var ne=Hf();ye(4),L(G,ne)},Xi=G=>{var ne=Lf();ye(4),L(G,ne)};ae(Gi,G=>{u(e)?G(Yi):G(Xi,-1)})}b(Ra),b(A0);var Na=S(A0,2),D0=_(Na),Zi=_(D0,!0);b(D0);var Ia=S(D0,2),Qi=_(Ia);{var Ji=G=>{var ne=Of();ye(8),L(G,ne)},en=G=>{var ne=Uf();ye(8),L(G,ne)};ae(Qi,G=>{u(e)?G(Ji):G(en,-1)})}b(Ia),b(Na),b(C0);var Ha=S(C0,2),La=_(Ha);yr(La,{size:20});var Oa=S(La,2),F0=_(Oa),tn=_(F0,!0);b(F0);var rn=S(F0);b(Oa),b(Ha),b(za),b(B0);var S0=S(B0,2),$0=_(S0),Ua=_($0);f0(Ua,{size:32});var Wa=S(Ua,2),an=_(Wa,!0);b(Wa),b($0);var Va=S($0,2),P0=_(Va),T0=_(P0),sn=_(T0,!0);b(T0);var qa=S(T0,2),nn=_(qa,!0);b(qa),b(P0);var M0=S(P0,2),z0=_(M0),on=_(z0,!0);b(z0);var ja=S(z0,2),ln=_(ja,!0);b(ja),b(M0);var R0=S(M0,2),N0=_(R0),cn=_(N0,!0);b(N0);var Ka=S(N0,2),fn=_(Ka,!0);b(Ka),b(R0);var I0=S(R0,2),H0=_(I0),dn=_(H0,!0);b(H0);var Ga=S(H0,2),un=_(Ga,!0);b(Ga),b(I0);var Ya=S(I0,2),L0=_(Ya),vn=_(L0,!0);b(L0);var Xa=S(L0,2),xn=_(Xa,!0);b(Xa),b(Ya),b(Va),b(S0);var Za=S(S0,2),Qa=_(Za);Zt(Qa,{size:24});var O0=S(Qa,2),Ja=S(_(O0)),pn=S(Ja,2);b(O0);var es=S(O0,2),ts=_(es),hn=_(ts,!0);b(ts),ye(4),b(es),b(Za),b(g),b(s),Ae(()=>{q(d,u(e)?"Hướng Dẫn Sử Dụng PocketVault":"PocketVault User Guide"),q(l,u(e)?"Cách sao lưu và khôi phục mật khẩu an toàn":"How to backup and restore your passwords safely"),q(v,u(e)?"1. Cách Sao Lưu (Backup)":"1. How to Backup"),q(h,u(e)?"Tại sao cần backup?":"Why backup?"),q(D,u(e)?"Backup giúp bạn:":"Backup helps you:"),q(F,u(e)?"Cách thực hiện:":"How to do it:"),q(j,u(e)?"Mẹo:":"Tip:"),q($,` ${u(e)?"App tự động tạo backup sau mỗi lần thêm/sửa mật khẩu. Bạn có thể tìm thấy trong phần Auto-Backup (nếu đã bật).":"App automatically creates backup after each add/edit. You can find them in Auto-Backup section (if enabled)."}`),q(O,u(e)?"2. Cách Khôi Phục (Restore)":"2. How to Restore"),q(re,u(e)?"Khi nào cần restore?":"When to restore?"),q(me,u(e)?"Cách thực hiện:":"How to do it:"),q(at,u(e)?"Lưu ý:":"Note:"),q(Ze,` ${u(e)?'Nếu chọn "Replace", tất cả mật khẩu hiện tại sẽ bị xóa. Hãy backup trước khi thực hiện!':'If you choose "Replace", all current passwords will be deleted. Please backup first!'}`),q(Qe,u(e)?"3. Nơi Lưu Backup An Toàn":"3. Safe Backup Storage"),q(Ke,u(e)?"Khuyến nghị lưu trữ:":"Storage recommendations:"),q(ge,u(e)?"🔒 Tốt nhất: USB/Ổ cứng ngoài":"🔒 Best: USB/External Drive"),q(Pt,u(e)?"☁️ Tốt: Cloud Storage (mã hóa)":"☁️ Good: Cloud Storage (encrypted)"),q(Wt,u(e)?"Gợi ý: Google Drive, iCloud, Dropbox, OneDrive":"Suggestions: Google Drive, iCloud, Dropbox, OneDrive"),q(ot,u(e)?"📧 Khả dụng: Email cho chính mình":"📧 Usable: Email to yourself"),q(et,u(e)?"Chiến lược 3-2-1:":"3-2-1 Strategy:"),q(Ti,u(e)?"4. Bảo Mật Backup":"4. Backup Security"),q(Mi,u(e)?"File backup của bạn được bảo vệ bởi:":"Your backup file is protected by:"),q(zi,` ${u(e)?"Mã hóa quân sự, không thể bẻ khóa":"Military-grade encryption, unbreakable"}`),q(Ri,` ${u(e)?"600,000 vòng lặp - chống brute force":"600,000 iterations - prevents brute force"}`),q(Ni,` ${u(e)?"Phát hiện file bị sửa đổi":"Detects file tampering"}`),q(Ii,` ${u(e)?"Không lưu trên server nào":"Not stored on any server"}`),q(Hi,u(e)?"Master Password mạnh:":"Strong Master Password:"),q(Wi,u(e)?"Ví dụ Master Password tốt:":"Good Master Password example:"),q(Vi,u(e)?"Dễ nhớ nhưng rất khó đoán!":"Easy to remember but very hard to guess!"),q(qi,u(e)?"5. Chuyển Sang Máy Mới":"5. Transfer to New Device"),q(ji,u(e)?"Quy trình chuyển máy:":"Transfer process:"),q(Ki,u(e)?"Trên máy cũ:":"On old device:"),q(Zi,u(e)?"Trên máy mới:":"On new device:"),q(tn,u(e)?"Lưu ý:":"Note:"),q(rn,` ${u(e)?"Nếu dùng native app (iOS/Android), bạn có thể dùng tính năng Share để gửi file backup qua AirDrop, Bluetooth, hoặc các app khác.":"If using native app (iOS/Android), you can use Share feature to send backup file via AirDrop, Bluetooth, or other apps."}`),q(an,u(e)?"6. Câu Hỏi Thường Gặp":"6. Frequently Asked Questions"),q(sn,u(e)?"❓ Tôi quên Master Password thì sao?":"❓ What if I forget Master Password?"),q(nn,u(e)?"Rất tiếc, không có cách nào khôi phục. Đây là thiết kế bảo mật - không ai có thể truy cập vault của bạn, kể cả chúng tôi. Hãy ghi nhớ Master Password cẩn thận!":"Unfortunately, there's no way to recover. This is a security design - no one can access your vault, not even us. Please remember your Master Password carefully!"),q(on,u(e)?"❓ File backup có an toàn không?":"❓ Is backup file safe?"),q(ln,u(e)?"Có! File được mã hóa AES-256-GCM với Master Password của bạn. Ngay cả khi ai đó lấy được file, họ không thể đọc được nội dung nếu không có Master Password.":"Yes! File is encrypted with AES-256-GCM using your Master Password. Even if someone gets the file, they cannot read the content without Master Password."),q(cn,u(e)?"❓ Tôi nên backup bao lâu một lần?":"❓ How often should I backup?"),q(fn,u(e)?"App tự động tạo backup sau mỗi thay đổi. Nhưng bạn nên export thủ công ít nhất 1 tháng/lần và lưu ở nơi an toàn.":"App automatically creates backup after each change. But you should manually export at least once a month and store it safely."),q(dn,u(e)?"❓ Tôi có thể dùng cùng vault trên nhiều thiết bị?":"❓ Can I use same vault on multiple devices?"),q(un,u(e)?"Có! Export từ thiết bị này và import vào thiết bị khác. Tuy nhiên, các thay đổi không tự động đồng bộ - bạn cần export/import thủ công khi có cập nhật.":"Yes! Export from one device and import to another. However, changes don't auto-sync - you need to manually export/import when updated."),q(vn,u(e)?"❓ File backup có hết hạn không?":"❓ Does backup file expire?"),q(xn,u(e)?"Không! File backup có thể dùng mãi mãi, miễn là bạn nhớ Master Password.":"No! Backup file can be used forever, as long as you remember the Master Password."),q(Ja,` - ${u(e)?"Quản lý mật khẩu an toàn, offline, zero-cloud.":"Secure password manager, offline, zero-cloud."} `),q(pn,` ${u(e)?"Mã hóa AES-256-GCM | PBKDF2 600k iterations | 100% Client-side":"AES-256-GCM encryption | PBKDF2 600k iterations | 100% Client-side"}`),q(hn,u(e)?"Người Tạo App":"App Creator")}),L(a,s),Bt()}const oi=()=>{{const a=localStorage.getItem("pocketvault-language");if(a==="vi"||a==="en")return a}return"en"};function qf(){const{subscribe:a,set:r}=io(oi());return{subscribe:a,set:e=>{localStorage.setItem("pocketvault-language",e),r(e)},toggle:()=>{const t=oi()==="en"?"vi":"en";localStorage.setItem("pocketvault-language",t),r(t)}}}const li=qf();var jf=X('<div class="glass animate-fade-in" style="background: rgba(34,197,94,0.2); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; padding: 0.875rem; border-radius: 12px; font-size: 0.875rem; text-align: center; margin-bottom: 1rem;"> </div>'),Kf=X('<button class="glass-btn-primary" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" title="Biometric enabled"><span style="display: flex; align-items: center; justify-content: center;"><!></span></button>'),Gf=X('<div><input type="text" placeholder="Search passwords..." class="glass-input" style="width: 100%; padding: 0.875rem; border-radius: 14px;"/></div>'),Yf=X('<div style="display: flex; justify-content: center; margin-bottom: 1rem;"><!></div> <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;" class="text-glass">Your vault is empty</h2> <p style="margin: 0; font-size: 1rem;">Add your first password to get started</p>',1),Xf=X('<div style="display: flex; justify-content: center; margin-bottom: 1rem;"><!></div> <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;" class="text-glass">No matches found</h2> <p style="margin: 0; font-size: 1rem;">Try a different search or filter</p>',1),Zf=X('<div style="display: flex; justify-content: center; margin-bottom: 1rem;"><!></div> <h2 style="margin: 0 0 0.5rem 0; font-size: 1.5rem;" class="text-glass">No matches found</h2> <p style="margin: 0; font-size: 1rem;">Try a different search term</p>',1),Qf=X('<div style="text-align: center; padding: 3rem 1rem;" class="text-glass-secondary"><!></div>'),Jf=X('<button class="glass-btn haptic-medium" style="margin-top: 0.5rem; padding: 0.875rem; border-radius: 14px; width: 100%; text-align: center; font-weight: 500;"> </button>'),ed=X('<div style="display: flex; flex-direction: column; gap: 0.875rem;"><!> <!></div>'),td=X('<span style="opacity: 0.7; font-size: 0.75rem;"> </span>'),rd=X('<button><span style="display: flex; align-items: center;"><!></span> <span> </span> <!></button>'),ad=X('<div style="position: absolute; right: 0; bottom: 0; transform: translateX(calc(max(0px, 100vw - 800px) / -2)); transition: transform 0.3s;"><button class="glass-fab haptic-heavy" title="Add password"><span style="display: flex; align-items: center; justify-content: center;"><!></span></button></div>'),sd=X('<div style="min-height: 100vh;"><header class="glass-header"><!> <!> <div style="max-width: 800px; margin: 0 auto; width: 100%;"><div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; gap: 0.75rem;"><h1 style="margin: 0; font-size: 1.5rem; font-weight: 600; flex-shrink: 0; display: flex; align-items: center; gap: 0.5rem;" class="text-glass"><!> PocketVault</h1> <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: flex-end;"><button class="glass-btn haptic-light" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" title="Toggle theme"><span style="display: flex; align-items: center; justify-content: center;"><!></span></button> <button class="glass-btn haptic-light" style="padding: 0.625rem 0.875rem; border-radius: 12px; min-height: 44px; display: flex; align-items: center; justify-content: center; gap: 0.375rem; font-weight: 600; font-size: 0.875rem;" title="Switch language"><span style="display: flex; align-items: center; justify-content: center;"><!></span> <span> </span></button> <!> <div style="position: relative;"><button class="glass-btn haptic-light" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" title="Export vault"><span style="display: flex; align-items: center; justify-content: center;"><!></span></button> <!></div> <div style="position: relative;"><button class="glass-btn haptic-light" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" title="Import vault"><span style="display: flex; align-items: center; justify-content: center;"><!></span></button> <!></div> <button class="glass-btn haptic-medium" style="padding: 0.625rem; border-radius: 12px; min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;" title="Lock vault"><span style="display: flex; align-items: center; justify-content: center;"><!></span></button></div></div> <!></div></header> <main style="padding: 1rem; padding-bottom: 7rem;"><div style="max-width: 800px; margin: 0 auto; width: 100%;"><!> <div style="display: flex; justify-content: center; margin-top: 4rem; margin-bottom: 2rem; min-height: 50px;"></div></div></main> <nav class="bottom-nav"><div class="bottom-nav-scroll"></div></nav> <div style="position: fixed; bottom: 6.5rem; right: 1.5rem; z-index: 100;"><!></div> <!> <!> <!> <input type="file" accept=".vault" style="display: none;"/></div>');function xd(a,r){_t(r,!1);const e=()=>gt(yt,"$vaultItems",l),t=()=>gt(ns,"$categoryFilter",l),s=()=>gt(os,"$searchQuery",l),i=()=>gt(l0,"$biometricEnabled",l),c=()=>gt(ta,"$isUnlocked",l),o=()=>gt(At,"$showReminder",l),d=()=>gt(ls,"$darkMode",l),n=()=>gt(li,"$language",l),[l,g]=yi(),f=te();rt(r,"data",8),rt(r,"params",24,()=>({}));let x=te([]),y=te(!1),B=te(""),v,w=te(!1),p=te(!1),h=te(!1);const m=()=>{P(w,!1),P(p,!1)};let D=te(""),E;function C(M){P(D,M.currentTarget.value),clearTimeout(E),E=setTimeout(()=>{os.set(u(D))},300)}let k=te();async function N(M){cs();try{const O=e(),W=O.findIndex(xe=>xe.id===M.id);let U;const re=W<0;W>=0?(U=[...O],U[W]=M):U=[...O,M];const ue=sessionStorage.getItem("pv_master_key");if(ue)try{if(await Ye.saveVault(U,ue),yt.set(U),tt.getConfig().enabled)try{await tt.createBackup(U,ue)}catch(xe){console.error("[Main] Auto-backup failed (non-critical):",xe)}}catch(xe){console.error("[Main] Save failed with cached password:",xe),sessionStorage.removeItem("pv_master_key");const ce=prompt("Master password expired. Enter password to save:");if(!ce){ht();return}try{if(await Ye.saveVault(U,ce),sessionStorage.setItem("pv_master_key",ce),yt.set(U),tt.getConfig().enabled)try{await tt.createBackup(U,ce)}catch(ve){console.error("[Main] Auto-backup failed (non-critical):",ve)}}catch(ve){console.error("[Main] Save failed after password refresh:",ve),alert("Failed to save: Invalid master password"),ht();return}}else{const xe=prompt("Enter master password to save changes:");if(!xe){ht();return}try{if(await Ye.loadVault(xe),sessionStorage.setItem("pv_master_key",xe),await Ye.saveVault(U,xe),yt.set(U),tt.getConfig().enabled)try{await tt.createBackup(U,xe)}catch(ce){console.error("[Main] Auto-backup failed (non-critical):",ce)}}catch(ce){console.error("[Main] Save failed:",ce),alert("Failed to save: Invalid master password"),ht();return}}fs(),re&&(qe.recordPasswordAdd(),se()),Y(re?"Password added successfully":"Password updated successfully")}finally{ht()}}async function A(M){if(confirm("Are you sure you want to delete this item?")){cs();try{const O=sessionStorage.getItem("pv_master_key");if(O)try{const W=e().filter(U=>U.id!==M);await Ye.saveVault(W,O),yt.set(W)}catch(W){console.error("[Main] Delete failed:",W),sessionStorage.removeItem("pv_master_key");const U=prompt("Master password expired. Enter password to delete:");if(!U){ht();return}try{const re=e().filter(ue=>ue.id!==M);await Ye.saveVault(re,U),sessionStorage.setItem("pv_master_key",U),yt.set(re)}catch(re){console.error("[Main] Delete failed after password refresh:",re),alert("Failed to delete: Invalid master password"),ht();return}}else{const W=prompt("Enter master password to confirm deletion:");if(!W){ht();return}try{await Ye.loadVault(W),sessionStorage.setItem("pv_master_key",W);const U=e().filter(re=>re.id!==M);await Ye.saveVault(U,W),yt.set(U)}catch(U){console.error("[Main] Delete failed:",U),alert("Failed to delete: Invalid master password"),ht();return}}fs(),Y("Password deleted successfully")}finally{ht()}}}let F=!1;async function T(M){if(M&&M.preventDefault&&M.preventDefault(),!F){F=!0;try{const O=sessionStorage.getItem("pv_master_key");if(O)try{Y("Exporting vault...");const W=await Ct.quickExport(e(),O),U=Ct.generateFileName();await I(W,U),qe.recordBackup(),At.set(null),Y("Vault exported successfully")}catch(W){console.error("[Main] Export failed with cached password:",W),sessionStorage.removeItem("pv_master_key");const U=prompt("Master password expired. Enter password to export:");if(!U)return;try{Y("Exporting vault...");const re=await Ct.quickExport(e(),U),ue=Ct.generateFileName();sessionStorage.setItem("pv_master_key",U),await I(re,ue),qe.recordBackup(),At.set(null),Y("Vault exported successfully")}catch(re){console.error("[Main] Export failed after password refresh:",re),alert("Export failed: Invalid master password")}}else{const W=prompt("Enter master password to export vault:");if(!W)return;try{await Ye.loadVault(W),sessionStorage.setItem("pv_master_key",W),Y("Exporting vault...");const U=await Ct.quickExport(e(),W),re=Ct.generateFileName();await I(U,re),qe.recordBackup(),At.set(null),Y("Vault exported successfully")}catch(U){console.error("[Main] Export failed:",U),alert("Export failed: Invalid master password")}}}finally{F=!1}}}async function I(M,O){if(cr.isNative()){if(!(await cr.shareFile(O,M)).success){const U=await cr.exportToFile(O,M);if(U.success)Y(`Saved to: ${U.path}`);else throw new Error(U.error||"Failed to save file")}}else{const W=URL.createObjectURL(M),U=document.createElement("a");U.href=W,U.download=O,U.click(),URL.revokeObjectURL(W)}}async function V(){u(k).click()}async function K(M){const O=M.currentTarget.files&&M.currentTarget.files[0];if(!O)return;if(O.size>10*1024*1024){alert("File too large. Maximum size is 10MB / Tệp quá lớn. Kích thước tối đa là 10MB"),pt(k,u(k).value="");return}if(!O.name.toLowerCase().endsWith(".vault")){alert("Invalid file format. Only .vault files are accepted / Định dạng tệp không hợp lệ. Chỉ chấp nhận tệp .vault"),pt(k,u(k).value="");return}const W=await hr.validateVaultFile(O);if(!W.valid){console.error("[Main] Import validation failed:",W.error),alert(`Import failed / Nhập thất bại: ${W.error}`),pt(k,u(k).value="");return}const U=prompt("Enter master password for the vault file / Nhập mật khẩu chính cho tệp vault:");if(!U){pt(k,u(k).value="");return}try{const re=await hr.importVault(O,U,e()),ue=sessionStorage.getItem("pv_master_key");if(ue)try{if(await Ye.saveVault(re.items,ue),tt.getConfig().enabled)try{await tt.createBackup(re.items,ue)}catch(ce){console.error("[Main] Auto-backup failed (non-critical):",ce)}}catch(ce){console.error("[Main] Save failed with cached password:",ce),sessionStorage.removeItem("pv_master_key");const ve=prompt("Master password expired. Enter password to save / Mật khẩu đã hết hạn. Nhập mật khẩu để lưu:");if(!ve){pt(k,u(k).value="");return}try{if(await Ye.saveVault(re.items,ve),sessionStorage.setItem("pv_master_key",ve),tt.getConfig().enabled)try{await tt.createBackup(re.items,ve)}catch(Z){console.error("[Main] Auto-backup failed (non-critical):",Z)}}catch(Z){console.error("[Main] Save failed after password refresh:",Z),alert("Failed to save merged vault: Invalid master password / Lưu vault thất bại: Mật khẩu không đúng"),pt(k,u(k).value="");return}}else{const ce=prompt("Enter master password to save merged vault / Nhập mật khẩu chính để lưu vault đã hợp nhất:");if(!ce){pt(k,u(k).value="");return}try{if(await Ye.saveVault(re.items,ce),sessionStorage.setItem("pv_master_key",ce),tt.getConfig().enabled)try{await tt.createBackup(re.items,ce)}catch(ve){console.error("[Main] Auto-backup failed (non-critical):",ve)}}catch(ve){console.error("[Main] Save failed:",ve),alert("Failed to save merged vault: Invalid master password / Lưu vault thất bại: Mật khẩu không đúng"),pt(k,u(k).value="");return}}yt.set(re.items);const xe=`Import successful / Nhập thành công: ${re.stats.newCount} new/mới, ${re.stats.updatedCount} updated/cập nhật, ${re.stats.unchangedCount} unchanged/không đổi`;Y(xe)}catch(re){const ue=re;console.error("[Main] Import failed:",ue);let xe=ue.message;xe.includes("decrypt")?xe="Wrong password or corrupted file / Sai mật khẩu hoặc tệp bị hỏng":xe.includes("Invalid")&&(xe="Invalid vault file format / Định dạng tệp vault không hợp lệ"),alert(`Import failed / Nhập thất bại: ${xe}`)}pt(k,u(k).value="")}function Y(M){P(B,M),clearTimeout(v),v=setTimeout(()=>{P(B,"")},3e3)}function se(){const M=qe.shouldShowReminder();M&&(At.set(M),qe.markShownThisSession())}function ee(){c0.set(null),ra.set(!0)}function J(){ls.update(M=>!M)}function j(){i()?(mt.disable(),l0.set(!1)):alert("Biometric setup would be triggered here")}br(async()=>{await cr.initialize(),of(),yo(),mo(),se(),qe.resetSession()}),no(()=>{bo(),u(h)&&document.removeEventListener("click",m)}),Ft(()=>(u(w),u(p),u(h)),()=>{typeof document<"u"&&((u(w)||u(p))&&!u(h)?(document.addEventListener("click",m),P(h,!0)):!u(w)&&!u(p)&&u(h)&&(document.removeEventListener("click",m),P(h,!1)))}),Ft(()=>(e(),f0),()=>{P(f,[{value:"all",label:"All",icon:uc,count:e().length},{value:"email",label:"Email",icon:wa,count:e().filter(M=>(M.category||"other")==="email").length},{value:"banking",label:"Banking",icon:Ea,count:e().filter(M=>(M.category||"other")==="banking").length},{value:"app",label:"App",icon:yr,count:e().filter(M=>(M.category||"other")==="app").length},{value:"website",label:"Website",icon:Ba,count:e().filter(M=>(M.category||"other")==="website").length},{value:"work",label:"Work",icon:ma,count:e().filter(M=>(M.category||"other")==="work").length},{value:"games",label:"Games",icon:_a,count:e().filter(M=>(M.category||"other")==="games").length},{value:"other",label:"Other",icon:ba,count:e().filter(M=>(M.category||"other")==="other").length},{value:"guide",label:"Guide",icon:f0,count:0}])}),Ft(()=>(e(),t(),s(),u(x)),()=>{let M=e();t()!=="all"&&(M=M.filter(O=>(O.category||"other")===t())),s()&&(M=M.filter(O=>O.title.toLowerCase().includes(s().toLowerCase())||O.username.toLowerCase().includes(s().toLowerCase()))),P(x,M),P(y,!1)}),tr(),$t();var $=he();Ao("1uha8ag",M=>{pa(()=>{oo.title="PocketVault - Secure Password Manager"})});var R=oe($);{var H=M=>{$c(M,{})},z=M=>{var O=sd(),W=_(O),U=_(W);{var re=de=>{var le=jf(),$e=_(le,!0);b(le),Ae(()=>q($e,u(B))),L(de,le)};ae(U,de=>{u(B)&&de(re)})}var ue=S(U,2);{var xe=de=>{Yc(de,{get reminderType(){return o()},onBackupNow:T})};ae(ue,de=>{o()&&de(xe)})}var ce=S(ue,2),ve=_(ce),Z=_(ve),me=_(Z);Di(me,{size:28,strokeWidth:1.5,color:"currentColor"}),ye(),b(Z);var ie=S(Z,2),Se=_(ie),Pe=_(Se),Le=_(Pe);qt(Le,()=>d()?hc:vc,(de,le)=>{le(de,{size:20,strokeWidth:1.5})}),b(Pe),b(Se);var ze=S(Se,2),ke=_(ze),Ee=_(ke);dc(Ee,{size:18,strokeWidth:1.5}),b(ke);var Te=S(ke,2),at=_(Te,!0);b(Te),b(ze);var Ze=S(ze,2);{var Me=de=>{var le=Kf(),$e=_(le),st=_($e);qt(st,()=>mt.getBiometricType()==="FaceID"?ca:la,(lt,et)=>{et(lt,{size:20,strokeWidth:1.5})}),b($e),b(le),Q("click",le,j),L(de,le)};ae(Ze,de=>{i()&&de(Me)})}var He=S(Ze,2),je=_(He),De=_(je),Qe=_(De);Si(Qe,{size:20,strokeWidth:1.5}),b(De),b(je);var We=S(je,2);ti(We,{type:"export",get show(){return u(w)},onClose:()=>P(w,!1)}),b(He);var Re=S(He,2),Ke=_(Re),Je=_(Ke),ft=_(Je);Ci(ft,{size:20,strokeWidth:1.5}),b(Je),b(Ke);var ge=S(Ke,2);ti(ge,{type:"import",get show(){return u(p)},onClose:()=>P(p,!1)}),b(Re);var fe=S(Re,2),Ne=_(fe),it=_(Ne);ki(it,{size:20,strokeWidth:1.5}),b(Ne),b(fe),b(ie),b(ve);var dt=S(ve,2);{var ut=de=>{var le=Gf(),$e=_(le);kt($e),b(le),Ae(()=>Io($e,u(D))),Q("input",$e,C),L(de,le)};ae(dt,de=>{t()!=="guide"&&de(ut)})}b(ce),b(W);var vt=S(W,2),Pt=_(vt),Et=_(Pt);{var rr=de=>{Vf(de,{get lang(){return n()}})},Yt=de=>{var le=Qf(),$e=_(le);{var st=Oe=>{var nt=Yf(),xt=oe(nt),ct=_(xt);gr(ct,{size:64,strokeWidth:1}),b(xt),ye(4),L(Oe,nt)},lt=Oe=>{var nt=Xf(),xt=oe(nt),ct=_(xt);ei(ct,{size:64,strokeWidth:1}),b(xt),ye(4),L(Oe,nt)},et=Oe=>{var nt=Zf(),xt=oe(nt),ct=_(xt);ei(ct,{size:64,strokeWidth:1}),b(xt),ye(4),L(Oe,nt)};ae($e,Oe=>{e(),pe(()=>e().length===0)?Oe(st):s()||t()!=="all"?Oe(lt,1):Oe(et,-1)})}b(le),L(de,le)},ar=de=>{var le=ed(),$e=_(le);xr($e,1,()=>(u(y),u(x),pe(()=>u(y)?u(x):u(x).slice(0,5))),et=>et.id,(et,Oe)=>{Ic(et,{get item(){return u(Oe)},onDelete:A})});var st=S($e,2);{var lt=et=>{var Oe=Jf(),nt=_(Oe,!0);b(Oe),Ae(()=>q(nt,(u(y),u(x),pe(()=>u(y)?"Thu gọn":`Xem thêm (${u(x).length-5} mục)`)))),Q("click",Oe,()=>P(y,!u(y))),L(et,Oe)};ae(st,et=>{u(x),pe(()=>u(x).length>5)&&et(lt)})}b(le),L(de,le)};ae(Et,de=>{t()==="guide"?de(rr):(u(x),pe(()=>u(x).length===0)?de(Yt,1):de(ar,-1))})}ye(2),b(Pt),b(vt);var Tt=S(vt,2),Mt=_(Tt);xr(Mt,5,()=>u(f),u0,(de,le)=>{var $e=rd(),st=_($e),lt=_(st);qt(lt,()=>u(le).icon,(ct,wt)=>{wt(ct,{size:16,strokeWidth:1.5})}),b(st);var et=S(st,2),Oe=_(et,!0);b(et);var nt=S(et,2);{var xt=ct=>{var wt=td(),sr=_(wt);b(wt),Ae(()=>q(sr,`(${u(le),pe(()=>u(le).count)??""})`)),L(ct,wt)};ae(nt,ct=>{u(le),pe(()=>u(le).count>0)&&ct(xt)})}b($e),Ae(()=>{pr($e,1,`filter-chip haptic-light filter-${u(le),pe(()=>u(le).value)??""} ${t(),u(le),pe(()=>t()===u(le).value?"active":"")??""}`),q(Oe,(u(le),pe(()=>u(le).label)))}),Q("click",$e,()=>ns.set(u(le).value)),L(de,$e)}),b(Mt),b(Tt);var Wt=S(Tt,2),zt=_(Wt);{var Ve=de=>{var le=ad(),$e=_(le),st=_($e),lt=_(st);pc(lt,{size:24,strokeWidth:2}),b(st),b($e),b(le),Q("click",$e,ee),L(de,le)};ae(zt,de=>{t()!=="guide"&&de(Ve)})}b(Wt);var ot=S(Wt,2);Kc(ot,{onSave:N});var Rt=S(ot,2);ef(Rt,{});var Xt=S(Rt,2);rf(Xt,{});var Br=S(Xt,2);go(Br,de=>P(k,de),()=>u(k)),b(O),Ae(()=>q(at,n()==="en"?"EN":"VI")),Q("click",Se,J),Q("click",ze,()=>li.toggle()),Q("click",je,de=>{de.stopPropagation(),T(),P(w,!1)}),Q("mouseenter",je,()=>P(w,!0)),Q("mouseleave",je,()=>P(w,!1)),Q("click",Ke,de=>{de.stopPropagation(),V(),P(p,!1)}),Q("mouseenter",Ke,()=>P(p,!0)),Q("mouseleave",Ke,()=>P(p,!1)),Q("click",fe,()=>_o("manual")),Q("change",Br,K),L(M,O)};ae(R,M=>{c()?M(z,-1):M(H)})}L(a,$),Bt(),g()}export{ni as E,Pi as W,xd as _,gf as b};
