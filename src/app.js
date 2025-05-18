const express = require("express");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");


const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSIgnup } = require("./utils/validation");

const app = express();

app.use(express.json());

app.use(cookieParser())

app.post("/signUp", async (req, res) => {
  console.log(req?.body?.password);

  try {
    validateSIgnup(req?.body);
    const {password } = req?.body

    const passwordHash = await bcrypt.hash(password,10)

    console.log("HASH------------>",passwordHash)


    if (req?.body?.skills.length > 5) {
      return res.send("MAX 5 skills");
    }

    const userObj = req.body;

    userObj.password = passwordHash

    const user = new User(userObj);

    await user.save();
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).send("ERROR CREATING USER" + err);
  }
  console.log("SAVED");
  res.send("User Created");
});



app.post("/login", async (req,res) => {

  try {
    const {email,password} = req.body;
     const user = await User.findOne({email:email})

     if(!user)
     {
      res.status(404).send("User not found")
     }
    const ispasswordValid = await bcrypt.compare(password,user?.password)

    if(ispasswordValid) {

      // create a JWT



      // Add JWT to cookie



      res.cookie("token","sahdohsdohasudmnasbdjbie")


      res.send("Login successful")
    }
    else{
      res.status(500).send("Inavlid passowrd")
    }

  }catch (err) {
    console.log("ERROR", err);
    res.status(500).send(err);
  }
})







app.get("/profile", async (req, res) => {

  try{
    const cookies = req?.cookies
    console.log("COOKIES---->",cookies)
    res.send("READING COOKIES")
  }catch(err)
  {
    res.status(500).send(err)
  }
})

app.get("/user", async (req, res) => {
  const email = req?.body?.email;

  try {
    const user = await User.find({ email: email });
    if (!user?.length) return res.status(404).send("User Not Found");
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went worng");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findByIdAndDelete({ _id: userId });

    console.log("USER----->", user);

    if (!user) return res.status(404).send("User not found");

    res.send(`${user.firstName} deleted!`);
  } catch (err) {
    res.status(500).send("Something went worng");
  }
});

app.get("/feeds", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.status(500).send("SWR" + err);
  }
});

app.patch("/updateUser/:userId", async (req, res) => {
  try {
    const userId = req?.params?.userId;
    const newObj = req.body;
    if (req?.body?.skills.length > 5) {
      return res.send("MAX 5 skills");
    }
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "skills"];

    const isUpdateOllowed = Object.keys(newObj).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateOllowed) {
      console.log("HERE----");

      res.status(500).send("Update now allowed");
    }

    const user = await User.findByIdAndUpdate(userId, newObj, {
      runValidators: true,
    });

    res.send("Updated successfully");
  } catch {
    res.status(500).send("SWR");
  }
});

// Should be after Error thrown!!

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("UNAVAILABLE");
  }
});
connectDB()
  .then(() => {
    console.log("CONNECTED");
    app.listen(3000, () => {
      console.log("RUNNING");
    });
  })
  .catch((err) => {
    console.log("ERROR");
  });

// ROUTE HANDLERS ////

// app.get("/user/:uid", (req, res) => {
//   console.log("REQUEST", req.query);
//   console.log("REQUEST", req.params);

//   res.send({ firstName: "Adarsh" });
// });

// app.post("/user", (req, res) => {
//   res.send("Saved");
// });

// app.post("/deleted", (req, res) => {
//   res.send("Deleted");
// });

// ///////////////////////////////////////////////////////////////////////////////////////////////////////

// /// Dont send any response --------------------------> INFINITE
// app.get("/user/:uid", (req, res) => {
//   console.log("REQUEST", req.query);
//   console.log("REQUEST", req.params);
// });
// /////////////////////////////////////////////////////////////////

// // Multiple rount handlers ------------------------> Gives 1st
// // No res.send in 1st then Infinite
// // Cant write next after first send -------> Cant send 2 res to same client ---- Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

// app.get(
//   "/user",
//   (req, res, next) => {
//     res.send({ firstName: "Adarsh" });
//     next();
//   },
//   (req, res) => {
//     res.send({ lastName: "Godbole" });
//   }
// );

// import { adminAuth } from "./middlewares/auth";
// import { userAuth } from "./middlewares/userauth";

// // Middleware

// app.get("/admin",adminAuth)

// app.get("/admin/getAllData",(req,res)=>{
//   // AUthenticate
//   res.send("All Data")
// })

// app.get("/admin/seleteAllData",(req,res)=>{
//   res.send("All Data Deleted")
// })

// app.get("/user/register", userAuth ,(req,res)=>{
//   res.send("REGISTERED")
// })

// app.get("/user/profile",(req,res)=>{
//   res.send("REGISTERED")
// })
