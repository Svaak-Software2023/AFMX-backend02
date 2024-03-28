const RxMemberShipeModel = require("../model/rXMembershipModel");
const ClientModel = require("../model/clientModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const CHECKOUT_SESSION_ID = "sk_test_51Ow4TtJKdTIDd26gUcvvzGTGImrNv7JqE5jOWkbJgG6WweAHEFmSO1L0DHWPT3UP8mUpzc3LRyJKbUcOuEpmCk0E00ZS3VxDy3"
/******************* Create Prices ********************/
const createPrices = async (planPrice, planType, planName) => {
  try {
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: planPrice * 100,
      recurring: {
        interval: planType,
      },
      product_data: {
        name: planName,
      },
    });
    return price;
  } catch (error) {
    console.error("Error creating price:", error);
    throw error; // Re-throw the error to propagate it to the calling function
  }
};

/******************* Create Session ********************/
const stripeSession = async (planId, customerId) => {
  try {
     const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      customer: customerId,
      success_url: successUrl,
      cancel_url: "https://americasfinestmaintenance.com/#/cancel",
    });
    console.log("session", session);
    return session;
  } catch (error) {
    return error.message;
  }
};

/****************** Create Subscription ********************/
const createMembershipSubscription = async (
  memberShipDetails,
  loggedInUser,
  res
) => {
  console.log("logged in user", loggedInUser);
  const {
    //Field values from UI
    memberShipName,
    memberShipType,
    memberShipPlan,
  } = memberShipDetails;

  if (!memberShipName || !memberShipType || !memberShipPlan) {
    throw new Error(
      "Required memberShipName and memberShipType and memshiplan must be specified"
    );
  }
    // Check if the user has already added a membership with a paid payment statu
  const existingMembership = await RxMemberShipeModel.findOne({ user: loggedInUser.clientId, paymentStatus: "paid" });
    console.log("existingMembership", existingMembership);
  if (existingMembership) {
    throw new Error("You have already added a membership");
  }

  // Retrieve the user from your database
  const user = await ClientModel.findOne({ clientId: loggedInUser.clientId });
  console.log("user", user);

  // Create a new Stripe customer for the user
  const customer = await stripe.customers.create({
    email: user.clientEmail,
  });

  const customerId = customer.id;

  const createdPrice = await createPrices(
    memberShipPlan,
    memberShipType,
    memberShipName
  );

  // Extract the created price ID
  const priceId = createdPrice.id;

  // Create the session for the subscription
//   const session = await stripeSession(priceId, customerId);

const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer: customerId,
    return_url: `https://afmx.madextube700.com/payment/success?session_id={CHECKOUT_SESSION_ID}`,
  });
  console.log("session", session);

  // Find the largest existing rxMemberShipeId
  const maxRxMemeberCount = await RxMemberShipeModel.findOne(
    {},
    { rxMemberShipeId: 1 },
    { sort: { rxMemberShipeId: -1 } }
  );

  // Calculate the next rxMemberShipeId
  const nextrxMemberShipeId = maxRxMemeberCount
    ? maxRxMemeberCount.rxMemberShipeId + 1
    : 1;

  // Record the membership in your database
  const newMembership = new RxMemberShipeModel({
    rxMemberShipeId: nextrxMemberShipeId,
    user: loggedInUser.clientId,
    memberShipName,
    memberShipType,
    memberShipPlan: priceId, // Store the created price ID
    createdDate: new Date(),
    expireDate: null, // Membership expiration date will be set by Stripe
    stripeSessionId: session.id, // Store the Stripe customer ID in the subscription model
    paymentStatus: session.payment_status,
  });

  // Save the membership in your database
  await newMembership.save();
 
  return res.status(201).json({
    message: "Membership Subscription Created !",
    sessionId: session.id,
});
};


/****************** Handle Success Payment Status ********************/
const handleSuccessUrl = async (sessionId) => {
    console.log("sessionId", sessionId);
    try {
        if(!sessionId) {
            throw new Error("Session ID is required");
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log("session", session);
        const paymentStatus = session.payment_status;
        console.log("Payment Status", paymentStatus);
        // Update payment status in the database based on session ID
        const updatedPaymentStatus = await updatePaymentStatus(sessionId, paymentStatus);
            console.log("Payment status updated", updatedPaymentStatus);
        // Redirect the user to the appropriate page
        if (paymentStatus === "paid") {

        return successUrl = "https://americasfinestmaintenance.com/#/success"
        } else if (paymentStatus === "canceled") {
        //res.redirect("https://americasfinestmaintenance.com/#/cancel");
        return cancelUrl = "https://americasfinestmaintenance.com/#/cancel";
        }
    } catch (error) {
        console.error("Error handling success URL:", error);
     // Handle errors here
     throw new Error("Error handling success URL")
    }

}


/****************** Update Payment Status ********************/
const updatePaymentStatus = async (sessionId, status) => {
    try {
      // Update payment status in the database based on session ID
      const updatedMembership = await RxMemberShipeModel.findOneAndUpdate(
        { stripeSessionId: sessionId },
        { $set: { paymentStatus: status } },
        { new: true }
      );
  
      if (!updatedMembership) {
        throw new Error("Failed to update payment status");
      }
  
      console.log("Updated membership:", updatedMembership);
      return updatedMembership;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error; // Re-throw the error for handling higher up
    }
  };


/****************** Get Subscription Membership *************************/
const getMembershipSubscription = async (loggedInUser) => {
  try {
    // Validate loggedInUser
    if (!loggedInUser || !loggedInUser.clientId) {
      throw new Error("Invalid logged in user");
    }

    const userMembership = await RxMemberShipeModel.findOne({
      user: loggedInUser.clientId,
    });
    console.log("fetched subscription", userMembership);
    // Check if user has an active subscription
    if (
      !userMembership ||
      !userMembership.stripeSessionId ||
      userMembership.paymentStatus === "paid"
    ) {
      throw new Error("No active subscription found");
    }

    const session = await stripe.checkout.sessions.retrieve(
      userMembership.stripeSessionId
    );
    console.log("session", session);
    // If payment is complete, update payment status
    if (session && session.payment_status === "paid") {
      let updatedMembership = await RxMemberShipeModel.findOneAndUpdate(
        { user: loggedInUser.clientId },
        {
          $set: { paymentStatus: session.payment_status },
        },
        {
          new: true,
        }
      );

      if (!updatedMembership) {
        throw new Error("Failed to update payment status");
      }

       // Redirect logic here after updating payment status if needed
      // Example: redirect to a success page
      response.redirect("https://americasfinestmaintenance.com/#/success");

      return updatedMembership;
    } else {
      throw new Error("Payment not completed");
    }
  } catch (error) {
    console.error("Error getting membership subscription", error);
    throw error; // Re-throw the error for handling higher up
  }
};

module.exports = {
  createMembershipSubscription,
  handleSuccessUrl,
  getMembershipSubscription,
};
