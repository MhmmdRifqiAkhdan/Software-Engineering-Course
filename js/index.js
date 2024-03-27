
function initCarousel() {
    var testimonialCarousel = document.querySelector('.owl-carousel');
    var slides = testimonialCarousel.querySelectorAll('.testimonial-slide');
    var currentIndex = 0;
    var dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-dots');

    // Create dots for navigation
    for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', function() {
            var index = parseInt(this.getAttribute('data-index'));
            showSlide(index);
        });
        dotsContainer.appendChild(dot);
    }
    testimonialCarousel.parentNode.insertBefore(dotsContainer, testimonialCarousel.nextSibling);

    var dots = dotsContainer.querySelectorAll('.dot');

    function showSlide(index) {
        
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
            dots[i].classList.remove('active');
        }
        slides[index].style.display = 'block';
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    showSlide(currentIndex);

    
    setInterval(nextSlide, 5000);
}

window.onload = function() {
    initCarousel();
};


function validateForm() {
    document.getElementById("notification").style.display = "block";
    document.getElementById("notification").innerText = "Your data has been successfully received. Our team will immediately review and contact you via email or telephone within 24 hours after your data is submitted.";
    return false; 
}

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu');

    hamburgerMenu.addEventListener('click', function () {
        menu.classList.toggle('show');
    });
});

$(document).ready(function () {
  $.fn.slider = function (Options) {
  };


  $("#slider1").slider({
    NoItemLg: 3,
    NoItemSm: 3,
    SlidtoScroll: false,
    ItemtoSlide: 2
  });
  $("#slider2").slider({
    NoItemLg: 2,
    NoItemSm: 2,
    SlidtoScroll: true,
    ItemtoSlide: 1
  });


  var totalWidth = 0;
  $('.box-visible').each(function() {
    totalWidth += $(this).outerWidth(true);
  });
  $('.landing-inner-content').width(totalWidth);

  var boxWrapper = $('.landing-inner-content');
  var boxWidth = $('.box-visible').outerWidth(true);
  var totalBoxes = $('.box-visible').length;
  var boxScrollDistance = boxWidth; 

  var boxTween = TweenMax.to(boxWrapper, 10, {
    x: '-=' + boxWidth,
    ease: Linear.easeNone,
    paused: true,
    repeat: -1,
    onUpdate: function() {
      updateActiveDot(); 
    }
  });

  boxTween.play(); 

  var dots = $('.dot');
  var dotWrapperWidth = dots.length * 20;
  var dotScrollDistance = boxWidth; 

  var dotWrapper = $('.dots');

  function updateActiveDot() {
    var boxPosition = Math.abs(parseInt(boxWrapper.css('left'))); 
    var activeDotIndex = Math.floor(boxPosition / boxWidth);
    dots.removeClass('active-dot');
    dots.eq(activeDotIndex).addClass('active-dot');
  }

 
  dots.each(function (index) {
    var dot = $(this);

    dot.on('click', function () {
      var targetIndex = index;
      var scrollDistance = boxWidth * targetIndex;

      TweenMax.to(boxWrapper, 0.5, {
        x: -scrollDistance,
        ease: Power2.easeOut
      });

  
      dots.removeClass('active-dot');
      dot.addClass('active-dot');
    });
  });

  function showDots() {
    for (var i = 0; i < totalBoxes; i++) {
      $('.dots').append('<span class="dot"></span>');
    }
    dots = $('.dot'); 
    dots.eq(0).addClass('active-dot'); 
  }

  showDots(); 

  boxWrapper.on('mouseenter', function () {
    boxTween.pause();
  }).on('mouseleave', function () {
    boxTween.play();
  });

  boxWrapper.on('scroll', function () {
    updateActiveDot();
  });

  dots.hover(function() {
    TweenMax.to($(this), 0.3, { backgroundColor: 'blue' });
  }, function() {
    TweenMax.to($(this), 0.3, { backgroundColor: 'transparent' });
  });
});








