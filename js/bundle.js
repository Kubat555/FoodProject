/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
     //TODO calculator 


     const calcBtn = document.querySelectorAll(".calculating__choose-item"),
     genders = document.querySelectorAll(".gender"),
     activityBtns = document.querySelectorAll(".activity"),
     totalResult = document.querySelector("#result");

    let gender = "female",
    activity = 1.375,
    height, weight, age;

    

    function removeClass (arr){
    arr.forEach(item => {
        if(item.classList.contains("calculating__choose-item_active")){
            item.classList.remove("calculating__choose-item_active");
        }
    });
    }

    calcBtn.forEach(item => {
    if(item.classList.contains("input_person_data")){
        item.addEventListener("input", () => {
            if(isNaN(+item.value)){
                item.style.border = "2px solid red";
            }else{
                item.style.border = "none";
            }
            if(item.id == "height"){
                height = item.value;
            }
            else if(item.id == "weight"){
                weight = item.value;
            }
            else if(item.id == "age"){
                age = item.value;
            }
            calcResult();
        });
    }
    else{
        item.addEventListener('click', () => {
            if(item.classList.contains("gender")){
                gender = item.id;
                console.log(gender);
                removeClass(genders);
                item.classList.add("calculating__choose-item_active");
            }
            else if(item.classList.contains("activity")){
                activity = +item.id;
                console.log(activity);
                removeClass(activityBtns);
                item.classList.add("calculating__choose-item_active");
            }
            calcResult();
        });
    }
    });

    function calcResult () {
    if(!height || !weight || !age){
        totalResult.innerHTML = "----";
    }
    else{
        if(gender === "male"){
            totalResult.innerHTML = Math.round((88.36 + (13,4 * weight) + (4,8 * height) - (5,7 * age)) * activity);
        }
        else{
            totalResult.innerHTML = Math.round((447.6 + (9,2 * weight) + (3,1  * height) - (4,3 * age)) * activity);
        }
    }
    }
    calcResult();
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards () {
    // создаем карточки услуг, товаров

    class CardModel {
        constructor(src, alt, title, descr, price, parentSelector){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 80;
            this.parent = document.querySelector(parentSelector);
            this.transPrice();
        }

        transPrice(){
            this.price *= this.transfer;
        }

        createCard(){
            let div = document.createElement('div');
            div.innerHTML = `<div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> сом/день</div>
                    </div>
                </div>`;
            this.parent.append(div);
        }
    }

    const getDataCard = async(url) => {
        const res =  await fetch(url);

        if(!res.ok){
            new Error(`Error status ${res.status}`);
        }

        return await res.json();
    };

    // getDataCard("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach(({img, alt, title, descr, price}) => {
    //             new CardModel(img, alt, title, descr, price, ".menu .container").createCard();
    //         });
    //     });
    getDataCard("../db.json")
        .then(data => {
            data.menu.forEach(({img, alt, title, descr, price}) => {
                new CardModel(img, alt, title, descr, price, ".menu .container").createCard();
            });
        });

    // axios.get("http://localhost:3000/menu")
    //     .then(cardData => {
    //         cardData.data.forEach(({img, alt, title, descr, price}) => {
    //             new CardModel(img, alt, title, descr, price, ".menu .container").createCard();
    //             });
    //         });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function form() {
     // TODO form

     const forms = document.querySelectorAll('form');
    
     forms.forEach(item => {
         sendData(item);
     });
 
     const postData = async (url, data) => {
         const res = await fetch(url, {
             method: "POST",
             headers: {
                 'Content-type': 'application/json' 
             },
             body: data
         });
 
         return await res.json();
     };
 
     function sendData(form){
         const massage = {
             loading: "Загрузка",
             success: "Успешно отправлено",
             fail: "Ошибка при отправке данных"
         };
 
         form.addEventListener("submit", (e) => {
             e.preventDefault();
 
             const formData = new FormData(form);
             
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
 
             postData('http://localhost:3000/requests', json)
                 .then(data => {
                     console.log(massage.success);
                     form.reset();
                     console.log(data)
                 })
                 .catch(() => console.log(massage.fail));
         });
     }
 
}

module.exports = form;

/***/ }),

/***/ "./js/modules/modalScreen.js":
/*!***********************************!*\
  !*** ./js/modules/modalScreen.js ***!
  \***********************************/
/***/ ((module) => {

function modalScreen () {
     // Todo модальное окно

     let openModalBtn = document.querySelectorAll('[data-modal]'),
     closeModalBtn = document.querySelector('[data-close]'),
     modal = document.querySelector('.modal');
 
 
     function openModal(){
     modal.style.display = 'block';
     document.body.style.overflow = 'hidden';
     // clearInterval(openModalAfterTime);
     }
 
     function closeModal(){
     modal.style.display = 'none';
     document.body.style.overflow = '';
     }
 
 
 
     openModalBtn.forEach(item => {
     item.addEventListener('click', openModal);
     });
 
     closeModalBtn.addEventListener('click', closeModal);
 
     modal.addEventListener('click', (e) => {
     if(e.target == modal){
         closeModal();
     }
     });
 
 
     // let openModalAfterTime = setTimeout(openModal, 10000);
 
     function openModalAfterScroll (){
         if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
             openModal();
             window.removeEventListener('scroll', openModalAfterScroll);
         }
     }
 
     window.addEventListener('scroll', openModalAfterScroll);
 
 
}

module.exports = modalScreen;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){
    // TODO slider

    const slides = document.querySelectorAll(".offer__slide"),
          prev = document.querySelector(".offer__slider-prev"),
          next = document.querySelector(".offer__slider-next"),
          slideNum = document.querySelector("#current"),
          total = document.querySelector("#total");

    let slideIndex = 1;
    total.innerHTML = getZero(slides.length);

    function getZero(num){
        if(num >= 0 && num < 10){
            return '0' + num;
        }
        else{
            return num;
        }
    }

    function showSlide(n){
        if(n > slides.length){
            slideIndex = 1;
        }
        else if(n < 1){
            slideIndex = slides.length;
        }

        slides.forEach(item => {
            item.style.display = "none";
        });

        slides[slideIndex - 1].style.display = "block";
    }
    
    showSlide(slideIndex);

    function plusIndex(n){
        showSlide(slideIndex += n);
        slideNum.innerHTML = getZero(slideIndex);
    }

    prev.addEventListener("click", () => {
        plusIndex(-1);
    });
    next.addEventListener("click", () => {
        plusIndex(1);
    });

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    //TODO таймер 

    let deadline = '2022-07-20';

    function getTimeValue(endtime){
        const t = Date.parse(endtime) - Date.parse( new Date());
        let days, hours, minutes, seconds;
        if(t <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        else{
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60))%24);
            minutes = Math.floor(t / (1000 * 60) %60);
            seconds = Math.floor((t / 1000) % 60);
        }
        
        return {
            'total': t,
            'days' : days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return '0' + num;
        }
        else{
            return num;
        }
    }

    let startTimer = setInterval(getClock, 1000);

    function getClock(){
        let t = getTimeValue(deadline);

        let days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds');
        
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if(t.total < 0){
            clearInterval(startTimer);
        }
    }
    getClock();
    
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/



window.addEventListener('DOMContentLoaded', () => {

    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modalScreen */ "./js/modules/modalScreen.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map