const RxMemberShipeModel = require("../model/rXMembershipModel");
const ClientModel = require("../model/clientModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);  


/******************* Create Prices ********************/
const createPrices = async (planPrice, planName) => {
  try {
    // Convert planPrice to integer cents
    const unitAmount = Math.round(parseFloat(planPrice) * 100);

    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: unitAmount,  
      product_data: {
        name: planName,
      },
    });
      console.log("prices created", price);
    return price;
  } catch (error) {
    console.error("Error creating price:", error);
    throw error;
  }
};



/******************* Create Session ********************/
const stripeSession = async (priceId, customerId) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      line_items: [
        {
          price: priceId,
          quantity: 1
        },
      ],
      mode: "payment",
      ui_mode: "embedded",
      customer: customerId,
      return_url: `https://afmx.madextube700.com/payment/success/{CHECKOUT_SESSION_ID}`,
      // return_url: `http://localhost:5000/payment/success/{CHECKOUT_SESSION_ID}`,
    });
    console.log("created session ", session);
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
  }).select("clientId clientEmail clientFirstName clientLastName");

  // Create a new Stripe customer for the user
  const customer = await stripe.customers.create({
    name: `${user.clientFirstName} ${user.clientLastName}`,
    email: user.clientEmail,  
  });

  const customerId = customer.id;

  // Calculate the price based on the membership type
 let subscriptionPrice;

if (memberShipType === "year") {
  subscriptionPrice = parseFloat(memberShipPlan) * 12; // Convert to float if necessary
} else if (memberShipType === "month") {
    subscriptionPrice = parseFloat(memberShipPlan); // Convert to float if necessary
} else {
  throw new Error("Invalid memberShipType. Must be 'year' or 'month'.");
}

// Create prices based on the membership type
const createdPrice = await createPrices(
  subscriptionPrice,
  memberShipName
);

  // Extract the created price ID
  const priceId = createdPrice.id;

  // Create the session for the month
  const session = await stripeSession(priceId, customerId);
  console.log("Session created inside methodas", session);
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
    stripeSessionId: session.id, // Store the Stripe customer ID in the month model
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
