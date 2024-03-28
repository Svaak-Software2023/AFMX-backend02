const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51Ow4TtJKdTIDd26gUcvvzGTGImrNv7JqE5jOWkbJgG6WweAHEFmSO1L0DHWPT3UP8mUpzc3LRyJKbUcOuEpmCk0E00ZS3VxDy3"
);

// Define all the routes
const ProductCheckoutModel = require("./src/model/productCheckOutModel.js");
const RxMemberShipeModel = require("./src/model/rXMembershipModel.js");
const advertise_route = require("./src/routes/advertiseRoute.js");
const admin_route = require('./src/routes/superAdminRoute.js');
const client_route = require("./src/routes/clientRoute.js");
const clientPaymentOption_route = require('./src/routes/clientPaymentOptionRoute.js');
const complaintCategory_route = require("./src/routes/complaintCategoryRoute.js");
const complaintStatus_route = require("./src/routes/complaintStatusRoute.js");
const complaint_route = require("./src/routes/complaintRoute.js");
const cartItem_route = require('./src/routes/cartItemsRoute.js');
const country_route = require("./src/routes/countryRoute.js");
const contact_route = require("./src/routes/contactRoute.js");
const cart_route = require('./src/routes/cartRoute.js');
const city_route = require("./src/routes/cityRoute.js");
const productDeliveryAdress_route = require('./src/routes/productDeliveryAddressRoute.js');
const productcategory_route = require('./src/routes/productCategoryRoute.js');
const product_route = require('./src/routes/productRoute.js');
const role_route = require("./src/routes/roleRoute.js");
const state_route = require("./src/routes/stateRoute.js");
const service_department_route = require("./src/routes/serviceDepartmentRoute.js");
const services_route = require("./src/routes/servicesRoute.js");
const career_route = require("./src/routes/careerAndEmploymentRoute.js");
// const whislist_route = require("./src/routes/whislistRoute.js");
const productCheckout_route = require("./src/routes/productCheckoutRoute.js");
const rXMemberShip_route = require("./src/routes/rXMembershipRoute.js");




const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

// for http request
app.use(morgan("dev"));
// for communicate with cors platform
app.use(cors());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]

}))
// To handle the incoming request
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("fetching the data");
});

app.get('/session-status/:CHECKOUT_SESSION_ID', async (req, res) => {
  try {
    const cartId = req.query.cartId;
    const sessionId = req.params.CHECKOUT_SESSION_ID;
   const session = await stripe.checkout.sessions.retrieve(sessionId);
   if ((session.payment_status === 'paid') && (session.status === 'complete')) {
      await ProductCheckoutModel.updateMany({cartId,sessionId},{$set:{payment_status:session.payment_status}})
    return res.status(200).redirect('https://americasfinestmaintenance.com/#/success')
   }
  } catch (error) {
    return res.status(500).redirect('https://americasfinestmaintenance.com/#/cancel')
  }
 });

 
 app.get('/payment/success',  async (req, res) => {
  try {
    const sessionId = req.query.session_id;

    const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log("session", session);
      const sessionPaymentStatus = session.payment_status; 

      if((session.paymentStatus === 'paid') && (session.status === 'complete')) {
         // Update payment status in the database based on session ID
        await RxMemberShipeModel.findOneAndUpdate(
          { stripeSessionId: sessionId },
          { $set: { paymentStatus: sessionPaymentStatus } },
          { new: true }
         ) 
         return res.status(200).redirect('https://americasfinestmaintenance.com/#/success')
      }

  }catch (error) {
    return res.status(500).redirect('https://americasfinestmaintenance.com/#/cancel')
  }
 });
// To pass and handle the routes
app.use("/api", admin_route);
app.use("/api", advertise_route);
app.use("/api", client_route);
app.use("/api", clientPaymentOption_route);
app.use("/api", complaintCategory_route);
app.use("/api", complaintStatus_route);
app.use("/api", complaint_route);
app.use("/api", cartItem_route);
app.use("/api", country_route);
app.use("/api", contact_route);
app.use("/api", cart_route);
app.use("/api", city_route);
app.use("/api", product_route);
app.use("/api", productcategory_route);
app.use("/api", productDeliveryAdress_route);
app.use("/api", productCheckout_route);
app.use("/api", role_route);
app.use("/api", state_route);
app.use("/api", service_department_route);
app.use("/api", services_route);
app.use("/api", career_route);
// app.use("/api", whislist_route);
app.use("/api", rXMemberShip_route);

// // Json data routes
// const industries_route = require("./src/routes/industriesRoute.js");
// app.use("/api", industries_route);

// mongoDB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server runing on the port ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
