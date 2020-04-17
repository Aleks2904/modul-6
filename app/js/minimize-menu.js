$(document).ready(function(){
    const button_minimize_EL = $('.js-header__burger'),      
          minimize_menu_EL = $('.js-header__navigation-ul'),
          itme_menu_EL = $('.js-menu-scroll');

    button_minimize_EL.on('click', function(){
        event.preventDefault();

        minimize_menu_EL.slideToggle();

        if ($(this).attr('aria-expanded') == 'false'){
            $(this).attr('aria-expanded', 'true');
            $(this).attr('aria-label', 'свернуть меню');
            $('body, html').addClass('overflow');
        } else {
            $(this).attr('aria-expanded', 'false');
            $(this).attr('aria-label','развернуть меню');
            $('body, html').removeClass('overflow');
        }    
    });

    itme_menu_EL.on('click', function(){
        const width = $(window).width();

        if (width <= '1200'){
            minimize_menu_EL.hide();
            $(this).attr('aria-expanded', 'false');
            $(this).attr('aria-label','развернуть меню');
            $('body, html').removeClass('overflow');
        }
    })

    $(window).resize(function(){
        const width = $(window).width();

        if (width >= '1200'){
            minimize_menu_EL.show()
        }else{
            minimize_menu_EL.hide()
        }   
    });
});