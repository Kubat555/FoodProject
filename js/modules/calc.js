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