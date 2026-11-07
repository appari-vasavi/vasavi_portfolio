
// ---------- Mobile navigation ----------

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// ---------- Dark and light theme ----------

const themeToggle = document.getElementById("theme-toggle");

try {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.textContent = "☾";
    }
} catch (error) {
    console.log("Theme preference could not be loaded.");
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "☾" : "☀";

    try {
        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );
    } catch (error) {
        console.log("Theme preference could not be saved.");
    }
});


// ---------- Typing animation ----------

const typingText = document.getElementById("typing-text");

const words = [
    "Aspiring Web Developer",
    "Creative Problem Solver",
    "Quick Learner"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentWord.substring(0, characterIndex);

    let delay = deleting ? 55 : 100;

    if (!deleting && characterIndex === currentWord.length) {
        deleting = true;
        delay = 1200;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


// ---------- Scroll reveal animation ----------

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .detail-item, " +
    ".skill-card, .project-card, .contact-info, .contact-form"
);

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// ---------- Automatic footer year ----------

document.getElementById("year").textContent =
    new Date().getFullYear();


// ---------- Contact form ----------

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Replace this with your actual email address.
const myEmail = "vasaviappar@gmail.com";

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("visitor-name").value.trim();
    const email = document.getElementById("visitor-email").value.trim();
    const message = document.getElementById("visitor-message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all the fields.";
        return;
    }

    const subject = encodeURIComponent("Portfolio enquiry from " + name);

    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    const mailLink =
        "mailto:" + myEmail +
        "?subject=" + subject +
        "&body=" + body;

    formStatus.textContent =
        "Opening your email application. Please send the prepared message.";

    window.location.href = mailLink;
});
