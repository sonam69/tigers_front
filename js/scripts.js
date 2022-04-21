$(document).ready(function () {
  var timeout;
  // var cursor = document.getElementById("cursorMask");
  //   var x;
  //   var y;
  //   if (cursor) {
  //     window.addEventListener('mousemove', function(e) {
  //       x = e.pageX - 16;
  //       y = e.pageY - $(window).scrollTop() - 16;
  //       if (timeout) {
  //         window.cancelAnimationFrame(timeout);
  //       }
  //       timeout = window.requestAnimationFrame( function() {
  //         cursor.style.transform = "translate(" + x + "px, " + y + "px)";
  //         if (!cursor.classList.contains("active"))
  //           window.requestAnimationFrame(function() {
  //             cursor.classList.add("active");
  //           });
  //       });
  //     });
  //   }

  function checkForHash() {
    console.log(window.location.hash);
    if (window.location.hash) {
      setTimeout(function () {
        moveTo("." + window.location.hash.substring(1));
      }, 1000);
    }
  }

  checkForHash();

  $(".navigation a").click(function () {
    checkForHash();
  });

  moveTo = function (selector) {
    $("body").removeClass("overflow-hidden menu_is_open");
    if (document.querySelector(selector)) {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }
      timeout = window.requestAnimationFrame(function () {
        var distance = document
          .querySelector(selector)
          .getBoundingClientRect().top;
        distance += $("html, body").scrollTop();
        $("html, body").animate(
          {
            scrollTop: distance,
          },
          700
        );
      });
    }
  };

  toggle_menu = function (choice) {
    if (choice) {
      $("body").addClass("overflow-hidden menu_is_open");
    } else {
      $("body").removeClass("overflow-hidden menu_is_open");
    }
  };
});
