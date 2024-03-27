    const RxMemberShipeModel = require("../model/rXMembershipModel");
    const ClientModel = require("../model/clientModel");
    const { errorMsg } = require("../const/errorHelper");

    const stripe = require("stripe")(
        "sk_test_51Ow4TtJKdTIDd26gUcvvzGTGImrNv7JqE5jOWkbJgG6WweAHEFmSO1L0DHWPT3UP8mUpzc3LRyJKbUcOuEpmCk0E00ZS3VxDy3"
      );
      

    /******************* Create Prices ********************/
    const createPrices = async(planPrice, planType, planName) => {
        console.log("price ", planPrice, "type ", planType, "name", planName);
        try {
            const price = await stripe.prices.create({
                currency: 'usd',
                unit_amount: planPrice * 100,
                recurring: {
                  interval: planType,
                },
                product_data: {
                  name: planName,
                },
              });
            return price;
        }catch (error) {
            console.error('Error creating price:', error);
            throw error; // Re-throw the error to propagate it to the calling function
        }
    
    }

    /****************** Create Subscription ********************/

    const stripeSession = async(planId, customerId) => {
        console.log("plan", planId);
        console.log("customerId", customerId);
    try {

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: planId,
                    quantity: 1,
                }
            ],
            customer: customerId,
            success_url: "https://americasfinestmaintenance.com/#/success",
            cancel_url: "https://americasfinestmaintenance.com/#/cancel",
        });
        console.log("sessions: " , session);
        return session;
    } catch (error) {
        return error.message;
    }
    }

    const createMembershipSubscription = async(memberShipDetails, loggedInUser) => {
        console.log("logged in user", loggedInUser);
        const {
            //Field values from UI
            memberShipName,
            memberShipType,
            memberShipPlan,
        } = memberShipDetails;

        if(!memberShipName || !memberShipType || !memberShipPlan) {
            throw new Error('Required memberShipName and memberShipType and memshiplan must be specified');
        }

        // Retrieve the user from your database
        const user = await ClientModel.findOne({clientId: loggedInUser.clientId});
        console.log("user", user);


        // Create a new Stripe customer for the user
        const customer = await stripe.customers.create({
            email: user.clientEmail,    
        });

        const customerId = customer.id;

        const fetchPrices = await createPrices(memberShipPlan,memberShipType, memberShipName);
        console.log("fetchPrices",fetchPrices);

         // Extract the created price ID
         const priceId = fetchPrices.id;

        const session = await stripeSession(priceId, customerId);
        console.log("session", session);

            // Find the largest existing rxMemberShipeId
        const maxRxMemeberCount = await RxMemberShipeModel.findOne(
            {},
            { rxMemberShipeId: 1 },
            { sort: { rxMemberShipeId: -1 } }
        );
    
        // Calculate the next rxMemberShipeId
        const nextrxMemberShipeId = maxRxMemeberCount ? maxRxMemeberCount.rxMemberShipeId + 1 : 1;

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
            paymentStatus: session.payment_status
        });

        // Save the membership in your database
        await newMembership.save();

        // Send the user to the Stripe checkout page
        return{
            sessionUrl : session.url
        };
    }

  /****************** Get Subscription Membership *************************/
  
   const getMembershipSubscription = async(loggedInUser) => {

    console.log("logged in user", loggedInUser);

    const fetchSubscribeUser = await RxMemberShipeModel.findOne({ user: loggedInUser.clientId});
    console.log("fetched subscription", fetchSubscribeUser);

     if(!fetchSubscribeUser || !fetchSubscribeUser.stripeSessionId) {
        throw new Error('No subscription found');
    }

    const session = await stripe.checkout.sessions.retrieve(fetchSubscribeUser.stripeSessionId);
    console.log("session", session);

    if(session && session.status === "complete") {
        let updatePaymentStatus = await RxMemberShipeModel.findOneAndUpdate(
            { user: loggedInUser.clientId},
            {
                $set: {
                    paymentStatus: session.payment_status
                }
            },
            {
                new: true
            }
        )

      if(!updatePaymentStatus) {
        throw new Error("While updating payment status some error occurred")
      }  

      return updatePaymentStatus;
    }
   } 

    module.exports = {
        createMembershipSubscription,
        getMembershipSubscription
    }