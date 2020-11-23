const login = () => {
  const email = document.getElementById(INPUTS.email)
  const password = document.getElementById(INPUTS.password)
  if (!email.value.length || !password.value.length) {
    return;
  }
  if (email.checkValidity() && password.checkValidity()) {
    ROUTINES.login(email.value, password.value, (err) => {
      if (err) {
        if (err.code === "UserNotFoundException") {
          email.setCustomValidity(false)
        }
        else if (err.code === "NotAuthorizedException") {
          password.setCustomValidity(false)
        }
      }
    })
  }
}

const signup = () => {
  const firstName = document.getElementById(INPUTS.firstName)
  const lastName = document.getElementById(INPUTS.lastName)
  const email = document.getElementById(INPUTS.email)
  const password = document.getElementById(INPUTS.password)
  if (!firstName.value.length || !lastName.value.length || !email.value.length || !password.value.length) {
    return;
  }
  if (firstName.checkValidity() && lastName.checkValidity() && email.checkValidity() && password.checkValidity()) {
    ROUTINES.signup(firstName.value, lastName.value, email.value, password.value, (err) => {
      if (err) {
        if (err.code === "UsernameExistsException") {
          email.setCustomValidity(false)
        }
        else if (err.code === "InvalidParameterException") {
          password.setCustomValidity(false)
        }
      }
    })
  }
}

const verify = () => {
  const code = document.getElementById(INPUTS.code)
  if (code.value.length && code.checkValidity()) {
    ROUTINES.verify(code.value, (err) => {
      if (err) {
        code.setCustomValidity(false)
      }
    })
  }
}

const logout = () => {
  ROUTINES.logout()
}

const reset = (obj) => {
  obj.setCustomValidity("")
}

$(document).keyup((event) => {
  if ($(".on-enter-trigger").is(":focus") && event.key == "Enter") {
    $(".on-enter-target")[0].click()
  }
})
