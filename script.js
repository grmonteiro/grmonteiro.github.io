/*
*   ** script.js **
*   Code JS qui gère les fonctionnalités du site 
*   - Verification si l'utilisateur est majeur 
*   - Gestion des classes qui lancent des transitions css avec JQuery
*   - Fonction fictive pour simuler l'envoi de mail avec les réponses au questionnaire
*
*   By Pimp Your Death
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
    localStorage.setItem("offer", choice);
    location.href = "questionnaire.html";
}

// ####################
// JQUERY ANIMATIONS 
// ####################

$(document).ready(function () {
    $('.forfait-sm, .forfait-lg').hover(function () {

        var hiddenContent = $(this).children('.show-on-hover');

        if (!hiddenContent.hasClass('animate-to-visible')) {
            hiddenContent.addClass('animate-to-visible');
        }

    }, function () {

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
        alert("Réponses envoyées !");
}