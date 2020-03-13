
    /* маска для телфона */
    $("#request-call-block-label").mask("+7 - (999) - 999 - 99 - 99");

    /* закрытие окна*/

       $(".js-button-close").on('click', function(){
        $(this).parents('.modal-all').find('.js-all-block').removeClass('active')
        $(this).parents('.modal-all').find('.js-all-block').addClass("no-active")
    });

    /* заказать звонок */

    $("#js-dashboard-phone-bottom, #js-footer-phone-bottom").on('click',function(){
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

        let desiresPage = $('.find-price__page-input').val(),
            desiresBlock = $('.find-price__block-input').val(),
            desiresSloider = $('.find-price__sloider-input').val();

        let resultPage = '0',
            resultBlock = '0',
            resultSloider = '0';
        
        if (desiresPage > '0'){
            resultPage = desiresPage
        } else {
            resultPage = '0'
        }

        if (desiresBlock > '0'){
            resultBlock = desiresBlock
        } else {
            resultBlock = '0'
        }

        if (desiresSloider > '0'){
            resultSloider = desiresSloider
        } else {
            resultSloider = '0'
        }

        const allResult = resultPage * page + resultBlock * block + resultSloider * sloider;

        $('#js-find-price-prise').html(allResult)

        console.log(desiresPage);

    };
    /* заказать проект */

    $("#js-work-example-button").on('click',function(){
        $("#js-order-project").addClass("active")
        $("#js-order-project").removeClass('no-active')
    });
