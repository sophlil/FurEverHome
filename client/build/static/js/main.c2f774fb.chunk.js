(this.webpackJsonpcapstone=this.webpackJsonpcapstone||[]).push([[0],{27:function(e,t,a){e.exports=a(59)},32:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var l=a(0),n=a.n(l),r=a(22),o=a.n(r),c=(a(32),a(9),a(3)),i=a(6);var s=()=>{const[e,t]=Object(l.useState)(""),[a,r]=Object(l.useState)(""),o=Object(c.f)();return n.a.createElement("div",{className:"login"},n.a.createElement("header",null,n.a.createElement("h2",null,"Login Page"),n.a.createElement("form",{action:"/login",method:"post"},n.a.createElement("fieldset",null,n.a.createElement("legend",null,"User Name"),n.a.createElement("label",null,"Please enter your User Name"),n.a.createElement("input",{type:"text",name:"username",value:e,onChange:e=>t(e.target.value),required:!0})),n.a.createElement("fieldset",null,n.a.createElement("legend",null,"Password"),n.a.createElement("label",null,"Please enter your Password"),n.a.createElement("input",{type:"password",name:"password",value:a,onChange:e=>r(e.target.value),required:!0})),n.a.createElement("button",{type:"submit"},"Login"),n.a.createElement("button",{type:"button",onClick:()=>{o.push("/Create-Account")}},"Sign Up"))))};var m=function(e){let{pet:t,toggleFavorite:a,isFavorite:r,onDelete:o,onEdit:c,showFavorites:i,isEditable:s}=e;console.log(r);const m=new Date(t.dateAvailable).toISOString().split("T")[0],[u,d]=Object(l.useState)(t.availability);return n.a.createElement("tr",null,n.a.createElement("td",null,t.name),n.a.createElement("td",null,t.species),n.a.createElement("td",null,t.breed),n.a.createElement("td",null,n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement("label",null,n.a.createElement("input",{type:"checkbox",checked:t.disposition.goodWithOtherAnimals,readOnly:!0}),"Good with other animals")),n.a.createElement("li",null,n.a.createElement("label",null,n.a.createElement("input",{type:"checkbox",checked:t.disposition.goodWithChildren,readOnly:!0}),"Good with children")),n.a.createElement("li",null,n.a.createElement("label",null,n.a.createElement("input",{type:"checkbox",checked:t.disposition.mustBeLeashed,readOnly:!0}),"Must be leashed")))),n.a.createElement("td",null,n.a.createElement("img",{src:t.photo,alt:t.name,style:{width:"300px",height:"300px"}})),n.a.createElement("td",null,s?n.a.createElement("select",{value:u,onChange:e=>{d(e.target.value),c(t._id,e.target.value)},disabled:!i},n.a.createElement("option",{value:"Not Available"},"Not Available"),n.a.createElement("option",{value:"Available"},"Available"),n.a.createElement("option",{value:"Pending"},"Pending"),n.a.createElement("option",{value:"Adopted"},"Adopted")):n.a.createElement("span",null,u)),n.a.createElement("td",null,t.weight),n.a.createElement("td",null,t.height),n.a.createElement("td",null,t.description),n.a.createElement("td",null,t.age),n.a.createElement("td",null,m),n.a.createElement("td",null,i&&n.a.createElement("button",{onClick:()=>a(t._id)},r?"Unfavorite":"Favorite"),o&&n.a.createElement("button",{onClick:()=>o(t._id)},"Delete")))};var u=function(e){let{pets:t,toggleFavorite:a,favorites:l=[],onEdit:r,onDelete:o,showFavorites:c=!0,isEditable:s=!0}=e;return console.log(a),n.a.createElement("table",{id:"Pets"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Name"),n.a.createElement("th",null,"Species"),n.a.createElement("th",null,"Breed"),n.a.createElement("th",null,"Disposition"),n.a.createElement("th",null,"Photo"),n.a.createElement("th",null,"Availability"),n.a.createElement("th",null,"Weight"),n.a.createElement("th",null,"Height"),n.a.createElement("th",null,"Description"),n.a.createElement("th",null,"Age"),n.a.createElement("th",null,"Date Created"),c&&n.a.createElement("th",null,n.a.createElement(i.b,{to:"/favorites"},"Favorites")))),n.a.createElement("tbody",null,t.map(e=>n.a.createElement(m,{pet:e,key:e.id,toggleFavorite:a,isFavorite:l.includes(e._id),onDelete:o,onEdit:r,showFavorites:c,isEditable:s}))))},d=a(60);var h=function(e){let{pets:t,toggleFavorite:a,favorites:r,isEditable:o}=e;const[c,i]=Object(l.useState)({species:"",breed:"",goodWithChildren:!1,goodWithOtherAnimals:!1,mustBeLeashed:!1}),[s,m]=Object(l.useState)([]),h=e=>{const{name:t,value:a,type:l,checked:n}=e.target;i(e=>({...e,[t]:"checkbox"===l?n:a}))},E=s.filter(e=>(""===c.species||e.species===c.species)&&(""===c.breed||e.breed===c.breed)&&(!c.goodWithChildren||e.disposition.goodWithChildren)&&(!c.goodWithOtherAnimals||e.disposition.goodWithOtherAnimals)&&(!c.mustBeLeashed||e.disposition.mustBeLeashed));return Object(l.useEffect)(()=>{(async()=>{d.a.get("/animal").then(e=>(m(e.data),console.log(e.data),e.data))})()},[]),n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",null,"List of Pets"),n.a.createElement("div",{className:"listOfPets"},n.a.createElement("div",{className:"filter-box"},n.a.createElement("h3",null,"Filter Pets"),n.a.createElement("label",null,"Species:",n.a.createElement("input",{type:"text",name:"species",value:c.species,onChange:h})),n.a.createElement("label",null,"Breed:",n.a.createElement("input",{type:"text",name:"breed",value:c.breed,onChange:h})),n.a.createElement("label",null,"Good With Children:",n.a.createElement("input",{type:"checkbox",name:"goodWithChildren",checked:c.goodWithChildren,onChange:h})),n.a.createElement("label",null,"Good With Other Animals:",n.a.createElement("input",{type:"checkbox",name:"goodWithOtherAnimals",checked:c.goodWithOtherAnimals,onChange:h})),n.a.createElement("label",null,"Animal Must Be Leashed At All Times:",n.a.createElement("input",{type:"checkbox",name:"mustBeLeashed",checked:c.mustBeLeashed,onChange:h})))),n.a.createElement(u,{pets:E,toggleFavorite:a,favorites:r,showFavorites:!0,isEditable:!1}))},E=a(24);const p={Dog:["Corgi","Golden Retriever","German Shepherd","Other"],Cat:["Tabby","Siamese","Persian","Other"],Other:["Parrot","Rabbit","Bearded Dragon","Other"]};var g=()=>{const[e,t]=Object(l.useState)(""),[a,r]=Object(l.useState)("Dog"),[o,c]=Object(l.useState)(""),[i,s]=Object(l.useState)(!1),[m,u]=Object(l.useState)(!1),[h,g]=Object(l.useState)(!1),[b,v]=Object(l.useState)(""),[f,y]=Object(l.useState)(""),[O,C]=Object(l.useState)(""),[A,k]=Object(l.useState)(""),[S,w]=Object(l.useState)(""),[F,P]=Object(l.useState)("");return n.a.createElement("div",null,n.a.createElement("form",{onSubmit:async()=>{const t={name:e,species:a,breed:o,disposition:{goodWithChildren:i,goodWithOtherAnimals:m,mustBeLeashed:h},availability:f,photo:b,weight:O,height:A,description:S,age:F};console.log(t);try{const e=await d.a.post("/register/animal",t);console.log("Pet added successfully:",e.data)}catch(l){console.log("Error adding pet:",l)}}},n.a.createElement("div",{className:"createPet"}),n.a.createElement("h1",null,"Enter a Pet"),n.a.createElement("label",null,"Pet Name:",n.a.createElement("input",{type:"text",placeholder:"Enter name here",value:e,onChange:e=>t(e.target.value)})),n.a.createElement("label",null,"Species: "),n.a.createElement("select",{value:a,onChange:e=>{r(e.target.value),c("")}},n.a.createElement("option",{value:"Dog"},"Dog"),n.a.createElement("option",{value:"Cat"},"Cat"),n.a.createElement("option",{value:"Other"},"Other")),n.a.createElement("label",null,"Breed: "),n.a.createElement("select",{value:o,onChange:e=>c(e.target.value)},n.a.createElement("option",{value:""},"Select Breed"),p[a].map((e,t)=>n.a.createElement("option",{key:t,value:e},e))),n.a.createElement("div",{className:"checkbox-group"},n.a.createElement("label",null,n.a.createElement("input",{type:"checkbox",checked:i,onChange:e=>s(e.target.checked)}),"Good with Children"),n.a.createElement("label",null,n.a.createElement("input",{type:"checkbox",checked:m,onChange:e=>u(e.target.checked)}),"Good with other Animals"),n.a.createElement("label",null,n.a.createElement("input",{type:"checkbox",checked:h,onChange:e=>g(e.target.checked)}),"Animal must be leashed at all times")),n.a.createElement("label",null,"Upload Photo: "),n.a.createElement("div",{className:"upload-wrapper"},n.a.createElement(E.a,{apiKey:"f4473dfbd728d118570ccab0ad360359",onSuccess:e=>{console.log(e),v(e)},preview:"true"})),n.a.createElement("label",null,"Availability:  "),n.a.createElement("select",{value:f,onChange:e=>y(e.target.value)},n.a.createElement("option",{value:"Not Available"},"Not Available"),n.a.createElement("option",{value:"Available"},"Available"),n.a.createElement("option",{value:"Pending"},"Pending"),n.a.createElement("option",{value:"Adopted"},"Adopted")),n.a.createElement("label",null,"Weight: "),n.a.createElement("input",{type:"text",placeholder:"Enter weight in lbs",value:O,onChange:e=>C(e.target.value)}),n.a.createElement("label",null,"Height:  "),n.a.createElement("input",{type:"text",placeholder:"Enter height in feet",value:A,onChange:e=>k(e.target.value)}),n.a.createElement("label",null,"Description: "),n.a.createElement("input",{type:"text",placeholder:"Enter animal description",value:S,onChange:e=>w(e.target.value)}),n.a.createElement("label",null,"Age "),n.a.createElement("input",{type:"number",placeholder:"Enter age",value:F,onChange:e=>P(e.target.value)}),n.a.createElement("button",{type:"submit"},"Add Pet")))};var b=function(){return n.a.createElement(n.a.Fragment,null," ",n.a.createElement("div",{className:"adminLandingPage"}),n.a.createElement(i.b,{to:"/create-pet",className:"link-spacing"},"Create a Pet"),n.a.createElement(i.b,{to:"/admin-browse",className:"link-no-style"},"Browse Existing Pets"))};var v=()=>{const[e,t]=Object(l.useState)(""),[a,r]=Object(l.useState)(""),[o,c]=Object(l.useState)("");return n.a.createElement("div",null,n.a.createElement("header",null,n.a.createElement("div",{className:"createAccount"}),n.a.createElement("h2",null,"Create Account"),n.a.createElement("form",{action:"/register/public",method:"post"},n.a.createElement("fieldset",null,n.a.createElement("legend",null,"Name"),n.a.createElement("label",null,"What is your name?"),n.a.createElement("input",{type:"text",name:"name",value:e,onChange:e=>t(e.target.value),required:!0})),n.a.createElement("fieldset",null,n.a.createElement("legend",null,"User Name"),n.a.createElement("label",null,"Create a username"),n.a.createElement("input",{type:"text",name:"userName",value:a,onChange:e=>r(e.target.value),required:!0})),n.a.createElement("fieldset",null,n.a.createElement("legend",null,"Password"),n.a.createElement("label",null,"Create a password"),n.a.createElement("input",{type:"password",name:"password",value:o,onChange:e=>c(e.target.value),required:!0})),n.a.createElement("button",{type:"submit"},"Create Account"))))};var f=function(e){let{pets:t,toggleFavorite:a,favorites:l=[]}=e;const r=t.filter(e=>l.includes(e._id));return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"favorites"}),n.a.createElement("h2",null,"Your Favorited Pets"),n.a.createElement(u,{pets:r,toggleFavorite:a,favorites:l,isEditable:!1}))};var y=function(){return n.a.createElement(n.a.Fragment,null," ",n.a.createElement("div",{className:"adminLandingPage"}),n.a.createElement(i.b,{to:"/favorites",className:"link-spacing"},"View Your Favorited Pets"),n.a.createElement(i.b,{to:"/browse",className:"link-no-style"},"Browse Existing Pets"))};var O=function(){return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"app-description"},n.a.createElement("p",null,"FurEver Home is about matching animals from a shelter to their ideal \u201cFurEver\u201d homes by creating dating profiles for each animal. This unique concept provides users with an engaging way to find their dream furry pet to bring home. With a user-friendly interface and a fun process, users can easily research all the pets available for adoption at a shelter by filtering for type of animal, breed, and disposition to help tailor the best results.")),n.a.createElement("div",{className:"nav-container"},n.a.createElement("nav",null,n.a.createElement(i.b,{to:"/login",className:"nav-link"},"Login"))))};var C=function(e){let{pets:t,onDelete:a,onEdit:r}=e;const[o,c]=Object(l.useState)({species:"",breed:"",goodWithChildren:!1,goodWithOtherAnimals:!1,mustBeLeashed:!1}),[i,s]=Object(l.useState)([]),m=e=>{const{name:t,value:a,type:l,checked:n}=e.target;c(e=>({...e,[t]:"checkbox"===l?n:a}))},h=i.filter(e=>(""===o.species||e.species===o.species)&&(""===o.breed||e.breed===o.breed)&&(!o.goodWithChildren||e.disposition.goodWithChildren)&&(!o.goodWithOtherAnimals||e.disposition.goodWithOtherAnimals)&&(!o.mustBeLeashed||e.disposition.mustBeLeashed));return Object(l.useEffect)(()=>{(async()=>{d.a.get("/animal").then(e=>(s(e.data),console.log(e.data),e.data))})()},[]),n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",null,"List of Pets"),n.a.createElement("div",{className:"listOfPets"},n.a.createElement("div",{className:"filter-box"},n.a.createElement("h3",null,"Filter Pets"),n.a.createElement("label",null,"Species:",n.a.createElement("input",{type:"text",name:"species",value:o.species,onChange:m})),n.a.createElement("label",null,"Breed:",n.a.createElement("input",{type:"text",name:"breed",value:o.breed,onChange:m})),n.a.createElement("label",null,"Good With Children:",n.a.createElement("input",{type:"checkbox",name:"goodWithChildren",checked:o.goodWithChildren,onChange:m})),n.a.createElement("label",null,"Good With Other Animals:",n.a.createElement("input",{type:"checkbox",name:"goodWithOtherAnimals",checked:o.goodWithOtherAnimals,onChange:m})),n.a.createElement("label",null,"Animal Must Be Leashed At All Times:",n.a.createElement("input",{type:"checkbox",name:"mustBeLeashed",checked:o.mustBeLeashed,onChange:m})))),n.a.createElement(u,{pets:h,onDelete:a,onEdit:r,showFavorites:!0}))};a(56).config();var A=function(){const[e,t]=Object(l.useState)([]);Object(l.useEffect)(()=>{(async()=>{d.a.get("/animal").then(e=>(t(e.data),console.log(e.data),e.data))})()},[]);const[a,r]=Object(l.useState)(()=>{const e=localStorage.getItem("favorites");return e?JSON.parse(e):[]}),o=e=>{r(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])};Object(l.useEffect)(()=>{localStorage.setItem("favorites",JSON.stringify(a))},[a]);const m=()=>{d.a.post("/logout"),window.location.href="/login"},u=e=>{let{component:t,pets:a,toggleFavorite:l,favorites:r,onDelete:o,onEdit:i,...s}=e;return n.a.createElement(c.a,Object.assign({},s,{render:e=>n.a.createElement("div",null,n.a.createElement("button",{className:"logout-button",onClick:m},"Log Out"),n.a.createElement(t,Object.assign({},e,{pets:a,toggleFavorite:l,favorites:r,onDelete:o,onEdit:i})))}))};return n.a.createElement("div",{className:"App"},n.a.createElement("h1",null,"FurEver Home"),n.a.createElement(i.a,null,n.a.createElement(c.c,null,n.a.createElement(c.a,{path:"/",exact:!0},n.a.createElement(O,null)),n.a.createElement(c.a,{path:"/login"},n.a.createElement(s,null)),n.a.createElement(c.a,{path:"/create-account"},n.a.createElement(v,null)),n.a.createElement(u,{path:"/browse",component:h,pets:e,toggleFavorite:o,favorites:a,logOut:m}),n.a.createElement(u,{path:"/create-pet",component:g,logOut:m}),n.a.createElement(u,{path:"/admin-landing-page",component:b,logOut:m}),n.a.createElement(u,{path:"/favorites",component:f,pets:e,toggleFavorite:o,favorites:a,logOut:m}),n.a.createElement(u,{path:"/admin-browse",component:C,pets:e,onDelete:async e=>{console.log("Deleting pet",e);try{await d.a.delete("/animal/".concat(e)),t(t=>t.filter(t=>t._id!==e))}catch(a){console.error("Error deleting pet: ",a)}},onEdit:async(e,a)=>{console.log("Updating Pet:");try{await d.a.post("/animal/".concat(e),{availability:a}),t(t=>t.map(t=>t._id===e?{...t,availability:a}:t))}catch(l){console.error("Error updating pet: ",l)}},logOut:m}),n.a.createElement(u,{path:"/user-landing-page",component:y,logOut:m}))))};var k=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,61)).then(t=>{let{getCLS:a,getFID:l,getFCP:n,getLCP:r,getTTFB:o}=t;a(e),l(e),n(e),r(e),o(e)})};o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(A,null)),document.getElementById("root")),k()},9:function(e,t,a){}},[[27,1,2]]]);
//# sourceMappingURL=main.c2f774fb.chunk.js.map