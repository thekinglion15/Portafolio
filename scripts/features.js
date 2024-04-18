'use strict'

/**
 * Toggles the "active" class of an element.
 * @param {HTMLElement} element - The element to toggle the class on.
 */
const elemToggleFunc = function(element) {
    element.classList.toggle("active");
}

/**
 * Handles scrolling behavior, adding/removing the "active" class based on scroll position.
 */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");
window.addEventListener("scroll", function() {
    if(window.scrollY >= 10) {
        header.classList.add("active");
        goTopBtn.classList.add("active");
    }
    else {
        header.classList.remove("active");
        goTopBtn.classList.remove("active");
    }
});

/**
 * Handles the toggle functionality for the navigation menu and its button.
 * Toggles the "active" class on the navigation button and the navigation bar when clicked.
 */
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll("[data-nav-link]");
navToggleBtn.addEventListener("click", function () {
    elemToggleFunc(navToggleBtn);
    elemToggleFunc(navbar);
});
navLinks.forEach(function(navLink) {
    navLink.addEventListener("click", function() {
        elemToggleFunc(navToggleBtn);
        elemToggleFunc(navbar);
    });
});

/**
 * Handles the toggle functionality for a set of toggle buttons and a skills box.
 * Toggles the "active" class on the toggle box, toggle buttons, and the skills box when a toggle button is clicked.
 */
const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");
for(let i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener("click", function() {
        elemToggleFunc(toggleBtnBox);
        for(let i = 0; i < toggleBtns.length; i++) {
            elemToggleFunc(toggleBtns[i]);
        }
        elemToggleFunc(skillsBox);
    });
}

/**
 * Handles the theme toggle functionality.
 * Toggles between light and dark themes when the theme toggle button is clicked.
 */
const themeToggleBtn = document.querySelector("[data-theme-btn]");
// Adds a click event listener to the theme toggle button.
themeToggleBtn.addEventListener("click", function() {
    elemToggleFunc(themeToggleBtn);
    if(themeToggleBtn.classList.contains("active")) {
        document.body.classList.remove("dark_theme");
        document.body.classList.add("light_theme");
        localStorage.setItem("theme", "light_theme");
        document.getElementById("logo-header").src = "assets/logos/logo1.png";
        document.getElementById("logo-footer").src = "assets/logos/logo1.png";
    }
    else {
        document.body.classList.remove("light_theme");
        document.body.classList.add("dark_theme");
        localStorage.setItem("theme", "dark_theme");
        document.getElementById("logo-header").src = "assets/logos/logo2.png";
        document.getElementById("logo-footer").src = "assets/logos/logo2.png";
    }
});
// Checks the stored theme preference in localStorage and applies it.
if(localStorage.getItem("theme") === "light_theme") {
    themeToggleBtn.classList.add("active");
    document.body.classList.add("light_theme");
    document.body.classList.remove("dark_theme");
    document.getElementById("logo-header").src = "assets/logos/logo1.png";
    document.getElementById("logo-footer").src = "assets/logos/logo1.png";
}
else {
    themeToggleBtn.classList.remove("active");
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");
    document.getElementById("logo-header").src = "assets/logos/logo2.png";
    document.getElementById("logo-footer").src = "assets/logos/logo2.png";
}

/**
 * Retrieves the current year and sets it as the content of an HTML element with the id "year".
 * Uses the Date object to get the current year.
 */ 
const today = new Date();
document.getElementById("year").innerHTML = today.getFullYear();


/**
 * Represents an accordion component that toggles content visibility.
 */
class Accordion {
    /**
     * Creates an instance of Accordion.
     * @param {HTMLElement} element - The root element of the accordion.
     */
    constructor(element) {
        this.element = element;
        this.summary = element.querySelector('summary');
        this.content = element.querySelector('.details-content');
        this.animation = null;
        this.isOpen = false;
        this.summary.addEventListener('click', (e) => this.onClick(e));
    }
    /**
     * Handles the click event on the summary element to toggle the accordion.
     * @param {Event} e - The click event.
     */
    onClick(e) {
        e.preventDefault();
        this.element.style.overflow = 'hidden';
        
        if (!this.isOpen)
            this.open();
        else
            this.shrink();
    }
    /**
     * Shrinks the accordion by animating its height.
     */
    shrink() {
        this.isOpen = false;
        const startHeight = `${this.element.offsetHeight}px`;
        const endHeight = `${this.summary.offsetHeight}px`;
        
        if (this.animation)
            this.animation.cancel();

        this.animation = this.element.animate({
            height: [startHeight, endHeight]
        }, {
            duration: 400,
            easing: 'ease-out'
        });
        this.animation.onfinish = () => {
            this.onAnimationFinish(false);
        };
        this.animation.oncancel = () => {
            this.isOpen = true;
        };
    }
    /**
     * Opens the accordion by expanding its height.
     */
    open() {
        document.querySelectorAll('details').forEach((detail) => {
            if (detail !== this.el && detail.open) {
                const accordion = detail.accordion;
                if (accordion)
                    accordion.shrink();
            }
        });

        this.isOpen = true;
        this.element.style.height = `${this.element.offsetHeight}px`;
        this.element.open = true;
        window.requestAnimationFrame(() => this.expand());
    }
    /**
     * Expands the accordion by animating its height.
     */
    expand() {
        const startHeight = `${this.element.offsetHeight}px`;
        const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
        
        if (this.animation)
            this.animation.cancel();

        this.animation = this.element.animate({
            height: [startHeight, endHeight]
        }, {
            duration: 350,
            easing: 'ease-out'
        });
        this.animation.onfinish = () => {
            this.onAnimationFinish(true);
        };
        this.animation.oncancel = () => {
            this.isOpen = false;
        };
    }
    /**
     * Handles cleanup and state after the animation finishes.
     * @param {boolean} open - Indicates if the accordion is open.
     */
    onAnimationFinish(open) {
        this.element.open = open;
        this.animation = null;
        this.element.style.height = this.element.style.overflow = '';
    }
}