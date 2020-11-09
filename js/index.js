$(".about-click").click(() => {
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#scroll-anchor").offset().top
  }, 1400)
})
