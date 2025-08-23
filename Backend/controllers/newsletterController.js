import { NEWSLETTER_WELCOME_TEMPLATE } from "../config/EmailTempletes.js";
import transporter from "../config/nodeMailer.js";
import Newsletter from "../models/newsletterModel.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.body.userId;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const [existingUserSub, existingEmailSub] = await Promise.all([
      Newsletter.findOne({ userId }),
      Newsletter.findOne({ email }),
    ]);

    if (existingUserSub) {
      return res.status(400).json({
        success: false,
        message: "You have already used the 5% newsletter discount.",
      });
    }

    if (existingEmailSub) {
      return res.status(400).json({
        success: false,
        message: "This email is already subscribed.",
      });
    }

    // Save new subscription
    const newSub = new Newsletter({ email, userId, discountUsed: true });
    await newSub.save();

    // ✅ Send Welcome Email
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "🎉 Welcome to PrimeChoice Newsletter - You got 5% OFF!",
      html: NEWSLETTER_WELCOME_TEMPLATE(email),
    });

    return res.status(200).json({
      success: true,
      hasDiscount: true,
      message: "Subscribed successfully 🎉 You got 5% discount! Email sent ✅",
    });
  } catch (error) {
    console.error("Subscribe Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong. Try again later." });
  }
};

export const getDiscountStatus = async (req, res) => {
  try {
    const userId = req.body.userId;
    const sub = await Newsletter.findOne({ userId });

    if (!sub) {
      return res.json({ success: true, hasDiscount: false });
    }

    return res.json({
      success: true,
      hasDiscount: sub.discountUsed,
    });
  } catch (error) {
    console.error("Get Discount Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
