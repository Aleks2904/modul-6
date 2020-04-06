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

        1024:{
          slidesPerView: 2,
        },

        1500:{
          slidesPerView: 3,
        },

        1920:{
          slidesPerView: 3,
        }
      }

    })
});