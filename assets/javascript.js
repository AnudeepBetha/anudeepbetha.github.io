var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
var sidemenu = document.getElementById("sidemenu");


function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

function expandImage(project) {
    // Remove "expanded" class from all projects
    var allProjects = document.querySelectorAll('.project');
    allProjects.forEach(function (p) {
        p.classList.remove('expanded');
    });

    // Add "expanded" class to the clicked project
    project.classList.add('sexpanded');
}

function openmenu(){
    sidemenu.style.right = "0";
}

function closemenu(){
    sidemenu.style.right = "-200px";
}

let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop && currentScrollTop > 200) {
        // If scrolling down and past 200px, hide navbar
        document.getElementById("nav-bar").style.top = "-15vh";  // Assumes navbar height is 15vh
    } else {
        // If scrolling up, show navbar
        document.getElementById("nav-bar").style.top = "0";
    }
    lastScrollTop = currentScrollTop;
}, false);

document.querySelector("#contact form").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    fetch(e.target.action, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("overlay").style.display = "block";
            e.target.reset();
        } else {
            return response.json().then(error => { throw new Error(error.message); });
        }
    })
    .catch(error => {
        alert("There was an error sending the message: " + error.message);
    });
});

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
}

