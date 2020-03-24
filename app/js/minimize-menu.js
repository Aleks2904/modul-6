$(document).ready(function(){
    const button_minimize_EL = $('.js-header__burger'),      
          minimize_menu_EL = $('.js-header__navigation-ul');

    button_minimize_EL.on('click', function(){
        event.preventDefault();

        minimize_menu_EL.slideToggle();

        if ($(this).attr('aria-expanded') == 'false'){
            $(this).attr('aria-expanded', 'true');
            $(this).attr('aria-label', 'свернуть меню');
            $('body').addClass('overflow');
        } else {
            $(this).attr('aria-expanded', 'false');
            $(this).attr('aria-label','развернуть меню');
            $('body').removeClass('overflow');
        }    
    });

    $(window).resize(function(){
        const width = $(window).width();

        if (width > '1919'){
            minimize_menu_EL.show()
        }else{
            minimize_menu_EL.hide()
        }   
    });
});