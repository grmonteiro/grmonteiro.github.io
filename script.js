/*
*   ** script.js **
*   
*
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


