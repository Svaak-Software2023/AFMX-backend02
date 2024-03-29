const RxMemberShipeModel = require("../model/rXMembershipModel");
const ClientModel = require("../model/clientModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
      ui_mode: "embedded",
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      customer: customerId,
      return_url: `http://localhost:5000/payment/success/{CHECKOUT_SESSION_ID}`,
    });
    return session;
  } catch (error) {
    return error.message;
  }
};

// Create Subscription For Membership
const createMembershipSubscription = async (
  memberShipDetails,
  loggedInUser,
  res
) => {
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
  const existingMembership = await RxMemberShipeModel.findOne({
    user: loggedInUser.clientId,
    paymentStatus: "paid",
  });
  if (existingMembership) {
    throw new Error("You have already added a membership");
  }

  // Retrieve the user from your database
  const user = await ClientModel.findOne({
    clientId: loggedInUser.clientId,
  }).select("clientId clientEmail");

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
  const session = await stripeSession(priceId, customerId);

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

module.exports = {
  createMembershipSubscription,
};
