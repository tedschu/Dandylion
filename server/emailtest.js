import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const key = process.env.SENDGRID_API_KEY;
console.log(key);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setDataResidency('eu');
// uncomment the above line if you are sending mail using a regional EU subuser

console.log("API Key: ", key);
const msg = {
  to: "ted.schuster@gmail.com", // Change to your recipient
  from: "noreply@dandylion.ai", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
