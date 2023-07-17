const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
/* And use it like this:
    animateCSS('.my-element', 'bounce');

    animateCSS('.my-element', 'bounce').then((message) => {do something});
 */

/*
 * Intro section
spaghetti animation code
 */
animateCSS('#intro_btn', 'fadeInUpBig')
$(document).scroll(function () {
    if($(window).scrollTop() <= 100 && ($('#intro_btn').css('display') == 'none')){
        $.when($('#intro_btn').show()).done(function(){
            animateCSS('#intro_btn', 'fadeInUpBig')
        })
    }
    else if($(window).scrollTop() > 100 && !($('#intro_btn').css('display') == 'none')){
        animateCSS('#intro_btn', 'fadeOutUpBig').then((message) => {
            $('#intro_btn').hide()
            if($(window).scrollTop() <= 100){
                $('#intro_btn').show()
                animateCSS('#intro_btn', 'fadeInUpBig')
            }
        });
        
    }
});

/*
 * scroll to top btn
 */

$(document).ready(function() {
    //enables popover on keycode input
    $('[data-bs-toggle="popover"]').popover();

    //tooltip
    $('#toTopBtn[data-bs-toggle="tooltip"]').tooltip();

    //animate.css
    $(window).scroll(function() {
      if ($(this).scrollTop() > 20) {
        $('#toTopBtn')
          .removeClass("animate__animated animate__backOutDown")
          .delay("250")
          .addClass("animate__animated animate__backInUp")
          .show();
      } else {
        $('.tooltip').hide()
        $('#toTopBtn')
          .removeClass("animate__animated animate__backInUp")
          .delay("250")
          .addClass("animate__animated animate__backOutDown")
          .one('animationend', function(){
            if (!$(this).hasClass("animate__backInUp") && $(this).hasClass("animate__backOutDown"))
              $(this).hide()
            

          });
        ;
      }
    });

    $('#toTopBtn').click(function() {
      $("html, body").animate({
        scrollTop: 0
      }, 1);
      return false;
    });
  });