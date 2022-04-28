function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

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

  $(".book_arrows > div").on("click", function () {
    var parent;
    if (window.innerWidth < 1200) {
      parent = $(this).closest(".container").find(".book_frame_small");
    } else {
      parent = $(this).closest(".container").find(".book_frame_big");
      if (!parent[0]) {
        parent = $(this).closest(".container").find(".book_frame_small");
      }
    }

    if ($(this).hasClass("arrow_left")) {
      parent.find(".flipped").last().removeClass("flipped");
    } else {
      parent
        .find(".page:not(.flipped):not(.flippedAlways):not(.flippedNever)")
        .first()
        .addClass("flipped");
    }

    if (!parent.find(".flipped").length) {
      $(".arrow_left").addClass("disabled");
    } else {
      $(".arrow_left").removeClass("disabled");
    }

    if (
      !parent.find(".page:not(.flipped):not(.flippedAlways):not(.flippedNever)")
        .length
    ) {
      $(".arrow_right").addClass("disabled");
    } else {
      $(".arrow_right").removeClass("disabled");
    }
  });

  let previous_mouse_pos;
  if (!isMobileDevice()) {
    $(".book_frame").on("mousedown", function (e) {
      if (e.button > 0) return; // If right click
      previous_mouse_pos = e.offsetX;
    });
    $(".book_frame").on("mouseup", function (e) {
      if (e.button > 0) return;
      if (previous_mouse_pos < e.offsetX - 30) {
        $(".arrow_left:not(.disabled)").trigger("click");
      } else if (previous_mouse_pos > e.offsetX + 30) {
        $(".arrow_right:not(.disabled)").trigger("click");
      }
    });
  } else {
    $(".book_frame").on("touchstart", function (e) {
      previous_mouse_pos = e.targetTouches[0].pageX;
    });
    $(".book_frame").on("touchend", function (e) {
      if (previous_mouse_pos < e.changedTouches[0].pageX - 30) {
        $(".arrow_left:not(.disabled)").trigger("click");
      } else if (previous_mouse_pos > e.changedTouches[0].pageX + 30) {
        $(".arrow_right:not(.disabled)").trigger("click");
      }
    });
  }

  /****Waypoints*****/

  buildWaypoints = (function () {
    // Fade in will always exist because it is attached to logo
    if (typeof $(".fadeIn").waypoint !== "function") return;

    $(".img_mask, .test_image, .fadeIn, .fadeInUp, .zoomOut").waypoint({
      handler: function () {
        $(this.element).addClass("is-visible");
      },
      offset: "100%",
      // context: document.getElementById('page-wrapper')
    });

    $(".restrained").waypoint({
      handler: function () {
        $(this.element).removeClass("restrained");
      },
      offset: "100%",
      // context: document.getElementById('page-wrapper')
    });
  })();
});
