$(function() {

/* --------------- STICKY NAV BAR --------------- */

  const nav = $('nav');
  const menu = $('.menu');
  let menuPos = menu.offset().top;

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > menuPos) {
      menu.addClass('sticky');
    } else {
      menu.removeClass('sticky');
    }
  });

  $(window).on('resize', function() {
    if (menu.hasClass('sticky')) {
      menuPos = menu.offset().top;
    } else {
      menuPos = nav.offset().top;
    }
  })

/* --------------- INFINITE SLIDER --------------- */

  function sliderAnimation() {

    var nextBtn = $('#nextPicture');
    var prevBtn = $('#prevPicture');
    var photos = $('.slider li');
    var firsPhoto = (photos).first().clone().appendTo('.slider ul');
    var lastPhoto = (photos).last().clone().prependTo('.slider ul');
    var photosAfterClone = $('.slider li');
    var photoIndex = 1;
    var photoWidth = 900;

    $('.slider').width(photoWidth);
    $('.slider ul').width(photoWidth * photosAfterClone.length);
    $('.slider ul').css('left', '-900px');

    nextBtn.on('click', function() {
      photoIndex += 1;
      $('.slider ul').animate({'left': `-${photoWidth * photoIndex}`}, 200, function() {
        if (photoIndex === photosAfterClone.length - 1) {
          $('.slider ul').css('left', '-900px');
          photoIndex = 1;
        }
      })
    });

    prevBtn.on('click', function() {
      photoIndex -= 1;
      $('.slider ul').animate({'left': `-${photoWidth * photoIndex}`}, 200, function() {
        if (photoIndex <= 0) {
          $('.slider ul').css('left', `-${photoWidth * (photosAfterClone.length-2)}px`);
          photoIndex = photosAfterClone.length-2;
        }
      });
    })
  }

  sliderAnimation();

/* --------------- ACCORDION --------------- */

  const questions = $('h1');
  const answers = $('p');

  questions.on('click', function(e){
    if($(e.currentTarget).next().css('display') === 'none') {
      $('.QA').find('p').slideUp();
      $(e.currentTarget).next().slideDown();
    } else {
      $(e.currentTarget).next().slideUp();
    }
  })

/* --------------- PARALLAX --------------- */

function parallaxEffect() {

    var scene = $('.scene');
    var elements = $('.element');
    var oldMousePositionX = 0;
    var oldMousePositionY = 0;


    elements.each(function(i, e) {
      $(e).css("z-index", $(e).data("z"));
      $(e).css("left", $(e).data("x"));
      $(e).css("top", $(e).data("y"));
    })


    scene.on('mouseenter', function(event) {
      oldMousePositionX = event.offsetX;
      oldMousePositionY = event.offsetY;
    })


    scene.on('mousemove', function(event) {
      var currentMousePositionX = event.offsetX;
      var currentMousePositionY = event.offsetY;

      elements.each(function(i,e) {
        var currentMousePositionX = $(e).css('left');
        var currentMousePositionY = $(e).css('top');
      })

      if ($(event.target).is('.element')) {
        currentMousePositionX += parseFloat($(event.target).css("left"));
        currentMousePositionY += parseFloat($(event.target).css("top"));
      }

      var mouseMoveX = currentMousePositionX - oldMousePositionX;
      var mouseMoveY = currentMousePositionY - oldMousePositionY;

      elements.each(function(i, e) {
        var left = $(e).data('x') + mouseMoveX * $(e).data("speed");
        var top = $(e).data('y') + mouseMoveY * $(e).data("speed");
        $(e).css("left", left);
        $(e).css("top", top);
      })
    })
  }

  parallaxEffect();


});
