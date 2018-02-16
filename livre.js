/*
*   ** livre.js **
*   Script qui controle le comportement du livre dans la page questionnaire.html
*   
*/


function loadApp() {

    $('#canvas').fadeIn(1000);

    var flipbook = $('.magazine');

    // Check if the CSS was already loaded

    if (flipbook.width() == 0 || flipbook.height() == 0) {
        setTimeout(loadApp, 10);
        return;
    }

    // Create the flipbook

    flipbook.turn({

        // Magazine width

        width: 922,

        // Magazine height

        height: 600,

        // Duration in millisecond

        duration: 1000,

        // Hardware acceleration

        acceleration: !isChrome(),

        // Enables gradients

        gradients: true,

        // Auto center this flipbook

        autoCenter: true,

        // Elevation from the edge of the flipbook when turning a page

        elevation: 50,

        // The number of pages

        pages: 22,

        // Events

        when: {
            turning: function (event, page, view) {

                var book = $(this),
                    currentPage = book.turn('page'),
                    pages = book.turn('pages');

                // Update the current URI

                Hash.go('page/' + page).update();

                // Show and hide navigation buttons

                disableControls(page);

                console.log(">> loadApp() > flipbook.turn() > when: turning > page = " + page);
                console.log(">> loadApp() > flipbook.turn() > when: turning > currentPage = " + currentPage);


                $('.thumbnails .page-' + currentPage).
                    parent().
                    removeClass('current');

                $('.thumbnails .page-' + page).
                    parent().
                    addClass('current');

            },

            turned: function (event, page, view) {

                disableControls(page);

                console.log(">> loadApp() > flipbook.turn() > when: turned > page = " + page);

                $(this).turn('center');


                // ADDED CODE
                var oddPage = parseInt(page) + 1;
                oddPage = page == 1 ? 3 : parseInt(page) + 1;
                console.log("oddPage = " + oddPage);
                var question;

                switch (oddPage) {
                    case 3: question = 1;
                        break;
                    case 5: question = 2;
                        break;
                    case 7: question = 3;
                        break;
                    case 9: question = 4;
                        break;
                    case 11: question = 5;
                        break;
                    case 13: question = 6;
                        break;
                    case 15: question = 7;
                        break;
                    case 17: question = 8;
                        break;
                    case 19: question = 9;
                        break;
                    case 21: question = 10;
                        break;
                    case 23: question = 10;
                        break;
                }

                // Add textarea if it doesn't exist
                if (!$(".p" + oddPage).children().hasClass("text-field") && question != undefined) {
                    console.log('text-field doesnt exist yet');
                    $(".p" + oddPage).prepend(
                        "<label id='label-" + question + "' for='idQuestion" + question + "' hidden='hidden'>Question " + question + "</label>" +
                        "<textarea class='text-field show-field pos-abs' id='idQuestion" + question + "' name='question" + question + "' placeholder='Votre Réponse'></textarea>"
                    );
                    $("#idQuestion" + question).focus();
                } else {
                    console.log('text-field already exists');
                    $("#idQuestion" + question).focus();
                }
                if (oddPage == 23) {
                    console.log('Book end');
                    $(".book-btn-container").addClass("animate-to-visible")
                }
                if (question > 1) {
                    var answer = $("#idQuestion" + (question - 1)).val();
                    localStorage.setItem("question" + (question - 1), answer);
                    localStorage.setItem("question" + question, $("#idQuestion" + question).val());                    
                }


                console.log('question = ' + question);


                if (page == 1) {
                    $(this).turn('peel', 'br');
                }

            },

            missing: function (event, pages) {

                // Add pages that aren't in the magazine

                for (var i = 0; i < pages.length; i++)
                    addPage(pages[i], $(this));

            }
        }

    });

    // Zoom.js

    $('.magazine-viewport').zoom({
        flipbook: $('.magazine'),

        max: function () {

            return largeMagazineWidth() / $('.magazine').width();

        },

        when: {

            swipeLeft: function () {

                $(this).zoom('flipbook').turn('next');

            },

            swipeRight: function () {

                $(this).zoom('flipbook').turn('previous');

            },

            resize: function (event, scale, page, pageElement) {

                if (scale == 1)
                    loadSmallPage(page, pageElement);
                else
                    loadLargePage(page, pageElement);

            },

            zoomIn: function () {

                $('.thumbnails').hide();
                $('.made').hide();
                $('.magazine').removeClass('animated').addClass('zoom-in');
                $('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');

                if (!window.escTip && !$.isTouch) {
                    escTip = true;

                    $('<div />', { 'class': 'exit-message' }).
                        html('<div>Press ESC to exit</div>').
                        appendTo($('body')).
                        delay(2000).
                        animate({ opacity: 0 }, 500, function () {
                            $(this).remove();
                        });
                }
            },

            zoomOut: function () {

                $('.exit-message').hide();
                $('.thumbnails').fadeIn();
                $('.made').fadeIn();
                $('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');

                setTimeout(function () {
                    $('.magazine').addClass('animated').removeClass('zoom-in');
                    resizeViewport();
                }, 0);

            }
        }
    });

    // URIs - Format #/page/1 

    Hash.on('^page\/([0-9]*)$', {
        yep: function (path, parts) {
            var page = parts[1];

            if (page !== undefined) {
                if ($('.magazine').turn('is'))
                    $('.magazine').turn('page', page);
            }

        },
        nop: function (path) {

            if ($('.magazine').turn('is'))
                $('.magazine').turn('page', 1);
        }
    });


    $(window).resize(function () {
        resizeViewport();
    }).bind('orientationchange', function () {
        resizeViewport();
    });

    // Events for thumbnails

    $('.thumbnails').click(function (event) {

        var page;

        if (event.target && (page = /page-([0-9]+)/.exec($(event.target).attr('class')))) {

            $('.magazine').turn('page', page[1]);
        }
    });

    $('.thumbnails li').
        bind($.mouseEvents.over, function () {

            $(this).addClass('thumb-hover');

        }).bind($.mouseEvents.out, function () {

            $(this).removeClass('thumb-hover');

        });

    if ($.isTouch) {

        $('.thumbnails').
            addClass('thumbanils-touch').
            bind($.mouseEvents.move, function (event) {
                event.preventDefault();
            });

    } else {

        $('.thumbnails ul').mouseover(function () {

            $('.thumbnails').addClass('thumbnails-hover');

        }).mousedown(function () {

            return false;

        }).mouseout(function () {

            $('.thumbnails').removeClass('thumbnails-hover');

        });

    }

    // Events for the next button

    $('.next-button').bind($.mouseEvents.over, function () {

        $(this).addClass('next-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('next-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('next-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('next-button-down');

    }).click(function () {

        $('.magazine').turn('next');

    });

    // Events for the next button

    $('.previous-button').bind($.mouseEvents.over, function () {

        $(this).addClass('previous-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('previous-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('previous-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('previous-button-down');

    }).click(function () {

        $('.magazine').turn('previous');

    });


    resizeViewport();

    $('.magazine').addClass('animated');

}

$('#canvas').hide();


// Load the HTML4 version if there's not CSS transform

yepnope({
    test: Modernizr.csstransforms,
    yep: ['turnjs4/lib/turn.js'],
    nope: ['turnjs4/lib/turn.html4.min.js'],
    both: ['turnjs4/lib/zoom.min.js', 'js/magazine.js', 'css/magazine.css'],
    complete: loadApp
});
