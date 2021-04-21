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
class Scene {
  /**
   * Animate the scene
   * @param {element} surface The scene container element
   */
  constructor(surface) {
    this.surface = surface;

    this.indi = {
      container: surface.querySelector(".svg-synthwave-indi"),
      underline: surface.querySelector(".svg-synthwave-indi__underline-clip"),
      all: surface.querySelector(".svg-synthwave-indi__all-clip"),
    };

    if (!this.indi.container || !this.indi.underline || !this.indi.all) {
      return;
    }

    this.frame = surface.querySelector(".c-scene__frame");
    if (!this.frame) {
      return;
    }

    this.gridX = surface.querySelector(".c-scene__grid-x");
    if (!this.gridX) {
      return;
    }

    this.overlay = surface.querySelector(".c-scene__overlay");
    if (!this.overlay) {
      return;
    }

    this.init();
  }

  isCapable() {
    if (typeof window.CSS === "undefined") {
      return false;
    }

    if (!window.CSS.supports("will-change", "transform")) {
      return false;
    }

    return true;
  }

  /**
   * Start the script
   */
  async init() {
    try {
      await this.loadScript(
        `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js`
      );
      await this.loadScript(
        `https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineMax.min.js`
      );
      await this.createTimelineIntro();
    } catch (error) {
      console.error(error);
    }

    if (this.isCapable()) {
      try {
        await this.createTweenFrame();
        await this.createTweenOverlay();
        await this.createTweenGridX();
        await this.bindMousemove();
        await this.bindDeviceOrientation();
      } catch (error) {
        console.error(error);
      }
    }

    // For when the browser is a bit naff as native animation (eg. IE/Edge)
    if (!this.isCapable()) {
      try {
        await this.createTimelineTextTicker();
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Asyncronously load and embed a script
   * @param  {string}  main A url to the desired script
   * @return {Promise}
   */
  async loadScript(main) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = main;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  /**
   * Create the intro timeline animation
   * @return {Promise}
   */
  async createTimelineIntro() {
    return new Promise((resolve, reject) => {
      // Create timeline
      this.timelineIntro = new TimelineMax({
        repeat: -1,
        delay: this.isCapable() ? 4 : 1,
        repeatDelay: 2,
      });

      this.timelineIntro.to(this.indi.underline, 0, { xPercent: -100 });

      this.timelineIntro.to(this.indi.container, 0, { opacity: 1 });

      this.timelineIntro.to(this.indi.underline, 0.3, {
        xPercent: 0,
        delay: 0.9,
      });

      this.timelineIntro.to(this.indi.all, 0.3, { xPercent: -100, delay: 9 });

      console.log(this.indi.underline);

      resolve();
    });
  }

  /**
   * Create the horizontal grid animation
   * @return {Promise}
   */
  async createTweenGridX() {
    return new Promise((resolve, reject) => {
      // Create tween
      this.tweenGridX = TweenMax.fromTo(
        this.gridX,
        1,
        { xPercent: -8 },
        { xPercent: 0, repeat: -1, ease: "linear" }
      );

      this.tweenGridX.seek(1);
      this.tweenGridX.timeScale(0);

      TweenMax.ticker.addEventListener("tick", () => {
        // Advance waaaaay into the future as `timeScale` stops at 0 rather than go in reverse.
        if (this.tweenGridX.time() <= 0) {
          this.tweenGridX.seek(10);
        }
      });

      resolve();
    });
  }

  /**
   * Create the frame animation
   * @return {Promise}
   */
  async createTweenFrame() {
    return new Promise((resolve, reject) => {
      // Create tween
      this.tweenFrame = TweenMax.fromTo(
        this.frame,
        1,
        { rotationZ: 8 },
        { rotationZ: -8, repeat: 0, ease: "linear" }
      );

      this.tweenFrame.seek(0.5);
      this.tweenFrame.timeScale(0);

      resolve();
    });
  }

  /**
   * Crate the overlay animation
   * @return {Promise}
   */
  async createTweenOverlay() {
    return new Promise((resolve, reject) => {
      // Create tween
      this.tweenOverlay = TweenMax.fromTo(
        this.overlay,
        1,
        { rotationZ: 1 },
        { rotationZ: -1, repeat: 0, ease: "linear" }
      );

      this.tweenOverlay.seek(0.5);
      this.tweenOverlay.timeScale(0);

      resolve();
    });
  }

  /**
   * Bind the mousemove event
   * @return {Promise}
   */
  async bindMousemove() {
    return new Promise((resolve, reject) => {
      // Cheap test for IE
      if (
        typeof CSS.supports === "undefined" ||
        !CSS.supports ||
        !CSS.supports("will-change: transform")
      ) {
        resolve();
      }

      window.addEventListener(
        "mousemove",
        (event) => {
          const centerX = this.surface.offsetWidth / 2;
          const mouseCenterX = event.clientX - centerX;
          const percentageFromCenterX = (mouseCenterX / centerX) * 100;
          this.tweenGridX.timeScale(-(percentageFromCenterX / 2 / 20));

          const mouseX = event.clientX / this.surface.offsetWidth;
          this.tweenFrame.seek(mouseX);
          this.tweenOverlay.seek(mouseX);
        },
        {
          passive: true,
        }
      );

      resolve();
    });
  }

  /**
   * Bind the device tilt event
   * @return {Promise}
   */
  async bindDeviceOrientation() {
    return new Promise((resolve, reject) => {
      // Cheap test for IE
      if (
        typeof CSS.supports === "undefined" ||
        !CSS.supports ||
        !CSS.supports("will-change: transform")
      ) {
        resolve();
      }

      window.addEventListener(
        "deviceorientation",
        (event) => {
          this.tweenGridX.timeScale(event.gamma / 10);
          this.tweenFrame.seek((event.gamma + 100) / 200);
          this.tweenOverlay.seek((event.gamma + 100) / 200);
        },
        {
          passive: true,
        }
      );

      resolve();
    });
  }
}

new Scene(document.querySelector(".c-scene"));
$(".menu-item").hide();
$('.menu-1').on("click", function () {
    $(".menu-item").toggle("show");
    $(".menu-hidde").addClass('menu-open-button');
    $("#menu1").addClass('block');
    
})

