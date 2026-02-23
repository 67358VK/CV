const tablinks = document.getElementsByClassName("tab_links");
const tabcontents = document.getElementsByClassName("tab_contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active_link");
    }
    for(tabcontent of tabcontents){
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

hardBtn.classList.add("active_btn");
hardList.classList.add("active");
softList.classList.remove("active");


softBtn.addEventListener("click", () =>{
    softBtn.classList.add("active_btn");
    hardBtn.classList.remove("active_btn");
    softList.classList.add("active");
    hardList.classList.remove("active");
    seeSoftBtn.style.display = "block";
    seeHardBtn.style.display = "none";
})

hardBtn.addEventListener("click", () =>{
    softBtn.classList.remove("active_btn");
    hardBtn.classList.add("active_btn");
    softList.classList.remove("active");
    hardList.classList.add("active");
    seeSoftBtn.style.display = "none";
    seeHardBtn.style.display = "block";
})

seeHardBtn.addEventListener("click", () =>{
    hardList.classList.toggle("expanded");
    seeHardBtn.textContent = hardList.classList.contains("expanded") ? "See less" : "See more";
})

seeSoftBtn.addEventListener("click", () =>{
    softList.classList.toggle("expanded");
    seeSoftBtn.textContent = softList.classList.contains("expanded") ? "See less" : "See more";
})

seeSoftBtn.style.display = "none";
