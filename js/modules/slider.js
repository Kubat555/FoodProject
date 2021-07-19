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