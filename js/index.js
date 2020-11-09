$(".about-click").click(() => {
  $([document.documentElement, document.body]).animate({
    scrollTop: ((window.innerWidth > 894) ? $("#scroll-anchor").offset().top : ($("#scroll-anchor").offset().top - 96))
  }, 1400)
})
