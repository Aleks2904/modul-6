$(document).ready(function () {
    /* маска для телфона */
    $("#request-call-block-label").mask("+7 - (999) - 999 - 99 - 99");

    /* закрытие модалок*/

    $(".js-button-close").on('click', function(){
        $(this).parents('.modal-all').find('.js-all-block').removeClass('active')
        $(this).parents('.modal-all').find('.js-all-block').addClass("no-active")
        enableScroll()
    });

    /* закрытие модалок при клике вне */

    $(document).mouseup(function (e){
        var div = $(".js-all-block");

        if(div.hasClass('active')){
            if (!div.is(e.target) && div.has(e.target).length === 0) { 
                div.removeClass('active')
                div.addClass("no-active")
                enableScroll()
            }
        }
    });

    /* оповещение о заказе звонка и отправка письма*/

    $("form").on('submit', function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "php/mail.php", //Change
			data: th.serialize()
		}).done(function() {

            enableScroll();

			$('body').find('.js-all-block').removeClass('active')
            $('body').parents('.modal-all').find('.js-all-block').addClass("no-active")

            $("#js-annunciation").addClass("active")
            $("#js-annunciation").removeClass('no-active')

            setTimeout (function(){
                $("#js-annunciation").removeClass("active")
                $("#js-annunciation").addClass('no-active')
            }, 3000);

			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
        });
        
		return false;
    });

    /* открытие модалок */
    
    $('.js-button-open-modal').on('click', function(){
        event.preventDefault();

        let button = $(this).data('role');
        let modal = '#js-' + button;

        disableScroll();
        $(modal).addClass("active");
        $(modal).removeClass('no-active');
    })

    /*рассчет стоймости*/

    $('#js-find-price-button').on('click',valuess);
        function valuess(e){
        e.preventDefault()
        const   page = '500',
                block = '200',
                sloider = '300';

        var buyPage = $('.find-price__page-input').val(),
            buyBlock = $('.find-price__block-input').val(),
            buySloider = $('.find-price__sloider-input').val();

        var resultPage = '0',
            resultBlock = '0',
            resultSloider = '0';
        
        if (buyPage > '0'){
            resultPage = buyPage
        } else {
            resultPage = '0'
        }

        if (buyBlock > '0'){
            resultBlock = buyBlock
        } else {
            resultBlock = '0'
        }

        if (buySloider > '0'){
            resultSloider = buySloider
        } else {
            resultSloider = '0'
        }

        const allResult = resultPage * page + resultBlock * block + resultSloider * sloider + " " + "Рублей";

        $('#js-find-price-prise').html(allResult);

        $('#js-find-price-prise').show();

        console.log(buyPage);

    };

    //кнопка возврата
 
    $(window).scroll(function() {
        if($(this).scrollTop() != 0){       
            $('#js-up').fadeIn(); 
        }else{
            $('#js-up').fadeOut();
        }  
    });
            
    $('#js-up').click(function() {    
        $('body,html').animate({scrollTop:0},800);
    });

    //скрол в меню

    $('#js-nav-header, #js-nav-footer').on("click","a", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });

    //скрол в модалке

    $('#js-find-price').on("click","a", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('#js-find-price').animate({scrollTop: top}, 1300);
    });

    //блок скрола при открытие модалок
           
   function disableScroll(){
        var scroll = $(window).scrollTop()
        $('body').data('pagePosition', scroll);
        $('body').addClass('overflow');
        $('body').css({'top': -scroll + 'px'});
    };

    function enableScroll(){
        var scroll = $('body').data('pagePosition');
        $('body').css({'top': 'auto'});
        $('body').removeClass('overflow');
        window.scroll({'top': scroll,
                    'left': '0'});
    };
});
