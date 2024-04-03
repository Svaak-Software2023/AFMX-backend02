const RxMemberShipeModel = require("../model/rXMembershipModel");
const ClientModel = require("../model/clientModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/******************* Create Prices ********************/
const createPrices = async (planPrice, planType, planName) => {
  let interval;
  if (planType === "oneTimeService") {
    // For one-time services, set the interval to 'day'
    interval = "day";
  } else {
    // For subscription plans, set the appropriate interval based on your requirement
    // For example, if you want to charge monthly, set the interval to 'month'
    interval = "month";
  }

  try {
    // Convert planPrice to integer cents
    const unitAmount = Math.round(parseFloat(planPrice) * 100);

    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: unitAmount,
      recurring: {
        interval: interval,
      },
      product_data: {
        name: planName,
        // Include other details as necessary for your subscription product
        // For example, you might include a description or metadata
        // description: "Description of the subscription product",
        // metadata: {
        //   key: "value"
        // }
      },
    });
    return price;
  } catch (error) {
    console.error("Error creating price:", error);
    throw error;
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
      return_url: `https://afmx.madextube700.com/payment/success/{CHECKOUT_SESSION_ID}`,
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
  console.log("memberShipDetails", memberShipDetails);

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

 // Calculate the price based on the membership type
 let oneTimeServicePrice;

 // Calculate the price based on the membership type
 if (memberShipType === "oneTimeService") {
    oneTimeServicePrice = parseFloat(memberShipPlan); // Convert to float if necessary
  } else {
    oneTimeServicePrice = parseFloat(memberShipPlan); // Convert to float if necessary
  }

  const createdPrice = await createPrices(
    oneTimeServicePrice,
    memberShipType,
    memberShipName
  );
  // Extract the created price ID
  const priceId = createdPrice.id;

  // Create the session for the subscription
  const session = await stripeSession(priceId, customerId);
  if(!session) {
    throw new Error("Failed to create the session");
  }

  // Find the largest existing rxMemberShipId
  const maxRxMemeberCount = await RxMemberShipeModel.findOne(
    {},
    { rxMemberShipId: 1 },
    { sort: { rxMemberShipId: -1 } }
  );

  // Calculate the next rxMemberShipId
  const nextrxMemberShipId = maxRxMemeberCount
    ? maxRxMemeberCount.rxMemberShipId + 1
    : 1;

  // Record the membership in your database
  const newMembership = new RxMemberShipeModel({
    rxMemberShipId: nextrxMemberShipId,
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
  const savedUser = await newMembership.save();

  return res.status(201).json({
    message: "Membership Subscription Created !",
    sessionId: session.id,
    savedUser
  });
};

module.exports = {
  createMembershipSubscription,
};
