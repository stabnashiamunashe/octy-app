(()=>{var B=Object.create;var U=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var K=Object.getOwnPropertyNames;var M=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var S=(c,e)=>()=>(c&&(e=c(c=0)),e);var $=(c,e)=>()=>(e||c((e={exports:{}}).exports,e),e.exports);var X=(c,e,a,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let u of K(e))!V.call(c,u)&&u!==a&&U(c,u,{get:()=>e[u],enumerable:!(l=H(e,u))||l.enumerable});return c};var F=(c,e,a)=>(a=c!=null?B(M(c)):{},X(e||!c||!c.__esModule?U(a,"default",{value:c,enumerable:!0}):a,c));var _=(c,e,a)=>new Promise((l,u)=>{var s=y=>{try{g(a.next(y))}catch(m){u(m)}},d=y=>{try{g(a.throw(y))}catch(m){u(m)}},g=y=>y.done?l(y.value):Promise.resolve(y.value).then(s,d);g((a=a.apply(c,e)).next())});var R,N=S(()=>{R="WebPixel::Render"});var D,P=S(()=>{N();D=c=>shopify.extend(R,c)});var b=S(()=>{P()});var C=S(()=>{b()});var O=$((mt,E)=>{"use strict";var I=process.env.OCTY_APP_HOST;E.exports={octyAppHost:I,createCustomerURI:I+"/api/customers/createupdate",createEventURI:I+"/api/hooks/events/create",createItemURI:I+"/api/hooks/items/create",updateItemURI:I+"/api/hooks/items/update",deleteItemURI:I+"/api/hooks/items/delete",getContentURI:I+"/api/content",getRecommendationsURI:I+"/api/recommendations",pixelURI:I+"/api/hooks/events/create"}});var w=$((lt,J)=>{"use strict";function z(){return`octy_customer_id-${"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){let a=Math.random()*16|0;return(e==="x"?a:a&3|8).toString(16)})}`}function G(c){return/^octy_customer_id-[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/.test(c)}J.exports={generateOctyCustomerID:z,isValidOctyCustomerID:G}});var W=$((ut,L)=>{"use strict";var Q=O(),Z=w();function v(c,e,a,l){return _(this,null,function*(){try{let u,s=!1,d={};c==null?(u=Z.generateOctyCustomerID(),s=!0,d.fingerprint_id=e):u=c,a==null?a="":(d.shopify_customer_id=a,delete d.fingerprint_id);let g=yield fetch(`${Q.createCustomerURI}?shop=${l}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({octy_customer_id:u,shopify_customer_id:a,has_charged:!1,profile_data:d,platform_info:{},generated_new_id:s})});if(g.status===200||g.status===201)return yield g.text();throw console.log("Failed to create new Octy profile! Unable to track events or provide personalised experience during this session 1"),new Error("Server Error")}catch(u){throw new Error("Server Error")}})}var x;function tt(c){return _(this,null,function*(){let e=yield c.localStorage.getItem("octy_ica"),a=yield c.localStorage.getItem("octy_customer_id");e?x=new WebSocket(process.env.OCTY_WEBSOCKET_URL+a):(x=new WebSocket(process.env.OCTY_WEBSOCKET_URL+a),x.addEventListener("open",l=>{console.log("This is from Web Pixels"),console.log("WebSocket connection opened:",l)}),x.addEventListener("message",l=>{console.log("Message from server:",l.data);let u=JSON.parse(l.data);if(u.type==="coupon"){console.log("Received coupon code:",u.couponCode);let s=new CustomEvent("octy:gift_coupon",{detail:{octy_coupon_code:u.couponCode}});window.dispatchEvent(s)}}),x.addEventListener("error",l=>{console.error("WebSocket error:",l)}),x.addEventListener("close",l=>{_(this,null,function*(){yield c.localStorage.setItem("octy_ica",!1)})}))})}L.exports={createUpdateProfile:v,establishWebSocketConnection:tt}});var q=$(p=>{"use strict";C();var et=W(),f=O(),it=w();D(u=>_(p,[u],function*({analytics:c,browser:e,settings:a,init:l}){let s=l.data.customer,d=l.data.cart,g=(yield e.cookie.get("has_visited"))==="true";function y(){return _(this,null,function*(){return yield(yield fetch("https://pod1.sonity.net/octy-client-info/info")).json()})}let m=yield y();if(!g){let t=m.full_hash,i=new Date;i.setTime(i.getTime()+1*24*60*60*1e3);let o="expires="+i.toUTCString();yield e.cookie.set(`fingerprint_id=${t};`+o+";path=/");let r=null;s!==null&&(r=s.id);let n=!0;try{let h,T=yield e.localStorage.getItem("octy_customer_id");T!==null&&(n=!1,h=T.replace(/^"(.*)"$/,"$1"),it.isValidOctyCustomerID(h)||(h=null));let j=yield et.createUpdateProfile(h,t,r,a.accountID);yield e.localStorage.setItem("octy_customer_id",j);let A=Date.now();yield e.localStorage.setItem("p_lst",A)}catch(h){console.error(h),n&&(yield e.localStorage.removeItem("octy_customer_id"))}let k=new Date;k.setTime(k.getTime()+1*24*60*60*1e3);let Y="expires="+k.toUTCString();yield e.cookie.set("has_visited=true;"+Y+";path=/")}c.subscribe("checkout_started",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};console.log(n),fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("cart_viewed",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("checkout_address_info_submitted",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};console.log(n),fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("checkout_completed",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("checkout_contact_info_submitted",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};console.log(n),fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("checkout_shipping_info_submitted",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("collection_viewed",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("page_viewed",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("payment_info_submitted",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("product_added_to_cart",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("product_removed_from_cart",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("product_viewed",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("search_submitted",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,data:t.data,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("page_scroll",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,customData:t.customData,context:t.context,octy_customer_id:o,client_data:m,shopify_customer_info:s,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",headers:{"x-shopify-shop-domain":a.accountID},body:JSON.stringify(n),keepalive:!0})})),c.subscribe("product_hover",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,customData:t.customData,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",body:JSON.stringify(n),keepalive:!0})})),c.subscribe("product_quantity_changed",t=>_(p,null,function*(){let i=yield e.localStorage.getItem("octy_customer_id"),o=null;i!=null&&(o=i.replace(/^"(.*)"$/,"$1"));let r=yield e.cookie.get("fingerprint_id"),n={id:t.id,name:t.name,fingerprint_id:r,timestamp:t.timestamp,clientId:t.clientId,customData:t.customData,context:t.context,octy_customer_id:o,shopify_customer_info:s,client_data:m,cart:d};fetch(`${f.pixelURI}?shop=${a.accountID}`,{method:"POST",headers:{"x-shopify-shop-domain":a.accountID},body:JSON.stringify(n),keepalive:!0})}))}))});var It=F(q());})();
