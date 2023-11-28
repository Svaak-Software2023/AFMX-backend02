const emailContentInfo = {
  WELCOME_RESPONSE_SUBJECT: "Thank You for Joining AFMX Membership!",
  WELCOME_RESPONSE_CONTENT: `
      <p>Welcome to the exclusive AFMX community! We are thrilled to have you as a member, and we want to express 
      our gratitude for choosing AFMX for your tour experiences.</p>
     <p> As a valued member, you now have access to our exclusive tour website, where a world of personalized 
      benefits awaits you. Here are some of the perks you can enjoy:</p>
     <p>1.Personalized Experience and Account Settings: Tailor your preferences for a customized journey.</p>
     <p>2.Personalized Service Experience and Requests: Your preferences matter, and we're here to make your 
      experience unique.</p>
     <p>3.Exclusive Benefits: Unlock special privileges available only to AFMX members.</p>
     <p>4.Personalized Community Experience: Connect with like-minded members and enhance your journey together.</p>
     <p>5.Discounts in the Chemical Shop: Enjoy special savings on select products in our shop.</p>
     <p>6.Gain Points for a Free Service: Earn points with every interaction to redeem a complimentary service of 
      your choice.</p>
     <p>7.24/7 Customer Support: We're here around the clock to assist you with any queries or concerns.</p>
     <p>8.On-Call Emergency Cleaning: In case of unexpected situations, our emergency cleaning services are just a
      call away.</p>
     <p>Your membership is not just a transaction; it's a commitment to an elevated travel experience.
     Thank you for choosing AFMX, where your journey is our priority.</p>
     <p>If you have any questions or need assistance navigating our website, feel free to reach out to our
     dedicated customer support team.</p>
     <p>Once again, thank you for joining AFMX. We look forward to being part of your unforgettable
     cleaning experiences!
     </p>`,
};

const forgetPassContentInfo = {
  FORGET_PASSWORD_SUBJECT: `Assistance with Password Reset for America's Finest Maintenance Company, LLC`,
  FORGET_PASSWORD_CONTENT_ONE: `<p>We understand that you've recently initiated a password reset for your America's Finest 
    Maintenance Company, LLC account. Your security is our priority, and we're here to guide you
    through the process of regaining access to your account securely and promptly.</p>
    <p>To reset your password, kindly follow the steps outlined below:</p>
    <p>1. Access the Password Reset Link: To initiate the password reset process, simply click on the
    following link:
    `,
  FORGET_PASSWORD_CONTENT_TWO: ` Please be aware that this link will expire within 24 hours,so we recommend taking prompt action.</p>
    <p>2. Create a New Password: Once you've clicked on the link, you'll be directed to a page where
    you can establish a new password. For optimal security, we suggest choosing a password that is
    both strong and unique.</p>
    <p>3. Sign In: After successfully setting your new password, return to our login page and sign in
    using your email address along with the newly created password</p>
    <p>If you did not request this password reset, please disregard this email, and your account will
    remain secure</p>
    <p>Your security is of utmost importance to us, and we encourage you to adopt the following best
    practices:</p>
    <p>- Select a robust password containing a mix of letters, numbers, and special characters.\n
    - Avoid using easily guessable information, such as birthdays or common words.\n
    - Regularly update your password to enhance overall security.</p>
    <p>Should you encounter any challenges during the password reset process or have any additional
    questions, please do not hesitate to reach out to our support team at\n
    Customerservice@americasfinestmaintenance.com or (844)-200-900. We are here to assist you.</p>`,
};

const resetPassContentInfo = {
  RESET_PASSWORD_SUCCESS_SUBJECT: `Your Password Has Been Successfully Reset`,
  RESET_PASSWORD_SUCCESS_CONTENT: `<p>We hope this email finds you well.</p>
    <p>This is a confirmation that the password for your [account/service] has been successfully reset. 
    Your account security is our top priority, and we wanted to inform you of this recent change.</p>
    <p>If you initiated this password reset, you can disregard this email. However, if you did not request 
    a password reset or believe this action was taken in error, please contact our support team immediately 
    at Customerservice@americasfinestmaintenance.com or (844)-200-900.</p>
    <p>For your security, we recommend reviewing your account activity to ensure no unauthorized access has 
    occurred. If you notice any suspicious activity, please let us know right away.</p>
    <p>Thank you for your prompt attention to this matter.</p>
    <p>Best regards,</p>
    <p>AFMX</p>
    `,
};

module.exports = {
  emailContentInfo,
  forgetPassContentInfo,
  resetPassContentInfo,
};
