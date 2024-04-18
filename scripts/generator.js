/**
 * Determines the appropriate logos for MySQL, MongoDB, MariaDB, ITLA, and freeCodeCamp based on the current theme.
 */
startMySql = localStorage.getItem("theme") === "dark_theme" ? "mysql-dark.png" : "mysql-light.png";
startItla = localStorage.getItem("theme") === "dark_theme" ? "itla-dark.png" : "itla-light.png";
startfree = localStorage.getItem("theme") === "dark_theme" ? "freecodecamp-dark.png" : "freecodecamp-light.png";

/**
 * Contains an array of skills with their respective logos and alternative text.
 */
const skills = [
    { name: "C#", logo: "csharp.png", alt: "C#" },
    { name: "C++", logo: "cpp.png", alt: "C++" },
    { name: "Python", logo: "python.png", alt: "Python" },
    { name: "HTML5", logo: "html5.png", alt: "HTML5" },
    { name: "CSS3", logo: "css3.png", alt: "CSS3" },
    { name: "JavaScript", logo: "javascript.png", alt: "JavaScript" },
    { name: "Bootstrap", logo: "bootstrap.png", alt: "Bootstrap" },
    { name: "MySQL", logo: startMySql, alt: "MySQL" },
    { name: "SQL Server", logo: "sqlserver.png", alt: "SQL Server" },
    { name: "PostgreSQL", logo: "postgresql.png", alt: "PostgreSQL" },
];

/**
 * Contains an array of tools with their respective logos and alternative text.
 */
const tools = [
    { name: "Git", logo: "git.png", alt: "Git" },
    { name: "VS Code", logo: "vscode.png", alt: "VS Code" },
    { name: "Photoshop", logo: "photoshop.png", alt: "Photoshop" },
    { name: "Command Line", logo: "command-line.png", alt: "Command Line" },
    { name: "Trello", logo: "trello.png", alt: "Trello" }
];

/**
 * Contains an array of educational institutions with their respective logos, names, and programs.
 */
const educations = [
    { logo: "uasd.png", institution: "UASD", programs: ["Diplomado en Ciberseguridad"] },
    { logo: "mescyt.png", institution: "MESCYT", programs: ["English Immersion Program"] },
    { logo: startItla, institution: "ITLA", programs: ["Ethical Hacking", "C#.Net Intermedio"] },
    { logo: "harvard.png", institution: "Harvard", programs: ["CS50's Introduction to Programming with Python", "CS50's Introduction to Databases with SQL"] },
    { logo: "cisco.png", institution: "CISCO", programs: ["Junior Cybersecurity Analyst Career Path", "Network Technician Career Path", "Python Essentials 1", "Python Essentials 2", "English For IT 1"] },
    { logo: "oracle-one.png", institution: "Oracle ONE", programs: ["Principiante en Programación G6 - ONE", "Lógica de programación con JavaScript"] },
    { logo: startfree, institution: "freeCodeCamp", programs: ["Responsive Web Design", "Foundational C#"] },
    { logo: "aprende.png", institution: "Aprende", programs: ["Diplomado Técnico en sistemas informáticos", "Diplomado Técnico instalador de red de acceso"] },
];

/**
 * Enables the theme toggle functionality.
 * Toggles between light and dark themes when the theme toggle button is clicked.
 * Updates the logos for skills and educations based on the current theme.
 */
const themeToggle = document.querySelector("[data-theme-btn]");
themeToggle.addEventListener("click", function () {
    // Checks if the light theme is active.
    lightTheme = themeToggle.classList.contains("active");
    // Array containing logo filenames for theme change.
    const logosChange = [
        "mysql-dark.png", "mongodb-dark.png", "mariadb-dark.png",
        "itla-dark.png", "freecodecamp-dark.png",
        "mysql-light.png", "mongodb-light.png", "mariadb-light.png",
        "itla-light.png", "freecodecamp-light.png"
    ];
    // Updates logos for skills based on the current theme.
    skills.forEach(skill => {
        if(logosChange.includes(skill.logo)) {
            const original = lightTheme ? skill.logo.replace("-dark", "-light") : skill.logo.replace("-light", "-dark");
            skill.logo = original;
            // Updates the logo image on the corresponding card.
            const cardIcon = document.querySelector(`[alt="${skill.alt}"]`);
            if(cardIcon)
                cardIcon.src = `assets/logos/${original}`;
        }
    });
    // Updates logos for educations based on the current theme.
    educations.forEach(education => {
        if (logosChange.includes(education.logo)) {
            const original = lightTheme ? education.logo.replace("-dark", "-light") : education.logo.replace("-light", "-dark");
            education.logo = original;
            // Updates the logo image on the corresponding card.
            const cardIcon = document.querySelector(`[alt="${education.institution}"]`);
            if (cardIcon)
                cardIcon.src = `assets/logos/${original}`;
        }
    });
});

// Selecting the skills list and tools list elements from the DOM.
const skillsList = document.querySelector(".skills-list");
const toolsList = document.querySelector(".tools-list");

/**
 * Represents a function to create a skill card element based on the provided skill data.
 * @param {Object} skill - The skill data containing name, logo, and alt attributes.
 * @returns {HTMLElement} - The generated skill card element.
 */
function createSkillCard(skill) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.className = "skill-card";
    div.innerHTML = `
        <div class="tooltip">${skill.name}</div>
        <div class="card-icon">
            <img src="assets/logos/${skill.logo}" alt="${skill.alt}">
        </div>
    `;
    li.appendChild(div);
    return li;
}

/**
 * Generates a skills list based on the provided data and appends it to the specified list element.
 * @param {Array} data - An array of skill objects containing name, logo, and alt attributes.
 * @param {HTMLElement} list - The HTML element where the generated skills list will be appended.
 */
function generateSkillsList(data, list) {
    data.forEach(skill => {
        const skillCard = createSkillCard(skill);
        list.appendChild(skillCard);
    });
}

// Generating and appending the skills list to the skills list element.
generateSkillsList(skills, skillsList);
// Generating and appending the tools list to the tools list element.
generateSkillsList(tools, toolsList);


// Selecting the education container element from the DOM
const educationsContainer = document.querySelector(".education-container");

/**
 * Generates and appends education details to the appropriate column in the education container.
 * @param {Array} educations - An array of education objects containing logo, institution, and programs attributes.
 */
educations.forEach((item, index) => {
    // Determine the column to which the education details will be appended based on the index.
    const column = index < 4 ? document.querySelector(".education-column:first-child") : document.querySelector(".education-column:last-child");
    // Create elements for the education details.
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const img = document.createElement("img");
    const title = document.createElement("span");
    const content = document.createElement("div");

    // Set attributes and content for the created elements.
    img.src = `assets/logos/${item.logo}`;
    img.alt = item.institution;
    title.className = "summary-title";
    title.textContent = item.institution;
    content.className = "details-content";

    // Generate program paragraphs and append them to the content div.
    item.programs.forEach((program) => {
        const p = document.createElement("p");
        p.textContent = `● ${program}`;
        content.appendChild(p);
    });

    // Append created elements to the details element.
    summary.appendChild(img);
    summary.appendChild(title);
    details.appendChild(summary);
    details.appendChild(content);
    // Append the details element to the appropriate column in the container.
    column.appendChild(details);
});

/**
 * Initializes accordion functionality for all 'details' elements on the page.
 * Creates an instance of the Accordion class for each 'details' element and assigns it to the 'accordion' property.
 */
document.querySelectorAll('details').forEach((el) => {
    const accordion = new Accordion(el);
    el.accordion = accordion;
});
