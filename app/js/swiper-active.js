$(document).ready(function () {
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      updateOnWindowResize: true,

      spaceBetween: 30,

      slidesPerView: 1,

      breakpoints:{
        320:{
          slidesPerView: 1,
        },

        769:{
          slidesPerView: 2,
        },

        1200:{
          slidesPerView: 3,
        }
      }

    })
});