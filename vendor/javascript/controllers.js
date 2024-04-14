import r from"fs";import e from"path";import n from"process";var o="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var t={};function _nullRequire(r){var e=new Error("Cannot find module '"+r+"'");e.code="MODULE_NOT_FOUND";throw e}var l=n;(function(){var n,i,a;var u=Array.prototype.slice;i=r;a=e;t=function(r,e){var o,t,i,a,u;null==e&&(e={});null==(o=e.strict)&&(e.strict=true);null==(t=e.overwriteRender)&&(e.overwriteRender=true);null==(i=e.log)&&(e.log=false);null==(a=e.root)&&(e.root=r.set("controllers")||l.cwd()+"/controllers");null==(u=e.sharedFolder)&&(e.sharedFolder="shared");return new n(r,e)};n=function(){function Controllers(r,e){var n,t;(this||o).options=e;t=this||o;(this||o)._controllers={};this.executeOnDirectory((this||o).options.root,(function(r){var e,n,o;n=a.extname(r);if(".js"===n||".coffee"===n){o=r.replace(n,"");e=a.basename(o);t._controllers[e]=_nullRequire(o);if(t.options.log)return console.log("Controller '"+e+"' has been loaded")}}));n=r.routes._route;r.routes._route=function(){var e,o,l,i,a,c,s,f,p,d,h,g,m,y,v,w,C;f=arguments[0],h=arguments[1],l=arguments[2],o=4<=arguments.length?u.call(arguments,3):[];if("function"===typeof l){o.push(l);l=null}0===o.length&&o.push((function(r,e){}));null==l&&(l={});c={};for(m=0,v=o.length;m<v;m++){e=o[m];p=t.overwriteCallback(e,c)}g=n.call(r.routes,f,h,p);c.route=d=g.routes[f][g.routes[f].length-1];for(i in l){a=l[i];s=t.getKeyInRoute(i,d);null!=s?s["default"]=a:"controller"!==i&&"action"!==i||(d[i]=a)}C=d.keys;for(y=0,w=C.length;y<w;y++){s=C[y];"controller"!==s.name&&"action"!==s.name||(d[s.name]="*")}return g};this.addHelpers(r)}Controllers.prototype.addReqHelpers=function(r,e){var n;n=this||o;return r.executeController=function(t,l,i){var a,u,c;if(!(null!=t)||!(null!=l))throw new Error("executeController needs the controller and action specified");if(null!=i){u=r.controller;a=r.action;c=i;i=function(){r.controller=u;r.action=a;return c.apply(this||o,arguments)}}r.controller=t;r.action=l;return n._controllers[t][l](r,e,i)}};Controllers.prototype.addHelpers=function(r){var e;e=this||o;return r.dynamicHelpers({controller:function(r,e){return r.controller},action:function(r,e){return r.action},getUrl:function(n,o){return function(o,t,l,i){var a,u,c,s,f,p,d,h,g,m,y,v,w,C,b,R;if(!(null!=t)||"object"===typeof t){i=l;l=t;t=o;o=null}null==o&&(o=n.controller);null==l&&(l={});l.controller=o;l.action=t;null==i&&(i={});if(!(null!=t)||!(null!=o))throw new Error("getUrl needs at minimum an action defined, but also takes a controller");w=r.routes.routes.get;for(y=0,v=w.length;y<v;y++){g=w[y];if(e.isMatchingPath(l,g)){c=false;h=g.path;for(s=C=g.keys.length-1;C<=0?s<=0:s>=0;C<=0?s++:s--){f=g.keys[s];a=null!=(b=f["default"])?b:"";d=null!=(R=l[f.name])?R:a;if(c&&""===d)throw new Error("The optional parameter '"+f.name+"' is required for this getUrl call as an parameter further down the path has been specified");c||(f.optional&&d===a||!(c=true))&&(d="");p=new RegExp(":"+f.name+"(\\?)?");h=h.replace(p,d)}h=h.replace(/\/+/g,"/");"/"!==h&&(h=h.replace(/\/+$/,""));u=true;for(f in i){m=i[f];if(u){u=false;h=h+"?"+f;null!=m&&""!==m&&(h=h+"="+m)}else{h=h+"&"+f;null!=m&&""!==m&&(h=h+"="+m)}}return h}}throw new Error("Route could not be found that matches getUrl parameters, make sure to specify a valid controller, action and required parameters")}}})};Controllers.prototype.getKeyInRoute=function(r,e){var n,o,t,l;l=e.keys;for(o=0,t=l.length;o<t;o++){n=l[o];if(n.name===r)return n}return null};Controllers.prototype.isMatchingPath=function(r,e){var n,o,t,l,i;if("*"!==e.controller&&e.controller!==r.controller)return false;if("*"!==e.action&&e.action!==r.action)return false;for(n in r){o=r[n];if("controller"!==n&&"action"!==n&&!(null!=this.getKeyInRoute(n,e)))return false}i=e.keys;for(t=0,l=i.length;t<l;t++){n=i[t];if("controller"!==n.name&&"action"!==n.name&&!n.optional&&!(null!=r[n]))return false}return true};Controllers.prototype.overwriteCallback=function(r,e){var n,t;t=this||o;n=(this||o).options;return function(o,l,i){var a,u,c,s,f,p,d,h,g;r(o,l,i);t.addReqHelpers(o,l);s=e.route;d=s.keys;for(f=0,p=d.length;f<p;f++){c=d[f];null!=o.params[c.name]||null==c["default"]||(o.params[c.name]=c["default"])}o.controller=null!=(h=o.params.controller)?h:s.controller;o.action=null!=(g=o.params.action)?g:s.action;if(n.log){console.log("Controller: "+o.controller);console.log("Action: "+o.action)}if(n.strict){if(!(null!=o.controller))throw new Error("Is in strict mode and no controller specified");if(!(null!=o.action))throw new Error("Is in strict mode and no action specified")}if(null!=o.controller&&null!=o.action){n.overwriteRender&&t.overwriteRender(o,l);u=t._controllers[o.controller];if(!(null!=u)){n.log&&console.log("Controller '"+o.controller+"' could not be found");i("route");return}a=u[o.action];if(!(null!=a)){n.log&&console.log("Action '"+o.action+"' could not be found on controller '"+o.controller+"' ");i("route");return}return a(o,l,i)}if(n.log)return console.log("Controller or action was not specified, no action was called")}};Controllers.prototype.overwriteRender=function(r,e){var n,t,i;i=this||o;n=e.render;t=e.app.set("views")||l.cwd()+"/views";return e.render=function(o,t,l,a,u){var c,s,f,p,d,h;if("object"===typeof o||"function"===typeof o){u=a;a=l;l=t;t=o;o=null}null==o&&(o=r.action);s=e.app.enabled("hints");e.app.disable("hints");p=null;h=null;f=function(){if(s)return e.app.enable("hints")};c=function(n,o,t){f();null!=n&&(n=n+"\r\n\r\n"+o);return null!=l?l(n,t):null!=n?r.next(n):e.send(t)};d=function(r,s){if(null!=r)return h=n.call(e,i.options.sharedFolder+"/"+o,t,(function(e,n){return c(e,r,n)}),a,u);f();return null!=l?l(r,s):e.send(s)};p=n.call(e,r.controller+"/"+o,t,d,a,u);null!=h&&(p=h);f();return p}};Controllers.prototype.executeOnDirectory=function(r,e){return i.readdirSync(r).forEach((function(n){var o,t;o=r+"/"+n;t=i.statSync(o);return t&&t.isDirectory()?self.executeOnDirectory(o,e):e(o)}))};return Controllers}()}).call(t);var i=t;export default i;
