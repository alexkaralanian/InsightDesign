// Services
$(function(){
  // animate on scroll
  new WOW().init();
});

// WORK
$(function(){
  $("#work").magnificPopup({
    delegate: 'a',
    type: "image",
    gallery: {
      enabled: true
    }
  });
});

$(function(){
  $("#team-members").owlCarousel();
});

