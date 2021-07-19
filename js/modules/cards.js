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

    getDataCard("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({img, alt, title, descr, price}) => {
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