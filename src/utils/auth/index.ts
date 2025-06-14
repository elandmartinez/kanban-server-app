import passport from "passport";
import localStrategy from "./localStrategy.js";
import jwtStrategy from "./jwtStrategy.js";

passport.use(localStrategy)
passport.use(jwtStrategy)