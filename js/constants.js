AWS.config.region = "us-east-1"
const POOL_ID = "us-east-1_sZDPa2Car"
const CLIENT_ID = "50anuehm3o697j9q4je3qdesdc"
let SESSION = false
let USER_POOL = null
let USER = null
let ON_AUTH = false

const REDIRECTS = {
  home: "./",
  onAuth: "./dashboard",
  noAuth: "./login",
  onVerify: "./verify"
}

const INPUTS = {
  email: "input-email",
  password: "input-password",
  firstName: "input-firstName",
  lastName: "input-lastName",
  code: "input-code"
}
