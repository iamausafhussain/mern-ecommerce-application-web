const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// configuration
dotenv.config({ path: "backend/config/config.env" });

// connect database
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`listening on port http://localhost:${process.env.PORT}`);
});
