(this["webpackJsonpcurrency-exchange"]=this["webpackJsonpcurrency-exchange"]||[]).push([[3],{70:function(e,c,t){},72:function(e,c,t){"use strict";t.r(c);var a=t(4),n=t(1),s=t(14),r=(t(70),t(7)),u=t(29),l=t(25),i=t.n(l),o=t(26),j=t.n(o),d=t(12),b=t(13),x=t(3),O=function(e){var c=e.el,t=e.index,s=Object(n.useState)(null),l=Object(a.a)(s,2),o=l[0],O=l[1],v=Object(n.useContext)(r.a),f=v.allCurrency,p=v.setAllCurrency;Object(n.useEffect)((function(){O(i()(c.code))}),[c.code,O]);return Object(x.jsxs)("div",{className:c.active?"valuta selected":"valuta",onClick:function(){var e=Object(u.a)(f);e[t].active=!e[t].active,p(e)},children:[Object(x.jsx)(j.a,{currency:c.code,size:"md"}),Object(x.jsx)("p",{className:"valuta_symbol",children:o}),Object(x.jsx)("p",{className:"valuta_name",children:c.name}),Object(x.jsx)("p",{className:"valuta_code",children:c.code}),Object(x.jsx)(d.a,{icon:c.active?b.b:b.c,className:c.active?"red":void 0})]})};c.default=function(){var e=Object(n.useContext)(r.a),c=e.currencyRef,t=e.allCurrency,u=Object(n.useState)(""),l=Object(a.a)(u,2),i=l[0],o=l[1];return Object(n.useEffect)((function(){s.a.to(c.current,.3,{y:"0px",opacity:1})}),[c]),Object(x.jsxs)("div",{className:"currency-list",ref:c,children:[Object(x.jsx)("input",{type:"text",className:"search",value:i,onChange:function(e){return o(e.target.value)},placeholder:"search..."}),Object(x.jsx)("section",{children:i?t.map((function(e,c){return(e.code.includes(i.toUpperCase())||e.name.toLowerCase().includes(i.toLowerCase()))&&Object(x.jsx)(O,{el:e,index:c},"el".concat(c))})):t.map((function(e,c){return Object(x.jsx)(O,{el:e,index:c},"el".concat(c))}))})]})}}}]);
//# sourceMappingURL=3.52e5c3b6.chunk.js.map