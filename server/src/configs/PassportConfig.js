import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { getUserById } from "../models/usersQuery.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const passportSetup = () => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      try {
        const user = await getUserById(payload.id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
