import * as express from "express";
import passport from "passport";
import UserService from "../services/userService.js";
import { signToken } from "../utils/hooks/tokenActions.js";
import config from "../config/config.js"
const authRouter = express.Router()

const userService = new UserService()

authRouter.post("/login",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    const { username } = req.body
      const user = await userService.getUserByEmail(username)
      const token = signToken({sub: username}, config.jwtSecret)

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