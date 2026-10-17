/* =====================================================
   VAMSIDHAR REDDY PORTFOLIO
   JAVASCRIPT
===================================================== */


/* ================= PRELOADER ================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* CLOSE MOBILE MENU */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* ================= TYPING EFFECT ================= */

const typingText = document.getElementById("typingText");

const words = [
    "Entrepreneur",
    "Founder",
    "Digital Creator",
    "Business Builder",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    const speed = deleting ? 55 : 95;

    setTimeout(typeEffect, speed);

}

typeEffect();


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= COUNTERS ================= */

const counters =
    document.querySelectorAll(".counter");

let counterStarted = false;

function animateCounter(element) {

    const target =
        Number(element.getAttribute("data-target"));

    let current = 0;

    const duration = 1500;

    const increment =
        target / (duration / 16);

    function update() {

        current += increment;

        if (current < target) {

            element.textContent =
                Math.floor(current);

            requestAnimationFrame(update);

        } else {

            element.textContent = target;

        }

    }

    update();

}


const statsSection =
    document.querySelector(".stats-section");


const counterObserver =
    new IntersectionObserver(
        entries => {

            if (
                entries[0].isIntersecting &&
                !counterStarted
            ) {

                counterStarted = true;

                counters.forEach(counter => {

                    animateCounter(counter);

                });

            }

        },
        {
            threshold: 0.3
        }
    );


counterObserver.observe(statsSection);


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    const recipient =
        "nanivamsi10@gmail.com";


    const emailSubject =
        encodeURIComponent(
            subject || "Portfolio Contact"
        );


    const emailBody =
        encodeURIComponent(
`Hello Vamsidhar,

Name: ${name}
Email: ${email}

Message:

${message}

Sent from your portfolio website.`
        );


    const mailto =
        `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;


    window.location.href = mailto;

});


/* ================= LEAFLET MAP ================= */

const mapElement =
    document.getElementById("map");


if (mapElement && typeof L !== "undefined") {

    /*
       Kadapa coordinates
       Approximate center:
       Latitude: 14.4673
       Longitude: 78.8242
    */

    const map = L.map("map", {

        scrollWheelZoom: false,

        zoomControl: true

    }).setView(
        [14.4673, 78.8242],
        12
    );


    /* MAP TILES */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(map);


    /* CUSTOM MARKER */

    const markerIcon =
        L.divIcon({

            className: "custom-map-marker",

            html: `
                <div style="
                    width:42px;
                    height:42px;
                    border-radius:50%;
                    background:#c8ff00;
                    color:#000;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    border:4px solid #111;
                    box-shadow:0 0 25px rgba(200,255,0,0.5);
                    font-size:17px;
                ">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
            `,

            iconSize: [42,42],

            iconAnchor: [21,42]

        });


    const marker =
        L.marker(
            [14.4673, 78.8242],
            {
                icon: markerIcon
            }
        ).addTo(map);


    marker.bindPopup(`
        <div style="
            font-family:Arial,sans-serif;
            min-width:160px;
        ">
            <strong style="
                font-size:15px;
            ">
                Vamsidhar Reddy
            </strong>

            <br>

            <span style="
                color:#666;
                font-size:12px;
            ">
                Kadapa, Andhra Pradesh
            </span>
        </div>
    `);


    marker.openPopup();

}


/* ================= BACK TO TOP ================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ================= CURRENT YEAR ================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* ================= CURSOR ================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorOutline =
    document.querySelector(".cursor-outline");


let mouseX = 0;
let mouseY = 0;

let outlineX = 0;
let outlineY = 0;


document.addEventListener("mousemove", event => {

    mouseX = event.clientX;

    mouseY = event.clientY;

    cursorDot.style.left =
        `${mouseX}px`;

    cursorDot.style.top =
        `${mouseY}px`;

});


function animateCursor() {

    outlineX +=
        (mouseX - outlineX) * 0.15;

    outlineY +=
        (mouseY - outlineY) * 0.15;


    cursorOutline.style.left =
        `${outlineX}px`;

    cursorOutline.style.top =
        `${outlineY}px`;


    requestAnimationFrame(animateCursor);

}

animateCursor();


/* ================= CURSOR HOVER ================= */

const interactiveElements =
    document.querySelectorAll(
        "a, button, input, textarea, .project-card, .service-card"
    );


interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        cursorOutline.classList.add("hover");

    });


    element.addEventListener("mouseleave", () => {

        cursorOutline.classList.remove("hover");

    });

});


/* ================= PARALLAX HERO ================= */

const heroVisual =
    document.querySelector(".hero-visual");


document.addEventListener("mousemove", event => {

    if (
        window.innerWidth > 900 &&
        heroVisual
    ) {

        const x =
            (window.innerWidth / 2 - event.clientX) / 80;

        const y =
            (window.innerHeight / 2 - event.clientY) / 80;


        heroVisual.style.transform =
            `translate(${x}px, ${y}px)`;

    }

});


/* ================= IMAGE ERROR HANDLING ================= */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", function() {

        this.style.background =
            "linear-gradient(135deg,#161616,#050505)";

        this.style.minHeight = "200px";

    });

});


/* ================= CONSOLE ================= */

console.log(
`
====================================
 VAMSIDHAR REDDY PORTFOLIO
 Founder • Entrepreneur • Digital Creator
====================================
`
);