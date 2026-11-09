
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



// ---------- Contact form with success message ----------

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formStatus.textContent = "Please wait...";
    formStatus.style.color = "blue";

    try {

        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                "Accept": "application/json"
            }
        });

        const result = await response.json();

        console.log("FormSubmit response:", result);

        if (response.ok &&
            (result.success === "true" || result.success === true)) {

            formStatus.textContent =
                "Thank you! Your message has been sent successfully.";

            formStatus.style.color = "green";

            contactForm.reset();

        } else {

            formStatus.textContent =
                result.message || "Message could not be sent. Please try again.";

            formStatus.style.color = "red";
        }

    } catch (error) {

        console.error("Contact form error:", error);

        formStatus.textContent =
            "Unable to send your message. Please check your connection.";

        formStatus.style.color = "red";

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Send Message →";
    }
});
