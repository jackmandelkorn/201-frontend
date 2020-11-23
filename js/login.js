ON_AUTH = () => {
  if (SESSION) {
    location.href = REDIRECTS.onAuth
  }
}
