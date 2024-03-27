$(document).ready(function () {
    $.fn.slider = function (Options) {
        // Slider functionality code
      };

  // Initialize sliders
  $("#slider1").slider({
    NoItemLg: 3,
    NoItemSm: 3, // Tampilkan semua 6 kotak konten pada tampilan mobile
    SlidtoScroll: false,
    ItemtoSlide: 2
  });
  $("#slider2").slider({
    NoItemLg: 2,
    NoItemSm: 2, // Tampilkan semua 6 kotak konten pada tampilan mobile
    SlidtoScroll: true,
    ItemtoSlide: 1
  });

  // Set the width of landing-inner-content based on the total width of all box-visible elements
  var totalWidth = 0;
  $('.box-visible').each(function() {
    totalWidth += $(this).outerWidth(true); // Include margin in the width calculation
  });
  $('.landing-inner-content').width(totalWidth);

  // Add GSAP animation for box content movement
  var boxWrapper = $('.landing-inner-content');
  var boxWidth = $('.box-visible').outerWidth(true); // Width of a single box content including margin
  var totalBoxes = $('.box-visible').length;
  var boxScrollDistance = boxWidth; // Distance to scroll per box content

  var boxTween = TweenMax.to(boxWrapper, 10, {
    x: '-=' + boxWidth,
    ease: Linear.easeNone,
    paused: true,
    repeat: -1,
    onUpdate: function() {
      updateActiveDot(); // Update active dot on box content movement
    }
  });

  boxTween.play();

  var dots = $('.dot');
  var dotWrapper = $('.dots');

  // Function to update active dot based on box content position
  function updateActiveDot() {
    var boxPosition = Math.abs(parseInt(boxWrapper.css('left'))); // Current position of box content
    var activeDotIndex = Math.floor(boxPosition / boxWidth);
    dots.removeClass('active-dot');
    dots.eq(activeDotIndex).addClass('active-dot');
  }

  // Function to handle dot click event
  dots.each(function (index) {
    var dot = $(this);

    dot.on('click', function () {
      var targetIndex = index;
      var scrollDistance = boxWidth * targetIndex;

      // Animate scroll to the selected box content
      TweenMax.to(boxWrapper, 0.5, {
        x: -scrollDistance,
        ease: Power2.easeOut
      });

      // Set active dot
      dots.removeClass('active-dot');
      dot.addClass('active-dot');
    });
  });

  function showDots() {
    for (var i = 0; i < totalBoxes; i++) {
      $('.dots').append('<span class="dot"></span>');
    }
    dots = $('.dot'); // Reassign dots after adding new ones
    dots.eq(0).addClass('active-dot'); // Add active class to the first dot
  }

  showDots(); // Call the function to show dots

  // Pause box content movement animation on hover
  boxWrapper.on('mouseenter', function () {
    boxTween.pause();
  }).on('mouseleave', function () {
    boxTween.play();
  });

  // Update active dot on box content movement
  boxWrapper.on('scroll', function () {
    updateActiveDot();
  });

  // Add animation for color change on dot hover
  dots.hover(function() {
    TweenMax.to($(this), 0.3, { backgroundColor: 'blue' });
  }, function() {
    TweenMax.to($(this), 0.3, { backgroundColor: 'transparent' });
  });
});