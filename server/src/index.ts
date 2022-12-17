import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "./models/userModel";
import Conversation from "./models/conversationModel";
import Message from "./models/messageModel";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

console.log("test!");

const app = express();
const port = 5000;

connectDB();

app.use(cors());

app.get("/", (_, res) => {
  res.status(200).send();
});

app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

// Handle register
app.post(
  "/api/register",
  [
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Prosze podać hasło")
      .isLength({ min: 8 })
      .withMessage("Hasło musi mieć min 8 znaków")
      .matches(/(?=.*?[A-Z])/)
      .withMessage("Hasło musi mieć przynajmniej jeden duzy znak")
      .matches(/(?=.*?[a-z])/)
      .withMessage("Hasło musi mieć przynajmniej jeden mały znak")
      .matches(/(?=.*?[0-9])/)
      .withMessage("Hasło musi mieć przynajmniej jeden numer")
      .not()
      .matches(/^$|\s+/)
      .withMessage("Znaki biały są niedozwolone"),
    check("mail")
      .isEmail()
      .escape()
      .trim()
      .normalizeEmail()
      .withMessage("Zły mail"),
    check("name").trim().escape(),
  ],
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ ok: false, errors: errors.array() });
    }

    try {
      const newPassword = await bcrypt.hash(req.body.password, 10);

      await User.create({
        name: req.body.name,
        email: req.body.mail,
        password: newPassword,
      });

      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      res.json({ ok: false, errors: [{ msg: "Posiadasz już konto!" }] });
    }
  }
);

// Handle login
app.post(
  "/api/login",
  [
    check("password").trim().escape(),
    check("mail").isEmail().trim().escape().normalizeEmail(),
  ],
  async (req: express.Request, res: express.Response) => {
    console.log(req.body);

    const user = await User.findOne({
      email: req.body.mail,
    });

    if (!user) {
      return res.json({ ok: false, error: "Taki użytkownik nie istnieje" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid && process.env.JWT_SECRET) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      return res.json({
        ok: true,
        user: {
          id: user._id,
          token: token,
          name: user.name,
          mail: user.email,
          profileImage: user.profileImage,
          friendList: user.friendList
        },
      });
    } else {
      return res.json({
        ok: false,
        user: false,
        error: "Mail lub hasło się nie zgadzają",
      });
    }
  }
);

app.post(
  "/api/getData",
  [check("mail").isEmail().trim().escape().normalizeEmail()],
  async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
      email: req.body.mail,
    });

    if (!user) {
      return res.json({ ok: false, error: "Taki użytkownik nie istnieje" });
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    return res.json({
      ok: true,
      user: {
        id: user._id,
        token: token,
        name: user.name,
        mail: user.email,
        profileImage: user.profileImage,
        friendList: user.friendList
      },
    });
  }
);

// Add to friends
app.post(
  "/api/findFriends",
  [
    check("id").trim().escape(),
    check("inviterMail").isEmail().trim().escape().normalizeEmail(),
    check("inviterName").trim().escape(),
  ],
  async (req: express.Request, res: express.Response) => {
    let id = req.body.id,
      inviterMail = req.body.inviterMail,
      inviterName = req.body.inviterName;

    try {
      const user = await User.findById(id)
      const inviterUser = await User.findOne({email: inviterMail});

      let friendList = user.friendList,
          newFriendA = {inviterID: inviterUser._id ,inviterMail: inviterMail, inviterName: inviterName},
          newFriendB = {inviterID: id ,inviterMail: user.email, inviterName: user.name};

      friendList.forEach((el) => {
        if (el.inviterMail == newFriendA.inviterMail){
      
          return res.json({ok: false, error: "Ta osoba jest juz twoim znajomym"})
        }
      })

      await User.updateOne({_id: id}, {
        friendList: [...friendList, newFriendA]
      })

      await User.updateOne({_id: inviterUser._id}, {
        friendList: [...inviterUser.friendList, newFriendB]
      })
      console.log('updateuje')

      return res.json({ok: true, msg: `Dodano ${user.name}`})

    } catch (err) {
      console.log('test');
      return res.json({ok: false, error: "Wystąpił błąd"})
    }
  }
);
app.post('/api/getUser', async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findById(req.body.id)
    res.json({ok: true, userName: user.name, userAvatar: user.profileImage})
  } catch(err) {
    res.json({ok: false, error: "Bład"})
  }
});


// New conversation
app.post('/api/conversation', async (req: express.Request, res: express.Response) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
})

app.get("/api/conversation/:userId", async (req: express.Request, res: express.Response) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(port, () => console.log(`Running on port http://localhost:${port}`));
