import { unauthorized } from "@hapi/boom";
import UserService from "../../services/userService.js";
import { Strategy as LocalStrategy } from "passport-local"
import { verifyPassword } from "../hooks/bcrypt.js";

const userService = new UserService()

const localStrategy = new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
  },
  async (username, password, done) => {
    try {
      console.log({ username, password })
      const user  = await userService.getUserByEmail(username)
      console.log("PASSED LOGIN")
      if (!user) done(unauthorized("Error: no user matched with that email"), false)

      if(user?.password) {
        const passwordMatches = verifyPassword(password, user.password)
        if(!passwordMatches) done(unauthorized("Error: the password is incorrect"), false)

        user.password = "Inutilized Password"

        done(null, user)
      } else {
        done(new Error("Unexpected Error: this user doesn't have a password in the database"), false)
      }
    } catch (error) {
      const stringifiedError = "catched error: " + JSON.stringify(error)
      done(unauthorized(stringifiedError), false)
    }
  }
)

export default localStrategy