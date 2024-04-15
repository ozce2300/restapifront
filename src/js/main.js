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
    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}
const url = "https://restapi-izio.onrender.com/cv/";

getData();

async function getData() {
    const response = await fetch(url);
    const data = await response.json();

    let mainEvent = document.getElementById("main-container");


    data.forEach(element => {
        const startDate = new Date(element.startdate).toISOString().split('T')[0];
        const endDate = new Date(element.enddate).toISOString().split('T')[0];

        mainEvent.innerHTML += ` <article id="articleId"><p> <strong>Företagsnamn: </strong>${element.companyname}<br> 
        <strong>Jobbtitel:</strong> ${element.jobtitle}<br> 
        <strong>   Plats: </strong>${element.location}<br>
        <strong>Startdatum:</strong> ${startDate}<br>
        <strong> Slutdatum:</strong> ${endDate} <br>
        <strong> Beskrivning av arbetet:</strong> <br>${element.description}<br> </p>
                                 </article>`;
    });
}

// Hämta formuläret
let form = document.querySelector('form');

// Lägg till eventlyssnare för submit
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Förhindra standardbeteende

    // Hämta data från formuläret
    let companyname = document.getElementById('companyname').value;
    let jobtitle = document.getElementById('jobtitle').value;
    let location = document.getElementById('location').value;
    let startDate = document.getElementById('startdate').value;
    let endDate = document.getElementById('enddate').value;
    let description = document.getElementById('description').value;


    // Skapa objekt med data
    let cv = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startDate: startDate,
        endDate: endDate,
        description: description
    };

    // Skicka data till backend
    console.log("cv-objektet:", cv);

    createCv(cv);

    console.log("startDate:", startDate);
console.log("endDate:", endDate);
});

async function createCv(cv) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cv)
    });

    const data = await response.json();
    console.log(data);
}
