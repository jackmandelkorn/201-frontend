ON_AUTH = () => {
  if (!SESSION) {
    location.href = REDIRECTS.noAuth
  }
}

//TEMPORARY
$(document).ready(() => {
  let text = document.getElementById("temp")
  text.innerHTML = USER.username.toString()
})
