import{E as i,L as n,X as a,Y as m,Z as d,aa as s,ca as c,k as r,m as p}from"./chunk-FNW33LID.js";var l=[{path:"login",title:"Login | TodoApp",loadComponent:()=>import("./chunk-DA2I6IAL.js")},{path:"register",title:"Register | TodoApp",loadComponent:()=>import("./chunk-IJD6VOOU.js")},{path:"todos",title:"Todos | TodoApp",canActivate:[()=>r(c).isLoggedIn()],loadComponent:()=>import("./chunk-I5OELRDS.js")},{path:"",redirectTo:"todos",pathMatch:"full"},{path:"**",redirectTo:"todos",pathMatch:"full"}];var f={providers:[s(l),m()]};var u=(()=>{let o=class o{};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=p({type:o,selectors:[["app-root"]],standalone:!0,features:[n],decls:1,vars:0,template:function(e,g){e&1&&i(0,"router-outlet")},dependencies:[d],encapsulation:2});let t=o;return t})();a(u,f).catch(t=>console.error(t));
