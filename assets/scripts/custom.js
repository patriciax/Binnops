(function () {
  function init(item) {
    var items = item.querySelectorAll("li"),
      current = 0,
      autoUpdate = false,
      timeTrans = 4000;

    //create nav
    var nav = document.createElement("nav");
    nav.className = "nav_arrows";

    //create button prev
    var prevbtn = document.createElement("button");
    prevbtn.className = "prev";
    prevbtn.setAttribute("aria-label", "Prev");

    //create button next
    var nextbtn = document.createElement("button");
    nextbtn.className = "next";
    nextbtn.setAttribute("aria-label", "Next");

    //create counter
    var counter = document.createElement("div");
    counter.className = "counter";
    counter.innerHTML = "<span>1</span><span>" + items.length + "</span>";

    if (items.length > 1) {
      nav.appendChild(prevbtn);
      nav.appendChild(counter);
      nav.appendChild(nextbtn);
      item.appendChild(nav);
    }

    items[current].className = "current";
    if (items.length > 1) items[items.length - 1].className = "prev_slide";

    var navigate = function (dir) {
      items[current].className = "";

      if (dir === "right") {
        current = current < items.length - 1 ? current + 1 : 0;
      } else {
        current = current > 0 ? current - 1 : items.length - 1;
      }

      var nextCurrent = current < items.length - 1 ? current + 1 : 0,
        prevCurrent = current > 0 ? current - 1 : items.length - 1;

      items[current].className = "current";
      items[prevCurrent].className = "prev_slide";
      items[nextCurrent].className = "";

      //update counter
      counter.firstChild.textContent = current + 1;
    };

    item.addEventListener("mouseenter", function () {
      autoUpdate = false;
    });

    item.addEventListener("mouseleave", function () {
      autoUpdate = true;
    });

    setInterval(function () {
      if (autoUpdate) navigate("right");
    }, timeTrans);

    prevbtn.addEventListener("click", function () {
      navigate("left");
    });

    nextbtn.addEventListener("click", function () {
      navigate("right");
    });

    //keyboard navigation
    document.addEventListener("keydown", function (ev) {
      var keyCode = ev.keyCode || ev.which;
      switch (keyCode) {
        case 37:
          navigate("left");
          break;
        case 39:
          navigate("right");
          break;
      }
    });

    // swipe navigation
    // from http://stackoverflow.com/a/23230280
    item.addEventListener("touchstart", handleTouchStart, false);
    item.addEventListener("touchmove", handleTouchMove, false);
    var xDown = null;
    var yDown = null;
    function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }
    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          /* left swipe */
          navigate("right");
        } else {
          navigate("left");
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  }

  [].slice
    .call(document.querySelectorAll(".cd-slider"))
    .forEach(function (item) {
      init(item);
    });
})();

$(document).on('ready', function() {
  $(".main1,.main2,.main3").hide();
  $(".menu1").on("click", function () {
    $(".main2").hide;
    $(".main3").hide;
    $(".main1").toggle("show");
  })
  $(".menu2").on("click", function () {
    $(".main1").hide;
    $(".main3").hide;
    $(".main2").toggle("show");

  })
  $(".menu3").on("click", function () {
    $(".main1").hide;
      $(".main2").hide;
    $(".main3").toggle("show");
 
  })

 
  $(".click-digital").on("click", function () {
    $(".main-content_navegation").addClass("alto");
  })
  $(".click-digital-2").on("click", function () {
    $(".main-content_navegation").addClass("alto2");
  })

  $(".close-digital").on("click", function () {
    $(".main-content_navegation").removeClass("alto");
  })


 $(".btn-volver").on("click", function () {
  $(".main1,.main2,.main3").hide();
  })

  $(".viewmore-p").hide();
  $(".viewmore").on("click", function () {
    $(".viewmore-p").show();
    $(".viewmore").hide();
    })

    $(".viewmore-p2").hide();
    $(".viewmore2").on("click", function () {
      $(".viewmore-p2").show();
      $(".viewmore2").hide();
      })

});



var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 100) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 150 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 1000;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.06em solid #fff }";
  document.body.appendChild(css);
};


/************************************************* */
try{Typekit.load();}catch(e){} 

(function() {

   var initPhotoSwipeFromDOM = function(gallerySelector) {

     var parseThumbnailElements = function(el) {
       var thumbElements = el.childNodes,
         numNodes = thumbElements.length,
         items = [],
         el,
         childElements,
         thumbnailEl,
         size,
         item;

       for (var i = 0; i < numNodes; i++) {
         el = thumbElements[i];

         // include only element nodes 
         if (el.nodeType !== 1) {
           continue;
         }

         childElements = el.children;

         size = el.getAttribute('data-size').split('x');

         // create slide object
         item = {
           src: el.getAttribute('href'),
           w: parseInt(size[0], 10),
           h: parseInt(size[1], 10),
           author: el.getAttribute('data-author')
         };

         item.el = el; // save link to element for getThumbBoundsFn

         if (childElements.length > 0) {
           item.msrc = childElements[0].getAttribute('src'); // thumbnail url
           if (childElements.length > 1) {
             item.title = childElements[1].innerHTML; // caption (contents of figure)
           }
         }

         var mediumSrc = el.getAttribute('data-med');
         if (mediumSrc) {
           size = el.getAttribute('data-med-size').split('x');
           // "medium-sized" image
           item.m = {
             src: mediumSrc,
             w: parseInt(size[0], 10),
             h: parseInt(size[1], 10)
           };
         }
         // original image
         item.o = {
           src: item.src,
           w: item.w,
           h: item.h
         };

         items.push(item);
       }

       return items;
     };

     // find nearest parent element
     var closest = function closest(el, fn) {
       return el && (fn(el) ? el : closest(el.parentNode, fn));
     };

     var onThumbnailsClick = function(e) {
       e = e || window.event;
       e.preventDefault ? e.preventDefault() : e.returnValue = false;

       var eTarget = e.target || e.srcElement;

       var clickedListItem = closest(eTarget, function(el) {
         return el.tagName === 'A';
       });

       if (!clickedListItem) {
         return;
       }

       var clickedGallery = clickedListItem.parentNode;

       var childNodes = clickedListItem.parentNode.childNodes,
         numChildNodes = childNodes.length,
         nodeIndex = 0,
         index;

       for (var i = 0; i < numChildNodes; i++) {
         if (childNodes[i].nodeType !== 1) {
           continue;
         }

         if (childNodes[i] === clickedListItem) {
           index = nodeIndex;
           break;
         }
         nodeIndex++;
       }

       if (index >= 0) {
         openPhotoSwipe(index, clickedGallery);
       }
       return false;
     };

     var photoswipeParseHash = function() {
       var hash = window.location.hash.substring(1),
         params = {};

       if (hash.length < 5) { // pid=1
         return params;
       }

       var vars = hash.split('&');
       for (var i = 0; i < vars.length; i++) {
         if (!vars[i]) {
           continue;
         }
         var pair = vars[i].split('=');
         if (pair.length < 2) {
           continue;
         }
         params[pair[0]] = pair[1];
       }

       if (params.gid) {
         params.gid = parseInt(params.gid, 10);
       }

       return params;
     };

     var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
       var pswpElement = document.querySelectorAll('.pswp')[0],
         gallery,
         options,
         items;

       items = parseThumbnailElements(galleryElement);

       // define options (if needed)
       options = {

         galleryUID: galleryElement.getAttribute('data-pswp-uid'),

         getThumbBoundsFn: function(index) {
           // See Options->getThumbBoundsFn section of docs for more info
           var thumbnail = items[index].el.children[0],
             pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
             rect = thumbnail.getBoundingClientRect();

           return {
             x: rect.left,
             y: rect.top + pageYScroll,
             w: rect.width
           };
         },

         addCaptionHTMLFn: function(item, captionEl, isFake) {
           if (!item.title) {
             captionEl.children[0].innerText = '';
             return false;
           }
           captionEl.children[0].innerHTML = item.title + '<br/><small>Photo: ' + item.author + '</small>';
           return true;
         },

       };

       if (fromURL) {
         if (options.galleryPIDs) {
           // parse real index when custom PIDs are used 
           // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
           for (var j = 0; j < items.length; j++) {
             if (items[j].pid == index) {
               options.index = j;
               break;
             }
           }
         } else {
           options.index = parseInt(index, 10) - 1;
         }
       } else {
         options.index = parseInt(index, 10);
       }

       // exit if index not found
       if (isNaN(options.index)) {
         return;
       }

       var radios = document.getElementsByName('gallery-style');
       for (var i = 0, length = radios.length; i < length; i++) {
         if (radios[i].checked) {
           if (radios[i].id == 'radio-all-controls') {

           } else if (radios[i].id == 'radio-minimal-black') {
             options.mainClass = 'pswp--minimal--dark';
             options.barsSize = {
               top: 0,
               bottom: 0
             };
             options.captionEl = false;
             options.fullscreenEl = false;
             options.shareEl = false;
             options.bgOpacity = 0.85;
             options.tapToClose = true;
             options.tapToToggleControls = false;
           }
           break;
         }
       }

       if (disableAnimation) {
         options.showAnimationDuration = 0;
       }

       // Pass data to PhotoSwipe and initialize it
       gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

       // see: http://photoswipe.com/documentation/responsive-images.html
       var realViewportWidth,
         useLargeImages = false,
         firstResize = true,
         imageSrcWillChange;

       gallery.listen('beforeResize', function() {

         var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
         dpiRatio = Math.min(dpiRatio, 2.5);
         realViewportWidth = gallery.viewportSize.x * dpiRatio;

         if (realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200) {
           if (!useLargeImages) {
             useLargeImages = true;
             imageSrcWillChange = true;
           }

         } else {
           if (useLargeImages) {
             useLargeImages = false;
             imageSrcWillChange = true;
           }
         }

         if (imageSrcWillChange && !firstResize) {
           gallery.invalidateCurrItems();
         }

         if (firstResize) {
           firstResize = false;
         }

         imageSrcWillChange = false;

       });

       gallery.listen('gettingData', function(index, item) {
         if (useLargeImages) {
           item.src = item.o.src;
           item.w = item.o.w;
           item.h = item.o.h;
         } else {
           item.src = item.m.src;
           item.w = item.m.w;
           item.h = item.m.h;
         }
       });

       gallery.init();
     };

     // select all gallery elements
     var galleryElements = document.querySelectorAll(gallerySelector);
     for (var i = 0, l = galleryElements.length; i < l; i++) {
       galleryElements[i].setAttribute('data-pswp-uid', i + 1);
       galleryElements[i].onclick = onThumbnailsClick;
     }

     // Parse URL and open gallery if it contains #&pid=3&gid=1
     var hashData = photoswipeParseHash();
     if (hashData.pid && hashData.gid) {
       openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
     }
   };

   initPhotoSwipeFromDOM('.demo-gallery');

 })();

 var mySwiper = new Swiper ('.swiper-miniaturas', {
  speed: 400,
  spaceBetween: 10,
  initialSlide: 0,
  //truewrapper adoptsheight of active slide
  autoHeight: false,
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  // delay between transitions in ms
  autoplay: 5000,
  autoplayStopOnLast: false, // loop false also
  // If we need pagination
  pagination: '.swiper-pagination',
  paginationType: "bullets",
  
  // Navigation arrows
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  
  // And if we need scrollbar
  //scrollbar: '.swiper-scrollbar',
  // "slide", "fade", "cube", "coverflow" or "flip"
  effect: 'slide',
  // Distance between slides in px.
  spaceBetween: 60,
  //
  slidesPerView: 3,
  //
  centeredSlides: true,
  //
  slidesOffsetBefore: 0,
  //
  grabCursor: true,
})      

var mySwiper = new Swiper ('.swiper-partners', {
  speed: 400,
  spaceBetween: 10,
  initialSlide: 0,
  //truewrapper adoptsheight of active slide
  autoHeight: false,
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  // delay between transitions in ms
  autoplay: 5000,
  autoplayStopOnLast: false, // loop false also
  // If we need pagination
  pagination: '.swiper-pagination',
  paginationType: "bullets",
  autoplay: {
    delay: 1000,
  },
  // Navigation arrows
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  
  // And if we need scrollbar
  //scrollbar: '.swiper-scrollbar',
  // "slide", "fade", "cube", "coverflow" or "flip"
  effect: 'slide',
  // Distance between slides in px.
  spaceBetween: 50,
  //
  slidesPerView: 4,
  //
  centeredSlides: true,
  //
  slidesOffsetBefore: 0,
  //
  grabCursor: true,
})      
var showActive = true
function changeActive(){
  
  showActive=false
}

setInterval(() => {
  $('#time-1').removeClass('active-time')
  $('#time-2').removeClass('active-time')
  $('#time-3').removeClass('active-time')
  $('#time-4').removeClass('active-time')
  $('#time-5').removeClass('active-time')
  let random = Math.floor(Math.random() * 6) + 1;
  $('#time-' + random).addClass("active-time ")
  if(showActive==true){

  }
}, 2000)

$(function () {
  $('.content-services [data-toggle="modal"]').hover(function () {
    var modalId = $(this).data('target');
    $(modalId).modal('show');

  });

});
const swiper = new Swiper(".swiper-bussines", {
  loop: true,
  lazy: {
    loadPrevNext: true
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});

new Swiper(".parent-slider", {
  loop: true,
  slidesPerView: 2,
  noSwiping: true,
  // autoplay: {
  //   delay: 3000,
  // },
  //  centeredSlides: true,
  //   spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
},
pagination: {
    el: '.swiper-pagination',
    clickable: true,
},
});
/*
new Swiper(".child-slider", {
  loop: true,
  slidesPerView: 1,
  noSwiping: false,
  pagination: '.swiper-pagination-child',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

*/

/*******************************slider zoom*************************************************/
tippy('.swiper-button-prev', {
  content: "Prev",
  theme: "light",
  arrow: true,
})
tippy('.swiper-button-next', {
  content: "Next",
  theme: "light",
  arrow: true,
})


var homeSwiper = new Swiper(".home-swiper-container", {
  fadeEffect: { crossFade: true },
  autoplayDisableOnInteraction: true,
  slidersPerView: 1,
  effect: "fade",
  //speed: 8000,
autoplay: {
    delay: 8000,
  },
});
/*
$('#play-video').on('click', function(e){
  e.preventDefault();
  $('#video-overlay').addClass('open');
  $("#video-overlay").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/ngElkyQ6Rhs" frameborder="0" allowfullscreen></iframe>');
});

$('.video-overlay, .video-overlay-close').on('click', function(e){
  e.preventDefault();
  close_video();
});

$(document).keyup(function(e){
  if(e.keyCode === 27) { close_video(); }
});

function close_video() {
  $('.video-overlay.open').removeClass('open').find('iframe').remove();
};*/

$( document ).ready(function() {
  $('.videoo').modal('toggle')
});