(this["webpackJsonpcs-411-project"]=this["webpackJsonpcs-411-project"]||[]).push([[0],[,,function(e,a,t){e.exports={Header:"Header_Header__2C_Ub",Left:"Header_Left__3IRrf",Right:"Header_Right__2Cp5y",SearchBtn:"Header_SearchBtn__1tEED",Nav:"Header_Nav__2apfo",NavItem:"Header_NavItem__25d6V",NavInput:"Header_NavInput__-rrWz",NavBtn:"Header_NavBtn__27Eww",Icon:"Header_Icon__2oxOJ"}},,function(e,a,t){e.exports={Home:"Home_Home__2nb7Z",Left:"Home_Left__1EHGR",Right:"Home_Right__3-73l",FormInput:"Home_FormInput__10PO3",FirstName:"Home_FirstName__2axrd",LastName:"Home_LastName__3_0kL",SignupBtn:"Home_SignupBtn__YDGON",NewAccountTitle:"Home_NewAccountTitle__2D5yc"}},,,,,,,,,function(e,a,t){e.exports={Container:"WelcomeModal_Container__3MTQL",Message:"WelcomeModal_Message__OlnyI",FormInput:"WelcomeModal_FormInput__1vhaC",FormSelect:"WelcomeModal_FormSelect__1fEPk"}},function(e,a,t){e.exports={UserCarSelector:"UserCarSelector_UserCarSelector__bBSSn",UserCar:"UserCarSelector_UserCar__5ym6C",UserCarUnselected:"UserCarSelector_UserCarUnselected__2IZ-N",UserCarSelected:"UserCarSelector_UserCarSelected__HpUPD",CheckBoxUnselected:"UserCarSelector_CheckBoxUnselected__2vTeF",CheckBoxSelected:"UserCarSelector_CheckBoxSelected__3O0iW",Left:"UserCarSelector_Left__30hT9",Right:"UserCarSelector_Right__3PltZ"}},,function(e,a,t){e.exports={Container:"HomeRegistrationModal_Container__3S60z",Message:"HomeRegistrationModal_Message__mAn_I",Header:"HomeRegistrationModal_Header__3P2B4",FormInput:"HomeRegistrationModal_FormInput__2oFjL",FinishBtn:"HomeRegistrationModal_FinishBtn__24nUH"}},,function(e,a,t){e.exports={AvailableHomeBox:"AvailableChargingHomes_AvailableHomeBox__2JqVX",DistanceBox:"AvailableChargingHomes_DistanceBox__1oTfv",Distance:"AvailableChargingHomes_Distance__15cUb",HomeDetails:"AvailableChargingHomes_HomeDetails__3OEUl",Address:"AvailableChargingHomes_Address__2CQp8",ChargeBtn:"AvailableChargingHomes_ChargeBtn__2feQj"}},,function(e,a,t){e.exports={Layout:"Layout_Layout__3SBgk",Content:"Layout_Content__2WLOk"}},,function(e,a,t){e.exports={SerifFont:"GlobalStyles_SerifFont___0fp9",SansSerifFont:"GlobalStyles_SansSerifFont__h9XuS"}},function(e,a,t){e.exports={LeftPanel:"HomeSearchPage_LeftPanel__18jv3",RightPanel:"HomeSearchPage_RightPanel__2F8LH",BigPrompt:"HomeSearchPage_BigPrompt__1dXnU",SortBox:"HomeSearchPage_SortBox__3FzW6",AvailablePrompt:"HomeSearchPage_AvailablePrompt__1Htg-"}},,,,,function(e,a,t){e.exports={FormInput:"SearchBar_FormInput__3z5N5",SearchBtn:"SearchBar_SearchBtn__3sT-0"}},function(e,a,t){e.exports={FavoritesBtn:"ChargingStationFilters_FavoritesBtn__2KW6S"}},,,,,,,,function(e,a,t){e.exports=t(53)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},,,,,,,,,function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(32),o=t.n(r),s=(t(42),t(7)),c=t(8),i=t(10),m=t(9),u=t(11),h=(t(43),t(4)),d=t.n(h),_=(t(44),function(e){var a=e.show?"visible":"hidden";return l.a.createElement("div",{className:["Modal",a].join(" "),id:"modal"},l.a.createElement("div",{className:"ModalContent"},l.a.createElement("div",{className:"Body"},l.a.createElement("button",{className:"buttonStyles",onClick:function(a){e.onClose&&e.onClose(a)}},String.fromCharCode(10005)),e.children)))}),p=t(13),v=t.n(p),E=function(e){function a(){return Object(s.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){for(var e=this,a=[l.a.createElement("option",null,"Model Year")],t=(new Date).getFullYear(),n=0;n<20;n++)a.push(l.a.createElement("option",null,t-n));return l.a.createElement(_,{onClose:this.props.onClose,show:this.props.show},l.a.createElement("div",{className:v.a.Container},l.a.createElement("h1",null,"Welcome!"),l.a.createElement("p",{className:v.a.Message},"A couple more steps and you're all set"),l.a.createElement("p",{className:v.a.Message},"First, let's register your car.",l.a.createElement("br",null),l.a.createElement("span",{style:{fontSize:"15px"}},"P.S. You can add as many cars as you'd like later.")),l.a.createElement("input",{className:v.a.FormInput,placeholder:"License Plate Number"}),l.a.createElement("select",{className:v.a.FormSelect},a),l.a.createElement("select",{className:v.a.FormSelect},l.a.createElement("option",null,"Make Name")),l.a.createElement("select",{className:v.a.FormSelect},l.a.createElement("option",null,"Model Name")),l.a.createElement("button",{style:{backgroundColor:"#C1C8E4",textAlign:"center"},className:v.a.FormInput,onClick:function(){return e.props.onComplete()}},"Next")))}}]),a}(n.Component),f=t(16),N=t.n(f),g=t(22),S=t.n(g),C=t(19),y=function(e){function a(){return Object(s.a)(this,a),Object(i.a)(this,Object(m.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){return l.a.createElement(_,{onClose:this.props.onClose,show:this.props.show},l.a.createElement("div",{className:[N.a.Container,S.a.SansSerifFont].join(" ")},l.a.createElement("p",{className:N.a.Header},"Last Step!"),l.a.createElement("p",null,"Would you like to earn money by joining the grid?"),l.a.createElement(C.b,{to:"/chargestationsearch"},l.a.createElement("p",null,"Skip")),l.a.createElement("div",null,l.a.createElement("input",{className:N.a.FormInput,placeholder:"Street Address"})),l.a.createElement("div",{styles:{width:"100%",overflow:"auto"}},l.a.createElement("input",{className:N.a.FormInput,style:{float:"left",width:"31%",marginLeft:"0px"},placeholder:"County"}),l.a.createElement("input",{className:N.a.FormInput,style:{float:"left",width:"31%",marginLeft:"20px"},placeholder:"zipcode"}),l.a.createElement("input",{className:N.a.FormInput,style:{float:"left",width:"31%",marginLeft:"20px"},placeholder:"State"})),l.a.createElement(C.b,{to:"/chargestationsearch"},l.a.createElement("button",{className:N.a.FinishBtn},"Finish"))))}}]),a}(n.Component),w=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(t=Object(i.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(l)))).state={show_welcome:!1,show_home_registration:!1},t.showWelcomeModal=function(e){t.setState({show_welcome:!t.state.show_welcome})},t.showHomeRegistrationModal=function(e){t.setState({show_welcome:!1,show_home_registration:!t.state.show_home_registration})},t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:d.a.Home},l.a.createElement("div",{className:[d.a.Left,S.a.SerifFont].join(" ")},l.a.createElement("h1",null,"Don't let range anxiety stop you from doing what you want!"),l.a.createElement("p",null,"Come join the thousands of other EV drivers who have experienced the flexible and modern solution to EV charging")),l.a.createElement("div",{className:d.a.Right},l.a.createElement("p",{className:d.a.NewAccountTitle},"Create New Account"),l.a.createElement("div",{className:d.a.Names},l.a.createElement("div",{className:d.a.FirstName},l.a.createElement("input",{className:d.a.FormInput,placeholder:"First name"})),l.a.createElement("div",{className:d.a.LastName},l.a.createElement("input",{className:d.a.FormInput,placeholder:"Last name"}))),l.a.createElement("div",null,l.a.createElement("input",{className:[d.a.FormInput,d.a.FullWidth].join(" "),placeholder:"Email"})),l.a.createElement("div",null,l.a.createElement("input",{className:[d.a.FormInput,d.a.FullWidth].join(" "),placeholder:"Password"})),l.a.createElement("div",null,l.a.createElement("button",{className:d.a.SignupBtn,onClick:function(){return e.showWelcomeModal()}},"SIGN UP"))),l.a.createElement(E,{onClose:this.showWelcomeModal,onComplete:this.showHomeRegistrationModal,show:this.state.show_welcome}),l.a.createElement(y,{onClose:this.showHomeRegistrationModal,onComplete:this.showHomeSearchPage,show:this.state.show_home_registration}))}}]),a}(n.Component),b=t(20),F=t.n(b),H=t(2),I=t.n(H),B=function(e){return l.a.createElement("div",{className:I.a.Header},l.a.createElement("div",{className:I.a.Left},"OUTLET"),l.a.createElement("div",{className:I.a.Right},l.a.createElement("div",{className:I.a.Nav},l.a.createElement("div",{className:I.a.NavItem},"Home"),l.a.createElement("div",{className:I.a.NavItem},"My Cars"),l.a.createElement("div",{className:I.a.NavItem},"My Homes"),l.a.createElement("div",{className:[I.a.NavItem,I.a.Icon].join(" ")},e.userFirstName[0]+e.userLastName[0]))))},L=function(e){return l.a.createElement("div",{className:I.a.Header},l.a.createElement("div",{className:I.a.Left},"OUTLET"),l.a.createElement("div",{className:I.a.Right},l.a.createElement("div",{className:I.a.Nav},l.a.createElement("div",{className:I.a.NavItem},l.a.createElement("input",{className:I.a.NavInput,placeholder:"email",type:"text"})),l.a.createElement("div",{className:I.a.NavItem},l.a.createElement("input",{className:I.a.NavInput,placeholder:"password",type:"text"})),l.a.createElement("div",{className:I.a.NavItem},l.a.createElement("button",{className:I.a.NavBtn},"Log in")))))},j=function(e){var a=e.show?[F.a.Layout,F.a.blur].join(" "):F.a.Layout,t=e.loggedIn?l.a.createElement(B,{userFirstName:e.userInfo.firstName,userLastName:e.userInfo.lastName}):l.a.createElement(L,null);return l.a.createElement("div",{className:a},t,l.a.createElement("div",{className:F.a.Content},e.children))},k=t(15),U=t(23),x=t.n(U),O=t(18),M=t.n(O),A=function(e){var a=e.home.distance+" mi";return l.a.createElement("div",{className:M.a.AvailableHomeBox},l.a.createElement("div",{className:M.a.DistanceBox},l.a.createElement("div",{className:M.a.Distance},a)),l.a.createElement("div",{className:M.a.HomeDetails},l.a.createElement("p",{className:M.a.Address},e.home.address+", "+e.home.zipcode+", "+e.home.state),l.a.createElement("p",null,"Rating: ",e.home.rating_stars),l.a.createElement("button",{className:M.a.ChargeBtn},"Start Charging")))},P=function(e){var a=null;return e.available_homes&&(a=e.available_homes.map((function(e){return l.a.createElement(A,{key:e.address,home:e})}))),l.a.createElement("div",null,a)},R=t(14),D=t.n(R),W=(t(49),t(35)),T=t(36),V=function(e){var a="",t=D.a.CheckBoxUnselected,n=D.a.UserCarUnselected;return e.vehicle&&e.vehicle.isDefault&&(a=l.a.createElement(W.a,{icon:T.a}),n=D.a.UserCarSelected,t=D.a.CheckBoxSelected),l.a.createElement("div",{className:[D.a.UserCar,n].join(" ")},l.a.createElement("div",{className:D.a.Left},l.a.createElement("p",null,l.a.createElement("b",null,e.vehicle.year+" "+e.vehicle.make+" "+e.vehicle.model)),l.a.createElement("p",null,"LPN: ",e.vehicle.lpn)),l.a.createElement("div",{className:[D.a.Right,t].join(" ")},a))},z=function(e){var a=null;return e.userVehicles&&(a=e.userVehicles.map((function(e){return l.a.createElement(V,{key:e.lpn,vehicle:e})}))),l.a.createElement("div",{className:D.a.UserCarSelector},a)},G=t(28),J=t.n(G),Y=function(e){return l.a.createElement("div",{style:{width:"100%",overflow:"auto"}},l.a.createElement("input",{className:J.a.FormInput,placeholder:"Address"}),l.a.createElement("button",{onClick:function(){return e.onsearch()},className:J.a.SearchBtn},"Search"))},Q=function(e){return e.children},X=t(29),Z=t.n(X),q=function(e){return l.a.createElement(Q,null,l.a.createElement("button",{className:Z.a.FavoritesBtn},"My Favorites"),l.a.createElement("button",{className:Z.a.FavoritesBtn},"Sort by"))},K=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(t=Object(i.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(l)))).state={available_charging_stations:null,user_location:"",onlyShowFavorites:!1,sortBy:null,userVehicles:null,userVehicleSelected:null},t.onSearch=function(){console.log("here");t.setState({available_charging_stations:[{address:"2291 N Glennwood St",zipcode:92865,favorite:0,distance:2.1,rating_stars:4},{address:"23414 N Dians St",zipcode:92865,favorite:0,distance:3.1,rating_stars:4},{address:"114 W Commonwealth St",zipcode:92849,favorite:0,distance:2.1,rating_stars:4}]})},t.onUserVehicleSelected=function(e){t.setState({userVehicleSelected:e})},t.handleFavoritesClick=function(){t.setState((function(e,a){return{onlyShowFavorites:!e.onlyShowFavorites}}))},t.handleSortSelection=function(e){t.setState({sortBy:e})},t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=[{vehicleid:1234,lpn:"3VER720",year:2008,make:"Toyota",model:"Prius",plugType:"Type A",isDefault:!0},{vehicleid:2224,lpn:"8WRS230",year:2018,make:"Tesla",model:"Model S",plugType:"Type B",isDefault:!1},{vehicleid:3333,lpn:"5WER234",year:2010,make:"Chevrolet",model:"Bolt",plugType:"Type A",isDefault:!1}],a=e.filter((function(e){return e.isDefault}));this.setState({userVehicleSelected:a,userVehicles:e})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:x.a.LeftPanel},l.a.createElement(z,{userVehicles:this.state.userVehicles,updateVehicleSelection:this.onUserVehicleSelected})),l.a.createElement("div",{className:x.a.RightPanel},l.a.createElement("p",{className:x.a.BigPrompt},"Enter your location"),l.a.createElement(Y,{onsearch:this.onSearch}),l.a.createElement(q,{onUseFavorites:this.handleFavoritesClick,onUpdateSort:this.handleSortSelection}),l.a.createElement(P,{available_homes:this.state.available_charging_stations,onlyShowFavorites:this.state.onlyShowFavorites,sortBy:this.state.sortBy})))}}]),a}(n.Component),$=function(e){function a(){var e,t;Object(s.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(t=Object(i.a)(this,(e=Object(m.a)(a)).call.apply(e,[this].concat(l)))).state={show:!1,loggedIn:!0,userInfo:{userId:1234,firstName:"User",lastName:"Name"}},t}return Object(u.a)(a,e),Object(c.a)(a,[{key:"handleModalBtnClick",value:function(){this.setState((function(e){return{show:!e.show}}))}},{key:"handleLogIN",value:function(e){this.setState({loggedIn:!0})}},{key:"handleLogOut",value:function(){this.setState({loggedIn:!1})}},{key:"render",value:function(){return this.state.show&&"Hide Modal",l.a.createElement("div",{className:"App"},l.a.createElement(j,{show:this.state.show,updateLoginStatus:this.handleLogIN,loggedIn:this.state.loggedIn,userInfo:this.state.userInfo},l.a.createElement(k.c,null,l.a.createElement(k.a,{path:"/chargestationsearch"},l.a.createElement(K,null)),l.a.createElement(k.a,{path:"/"},l.a.createElement(w,null)))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(C.a,null,l.a.createElement($,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[37,1,2]]]);
//# sourceMappingURL=main.9502caac.chunk.js.map