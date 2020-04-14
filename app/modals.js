$(document).ready(function () {
    /* маска для телфона */
    $("#request-call-block-label").mask("+7 - (999) - 999 - 99 - 99");

    /* закрытие окна*/

    $(".js-button-close").on('click', function(){
        $(this).parents('.modal-all').find('.js-all-block').removeClass('active')
        $(this).parents('.modal-all').find('.js-all-block').addClass("no-active")
    });

    $(document).mouseup(function (e){
        var div = $(".js-all-block");
        
		if (!div.is(e.target) && div.has(e.target).length === 0) { 
            $(this).parents('.modal-all').find('.js-all-block').removeClass('active')
            $(this).parents('.modal-all').find('.js-all-block').addClass("no-active")

            console.log('123')
		}
	});

    /* оповещение о заказе звонка */

    $('#js-request-call').on('submit', annunciation)

    function annunciation(e){
        e.preventDefault()

        $(this).parents('.modal-all').find('.js-all-block').removeClass('active')
        $(this).parents('.modal-all').find('.js-all-block').addClass("no-active")

        $("#js-annunciation").addClass("active")
        $("#js-annunciation").removeClass('no-active')

        setTimeout (function(){
            $("#js-annunciation").removeClass("active")
            $("#js-annunciation").addClass('no-active')
        }, 5000)
    }

    /* заказать звонок */

    $("#js-header-phone-bottom, #js-footer-phone-bottom").on('click',function(){
        $("#js-request-call-block").addClass("active")
        $("#js-request-call-block").removeClass('no-active')
    });

    /* узнать больше */

    $("#js-my-presentation-buttom").on('click',function(){
        $("#js-follow-up").addClass("active")
        $("#js-follow-up").removeClass('no-active')
    });

    /* узнать стоймость */

        /* открытие окна */

    $("#js-my-job-button").on('click',function(){
        $("#js-find-price").addClass("active")
        $("#js-find-price").removeClass('no-active')
    });

        /*рассчет стоймости*/

    $('#js-find-price-button').on('click',valuess);


    function valuess(e){
        e.preventDefault()
        const   page = '500',
                block = '200',
                sloider = '300';

        let buyPage = $('.find-price__page-input').val(),
            buyBlock = $('.find-price__block-input').val(),
            buySloider = $('.find-price__sloider-input').val();

        let resultPage = '0',
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
    };
    /* заказать проект */

    $("#js-work-example-button").on('click',function(){
        $("#js-order-project").addClass("active")
        $("#js-order-project").removeClass('no-active')
    });
});
