function checkValidation(page) {
    if (page == "index") {
        if (localStorage.getItem("isValidated") !== null) {
            location.replace("accueil.html");            
        }
    } else {
        if (localStorage.getItem("isValidated") === null) {
            location.replace("index.html");            
        }
    }
}

function ageVerification(validation) {
    if (validation == "ok") {
        localStorage.setItem("isValidated", validation);
        location.replace("accueil.html");
    } else {
        location.href = "https://google.fr";
    }
}

