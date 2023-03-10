const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["https://test1-frontend.vercel.app", "http://localhost:3000"],
  })
);

const PORT = process.env.PORT || 4000;

// insert cookies
app.post("/message", async (req, res) => {
  const { message } = req.body;
  console.log("message:", message);
  try {
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      secure: true,
      httpOnly: true,
      sameSite: "none",
      path: "/",
      origin:"https://test1-frontend.vercel.app"
    };

    res
      .status(201)
      .cookie("message", message, options)
      .json({ status: "true" });
  } catch (error) {
    res.status(500).json({ status: "false" });
  }
});

// get cookies
app.get("/message", async (req, res) => {
  const cookieMessage = req.cookies.message;
  res.status(200).json({ cookieMessage });
});

// Clear Cookies
app.post("/clear", async (req, res) => {
  const cookieMessage = req.cookies.message;
    res.clearCookie("message", { sameSite: "none", secure: true })
  return res.status(200).json({ cookieMessage });
});

// get smAddress cookies
app.post("/smaddress", async (req, res) => {
  const smAddress = req.cookies.smAddress;
  return res.status(200).json({ smAddress });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
