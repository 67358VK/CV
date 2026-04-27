const tablinks = document.getElementsByClassName("tab_links");
const tabcontents = document.getElementsByClassName("tab_contents");

function opentab(event, tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active_link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active_tab");
    }
    event.currentTarget.classList.add("active_link");
    document.getElementById(tabname).classList.add("active_tab");
}

const softBtn = document.getElementById("soft_skills");
const hardBtn = document.getElementById("hard_skills");
const softList = document.querySelector(".soft_skills_list");
const hardList = document.querySelector(".skills_list");
const seeHardBtn = document.getElementById("see_hard_btn");
const seeSoftBtn = document.getElementById("see_soft_btn");

softBtn.addEventListener("click", () => {
    softBtn.classList.add("active_btn");
    hardBtn.classList.remove("active_btn");
    softList.classList.add("active");
    hardList.classList.remove("active");
    seeSoftBtn.style.display = "block";
    seeHardBtn.style.display = "none";
});

hardBtn.addEventListener("click", () => {
    softBtn.classList.remove("active_btn");
    hardBtn.classList.add("active_btn");
    softList.classList.remove("active");
    hardList.classList.add("active");
    seeSoftBtn.style.display = "none";
    seeHardBtn.style.display = "block";
});

seeHardBtn.addEventListener("click", () => {
    hardList.classList.toggle("expanded");
    seeHardBtn.textContent = hardList.classList.contains("expanded") ? "See less" : "See more";
});

seeSoftBtn.addEventListener("click", () => {
    softList.classList.toggle("expanded");
    seeSoftBtn.textContent = softList.classList.contains("expanded") ? "See less" : "See more";
});

function changeTheme(themeName) {
    document.getElementById('theme-style').setAttribute('href', themeName);
}


async function loadData() {
        try{
            const skillsRes = await fetch('skills.json');
            const skillsData = await skillsRes.json();

            const hardContainer = document.querySelector('.skills_list');
            hardContainer.innerHTML = skillsData.hardSkills.map(skill => `
            <div>
                <h3>${skill.title}</h3>
                <p>${skill.desc}</p>
            </div>
            `).join('');

            const softContainer = document.querySelector('.soft_skills_list');
            softContainer.innerHTML = skillsData.softSkills.map(skill => `
            <div>
                <h3>${skill.title}</h3>
                <p>${skill.desc}</p>
            </div>
            `).join('');

            const workRes = await fetch('work.json');
            const workData = await workRes.json();

           const projectsContainer = document.querySelector('.work_list');
            projectsContainer.innerHTML = workData.projects.map(project => `
            <div class="work">
                <img src="${project.img}" alt="${project.title}">
                <div class="layer">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <a href="${project.link}" target="_blank">
                        <i class="fa-solid fa-link"></i>
                    </a>
                </div>
            </div>
        `).join('');

        } catch (error) {
            console.error('Błąd podczas ładowania danych:', error);
        } 
        
}

document.addEventListener('DOMContentLoaded', loadData);