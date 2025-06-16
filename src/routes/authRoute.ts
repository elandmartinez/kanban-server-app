import * as express from "express";
import passport from "passport";
import UserService from "../services/userService";
import { signToken } from "../utils/hooks/tokenActions";
import config from "../config/config.js"
const authRouter = express.Router()

const userService = new UserService()

authRouter.post("/login",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    const { email } = req.body
      const user = await userService.getUserByEmail(email)
      const token = signToken({sub: email}, config.jwtSecret)

      res.status(200).json({
        data: {
          user,
          token
        }
    })
  }
)

authRouter.post("/sign-up",
  passport.authenticate("local", {session: false}),
  async (req, res) => {

    res.status(200).json({
      message: "The new user was created successfully"
    })
  }
)

export default authRouter