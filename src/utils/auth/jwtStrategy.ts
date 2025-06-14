import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import config from "../../config/config.js"

const jwtStrategy = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
  return done(null, payload)
})

export default jwtStrategy