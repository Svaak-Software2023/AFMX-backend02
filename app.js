const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

// Define all the routes
const client_route = require("./src/routes/clientRoute.js");
const banner_route = require("./src/routes/bannerRoute.js");
const country_route = require("./src/routes/countryRoute.js");
const state_route = require("./src/routes/stateRoute.js");
const city_route = require("./src/routes/cityRoute.js");
const join_route = require("./src/routes/joinRoute.js");
const contact_route = require("./src/routes/contactRoute.js");
const complaintCategory_route = require("./src/routes/complaintCategoryRoute.js");
const complaintStatus_route = require("./src/routes/complaintStatusRoute.js");
const role_route = require("./src/routes/roleRoute.js");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

// for http request
app.use(morgan("dev"));
// for communicate with cors platform
app.use(cors());
// To handle the incoming request
app.use(express.json());

app.get('/', (req, res) => {
 return res.send('fetching the data')
})
// To pass and handle the routes
app.use("/api", client_route);
app.use("/api", banner_route);
app.use("/api", country_route);
app.use("/api", state_route);
app.use("/api", city_route);
app.use("/api", join_route);
app.use('/api', contact_route);
app.use('/api', complaintCategory_route);
app.use('/api', complaintStatus_route);
app.use('/api', role_route);


// mongoDB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server runing on the port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
