import passport from "passport";
import { Strategy } from "passport-local";
import { getUserById, getUserByUsername } from "../models/usersQuery.js";
import bcrypt from "bcryptjs";

export const passportSetup = () => {
  passport.use(
    new Strategy(async (username, password, done) => {
      try {
        const user = await getUserByUsername(username);

        if (!user) {
          return done(null, false, { message: "username does not exist" });
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          return done(null, false, { message: "incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        //TODO ADD ERROR HANDLING
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (err) {
      // TODO ADD ERROR HANDLING
      done(err);
    }
  });
};
