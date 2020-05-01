$(document).ready(function () {
    /* маска для телфона */
    $("#request-call-block-label").mask("+7 - (999) - 999 - 99 - 99");

    /* закрытие окна*/

    $(".js-button-close").on('click', function(){
        $(this).parents('.modal-all').find('.js-all-block').removeClass('active')
        $(this).parents('.modal-all').find('.js-all-block').addClass("no-active")
        enableScroll()
    });

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

    /* оповещение о заказе звонка */

    $('#js-request-call-form').on('submit', annunciation)

    function annunciation(){
        event.preventDefault();

        mainPull();

        $(this).parents('.modal-all').find('.js-all-block').removeClass('active')
        $(this).parents('.modal-all').find('.js-all-block').addClass("no-active")
        enableScroll();

        $("#js-annunciation").addClass("active")
        $("#js-annunciation").removeClass('no-active')

        setTimeout (function(){
            $("#js-annunciation").removeClass("active")
            $("#js-annunciation").addClass('no-active')
             enableScroll()
        }, 3000);
    
        this.reset();
    };

    /* отправка письма */
    
	$('form').each(function () {
        $(this).validate({
            submitHandler(form) {
                let th = $(form);

                $.ajax({
                    type: 'POST',
                    url: 'mail.php',
                    data: th.serialize()
                })
            }
        })
    })

    /* заказать звонок */

    $("#js-header-phone-bottom, #js-footer-phone-bottom").on('click',function(){
        disableScroll();
        $("#js-request-call-block").addClass("active")
        $("#js-request-call-block").removeClass('no-active')
    });

    /* узнать больше */

    $("#js-my-presentation-buttom").on('click',function(){
        event.preventDefault();
        disableScroll();
        $("#js-follow-up").addClass("active")
        $("#js-follow-up").removeClass('no-active')
    });

    /* узнать стоймость */

        /* открытие окна */

    $("#js-my-job-button").on('click',function(){
        $("#js-find-price").addClass("active")
        $("#js-find-price").removeClass('no-active')
        disableScroll();
    });

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
    /* заказать проект */

    $("#js-work-example-button").on('click',function(){
        disableScroll();
        $("#js-order-project").addClass("active")
        $("#js-order-project").removeClass('no-active')
    });


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
            /*

                //вариант с локал стореж

            function disableScroll(){
                localStorage.setItem('pagePosition', window.scrollY);

                var scroll = localStorage.getItem('pagePosition');
                $('body').addClass('overflow');
                $('body').css({'top': -scroll + 'px'});
            };

            function enableScroll(){
                var scroll = localStorage.getItem('pagePosition');
                $('body').css({'top': 'auto'});
                $('body').removeClass('overflow');
                window.scroll({'top': scroll,
                            'left': '0'});
            };
            */
           
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
