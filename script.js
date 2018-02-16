/*
*   ** script.js **
*   Code JS qui gère les fonctionnalités du site 
*   - Verification si l'utilisateur est majeur 
*   - Gestion des classes qui lancent des transitions css avec JQuery
*   - Envoi de mail avec les réponses au questionnaire
*/


// ###########################
// AGE VERIFICATION SCRIPT 
// ###########################

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

// ############################
// OFFER VERIFICATION SCRIPT
// ############################

function storeChosenOffer(choice) {
    console.log(">> storeChosenOffer(" + choice + ")");
    localStorage.setItem("offer", choice);
    location.href = "questionnaire.html";
}

// ####################
// JQUERY ANIMATIONS 
// ####################

$(document).ready(function () {
    console.log("Document ready");
    $('.forfait-sm, .forfait-lg').hover(function () {
        console.log("forfait-sm element :hover");

        var hiddenContent = $(this).children('.show-on-hover');

        if (!hiddenContent.hasClass('animate-to-visible')) {
            hiddenContent.addClass('animate-to-visible');
        }

    }, function () {
        console.log("forfait-sm element :onmouseout");

        var shownContent = $(this).children('.show-on-hover');

        if (shownContent.hasClass('animate-to-visible')) {
            shownContent.removeClass('animate-to-visible');
        }
    });
});

// ################
// MAILING SCRIPT
// ################

function sendMail() {

    var offer = localStorage.getItem("offer");
    var question1 = localStorage.getItem("question1");
    var question2 = localStorage.getItem("question2");
    var question3 = localStorage.getItem("question3");
    var question4 = localStorage.getItem("question4");
    var question5 = localStorage.getItem("question5");
    var question6 = localStorage.getItem("question6");
    var question7 = localStorage.getItem("question7");
    var question8 = localStorage.getItem("question8");
    var question9 = localStorage.getItem("question9");
    var question10 = localStorage.getItem("question10");

    if ($.ajax({
        url: "https://formspree.io/lea.caulet5912@gmail.com",
        Allow: "GET, POST, HEAD",
        method: "POST",
        data: {
            message: "Nouveau Message à partir du site Pimp Your Death : \n \n" +
                "Formule choisie : " + offer + "\n" +
                "Réponse Question 1 : " + question1 + "\n" +
                "Réponse Question 2 : " + question2 + "\n" +
                "Réponse Question 3 : " + question3 + "\n" +
                "Réponse Question 4 : " + question4 + "\n" +
                "Réponse Question 5 : " + question5 + "\n" +
                "Réponse Question 6 : " + question6 + "\n" +
                "Réponse Question 7 : " + question7 + "\n" +
                "Réponse Question 8 : " + question8 + "\n" +
                "Réponse Question 9 : " + question9 + "\n" +
                "Réponse Question 10 : " + question10 + "\n"
        },
        dataType: "json"
    })) {
        console.log('sendMail() > OK');
        alert("Réponses envoyés !")
    } else {
        console.log('sendMail() > ERROR');
    }
}