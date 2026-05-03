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

//Local storage

const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

document.addEventListener('DOMContentLoaded', () => {
    const savedNotes = JSON.parse(localStorage.getItem('myNotes')) || [];
    savedNotes.forEach(noteText => renderNote(noteText));
});

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const noteText = noteInput.value.trim();

    if (noteText) {
        renderNote(noteText);
        saveNote(noteText); 
        noteInput.value = '';
    }
});

function renderNote(text) {
    const li = document.createElement('li');
    li.style.background = "#262626";
    li.style.padding = "15px";
    li.style.marginBottom = "10px";
    li.style.borderRadius = "6px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    li.innerHTML = `
        <span>${text}</span>
        <i class="fa-solid fa-trash" style="cursor:pointer; color:#ff004f;"></i>
    `;

    li.querySelector('.fa-trash').addEventListener('click', () => {
        li.remove();
        removeNoteFromStorage(text);
    });

    notesList.appendChild(li);
}

function saveNote(text) {
    const notes = JSON.parse(localStorage.getItem('myNotes')) || [];
    notes.push(text);
    localStorage.setItem('myNotes', JSON.stringify(notes));
}

function removeNoteFromStorage(text) {
    let notes = JSON.parse(localStorage.getItem('myNotes')) || [];
    notes = notes.filter(note => note !== text);
    localStorage.setItem('myNotes', JSON.stringify(notes));
}

//BACKEND

const backendForm = document.getElementById('contact-form-backend');
const status = document.getElementById('form-status');

backendForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    try {
        const response = await fetch(e.target.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.innerHTML = "Dziękujemy! Wiadomość została zapisana na serwerze.";
            status.style.color = "#61b752";
            backendForm.reset();
        } else {
            status.innerHTML = "Ops! Wystąpił błąd przy wysyłce.";
            status.style.color = "#ff004f";
        }
    } catch (error) {
        status.innerHTML = "Błąd połączenia z serwerem.";
        status.style.color = "#ff004f";
    }
});