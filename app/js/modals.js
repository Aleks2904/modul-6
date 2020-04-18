$(document).ready(function () {
    /* маска для телфона */
    $("#request-call-block-label").mask("+7 - (999) - 999 - 99 - 99");

    /* закрытие окна*/

       $(".js-button-close").on('click', function(){
        $(this).parents('.modal-all').find('.js-all-block').removeClass('active')
        $(this).parents('.modal-all').find('.js-all-block').addClass("no-active")
        $('body').removeClass('overflow')
    });

    $(document).mouseup(function (e){
        var div = $(".js-all-block");
        
        if (!div.is(e.target) && div.has(e.target).length === 0) { 
            $('.modal-all').find('.js-all-block').removeClass('active')
            $('.modal-all').find('.js-all-block').addClass("no-active")
            $('body').removeClass('overflow')
        }
    });

    /* оповещение о заказе звонка */

    $('#js-request-call-form').on('submit', annunciation)

    function annunciation(){
        event.preventDefault();

        $(this).parents('.modal-all').find('.js-all-block').removeClass('active')
        $(this).parents('.modal-all').find('.js-all-block').addClass("no-active")
        $('body').addClass('overflow')

        $("#js-annunciation").addClass("active")
        $("#js-annunciation").removeClass('no-active')

        console.log('123')

        setTimeout (function(){
            $("#js-annunciation").removeClass("active")
            $("#js-annunciation").addClass('no-active')
            $('body').removeClass('overflow')
        }, 3000)

        this.reset()
    }

    /* заказать звонок */

    $("#js-header-phone-bottom, #js-footer-phone-bottom").on('click',function(){
        $("#js-request-call-block").addClass("active")
        $("#js-request-call-block").removeClass('no-active')
        $('body').addClass('overflow')
    });

    /* узнать больше */

    $("#js-my-presentation-buttom").on('click',function(){
        $("#js-follow-up").addClass("active")
        $("#js-follow-up").removeClass('no-active')
        $('body').addClass('overflow')
    });

    /* узнать стоймость */

        /* открытие окна */

    $("#js-my-job-button").on('click',function(){
        $("#js-find-price").addClass("active")
        $("#js-find-price").removeClass('no-active')
        $('body').addClass('overflow')
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
        $("#js-order-project").addClass("active")
        $("#js-order-project").removeClass('no-active')
        $('body').addClass('overflow')
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
});
