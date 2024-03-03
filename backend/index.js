const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customer");
const app = express();
const port = 3000;

// app.use(cors);
app.use(
  cors({
    origin: "*",
  })
);
app.use("/customers", customerRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
