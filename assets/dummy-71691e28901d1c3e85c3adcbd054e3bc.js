define("dummy/app",["exports","ember","ember/resolver","ember/load-initializers","dummy/config/environment"],function(e,t,a,r,n){"use strict";var d;t["default"].MODEL_FACTORY_INJECTIONS=!0,d=t["default"].Application.extend({modulePrefix:n["default"].modulePrefix,Resolver:a["default"]}),r["default"](d,n["default"].modulePrefix),e["default"]=d}),define("dummy/blueprints/ember-bootstrap-markdown",["exports","ember-bootstrap-markdown/blueprints/ember-bootstrap-markdown"],function(e,t){"use strict";e["default"]=t["default"]}),define("dummy/components/ember-bootstrap-markdown",["exports","ember-bootstrap-markdown/components/ember-bootstrap-markdown"],function(e,t){"use strict";e["default"]=t["default"]}),define("dummy/controllers/application",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({test:"# You can edit this content\n\nSimply click on it to begin editing.\n\n> [Google](https://google.com)",actions:{save:function(){console.log("%c%s#save...","color: purple",this.toString())}}})}),define("dummy/controllers/array",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller}),define("dummy/controllers/object",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller}),define("dummy/initializers/app-version",["exports","dummy/config/environment","ember"],function(e,t,a){"use strict";var r=a["default"].String.classify,n=!1;e["default"]={name:"App Version",initialize:function(e,d){if(!n){var l=r(d.toString());a["default"].libraries.register(l,t["default"].APP.version),n=!0}}}}),define("dummy/initializers/export-application-global",["exports","ember","dummy/config/environment"],function(e,t,a){"use strict";function r(e,r){var n=t["default"].String.classify(a["default"].modulePrefix);a["default"].exportApplicationGlobal&&!window[n]&&(window[n]=r)}e.initialize=r,e["default"]={name:"export-application-global",initialize:r}}),define("dummy/router",["exports","ember","dummy/config/environment"],function(e,t,a){"use strict";var r=t["default"].Router.extend({location:a["default"].locationType});r.map(function(){}),e["default"]=r}),define("dummy/templates/application",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,blockParams:1,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment();return t},render:function(e,t,a,r){var n=t.dom,d=t.hooks,l=d.set;n.detectNamespace(a);var i;return t.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(i=this.build(n),this.hasRendered?this.cachedFragment=i:this.hasRendered=!0),this.cachedFragment&&(i=n.cloneNode(this.cachedFragment,!0))):i=this.build(n),l(t,e,"component",r[0]),i}}}();return{isHTMLBars:!0,blockParams:0,cachedFragment:null,hasRendered:!1,build:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"id","purpose"),e.setAttribute(a,"role","marker"),e.setAttribute(a,"style","height: 70px;"),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("nav");e.setAttribute(a,"id","nav"),e.setAttribute(a,"class","navbar navbar-inverse navbar-fixed-top");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","container-fluid");var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","navbar-header");var d=e.createTextNode("\n      ");e.appendChild(n,d);var d=e.createElement("button");e.setAttribute(d,"type","button"),e.setAttribute(d,"class","navbar-toggle collapsed"),e.setAttribute(d,"data-toggle","collapse"),e.setAttribute(d,"data-target","#main-nav"),e.setAttribute(d,"aria-expanded","false");var l=e.createTextNode("\n        ");e.appendChild(d,l);var l=e.createElement("span");e.setAttribute(l,"class","sr-only");var i=e.createTextNode("Toggle navigation");e.appendChild(l,i),e.appendChild(d,l);var l=e.createTextNode("\n        ");e.appendChild(d,l);var l=e.createElement("span");e.setAttribute(l,"class","icon-bar"),e.appendChild(d,l);var l=e.createTextNode("\n        ");e.appendChild(d,l);var l=e.createElement("span");e.setAttribute(l,"class","icon-bar"),e.appendChild(d,l);var l=e.createTextNode("\n        ");e.appendChild(d,l);var l=e.createElement("span");e.setAttribute(l,"class","icon-bar"),e.appendChild(d,l);var l=e.createTextNode("\n      ");e.appendChild(d,l),e.appendChild(n,d);var d=e.createTextNode("\n\n      ");e.appendChild(n,d);var d=e.createElement("a");e.setAttribute(d,"class","navbar-brand"),e.setAttribute(d,"href","https://github.com/ChrisHonniball/ember-bootstrap-markdown");var l=e.createTextNode("ember-bootstrap-markdown");e.appendChild(d,l),e.appendChild(n,d);var d=e.createTextNode("\n    ");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode("\n\n    ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","collapse navbar-collapse"),e.setAttribute(n,"id","main-nav");var d=e.createTextNode("\n      ");e.appendChild(n,d);var d=e.createElement("ul");e.setAttribute(d,"class","nav navbar-nav");var l=e.createTextNode("\n        ");e.appendChild(d,l);var l=e.createElement("li"),i=e.createElement("a");e.setAttribute(i,"href","#purpose");var p=e.createTextNode("Purpose");e.appendChild(i,p),e.appendChild(l,i),e.appendChild(d,l);var l=e.createTextNode("\n        ");e.appendChild(d,l);var l=e.createElement("li"),i=e.createElement("a");e.setAttribute(i,"href","#installation");var p=e.createTextNode("Installation");e.appendChild(i,p),e.appendChild(l,i),e.appendChild(d,l);var l=e.createTextNode("\n        ");e.appendChild(d,l);var l=e.createElement("li"),i=e.createElement("a");e.setAttribute(i,"href","#project-status");var p=e.createTextNode("Project Status");e.appendChild(i,p),e.appendChild(l,i),e.appendChild(d,l);var l=e.createTextNode("\n        ");e.appendChild(d,l);var l=e.createElement("li"),i=e.createElement("a");e.setAttribute(i,"href","#examples");var p=e.createTextNode("Examples");e.appendChild(i,p),e.appendChild(l,i),e.appendChild(d,l);var l=e.createTextNode("\n        ");e.appendChild(d,l);var l=e.createElement("li"),i=e.createElement("a");e.setAttribute(i,"href","#options");var p=e.createTextNode("Options");e.appendChild(i,p),e.appendChild(l,i),e.appendChild(d,l);var l=e.createTextNode("\n      ");e.appendChild(d,l),e.appendChild(n,d);var d=e.createTextNode("\n    ");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode("\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","col-lg-10 col-lg-offset-1 col-md-12");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("h2"),n=e.createTextNode("Purpose");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("p");e.setAttribute(r,"class","lead");var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createElement("code"),d=e.createTextNode("ember-bootstrap-markdown");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode(" is a Bootstrap styled Ember component for editing markdown content.\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"id","installation"),e.setAttribute(r,"role","marker"),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","clearfix"),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("hr");e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","col-lg-10 col-lg-offset-1 col-md-12");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("h2"),n=e.createTextNode("Installation");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("pre"),n=e.createTextNode("ember install ember-bootstrap-markdown");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"id","project-status"),e.setAttribute(r,"role","marker"),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","clearfix"),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("hr");e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","col-lg-10 col-lg-offset-1 col-md-12");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("h2"),n=e.createTextNode("Project Status");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("p");e.setAttribute(r,"class","lead");var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createElement("span");e.setAttribute(n,"class","label label-danger");var d=e.createTextNode("Rapid Development");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode(" \n    This addon ");e.appendChild(r,n);var n=e.createElement("em"),d=e.createTextNode("will");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode(" change rapidly at this stage and ");e.appendChild(r,n);var n=e.createElement("em"),d=e.createTextNode("may");e.appendChild(n,d),e.appendChild(r,n);var n=e.createTextNode(" not be fully functional.\n\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"id","examples"),e.setAttribute(r,"role","marker"),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","clearfix"),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("hr");e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","col-lg-10 col-lg-offset-1 col-md-12");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("h2"),n=e.createTextNode("Examples");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n");e.appendChild(a,r);var r=e.createTextNode("  \n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"id","options"),e.setAttribute(r,"role","marker"),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","clearfix"),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("hr");e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","col-lg-10 col-lg-offset-1 col-md-12");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("h2"),n=e.createTextNode("Options");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n  ");e.appendChild(a,r);var r=e.createElement("p"),n=e.createTextNode("Options will be documented once the component is finalized");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","clearfix"),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("hr");e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","col-xs-12 text-center lead");var r=e.createTextNode("\n  Created by ");e.appendChild(a,r);var r=e.createElement("a");e.setAttribute(r,"href","https://github.com/ChrisHonniball");var n=e.createTextNode("@ChrisHonniball");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},render:function(t,a,r){var n=a.dom,d=a.hooks,l=d.get,i=d.block;n.detectNamespace(r);var p;a.useFragmentCache&&n.canClone?(null===this.cachedFragment&&(p=this.build(n),this.hasRendered?this.cachedFragment=p:this.hasRendered=!0),this.cachedFragment&&(p=n.cloneNode(this.cachedFragment,!0))):p=this.build(n);var o=n.createMorphAt(n.childAt(p,[23]),2,3);return i(a,o,t,"ember-bootstrap-markdown",[],{btns:"heading,bold,italic,quote,link,image,list-ol,list-ul",action:"save",value:l(a,t,"test")},e,null),p}}}())}),define("dummy/config/environment",["ember"],function(e){var t="dummy";try{var a=t+"/config/environment",r=e["default"].$('meta[name="'+a+'"]').attr("content"),n=JSON.parse(unescape(r));return{"default":n}}catch(d){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests?require("dummy/tests/test-helper"):require("dummy/app")["default"].create({name:"ember-bootstrap-markdown",version:"0.0.6.e8fb5d9a"});