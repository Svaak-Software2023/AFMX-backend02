const ProductModel = require("../model/productModel");
const WhislistModel = require("../model/whislistModel");

// Save for the later methods
const addToWhislist = async (loggedInUser, bodyData) => {
  console.log("loogin", loggedInUser);

  const { productId } = bodyData;

  if (!productId) {
    throw new Error(`Product Id is required`);
  }

  const product = await ProductModel.findOne({
    productId: productId,
    isActive: true,
  }).select('productId isActive -_id');
  console.log("product", product);

  if (!product) {
    throw new Error(`Neither Product exists nor isActive`);
  }

// Find the save for later entry for the current user
  let existingWhislist = await WhislistModel.findOne({ clientId: loggedInUser.clientId }); 
  console.log("existingWhislist", existingWhislist);

   // Find the largest existing WhislistId
   const maxWhislistCount = await WhislistModel.findOne(
    {},
    { whislistId: 1 },
    { sort: { whislistId: -1 } }
  );

  // Calculate the next WhislistId
  const nextWhislistId = maxWhislistCount
    ? maxWhislistCount.whislistId + 1
    : 1;

  // If there's no existing entry, initialize it  
  if(!existingWhislist) {
     // Added the new save for later 
    const newWhislist = new WhislistModel({
      whislistId: nextWhislistId,
      clientId: loggedInUser.clientId,
      wishlist: [product.productId],
    });

    const savedWhislist = await newWhislist.save();
    return savedWhislist;
  }

  // Check if the product is already in the save for later list
  const isAlreadyAdded = existingWhislist.wishlist.includes(product.productId);
  console.log("isAlreadyAdded", isAlreadyAdded);
  
  if(isAlreadyAdded) {
    // Remove the product from the save for later list
    existingWhislist = await WhislistModel.findOneAndUpdate(
      { clientId: loggedInUser.clientId },
      { $pull: { wishlist: product.productId } },
      { new: true }
    );
  } else {
    existingWhislist = await WhislistModel.findOneAndUpdate(
      { clientId: loggedInUser.clientId },
      { $push: { wishlist: product.productId } },
      { new: true }
    );
  }

  return existingWhislist;
};



const getAllWhislist = async (loggedInUser) => {
  
  const existingWhislist = await WhislistModel.findOne({ clientId: loggedInUser.clientId });
  console.log("existingWhislist", existingWhislist);

  if (!existingWhislist) {
    throw new Error("Save for later does not exists");
  }

   // Retrieve all products based on the numbers stored in the wishlist
   const products = await ProductModel.find({ productId: { $in: existingWhislist.wishlist } });
   console.log("Products in wishlist:", products);

}

module.exports = {
  addToWhislist,
  getAllWhislist
};
