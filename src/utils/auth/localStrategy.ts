import { unauthorized } from "@hapi/boom";
import UserService from "../../services/userService";
import { Strategy as LocalStrategy } from "passport-local"
import { verifyPassword } from "../bcrypt.js";

const userService = new UserService()

const localStrategy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  },
  async (email, password, done) => {
    try {
      const user  = await userService.getUserById(email)
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
      const stringifiedError = JSON.stringify(error)
      done(unauthorized(stringifiedError), false)
    }
  }
)

export default localStrategy