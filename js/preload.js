const ROUTINES = {

  //LOGIN
  login: (email, password, callback = (() => {})) => {
    const AUTH_DETAILS = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
      Username: email,
      Password: password,
    })
    USER = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
        Username: email,
        Pool: USER_POOL
    })
    USER.authenticateUser(AUTH_DETAILS, {
      onSuccess: (result) => {
        USER = result.user
        callback(null)
        location.href = REDIRECTS.onAuth
      },
      onFailure: (err) => {
        callback(err)
      },
    })
  },

  //SIGNUP
  signup: (firstName, lastName, email, password, callback = (() => {})) => {
    let attributes = new Array()
    const EMAIL = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
      Name: "email",
      Value: email
    })
    const NAME = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
      Name: "name",
      Value: (firstName + " " + lastName).toString().trim()
    })
    attributes.push(EMAIL)
    attributes.push(NAME)

    USER_POOL.signUp(email, password, attributes, null, (err, result) => {
      if (err) {
        callback(err)
      }
      else {
        USER = result.user
        sessionStorage.setItem("verify", email)
        callback(null)
        location.href = REDIRECTS.toVerify
      }
    })
  },

  //VERIFY
  verify: (code, callback = (() => {})) => {
    USER = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
        Username: sessionStorage.getItem("verify").toString(),
        Pool: USER_POOL
    })
    USER.confirmRegistration(code, true, (err, result) => {
      if (err) {
        callback(err)
      }
      else {
        callback(null)
        location.href = REDIRECTS.onVerify
      }
    })
  },

  //LOGOUT
  logout: () => {
    if (USER != null) {
      USER.getSession((err, session) => {
        USER.globalSignOut({
          onSuccess: (err,data) => {
            sessionStorage.clear()
            location.href = REDIRECTS.home
          }
        })
      })
    }
    else {
      sessionStorage.clear()
      location.href = REDIRECTS.home
    }
  }

}

const preload = () => {
  AWSCognito.config.region = AWS.config.region
  const POOL_DATA = {
    UserPoolId: POOL_ID,
    ClientId: CLIENT_ID
  }
  USER_POOL = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(POOL_DATA)
  USER = USER_POOL.getCurrentUser()
  if (USER != null) {
    USER.getSession((err, session) => {
      const ARN = ("cognito-idp.us-east-1.amazonaws.com/" + POOL_ID).toString()
      let logins = new Object()
      logins[ARN] = session.getIdToken().getJwtToken()
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: POOL_ID,
        Logins: logins
      })
      if (session.isValid()) {
        SESSION = true
      }
    })
  }
  if (ON_AUTH) {
    ON_AUTH()
  }
}

preload()
