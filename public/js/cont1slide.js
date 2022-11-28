const swiper = new Swiper('.slideWrap', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect: "fade",

    // If we need pagination
    pagination: {
        el: '.circleBtn',
        clickable:true
    },
    //자동 재생구간
    autoplay:{
        delay:3000,
        disableOnInteraction:false

    },

    // Navigation arrows
    navigation: {
        nextEl: '.nextBtn',
        prevEl: '.prevBtn',
    },

    });