"use strict"

// Hämta in meny-knapparna
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

//eventlyssnare
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

//Toggla fram navigeringsmenyn
function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    //hämtar in css för menyn
    let style = window.getComputedStyle(navMenuEl);

    //koll om navigering är synlig eller ej, ändrar display block/none
    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

async function getData() {
    const url = "https://restapi-izio.onrender.com/cv/";
    const response = await fetch(url);
    const data = await response.json();

    let mainEvent = document.getElementById("main-container");
    
    data.forEach(element => {
        const startDate = new Date(element.startdate).toISOString().split('T')[0];
        const endDate = new Date(element.enddate).toISOString().split('T')[0];
        
        mainEvent.innerHTML += ` ${element.companyname}<br> 
                                 ${element.jobtitle}<br> 
                                 ${element.location}<br>
                                 ${element.description}<br> 
                                 Startdatum: ${startDate}<br>
                                 Slutdatum: ${endDate} <br>`;
    });
}

getData();
