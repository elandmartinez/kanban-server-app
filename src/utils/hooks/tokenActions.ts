import jwt from "jsonwebtoken"

interface TokenPayload {
  sub: string
}

export function signToken (payload: TokenPayload, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: "24h" })
}