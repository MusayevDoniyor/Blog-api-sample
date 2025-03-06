require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./middlewares/app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB();
