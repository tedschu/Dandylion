import express from "express";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import verifyToken from "../utilities/verifyToken.mjs";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.post("/send-plan-invites", verifyToken, async (req, res) => {
  try {
    const { emails, planData, senderName, senderEmail, imageUrl } = req.body;

    if (!emails || !emails.length) {
      return res.status(400).json({
        success: false,
        message: "No emails provided",
      });
    }

    // Create the email template
    const emailPromises = emails.map((email) => {
      const msg = {
        to: email,
        from: "noreply@dandylion.ai", // Your verified sender
        subject: `${senderName} shared a travel plan with you!`,
        html: `
          <html>
            <head>
              <link href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
              <style>
                * {
                  font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                }
              </style>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #113a67; margin: 0; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 700;">dandylion.ai</h1>
                </div>
                
                <h2 style="color: #333; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600;">You've been invited to view a travel plan! ✈️</h2>
                <p style="font-size: 16px; color: #555; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400;">
                  <strong style="font-weight: 600;">${senderName} (${senderEmail})</strong> has shared their travel plan for 
                  <strong style="color: #113a67; font-weight: 600;">${
                    planData.destination
                  }</strong> with you.
                </p>
                
                <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f7bc21;">
                  <h3 style="margin-top: 0; color: #113a67; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600;">Plan Details:</h3>
                  <p style="margin: 8px 0; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400;"><strong style="font-weight: 600;">Destination:</strong> ${
                    planData.destination
                  }</p>
                  <p style="margin: 8px 0; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400;"><strong style="font-weight: 600;">Shared by:</strong> ${senderName}</p>
                  ${
                    imageUrl
                      ? `
                  <div style="margin: 15px 0;">
                    <img src="${imageUrl}" 
                         alt="${planData.destination}" 
                         style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
                  </div>
                  `
                      : ""
                  }
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${
                    process.env.FRONTEND_URL || "http://localhost:5173"
                  }/plans/${
          planData.planID
        }" style="background-color: #113a67; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    View Travel Plan
                  </a>
                </div>
                
                <p style="color: #666; margin-top: 30px; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400;">
                  Happy travels! 🌎
                </p>
                <p style="color: #666; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400;">
                  - The Dandylion Team
                </p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="font-size: 12px; color: #999; text-align: center; font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 400;">
                  This email was sent because ${senderName} shared a travel plan with you.
                </p>
              </div>
            </body>
          </html>
        `,
        text: `${senderName} has shared their travel plan for ${
          planData.destination
        } with you! 

View the plan at: ${
          process.env.FRONTEND_URL || "http://localhost:5173"
        }/plans/${planData.planID}

Happy travels!
- The Dandylion Team`,
      };

      return sgMail.send(msg);
    });

    await Promise.all(emailPromises);

    res.status(200).json({
      success: true,
      message: `Invites sent to ${emails.length} email(s)`,
      emailsSent: emails.length,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email invites",
      error: error.message,
    });
  }
});

export default router;
