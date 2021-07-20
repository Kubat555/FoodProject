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