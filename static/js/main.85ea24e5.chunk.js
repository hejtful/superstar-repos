(this["webpackJsonpsuperstar-repos"]=this["webpackJsonpsuperstar-repos"]||[]).push([[0],{10:function(e,t,a){e.exports={switch:"StarredFilter_switch__3L0qa",labelText:"StarredFilter_labelText__3NGKI",input:"StarredFilter_input__3c6JR",slider:"StarredFilter_slider__2f9zj"}},15:function(e,t,a){e.exports={label:"LanguageFilter_label__20gk2",select:"LanguageFilter_select__2kTMx"}},27:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(11),i=a.n(s),c=a(4),o=(a(27),a(17)),l=a(6),u=a(1),d="applicationState",p=function(e){var t=e.getState;return function(e){return function(a){var n=e(a);return localStorage.setItem(d,JSON.stringify(t())),n}}},b=Object(u.d)({name:"github",initialState:{starred:[]},reducers:{starRepo:function(e,t){e.starred.push(t.payload)},unStarRepo:function(e,t){e.starred=e.starred.filter((function(e){return e!==t.payload}))}}}),h=b.actions,j=h.starRepo,g=h.unStarRepo,m=function(e){return e.github.starred},_=b.reducer,O=a(18),f=a(5),v=function(e){return Object.keys(e).reduce((function(t,a){var n=e[a];return n?t.concat("".concat(a,':"').concat(n,'"')):t}),"")},x=["JavaScript","Python","Java","PHP","C++","C","C#","Ruby","Scala","Haskell","Shell","Elm","Rust","Kotlin"],N=Object(O.a)({reducerPath:"githubApi",baseQuery:Object(f.d)({baseUrl:"https://api.github.com/"}),endpoints:function(e){return{getRepos:e.query({query:function(e){return{url:"search/repositories",params:{q:v(e),sort:"stars",order:"desc",page:1,per_page:25}}},transformResponse:function(e){return e.items}})}}}),S=N.useGetReposQuery,w=Object(l.b)(Object(o.a)({github:_},N.reducerPath,N.reducer)),k=a(16),R=c.e,y=function(e,t){return function(e){var t=e.getFullYear(),a=("0"+(e.getMonth()+1)).slice(-2),n=("0"+e.getDate()).slice(-2);return"".concat(t,"-").concat(a,"-").concat(n)}(new Date(e.getFullYear(),e.getMonth(),e.getDate()-t))},C=a(15),L=a.n(C),I=a(2);function G(e){var t=e.onChange;return Object(I.jsxs)("label",{htmlFor:"language-filter",className:L.a.label,children:["Language:",Object(I.jsxs)("select",{id:"language-filter",className:L.a.select,onChange:t,"data-testid":"language-filter",children:[Object(I.jsx)("option",{children:"Any"}),x.map((function(e){return Object(I.jsx)("option",{value:e,children:e},e)}))]})]})}var J=a(10),F=a.n(J);function D(e){var t=e.value,a=e.onChange;return Object(I.jsxs)("label",{className:F.a.switch,"data-testid":"starred-filter",children:[Object(I.jsx)("span",{className:F.a.labelText,children:"Starred:"}),Object(I.jsx)("input",{type:"checkbox",className:F.a.input,checked:t,onChange:a}),Object(I.jsx)("span",{className:F.a.slider})]})}var M=a(9),P=a.n(M);function T(e){var t=e.repo,a=e.isStarred,n=e.onStarButtonClick,r=e.onUnStarButtonClick;return Object(I.jsxs)("article",{className:P.a.wrapper,"data-testid":"repo-list-item",children:[Object(I.jsxs)("div",{className:P.a.titleWrapper,children:[Object(I.jsx)("h1",{className:P.a.title,children:Object(I.jsxs)("a",{href:t.html_url,className:P.a.link,children:[t.owner.login," /",Object(I.jsxs)("span",{className:P.a.repoName,children:[" ",t.name]})]})}),a?Object(I.jsx)("button",{className:P.a.button,type:"button",onClick:r,"data-testid":"un-star-button",children:"Un-star"}):Object(I.jsx)("button",{className:P.a.button,type:"button",onClick:n,"data-testid":"star-button",children:"Star"})]}),Object(I.jsx)("p",{className:P.a.description,children:t.description}),Object(I.jsxs)("div",{className:P.a.details,children:[Object(I.jsxs)("span",{children:["Language: ",t.language||"Unknown"]}),Object(I.jsxs)("span",{children:["Stars: ",t.stargazers_count]})]})]})}var B=a(8),U=a.n(B),W=function(e){var t=e.getDay(),a=t+6,n=y(e,t),r=y(e,a);return"".concat(r,"..").concat(n)}(new Date);function Y(){var e=Object(n.useState)(null),t=Object(k.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(!1),i=Object(k.a)(s,2),o=i[0],l=i[1],u=S({created:W,language:a}),d=u.data,p=u.error,b=u.isLoading,h=R(m),_=Object(c.d)(),O=o?null===d||void 0===d?void 0:d.filter((function(e){return null===h||void 0===h?void 0:h.includes(e.id)})):d;return Object(I.jsxs)("main",{className:U.a.main,children:[Object(I.jsxs)("div",{className:U.a.banner,children:[Object(I.jsx)("h1",{className:U.a.bannerTitle,children:"Superstar Repos"}),Object(I.jsx)("p",{className:U.a.bannerDescription,children:"See the repositories that the GitHub community starred the most in the previous week"})]}),Object(I.jsx)("div",{className:U.a.container,children:Object(I.jsxs)("div",{className:U.a.wrapper,children:[Object(I.jsxs)("div",{className:U.a.actions,children:[Object(I.jsx)(G,{onChange:function(e){return r(e.target.value)}}),Object(I.jsx)(D,{value:o,onChange:function(e){return l(e.target.checked)}})]}),Object(I.jsx)("div",{children:p?Object(I.jsx)("div",{className:U.a.statusMessage,children:"Something went wrong. Please try again later"}):b?Object(I.jsx)("div",{className:U.a.statusMessage,children:"Loading..."}):(null===O||void 0===O?void 0:O.length)?O.map((function(e){return Object(I.jsx)(T,{repo:e,isStarred:null===h||void 0===h?void 0:h.includes(e.id),onStarButtonClick:function(){return _(j(e.id))},onUnStarButtonClick:function(){return _(g(e.id))}},e.id)})):(null===d||void 0===d?void 0:d.length)?Object(I.jsxs)("div",{className:U.a.statusMessage,"data-testid":"no-starred-repos-message",children:["You did not star any of the top ",25," ",a," ","repos."]}):null})]})})]})}var q=function(){return Object(I.jsx)(Y,{})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var A,E=(A=function(){var e=localStorage.getItem(d);if(null!==e)return JSON.parse(e)}(),Object(u.a)({reducer:w,preloadedState:A,middleware:function(e){return e().concat(p).concat(N.middleware)}}));i.a.render(Object(I.jsx)(r.a.StrictMode,{children:Object(I.jsx)(c.a,{store:E,children:Object(I.jsx)(q,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,a){e.exports={main:"Github_main__1vPTO",banner:"Github_banner__RxchO",bannerTitle:"Github_bannerTitle__1WRUa",bannerDescription:"Github_bannerDescription__3NbDJ",container:"Github_container__37FXL",wrapper:"Github_wrapper__1fNuh",actions:"Github_actions__71O3f",statusMessage:"Github_statusMessage__3Rdqf"}},9:function(e,t,a){e.exports={wrapper:"RepoListItem_wrapper__2EIvM",titleWrapper:"RepoListItem_titleWrapper__P7ZI2",title:"RepoListItem_title__4gSZ8",link:"RepoListItem_link__1JA-G",button:"RepoListItem_button__3DYBC",repoName:"RepoListItem_repoName__gVnFY",description:"RepoListItem_description__XJQJV",details:"RepoListItem_details__3mYJx"}}},[[30,1,2]]]);
//# sourceMappingURL=main.85ea24e5.chunk.js.map