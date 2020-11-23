if (sessionStorage.getItem("verify") === null) {
  location.href = REDIRECTS.noAuth
}
else {
  document.getElementById("email-placeholder").innerHTML = sessionStorage.getItem("verify").toString().trim()
}
