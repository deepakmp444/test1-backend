const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
const port = 4000;

app.post("/login", async (req, res) => {
  const { email_id, password } = req.body;
  const userAuth = [
    { email_id: "sample@gmail.com", password: "1234" },
    { email_id: "sample1@gmail.co", password: "9876" },
  ];
  const isMatchingCredential = userAuth.some(
    (credential) =>
      credential.email_id === email_id && credential.password === password
  );
  if (isMatchingCredential) {
    // email_id and password match a credential in userAuth
    res.json({ isMatchingCredential });
  } else {
    // email_id and password do not match any credentials in userAuth
    res.json({ isMatchingCredential });
  }
});

// insert text
app.post("/message", async (req, res) => {
  const { message } = req.body;
  res.cookie("message", Deepka).json({ status: "true" });
});

// Make Cookies
app.get("/message/a", async (req, res) => {
  res.cookie("message", "Deepak Kumar").json({ status: "true" });
});


// search text
app.get("/message", async (req, res) => {
  const query = req.query;
  const cookieMessage = req.cookies.message;
  const text = query.text;
  if (text === cookieMessage) {
    res.json({ text });
  } else {
    res.json({ text: "Not Found" });
  }
});

// clear text
app.get("/clear", async (req, res) => {
  res.clearCookie("message").json({ status: "true" });
});

// logout
app.get("/logout", async (req, res) => {
  res.json({ status: "true" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
