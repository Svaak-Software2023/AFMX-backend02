const contactModel = require("../model/contactUsModel");
const sendEmail = require("../utility/sendEmail");

const { contactUserContentInfo }  = require("../const/emailContent");

const contactUsPage = async (contactDetails) => {
  const { name, email, message, subject, phoneNumber } = contactDetails;

  const createContact = await contactModel({
    name,
    email,
    message,
    subject,
    phoneNumber,
  });

  // Save in Contact Model
  const contactData = await createContact.save();

  const sub = `New Inquiry - [${subject}]`;
  const data = `
    <p>Dear AFMX,</p>
    <p>A new inquiry has been submitted through our online inquiry form. Here are the details:</p><br/>
    <p><b>Inquirer's Name:</b> ${name}</p>
    <p><b>Email Address:</b> ${email}</p>
    <p><b>Phone Number:</b> ${phoneNumber}</p>
    <p><b>Inquiry Topic/Reason:</b> ${subject}</p>
    <p><b>Detailed Inquiry:</b></p>
    <p>${message}</p><br/>
    <p>Best regards,</p>
    <p>AFMX</p>
    `;
  // Sending email to the Admin.
  sendEmail(process.env.ADMIN_EMAIL, sub, data);

  const subUser = contactUserContentInfo.CONTACT_USER_SUBJECT;

  const dataForUser = `<p>Dear ${name},</p>${contactUserContentInfo.CONTACT_USER_CONTENT}`;

  //  Sending email to the Users.
  sendEmail(email, subUser, dataForUser);

  return contactData;
};

module.exports = {
  contactUsPage,
};
