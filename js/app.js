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

  const questions = $('h3');
  const answers = $('p');

  questions.on('click', function(e){
    if($(e.currentTarget).next().css('display') === 'none') {
      $('.QA').find('p').slideUp();
      $(e.currentTarget).next().slideDown();
    } else {
      $(e.currentTarget).next().slideUp();
    }
  })

/* --------------- SIMPLE TABS --------------- */

  const tabs = $('.tabs').find('li');
  const text = $('.tabs').find('div');

  tabs.each(function(i) {
    $(this).on('click', function() {
      if (text.eq(i).css('display') === 'none') {
        text.eq(i).slideDown();
      } else {
        text.eq(i).slideUp();
      }
    })
  })

/* --------------- PARALLAX --------------- */

function parallaxEffect() {

    var scene = $('.scene');
    var elements = $('.element');
    var oldMousePositionX = 0;
    var oldMousePositionY = 0;

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      scene.css('display', 'none');
    }


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

/* --------------- CONTACT FORM --------------- */

function formHandler() {

    var form = $('#contactForm');
    var name = $('#nameInput');
    var email = $('#emailInput');
    var message = $('#messageInput');
    var error = $('.error');

    form.on('submit', function(e) {

      var nameInputValue = name.val();
      var emailInputValue = email.val();
      var messageInputValue = message.val();

      var errorArr = [];

      function validateEmail(emailInputValue) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email.val());
      }

      if (validateEmail() === false) {
        //e.preventDefault();
        errorArr.push('Email musi posiadać znak @ oraz .');
        email.addClass('marked');
      } else {
        email.removeClass('marked');
      }

      if (nameInputValue.length <= 5) {
        //e.preventDefault();
        errorArr.push('Twoje imię musi być dłuższe niż 5 liter.');
        name.addClass('marked');
      } else {
        name.removeClass('marked');
      }

      if (messageInputValue.length <= 10) {
        //e.preventDefault();
        errorArr.push('Wiadomośc musi mieć więcej niż 10 znaków.');
        message.addClass('marked');
      } else {
        message.removeClass('marked');
      }

      if (errorArr.length > 0) {
        e.preventDefault();
        error.text(errorArr.join('\n'));
      } else {
        error.text('Nie popędzaj - robim co możem...');
      }
    })
  }

  formHandler();


});
