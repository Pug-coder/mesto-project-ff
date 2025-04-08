(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-35",headers:{authorization:"f6cf2233-9853-45a5-a502-9e9e59d8c5ca","Content-Type":"application/json"}},t=function(){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))};function n(t,n){var r=t.target.closest(".places__item");(function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(n).then((function(){r.remove()})).catch((function(e){console.log("Ошибка при удалении карточки",e)}))}function r(t,n){var r=t.classList.contains("card__like-button_is-active"),o=t.closest(".card__like-container").querySelector(".card__like-count");r?function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(e){t.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log("Ошибка при удалении лайка:",e)})):function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(e){t.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){console.log("Ошибка при добавлении лайка:",e)}))}function o(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0);c.querySelector(".card__title").textContent=e.name;var a=c.querySelector(".card__image");a.src=e.link,a.alt=e.name,a.addEventListener("click",(function(){r(e.name,e.link)}));var u=c.querySelector(".card__delete-button"),i=c.querySelector(".card__like-button");return c.querySelector(".card__like-count").textContent=e.likes.length,i.addEventListener("click",(function(){n(i,e._id)})),e.owner._id===o||u.remove(),u.addEventListener("click",(function(n){t(n,e._id)})),c}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&a(t)}}function i(e){var t=e.target.classList.contains("popup"),n=e.target.classList.contains("popup__close");(t||n)&&a(e.currentTarget)}var s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function l(e,t,n){var r=e.querySelector(".popup__error_".concat(t.name));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function p(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s,n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),p(n,r,t)}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(e,t)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m=document.querySelector(".places__list"),v=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),h=document.querySelector(".popup__form"),S=h.querySelector(".popup__input_type_name"),b=h.querySelector(".popup__input_type_description"),q=document.querySelector(".profile__add-button"),g=document.querySelector(".popup_type_edit"),k=document.querySelector(".profile__edit-button"),C=document.querySelector(".popup_type_new-card"),E=C.querySelector(".popup__form"),L=E.querySelector(".popup__input_type_card-name"),j=E.querySelector(".popup__input_type_url"),x=document.querySelectorAll(".popup"),A=document.querySelector(".popup_type_image"),P=A.querySelector(".popup__image"),U=A.querySelector(".popup__caption"),T=null,w=document.querySelector(".profile__image"),O=document.querySelector(".popup_type_avatar"),B=O.querySelector(".popup__form"),D=B.querySelector(".popup__input_type_avatar-link");function I(e,t){P.src=t,P.alt=e,U.textContent=e,c(A)}function N(e){v.textContent=e.name,y.textContent=e.about,e.avatar&&(w.style.backgroundImage="url('".concat(e.avatar,"')"))}w.addEventListener("click",(function(){d(B),c(O)})),B.addEventListener("submit",(function(t){t.preventDefault();var n,r=B.querySelector(".popup__button"),o=r.textContent;r.textContent="Сохранение...",(n=D.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){w.style.backgroundImage="url('".concat(e.avatar,"')"),a(O),t.target.reset()})).catch((function(e){console.log("Ошибка при обновлении аватара:",e)})).finally((function(){r.textContent=o}))})),x.forEach((function(e){e.addEventListener("click",i)})),h.addEventListener("submit",(function(t){t.preventDefault();var n,r,o=h.querySelector(".popup__button"),c=o.textContent;o.textContent="Сохранение...",(n=S.value,r=b.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){N(e),a(g)})).catch((function(e){console.log("Ошибка при обновлении данных пользователя",e)})).finally((function(){o.textContent=c}))})),k.addEventListener("click",(function(){S.value=v.textContent,b.value=y.textContent,d(h),c(g)})),q.addEventListener("click",(function(){d(E),c(C)})),E.addEventListener("submit",(function(c){var u,i;c.preventDefault(),Promise.all([(u=L.value,i=j.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:u,link:i})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))),t()]).then((function(e){var t=f(e,2),u=t[0];N(t[1]);var i=o(u,n,r,I,T._id);m.prepend(i),c.target.reset(),a(C)})).catch((function(e){console.log("Ошибка при добавлении карточки",e)}))})),Promise.all([fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),t()]).then((function(e){var t=f(e,2),c=t[0],a=t[1];N(a),T=a,c.forEach((function(e){var t=o(e,n,r,I,a._id);m.append(t)}))})).catch((function(e){console.log("Ошибка при получении данных",e)})),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s;Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){"name"!==t.name&&"description"!==t.name||(!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(t.value)&&t.value.length>0?t.setCustomValidity("Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы"):t.setCustomValidity("")),t.validity.valid?l(e,t,n):function(e,t,n,r){var o=e.querySelector(".popup__error_".concat(t.name));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}()})();