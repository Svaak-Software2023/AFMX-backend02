const stripe = require("stripe")(
    "sk_test_51Ow4TtJKdTIDd26gUcvvzGTGImrNv7JqE5jOWkbJgG6WweAHEFmSO1L0DHWPT3UP8mUpzc3LRyJKbUcOuEpmCk0E00ZS3VxDy3"
  );

//  Resume Validation Methods
 function validateResume(resume) {
    // Get the file extension from the resume
    const fileExtension = resume.split('.').pop().toLowerCase();
    
    // Check if the file extension is allowed
    const allowedExtensions = ['doc', 'docx', 'pdf', 'txt', 'rtf'];
    return allowedExtensions.includes(fileExtension);
}


 // Email validation Methods
 function validateEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S{2,}$/;
    return emailRegex.test(email);
}


const updatePaymentStatus = async (sessionId) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log("session", session);
      
    } catch (error) {
        console.log("error", error);
        throw new Error("Failed to retrieve the session", error.message);
    }
    
  }

module.exports = {
    validateEmail,
    validateResume,
    updatePaymentStatus
}