function updateClock(){
    const clockElement = document.querySelector(".clock");
    const hoursElement = document.querySelector(".hours");
    const minuytesElement = document.querySelector(".minutes");
    const secondsElement = document.querySelector(".seconds");

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    hoursElement.textContent = hours;
    minuytesElement.textContent = minutes;
    secondsElement.textContent = seconds;


    // console.log(now, hours); 
}

setInterval(updateClock, 1000);
