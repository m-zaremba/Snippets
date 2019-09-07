$(window).on("load", function() {

  var parallaxScene = $('.scene');
  var galleryFiltBottom = $('.mobile-bottom');
  var mobileInfo = $('.parallax');
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    parallaxScene.css('display', 'none');
    galleryFiltBottom.css('display', 'none');
    mobileInfo.css('backgroundColor', 'black');
  }

  /* --------------- STICKY SECTION --------------- */

  const stickyBar = $('.menu');
  const resize = $('.sticky-section');
  let barPos = stickyBar.offset().top;

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > barPos) {
      stickyBar.addClass('sticky');
    } else {
      stickyBar.removeClass('sticky');
    }
  });

  // $(window).on('resize', function() {
  //   if (stickyBar.hasClass('sticky')) {
  //     barPos = stickyBar.offset().top;
  //   } else {
  //     barPos = resize.offset().top;
  //   }
  // })

  console.log(barPos);


  /* --------------- ACCORDION --------------- */

  const questions = $('h3');
  const answers = $('p');

  questions.on('click', function(e) {
    if ($(e.currentTarget).next().css('display') === 'none') {
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
        text.slideUp();
        text.eq(i).slideDown();
      } else {
        text.eq(i).slideUp();
      }
    })
  })

  /* --------------- GALLERY --------------- */

  var list = document.querySelectorAll('.gallery li');
  var bodyTag = document.querySelector('body');


  for (i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function() {

      var link = this.firstElementChild.getAttribute('src');

      var newDiv = document.createElement('div');
      var newImg = document.createElement('img');
      // var newButton = document.createElement('button');

      bodyTag.appendChild(newDiv);
      newDiv.appendChild(newImg);
      // newDiv.appendChild(newButton);

      newDiv.className = 'fullScreen';
      // newButton.className = 'close';
      newImg.setAttribute('src', link);

      // newButton.style.width = '100px';
      // newButton.style.height = '40px';
      // newButton.innerText = 'ZAMKNIJ';

      newDiv.addEventListener('click', function() {
        var toDelete = document.querySelector('.fullScreen');
        toDelete.parentElement.removeChild(toDelete);
      })

    })
  }

  /* --------------- GALLERY WITH FILTER --------------- */

  var pictures = document.querySelectorAll('#gallery img');
  var hideBtn = document.querySelector('#hideButton');
  var showBtn = document.querySelector('#showButton');
  var hintBtn = document.querySelector('#hintButton');
  var inputTag = document.querySelector('#tagInput');

  for (i = 0; i < list.length; i++) {
    pictures[i].addEventListener('click', function() {

      var link = this.getAttribute('src');

      var newDiv = document.createElement('div');
      var newImg = document.createElement('img');
      // var newButton = document.createElement('button');

      bodyTag.appendChild(newDiv);
      newDiv.appendChild(newImg);
      // newDiv.appendChild(newButton);

      newDiv.className = 'filterFullScreen';
      // newButton.className = 'close';
      newImg.setAttribute('src', link);

      // newButton.style.width = '100px';
      // newButton.style.height = '40px';
      // newButton.innerText = 'ZAMKNIJ';

      newDiv.addEventListener('click', function() {
        var toDelete = document.querySelector('.filterFullScreen');
        toDelete.parentElement.removeChild(toDelete);
      })

    })
  }


  showBtn.addEventListener('click', function() {

    var inputShowValue = inputTag.value;
    inputTag.value = '';

    for (var i = 0; i < pictures.length; i++) {

      var dataTagString = pictures[i].dataset.tag;
      var picturesTagArray = dataTagString.split(',');

      if (picturesTagArray.indexOf(inputShowValue) > -1) {
        pictures[i].classList.remove('invisible');
      }
    }
  });

  hideBtn.addEventListener('click', function() {

    var inputHideValue = inputTag.value;
    inputTag.value = '';

    for (var i = 0; i < pictures.length; i++) {

      var dataTagString = pictures[i].dataset.tag;
      var picturesTagArray = dataTagString.split(',');

      if (picturesTagArray.indexOf(inputHideValue) > -1) {
        pictures[i].classList.add('invisible');
      }
    }
  });

  hintBtn.addEventListener('click', function() {
    var inputHintValue = inputTag.value;
    inputTag.value = 'home-alone';


  });


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
      $('.slider ul').animate({
        'left': `-${photoWidth * photoIndex}`
      }, 200, function() {
        if (photoIndex === photosAfterClone.length - 1) {
          $('.slider ul').css('left', '-900px');
          photoIndex = 1;
        }
      })
    });

    prevBtn.on('click', function() {
      photoIndex -= 1;
      $('.slider ul').animate({
        'left': `-${photoWidth * photoIndex}`
      }, 200, function() {
        if (photoIndex <= 0) {
          $('.slider ul').css('left', `-${photoWidth * (photosAfterClone.length-2)}px`);
          photoIndex = photosAfterClone.length - 2;
        }
      });
    })
  }

  sliderAnimation();


  /* --------------- PARALLAX --------------- */


  function parallaxEffect() {

    var scene = $('.scene');
    var mobileInfo = $('.mobile-info');
    var elements = $('.element');
    var oldMousePositionX = 0;
    var oldMousePositionY = 0;


    if (isMobile) {
      scene.css('display', 'none');
      mobileInfo.css('display', 'block');
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

      elements.each(function(i, e) {
        var currentMousePositionX = $(e).css('left');
        var currentMousePositionY = $(e).css('top');
      })

      if ($(event.target).is('.element') || $(event.target).is('.text')) {
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


  /* --------------- TOOLTIP --------------- */

  var tooltips = document.querySelectorAll('.tooltip');

  for (var i = 0; i < tooltips.length; i++) {

    if (isMobile) {

      var newTooltip = null;

      tooltips[i].addEventListener('click', function() {

        if (newTooltip == null) {
          newTooltip = document.createElement('span');
          newTooltip.classList.add('tooltipText');
          newTooltip.innerText = this.dataset.text;
          this.appendChild(newTooltip);
        } else if (newTooltip != null) {
          newTooltip = null;
          var tooltipDelete = document.querySelector('.tooltipText');
          tooltipDelete.parentElement.removeChild(tooltipDelete);
        }
      });
    }
    // else {
    //   tooltips[i].addEventListener('mouseover', function () {
    //
    //     var newTooltip = document.createElement('span');
    //     newTooltip.classList.add('tooltipText');
    //     newTooltip.innerText = this.dataset.text;
    //     this.appendChild(newTooltip);
    //
    //   });
    //
    //   tooltips[i].addEventListener('mouseout', function () {
    //
    //     var tooltipDelete = document.querySelector('.tooltipText');
    //     tooltipDelete.parentElement.removeChild(tooltipDelete);
    //
    //   });
    // }
  }

  /* --------------- CSS SPRITE ANIMATION --------------- */

  var time = null;

  function start() {
    time = setInterval(function() {

      var walkSpeed = Math.floor(Math.random() * 24) + 8;
      var bottomArray = [0, 10, 20, 25, 30, 45, 60, 70, 80, 90];
      var randomBottom = bottomArray[Math.floor(Math.random() * bottomArray.length)];

      var blur = null;
      var scale = null;
      var order = null;

      if (randomBottom === 0) {
        blur = 1.5;
        scale = 1.5;
        order = 10;
      } else if (randomBottom === 10) {
        blur = 1;
        scale = 1;
        order = 9;
      } else if (randomBottom === 20) {
        blur = .2;
        scale = .9;
        order = 8;
      } else if (randomBottom === 25) {
        blur = .3;
        scale = .8;
        order = 7;
      } else if (randomBottom === 30) {
        blur = .5;
        scale = .75;
        order = 6;
      } else if (randomBottom === 45) {
        blur = .6;
        scale = .7;
        order = 5;
      } else if (randomBottom === 60) {
        blur = .7;
        scale = .6;
        order = 4;
      } else if (randomBottom === 70) {
        blur = .8;
        scale = .55;
        order = 3;
      } else if (randomBottom === 80) {
        blur = .9;
        scale = .5;
        order = 2;
      } else {
        blur = 1;
        scale = .4;
        order = 1;
      }

      var zombie = document.createElement('div');
      zombie.classList.add('zombie');
      zombie.style.bottom = randomBottom + 'px';
      zombie.style.transform = 'scale(' + scale + ')';
      zombie.style.filter = 'blur(' + blur + 'px)';
      zombie.style.zIndex = order.toString();
      zombie.style.animationDuration = '400ms, ' + walkSpeed + 's';

      zombie.addEventListener("animationend", function() {
        this.parentElement.removeChild(this);
      });

      var board = document.querySelector('.board');
      board.appendChild(zombie);

    }, 500);
  }

  var startButton = document.querySelector('.start-sprite');
  var stopButton = document.querySelector('.stop-sprite');

  startButton.addEventListener('click', function() {
    start();
  });

  stopButton.addEventListener('click', function() {

    clearInterval(time);
    time = null;
  })


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
        errorArr.push('Enter valid email address.');
        email.addClass('marked');
      } else {
        email.removeClass('marked');
      }

      if (nameInputValue.length <= 1) {
        //e.preventDefault();
        errorArr.push("Your name must be longer than 1 character");
        name.addClass('marked');
      } else {
        name.removeClass('marked');
      }

      if (messageInputValue.length <= 10) {
        //e.preventDefault();
        errorArr.push('Message must be longer than 10 characters.');
        message.addClass('marked');
      } else {
        message.removeClass('marked');
      }

      if (errorArr.length > 0) {
        e.preventDefault();
        error.text(errorArr.join('\n'));
      } else {
        e.preventDefault();
        error.text('Sending...');
      }
    })
  }

  formHandler();


});
