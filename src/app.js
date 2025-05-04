const express = require("express");

const app = express();

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


import { adminAuth } from "./middlewares/auth";
import { userAuth } from "./middlewares/userauth";


// Middleware

app.get("/admin",adminAuth)



app.get("/admin/getAllData",(req,res)=>{
  // AUthenticate
  res.send("All Data")
})

app.get("/admin/seleteAllData",(req,res)=>{
  res.send("All Data Deleted")
})

app.get("/user/register", userAuth ,(req,res)=>{
  res.send("REGISTERED")
})

app.get("/user/profile",(req,res)=>{
  res.send("REGISTERED")
})


app.listen(3000, () => {
  console.log("RUNNING");
});
