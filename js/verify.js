if (sessionStorage.getItem("verify") === null) {
  location.href = REDIRECTS.noAuth
}
else {
  $(document).ready(() => {
    document.getElementById("email-placeholder").innerHTML = sessionStorage.getItem("verify").toString().trim()
  })
}
