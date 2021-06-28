"use strict";


window.addEventListener('DOMContentLoaded', () => {

    let tabs = document.querySelectorAll('.tabheader__item'),
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




    //TODO таймер 

    let deadline = '2021-07-20';

    function getTimeValue(endtime){
        const t = Date.parse(endtime) - Date.parse( new Date());

        let days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60))%24),
            minutes = Math.floor(t / (1000 * 60) %60),
            seconds = Math.floor((t / 1000) % 60);

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
    let startTimer = setInterval(getClock, 1000);

    // ----------------------------------------------------


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

    new CardModel(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        8,
        '.menu .container'
    ).createCard();

    new CardModel(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        16,
        '.menu .container'
    ).createCard();

    new CardModel(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        13,
        '.menu .container'
    ).createCard();

    
    // TODO form

    const forms = document.querySelectorAll('form');
    
    forms.forEach(item => {
        sendData(item);
    });

    function sendData(form){
        const massage = {
            loading: 'Загрузка',
            success: 'Успешно отправлено',
            fail: 'Ошибка при отправке данных'
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            const formData = new FormData(form);
            request.send(formData);

            request.addEventListener('load', ()=>{
                if(request.status === 200){
                    alert(massage.success);
                    form.reset();
                    console.log(request.response);
                }
                else{
                    alert(massage.fail);
                }
            });
        });
    }
});
