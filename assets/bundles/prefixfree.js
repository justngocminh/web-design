(function(){function t(n,t){return[].slice.call((t||document).querySelectorAll(n))}if(window.addEventListener){var n=window.StyleFix={link:function(t){var r=t.href||t.getAttribute("data-href");try{if(!r||"stylesheet"!==t.rel||t.hasAttribute("data-noprefix"))return}catch(c){return}var u=r.replace(/[^\/]+$/,""),o=(/^[a-z]{3,10}:/.exec(u)||[""])[0],s=(/^[a-z]{3,10}:\/\/[^\/]+/.exec(u)||[""])[0],h=/^([^?]*)\??/.exec(r)[1],e=t.parentNode,i=new XMLHttpRequest,f;i.onreadystatechange=function(){4===i.readyState&&f()};f=function(){var f=i.responseText;if(f&&t.parentNode&&(!i.status||400>i.status||600<i.status)){if((f=n.fix(f,!0,t))&&u)var f=f.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(n,t,i){return/^([a-z]{3,10}:|#)/i.test(i)?n:/^\/\//.test(i)?'url("'+o+i+'")':/^\//.test(i)?'url("'+s+i+'")':/^\?/.test(i)?'url("'+h+i+'")':'url("'+u+i+'")'}),r=u.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1"),f=f.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1");r=document.createElement("style");r.textContent="/*# sourceURL="+t.getAttribute("href")+" */\n/*@ sourceURL="+t.getAttribute("href")+" */\n"+f;r.media=t.media;r.disabled=t.disabled;r.setAttribute("data-href",t.getAttribute("href"));t.id&&(r.id=t.id);e.insertBefore(r,t);e.removeChild(t);r.media=t.media}};try{i.open("GET",r);i.send(null)}catch(c){"undefined"!=typeof XDomainRequest&&(i=new XDomainRequest,i.onerror=i.onprogress=function(){},i.onload=f,i.open("GET",r),i.send(null))}t.setAttribute("data-inprogress","")},styleElement:function(t){if(!t.hasAttribute("data-noprefix")){var i=t.disabled;t.textContent=n.fix(t.textContent,!0,t);t.disabled=i}},styleAttribute:function(t){var i=t.getAttribute("style"),i=n.fix(i,!1,t);t.setAttribute("style",i)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,i){(n.fixers=n.fixers||[]).splice(void 0===i?n.fixers.length:i,0,t)},fix:function(t,i,r){if(n.fixers)for(var u=0;u<n.fixers.length;u++)t=n.fixers[u](t,i,r)||t;return t},camelCase:function(n){return n.replace(/-([a-z])/g,function(n,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(n){return n.replace(/[A-Z]/g,function(n){return"-"+n.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()}})(),function(n){function i(n,i,r,u,f){return n=t[n],n.length&&(n=RegExp(i+"("+n.join("|")+")"+r,"gi"),f=f.replace(n,u)),f}if(window.StyleFix&&window.getComputedStyle){var t=window.PrefixFree={prefixCSS:function(n,r){var u=t.prefix,f;return-1<t.functions.indexOf("linear-gradient")&&(n=n.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(n,t,i,r){return t+(i||"")+"linear-gradient("+(90-r)+"deg"})),n=i("functions","(\\s|:|,)","\\s*\\(","$1"+u+"$2(",n),n=i("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+u+"$2$3",n),n=i("properties","(^|\\{|\\s|;)","\\s*:","$1"+u+"$2:",n),t.properties.length&&(f=RegExp("\\b("+t.properties.join("|")+")(?!:)","gi"),n=i("valueProperties","\\b",":(.+?);",function(n){return n.replace(f,u+"$1")},n)),r&&(n=i("selectors","","\\b",t.prefixSelector,n),n=i("atrules","@","\\b","@"+u+"$1",n)),n=n.replace(RegExp("-"+u,"g"),"-"),n.replace(/-\*-(?=[a-z]+)/gi,t.prefix)},property:function(n){return(0<=t.properties.indexOf(n)?t.prefix:"")+n},value:function(n,r){return n=i("functions","(^|\\s|,)","\\s*\\(","$1"+t.prefix+"$2(",n),n=i("keywords","(^|\\s)","(\\s|$)","$1"+t.prefix+"$2$3",n),0<=t.valueProperties.indexOf(r)&&(n=i("properties","(^|\\s|,)","($|\\s|,)","$1"+t.prefix+"$2$3",n)),n},prefixSelector:function(n){return t.selectorMap[n]||n},prefixProperty:function(n,i){var r=t.prefix+n;return i?StyleFix.camelCase(r):r}};(function(){var o={},r=[],i=getComputedStyle(document.documentElement,null),u=document.createElement("div").style,h=function(n){if("-"===n.charAt(0)){r.push(n);n=n.split("-");var t=n[1];for(o[t]=++o[t]||1;3<n.length;)n.pop(),t=n.join("-"),StyleFix.camelCase(t)in u&&-1===r.indexOf(t)&&r.push(t)}},f,n,e,s;if(i&&0<i.length)for(n=0;n<i.length;n++)h(i[n]);else for(f in i)h(StyleFix.deCamelCase(f));n=0;for(s in o)i=o[s],n<i&&(e=s,n=i);for(t.prefix="-"+e+"-",t.Prefix=StyleFix.camelCase(t.prefix),t.properties=[],n=0;n<r.length;n++)f=r[n],0===f.indexOf(t.prefix)&&(e=f.slice(t.prefix.length),StyleFix.camelCase(e)in u||t.properties.push(e));!("Ms"!=t.Prefix||"transform"in u||"MsTransform"in u)&&"msTransform"in u&&t.properties.push("transform","transform-origin");t.properties.sort()})(),function(){function u(n,t){return f[t]="",f[t]=n,!!f[t]}var n={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"},"image-set":{property:"backgroundImage",params:"url(a.png) 1x, url(b.png) 2x"}},s,f,e,r;n["repeating-linear-gradient"]=n["repeating-radial-gradient"]=n["radial-gradient"]=n["linear-gradient"];s={initial:"color",grab:"cursor",grabbing:"cursor","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display",grid:"display","inline-grid":"display","max-content":"width","min-content":"width","fit-content":"width","fill-available":"width","contain-floats":"width"};t.functions=[];t.keywords=[];f=document.createElement("div").style;for(e in n){var o=n[e],i=o.property,o=e+"("+o.params+")";!u(o,i)&&u(t.prefix+o,i)&&t.functions.push(e)}for(r in s)i=s[r],!u(r,i)&&u(t.prefix+r,i)&&t.keywords.push(r)}(),function(){function r(n){return u.textContent=n+"{}",!!u.sheet.cssRules.length}var i={":any-link":null,"::backdrop":null,":fullscreen":null,":full-screen":":fullscreen","::placeholder":null,":placeholder":"::placeholder","::input-placeholder":"::placeholder",":input-placeholder":"::placeholder",":read-only":null,":read-write":null,"::selection":null},h={keyframes:"name",viewport:null,document:'regexp(".")'},u,f,e,s,o;t.selectors=[];t.selectorMap={};t.atrules=[];u=n.appendChild(document.createElement("style"));for(f in i)e=i[f]||f,s=f.replace(/::?/,function(n){return n+t.prefix}),!r(e)&&r(s)&&(t.selectors.push(e),t.selectorMap[e]=s);for(o in h)i=o+" "+(h[o]||""),!r("@"+i)&&r("@"+t.prefix+i)&&t.atrules.push(o);n.removeChild(u)}();t.valueProperties=["transition","transition-property","will-change"];n.className+=" "+t.prefix;StyleFix.register(t.prefixCSS)}}(document.documentElement)