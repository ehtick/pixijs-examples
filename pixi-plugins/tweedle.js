/* eslint-disable */
this.TWEEDLE=this.TWEEDLE||{},function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).tweedle_js={})}(this,(function(t){"use strict";t.NOW=void 0,"undefined"==typeof self&&"undefined"!=typeof process&&process.hrtime?t.NOW=function(){const t=process.hrtime();return 1e3*t[0]+t[1]/1e6}:"undefined"!=typeof self&&void 0!==self.performance&&void 0!==self.performance.now?t.NOW=self.performance.now.bind(self.performance):void 0!==Date.now?t.NOW=Date.now:t.NOW=function(){return(new Date).getTime()};class e{constructor(){e.prototype.__init.call(this),e.prototype.__init2.call(this),e.prototype.__init3.call(this),e.prototype.__init4.call(this)}__init(){this._tweens={}}static get shared(){return e._shared||(e._shared=new e),e._shared}__init2(){this._paused=!1}isPaused(){return this._paused}pause(){this._paused=!0}resume(){this._paused=!1}__init3(){this._lastUpdateTime=void 0}__init4(){this.now=t.NOW}getAll(){return Object.keys(this._tweens).map((t=>this._tweens[t]))}removeAll(){this._tweens={}}add(t){this._tweens[t.getId()]=t}remove(t){delete this._tweens[t.getId()]}update(t,e=!1){if(null==t&&(null==this._lastUpdateTime?(this._lastUpdateTime=this.now(),t=0):t=this.now()-this._lastUpdateTime),this._lastUpdateTime=this.now(),this._paused)return!1;const i=Object.keys(this._tweens);if(0==i.length)return!1;for(let s=0;s<i.length;s++){const a=this._tweens[i[s]];a&&0==a.update(t,!0)&&!e&&delete this._tweens[i[s]]}return!0}}const i={Step:{None:t=>t<.5?0:1},Linear:{None:t=>t},Quadratic:{In:t=>t*t,Out:t=>t*(2-t),InOut:t=>(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},Cubic:{In:t=>t*t*t,Out:t=>--t*t*t+1,InOut:t=>(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},Quartic:{In:t=>t*t*t*t,Out:t=>1- --t*t*t*t,InOut:t=>(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},Quintic:{In:t=>t*t*t*t*t,Out:t=>--t*t*t*t*t+1,InOut:t=>(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},Sinusoidal:{In:t=>1-Math.cos(t*Math.PI/2),Out:t=>Math.sin(t*Math.PI/2),InOut:t=>.5*(1-Math.cos(Math.PI*t))},Exponential:{In:t=>0==t?0:Math.pow(1024,t-1),Out:t=>1==t?1:1-Math.pow(2,-10*t),InOut:t=>0==t?0:1==t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},Circular:{In:t=>1-Math.sqrt(1-t*t),Out:t=>Math.sqrt(1- --t*t),InOut:t=>(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},Elastic:{In:t=>0==t?0:1==t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI),Out:t=>0==t?0:1==t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1,InOut:t=>0==t?0:1==t?1:(t*=2)<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1},Back:{In(t){const e=1.70158;return t*t*((e+1)*t-e)},Out(t){const e=1.70158;return--t*t*((e+1)*t+e)+1},InOut(t){const e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},Bounce:{In:t=>1-i.Bounce.Out(1-t),Out:t=>t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,InOut:t=>t<.5?.5*i.Bounce.In(2*t):.5*i.Bounce.Out(2*t-1)+.5}},s={Geom:{Linear(t,e){const i=t.length-1,a=i*e,n=Math.floor(a),r=s.Utils.Linear;return e<0?r(t[0],t[1],a):e>1?r(t[i],t[i-1],i-a):r(t[n],t[n+1>i?i:n+1],a-n)},Bezier(t,e){let i=0;const a=t.length-1,n=Math.pow,r=s.Utils.Bernstein;for(let s=0;s<=a;s++)i+=r(a,s)*n(1-e,a-s)*n(e,s)*t[s];return i},QuadraticBezier(t,e){let i=0;const a=t.length-1;if(1==e)return t[a];const n=Math.pow,r=s.Utils.Bernstein,h=a*e,o=Math.floor(h),l=.5*(h-o)+o%2*.5,_=o-o%2,u=_+1,p=_+2;return i+=r(2,0)*n(1-l,2)*n(l,0)*t[_],i+=r(2,1)*n(1-l,1)*n(l,1)*t[u],i+=r(2,2)*n(1-l,0)*n(l,2)*t[p],i},CubicBezier(t,e){let i=0;const a=t.length-1;if(1==e)return t[a];const n=Math.pow,r=s.Utils.Bernstein,h=a*e,o=Math.floor(h),l=1/3*(h-o)+1/3*(o%3),_=o-o%3,u=_+1,p=_+2,c=_+3;return i+=r(3,0)*n(1-l,3)*n(l,0)*t[_],i+=r(3,1)*n(1-l,2)*n(l,1)*t[u],i+=r(3,2)*n(1-l,1)*n(l,2)*t[p],i+=r(3,3)*n(1-l,0)*n(l,3)*t[c],i},CatmullRom(t,e){const i=t.length-1;let a=i*e,n=Math.floor(a);const r=s.Utils.CatmullRom;return t[0]==t[i]?(e<0&&(n=Math.floor(a=i*(1+e))),r(t[(n-1+i)%i],t[n],t[(n+1)%i],t[(n+2)%i],a-n)):e<0?t[0]-(r(t[0],t[0],t[1],t[1],-a)-t[0]):e>1?t[i]-(r(t[i],t[i],t[i-1],t[i-1],a-i)-t[i]):r(t[n?n-1:0],t[n],t[i<n+1?i:n+1],t[i<n+2?i:n+2],a-n)}},Angle:{Radians(t,e){const i=t.length-1,a=i*e,n=Math.floor(a),r=s.Utils.WrapLinear;return e<0?r(t[0],t[1],a,2*Math.PI):e>1?r(t[i],t[i-1],i-a,2*Math.PI):r(t[n],t[n+1>i?i:n+1],a-n,2*Math.PI)},Degrees(t,e){const i=t.length-1,a=i*e,n=Math.floor(a),r=s.Utils.WrapLinear;return e<0?r(t[0],t[1],a,360):e>1?r(t[i],t[i-1],i-a,360):r(t[n],t[n+1>i?i:n+1],a-n,360)}},Color:{RGB(t,e){const i=t.length-1,a=i*e,n=Math.floor(a),r=s.Utils.RGBLinear;return e<0?r(t[0],t[1],a):e>1?r(t[i],t[i-1],i-a):r(t[n],t[n+1>i?i:n+1],a-n)},HSV(t,e){const i=t.length-1,a=i*e,n=Math.floor(a),r=s.Utils.HSVLinear;return e<0?r(t[0],t[1],a):e>1?r(t[i],t[i-1],i-a):r(t[n],t[n+1>i?i:n+1],a-n)},HCL(t,e){const i=t.length-1,a=i*e,n=Math.floor(a),r=s.Utils.HCLLinear;return e<0?r(t[0],t[1],a):e>1?r(t[i],t[i-1],i-a):r(t[n],t[n+1>i?i:n+1],a-n)}},Utils:{RGBsplit:t=>({a:t>>24&255,r:t>>16&255,g:t>>8&255,b:255&t}),HSVsplit(t){const e=s.Utils.RGBsplit(t);e.r/=255,e.g/=255,e.b/=255;const i=Math.max(e.r,e.g,e.b),a=Math.min(e.r,e.g,e.b);let n;const r=i,h=i-a,o=0==i?0:h/i;if(i==a)n=0;else{switch(i){case e.r:n=(e.g-e.b)/h+(e.g<e.b?6:0);break;case e.g:n=(e.b-e.r)/h+2;break;case e.b:n=(e.r-e.g)/h+4}n/=6}return{a:e.a,h:n,s:o,v:r}},HSVJoin(t){let e,i,s;const a=Math.floor(6*t.h),n=6*t.h-a,r=t.v*(1-t.s),h=t.v*(1-n*t.s),o=t.v*(1-(1-n)*t.s);switch(a%6){case 0:e=t.v,i=o,s=r;break;case 1:e=h,i=t.v,s=r;break;case 2:e=r,i=t.v,s=o;break;case 3:e=r,i=h,s=t.v;break;case 4:e=o,i=r,s=t.v;break;case 5:e=t.v,i=r,s=h}return t.a<<24|e<<16|i<<8|s},HCLSplit(t){const e=s.Utils.RGBsplit(t),i={a:e.a,h:0,c:0,l:0};let a=0;const n=Math.min(e.r,Math.min(e.g,e.b)),r=Math.max(e.r,Math.max(e.g,e.b));let h=.03;return i.c=r-n,0!=i.c&&(a=Math.atan2(e.g-e.b,e.r-e.g)/Math.PI,h*=n/r),h=Math.exp(h),i.h=(a/2-Math.min(a%1,-a%1)/6)%1,i.c*=h,i.l=s.Utils.Linear(-n,r,h)/1.060909067907034,i},HCLJoin(t){const e={a:t.a,r:0,g:0,b:0};if(0!=t.l){let i=t.h;const s=t.c,a=.530454533953517*t.l,n=Math.exp(.03*(1-s/(2*a))),r=(2*a-s)/(2*n-1),h=s/n,o=(i+Math.min(2*i%1/4,-2*i%1/8))*Math.PI*2;let l;i*=6,i<=.999?(l=Math.tan(o),e.r=1,e.g=l/(1+l)):i<=1.001?(e.r=1,e.g=1):i<=2?(l=Math.tan(o),e.r=(1+l)/l,e.g=1):i<=3?(l=Math.tan(o),e.g=1,e.b=1+l):i<=3.999?(l=Math.tan(o),e.g=1/(1+l),e.b=1):i<=4.001?(e.g=0,e.b=1):i<=5?(l=Math.tan(o),e.r=-1/l,e.b=1):(l=Math.tan(o),e.r=1,e.b=-l),e.r=e.r*h+r,e.g=e.g*h+r,e.b=e.b*h+r}return e.a<<24|e.r<<16|e.g<<8|e.b},WrapLinear(t,e,i,a){let n;return t=(t+a*Math.trunc(Math.abs(t/a)))%a,e=(e+a*Math.trunc(Math.abs(e/a)))%a,Math.abs(t-e)<=.5*a?n=s.Utils.Linear(t,e,i):(n=t<e?s.Utils.Linear(t+a,e,i):s.Utils.Linear(t,e+a,i),n%=a),n},RGBLinear(t,e,i){const a=s.Utils.RGBsplit(t),n=s.Utils.RGBsplit(e);return s.Utils.Linear(a.a,n.a,i)<<24|s.Utils.Linear(a.r,n.r,i)<<16|s.Utils.Linear(a.g,n.g,i)<<8|s.Utils.Linear(a.b,n.b,i)},HSVLinear(t,e,i){const a=s.Utils.HSVsplit(t),n=s.Utils.HSVsplit(e);let r;Math.abs(a.h-n.h)<=.5?r=s.Utils.Linear(a.h,n.h,i):(r=a.h<n.h?s.Utils.Linear(a.h+1,n.h,i):s.Utils.Linear(a.h,n.h+1,i),r%=1);const h=s.Utils.Linear(a.s,n.s,i),o=s.Utils.Linear(a.v,n.v,i),l=s.Utils.Linear(a.a,n.a,i);return s.Utils.HSVJoin({a:l,h:r,s:h,v:o})},HCLLinear(t,e,i){const a=s.Utils.HCLSplit(t),n=s.Utils.HCLSplit(e);let r;Math.abs(a.h-n.h)<=.5?r=s.Utils.Linear(a.h,n.h,i):(r=a.h<n.h?s.Utils.Linear(a.h+1,n.h,i):s.Utils.Linear(a.h,n.h+1,i),r%=1);const h=s.Utils.Linear(a.c,n.c,i),o=s.Utils.Linear(a.l,n.l,i),l=s.Utils.Linear(a.a,n.a,i);return s.Utils.HSVJoin({a:l,h:r,s:h,v:o})},Linear:(t,e,i)=>(e-t)*i+t,Bernstein(t,e){const i=s.Utils.Factorial;return i(t)/i(e)/i(t-e)},Factorial:function(){const t=[1];return function(e){let i=1;if(t[e])return t[e];for(let t=e;t>1;t--)i*=t;return t[e]=i,i}}(),CatmullRom(t,e,i,s,a){const n=.5*(i-t),r=.5*(s-e),h=a*a;return(2*e-2*i+n+r)*(a*h)+(-3*e+3*i-2*n-r)*h+n*a+e}}};class a{static __initStatic(){this._nextId=0}static nextId(){return a._nextId++}}a.__initStatic();class n{__init(){this._isPaused=!1}__init2(){this._valuesStart={}}__init3(){this._valuesEnd={}}__init4(){this._valuesStartRepeat={}}__init5(){this._duration=0}__init6(){this._repeatCount=0}__init7(){this._repeat=0}__init8(){this._yoyo=!1}__init9(){this._isPlaying=!1}get _reversed(){return this.yoyo&&this._repeatCount%2!=0}__init10(){this._delayTime=0}__init11(){this._startTime=0}__init12(){this._elapsedTime=0}__init13(){this._timescale=1}__init14(){this._safetyCheckFunction=t=>!0}__init15(){this._easingFunction=i.Linear.None}__init16(){this._yoyoEasingFunction=void 0}__init17(){this._interpolationFunction=s.Geom.Linear}__init18(){this._chainedTweens=[]}__init19(){this._onStartCallbackFired=!1}__init20(){this._onAfterDelayCallbackFired=!1}__init21(){this._id=a.nextId()}__init22(){this._isChainStopped=!1}get _group(){return this._groupRef?this._groupRef:e.shared}set _group(t){this._groupRef=t}constructor(t,e){n.prototype.__init.call(this),n.prototype.__init2.call(this),n.prototype.__init3.call(this),n.prototype.__init4.call(this),n.prototype.__init5.call(this),n.prototype.__init6.call(this),n.prototype.__init7.call(this),n.prototype.__init8.call(this),n.prototype.__init9.call(this),n.prototype.__init10.call(this),n.prototype.__init11.call(this),n.prototype.__init12.call(this),n.prototype.__init13.call(this),n.prototype.__init14.call(this),n.prototype.__init15.call(this),n.prototype.__init16.call(this),n.prototype.__init17.call(this),n.prototype.__init18.call(this),n.prototype.__init19.call(this),n.prototype.__init20.call(this),n.prototype.__init21.call(this),n.prototype.__init22.call(this),this._object=t,this._group=e}getId(){return this._id}getGroup(){return this._group}getTimescale(){return this._timescale}isPlaying(){return this._isPlaying}isPaused(){return this._isPaused}from(t){try{JSON.stringify(t)}catch(t){throw new Error("The object you provided to the from() method has a circular reference!")}return this._setupProperties(t,this._valuesStart,t,this._valuesStartRepeat,!0),this}to(t,e){try{this._valuesEnd=JSON.parse(JSON.stringify(t))}catch(i){return console.warn("The object you provided to the to() method has a circular reference!. It can't be cloned. Falling back to dynamic targeting"),this.dynamicTo(t,e)}return void 0!==e&&(this._duration=e),this}dynamicTo(t,e){return this._valuesEnd=t,void 0!==e&&(this._duration=e),this}duration(t){return this._duration=t,this}start(t){return this._isPlaying||(null!=t&&(this._delayTime=t),this._group.add(this),this._reversed&&(this._swapEndStartRepeatValues(this._valuesStartRepeat,this._valuesEnd),this._valuesStart=JSON.parse(JSON.stringify(this._valuesStartRepeat))),this._repeatCount=0,this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onAfterDelayCallbackFired=!1,this._isChainStopped=!1,this._startTime=-this._delayTime,this._elapsedTime=0,this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,!1)),this}restart(t){return this.reset(),this.start(t)}reset(){return this._isPlaying&&this.stop(),this._valuesStart={},this._valuesStartRepeat={},this}rewind(){this._isPlaying&&this.stop(),this._reversed&&this._swapEndStartRepeatValues(this._valuesStartRepeat,this._valuesEnd);const t=this._easingFunction(0);return this._updateProperties(this._object,this._valuesStart,this._valuesEnd,t),this}_setupProperties(t,e,i,s,a){for(const n in i){const r=t[n],h=Array.isArray(r),o=!Number.isNaN(Number(r)),l=h?"array":typeof r,_="object"==l,u="object"==typeof i[n],p=!h&&Array.isArray(i[n]);"undefined"!=l&&"function"!=l&&null!=i[n]&&(h||o||_)&&((_||h||u)&&r&&!p?(void 0===e[n]&&(e[n]=h?[]:{}),void 0===s[n]&&(s[n]=h?[]:{}),this._setupProperties(r,e[n],i[n],s[n],a)):((void 0===e[n]||a)&&(e[n]=r),(void 0===s[n]||a)&&(s[n]=p?i[n].slice().reverse()[0]:e[n]||0)))}}stop(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object,this),this):this}end(t=!1){let e=[];if(t||(e=this._chainedTweens,this._chainedTweens=[]),this.resume(),this.update(1/0),!t){this._chainedTweens=e;for(let t=0,e=this._chainedTweens.length;t<e;t++)this._chainedTweens[t].start()}return this}skip(t,e=!1){return this.resume(),this.update(t*this._duration-(e?this._elapsedTime:0)),this}pause(){return this._isPaused||!this._isPlaying||(this._isPaused=!0,this._group.remove(this)),this}resume(){return this._isPaused&&this._isPlaying?(this._isPaused=!1,this._group.add(this),this):this}stopChainedTweens(){for(let t=0,e=this._chainedTweens.length;t<e;t++)this._chainedTweens[t].stop();return this}startChainedTweens(t=!1){t&&this.stop();for(let t=0,e=this._chainedTweens.length;t<e;t++)this._chainedTweens[t].start();return this}group(t){return this._group=t,this}delay(t){return this._delayTime=t,this}timescale(t){return this._timescale=t,this}repeat(t=1/0){return this._repeat=t,this}repeatDelay(t){return this._repeatDelayTime=t,this}yoyo(t=!0){return this._yoyo=t,this}easing(t){return this._easingFunction=t,this}safetyCheck(t){return this._safetyCheckFunction=t,this}yoyoEasing(t){return this._yoyoEasingFunction=t,this}interpolation(t){return this._interpolationFunction=t,this}chain(...t){return this._chainedTweens=t,this}onStart(t){return this._onStartCallback=t,this}onAfterDelay(t){return this._onAfterDelayCallback=t,this}onUpdate(t){return this._onUpdateCallback=t,this}onRepeat(t){return this._onRepeatCallback=t,this}onComplete(t){return this._onCompleteCallback=t,this}onStop(t){return this._onStopCallback=t,this}update(t,e=!1){const i=this._internalUpdate(t);return i||e||this._group.remove(this),i}_internalUpdate(t){if(!this._safetyCheckFunction(this._object))return!1;if(this._isPaused)return!1;let e;t*=this._timescale,this._elapsedTime+=t;const i=this._duration,s=this._startTime+this._elapsedTime;if(s>i&&!this._isPlaying)return!1;this.isPlaying||this.start(),0==this._onStartCallbackFired&&(this._onStartCallback&&this._onStartCallback(this._object,this),this._onStartCallbackFired=!0),0==this._onAfterDelayCallbackFired&&s>=0&&(this._onAfterDelayCallback&&this._onAfterDelayCallback(this._object,this),this._onAfterDelayCallbackFired=!0),e=s/this._duration,0==this._duration&&(e=s>=0?1:0),e=Math.min(1,e),e=Math.max(0,e);let a=Number.isFinite(s)?s%this._duration:s;Number.isNaN(a)&&(a=0);const n=Math.floor(s/this._duration);let r;if(r=this._reversed&&this._yoyoEasingFunction?this._yoyoEasingFunction(e):this._easingFunction(e),this._updateProperties(this._object,this._valuesStart,this._valuesEnd,r),this._onUpdateCallback&&(1!=e||this._repeat-this._repeatCount<=0)&&this._onUpdateCallback(this._object,e,this),1==e){if(this._repeat-this._repeatCount>0){const t=this._repeatCount;if(this._repeatCount=Math.min(this._repeat+1,this._repeatCount+n),this._onUpdateCallback&&(this._repeat-this._repeatCount<0||a<=0)&&this._onUpdateCallback(this._object,e,this),this._yoyo?this._swapEndStartRepeatValues(this._valuesStartRepeat,this._valuesEnd):this._moveForwardStartRepeatValues(this._valuesStartRepeat,this._valuesEnd),this._valuesStart=JSON.parse(JSON.stringify(this._valuesStartRepeat)),void 0!==this._repeatDelayTime?this._startTime=-this._repeatDelayTime:this._startTime=0,this._onRepeatCallback){let e=1;Number.isFinite(n)?e=this._repeatCount-t:Number.isFinite(this._repeat)&&(e=this._repeat-t);for(let i=0;i<e;i++)this._onRepeatCallback(this._object,t+1+i,this)}if(this._elapsedTime=0,this._repeat-this._repeatCount>=0)return a>0&&Number.isFinite(this._repeat)&&this._internalUpdate(a),!0}this._onCompleteCallback&&this._onCompleteCallback(this._object,this);for(let t=0,e=this._chainedTweens.length;t<e;t++)this._chainedTweens[t].start(),a>0&&this._chainedTweens[t].update(a);return this._isPlaying=!1,!1}return!0}_updateProperties(t,e,i,s){for(const a in i){if(null==e[a])continue;const n=e[a];let r=i[a];const h=Array.isArray(t[a]),o=Array.isArray(r);!h&&o?this._reversed?t[a]=this._interpolationFunction(r.concat([n]),s):t[a]=this._interpolationFunction([n].concat(r),s):"object"==typeof r&&r?this._updateProperties(t[a],n,r,s):(r=this._handleRelativeValue(n,r),"number"!=typeof r||"number"!=typeof n&&"string"!=typeof n||(t[a]=Number(n)+(r-Number(n))*s,"string"==typeof n&&(t[a]=String(t[a]))))}}_handleRelativeValue(t,e){return"string"!=typeof e?e:"+"==e.charAt(0)||"-"==e.charAt(0)?t+Number(e):Number(e)}_swapEndStartRepeatValues(t,e){for(const i in t){const s=!Array.isArray(t[i])&&Array.isArray(e[i]);if("object"==typeof t[i])this._swapEndStartRepeatValues(t[i],e[i]);else{const a=t[i];if("string"==typeof e[i])t[i]=Number(t[i])+Number(e[i]),e[i]=a;else if(s){const s=e[i].slice().reverse();t[i]=s[0],e[i]=s}else t[i]=e[i],e[i]=a}}}_moveForwardStartRepeatValues(t,e){for(const i in t)"object"==typeof e[i]?this._moveForwardStartRepeatValues(t[i],e[i]):"string"==typeof e[i]&&(t[i]=Number(t[i])+Number(e[i]))}}t.Easing=i,t.Group=e,t.Interpolation=s,t.Tween=n,t.VERSION="2.0.1"})),"undefined"!=typeof tweedle_js&&Object.assign(this.TWEEDLE,tweedle_js);
//# sourceMappingURL=tweedle.umd.min.js.map
