const db = require("../../models");
const User = db.user;
const path = require("path");
const fs = require("fs");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");

function resultImgBase64(stream) {
  return new Promise((resolve, reject) => {
    stream()
      .on("error", (error) => reject(err))
      .on("data", (data) => {
        return resolve({
          base64: Buffer.from(data).toString("base64"),
        });
      });
  });
}

module.exports = {
  Mutation: {
    async register(
      parent,
      { registerInput: { username, email, password, roles } }
    ) {
      // validate user data
      const isUserThere = await User.findOne({ username });
      const isEmailThere = await User.findOne({ email });

      if (isUserThere || isEmailThere) {
        throw new Error("Username or Email already taken");
      }

      // hashing password
      password = await bcrypt.hash(password, 12);

      // create user instance for DB
      const newUser = new User({
        username,
        email,
        password,
        roles,
      });

      const user = await newUser.save();

      return user;
    },
    async signin(parent, { signinInput: { email, password } }) {
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error("Sign in failed");
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Sign in failed");
      }

      const token = jwt.sign({ username: user.username }, config.SECRET_KEY, {
        expiresIn: 86400,
      });

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async uploadImage(parent, { file }) {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const imageBase64 = await resultImgBase64(createReadStream);

      return `data:${mimetype};base64,${imageBase64.base64}`;
    },

    async updateProfile(parent, agrs) {
      try {
        const { username, email, images, userId } = agrs?.user;

        let response = await User.updateOne(
          {
            _id: userId,
          },
          {
            email: email,
            username: username,
            image: images,
          },
          {
            upsert: true,
          }
        );
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
