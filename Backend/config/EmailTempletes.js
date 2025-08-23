// 🔹 Password Reset Template
export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', Arial, sans-serif;
      background: #f4f7fa;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0px 6px 18px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #FF6B6B, #FFD93D);
      padding: 30px;
      text-align: center;
      color: #fff;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
    }
    .content {
      padding: 35px 30px;
      font-size: 15px;
      line-height: 1.6;
    }
    .otp-box {
      margin: 25px 0;
      display: inline-block;
      background: #22D172;
      color: #fff;
      font-size: 22px;
      font-weight: bold;
      letter-spacing: 4px;
      padding: 14px 32px;
      border-radius: 10px;
    }
    .footer {
      background: #f1f1f1;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔒 Password Reset Request</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We received a password reset request for your PrimeChoice account:</p>
      <p><b style="color:#4C83EE">{{email}}</b></p>
      <p>Use the OTP below to reset your password. It’s valid only for the next <b>15 minutes</b>.</p>
      <div class="otp-box">{{otp}}</div>
      <p>If you didn’t request this, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} PrimeChoice. All rights reserved.
    </div>
  </div>
</body>
</html>
`;


// 🔹 Register / Welcome Template
export const REGISTER_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', Arial, sans-serif;
      background: #f4f7fa;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0px 6px 18px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #4C83EE, #22D172);
      padding: 30px;
      text-align: center;
      color: #fff;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
    }
    .content {
      padding: 35px 30px;
      font-size: 15px;
      line-height: 1.6;
    }
    .content h2 {
      margin-top: 0;
      color: #4C83EE;
    }
    .button {
      display: inline-block;
      margin-top: 25px;
      padding: 12px 24px;
      background: #22D172;
      color: #fff !important;
      text-decoration: none;
      font-weight: 600;
      border-radius: 8px;
      font-size: 14px;
    }
    .footer {
      background: #f1f1f1;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to PrimeChoice!</h1>
    </div>
    <div class="content">
      <h2>Hi {{name}},</h2>
      <p>We’re excited to have you on board 🚀</p>
      <p>Your email <b>{{email}}</b> has been successfully registered.</p>
      <p>Start exploring and make the most of your new account.</p>
      <a href="https://primechoice.onrender.com/" class="button">Go to Website</a>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} PrimeChoice. All rights reserved.
    </div>
  </div>
</body>
</html>
`;


// 🔹 Order Status Template (Dynamic)
export const ORDER_STATUS_TEMPLATE = (name, orderId, amount, status) => {
  let statusIcon = "📦";
  let statusColor = "#4C83EE";
  let statusMessage = "";

  switch (status) {
    case "Order Placed":
      statusIcon = "✅";
      statusColor = "#22D172";
      statusMessage = "Your order has been placed successfully.";
      break;
    case "Packing":
      statusIcon = "📦";
      statusColor = "#FFD93D";
      statusMessage = "Your order is being packed.";
      break;
    case "Shipped":
      statusIcon = "🚚";
      statusColor = "#4C83EE";
      statusMessage = "Your order has been shipped.";
      break;
    case "Out for Delivery":
      statusIcon = "📍";
      statusColor = "#FF8C42";
      statusMessage = "Your order is out for delivery.";
      break;
    case "Delivered":
      statusIcon = "🎉";
      statusColor = "#22D172";
      statusMessage = "Your order has been delivered successfully.";
      break;
    case "Cancelled":
      statusIcon = "❌";
      statusColor = "#FF6B6B";
      statusMessage = "Your order has been cancelled.";
      break;
    default:
      statusIcon = "ℹ️";
      statusColor = "#999";
      statusMessage = "Your order status has been updated.";
      break;
  }

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Update</title>
    <style>
      body {
        font-family: 'Open Sans', Arial, sans-serif;
        background: #f4f7fa;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      .header {
        background: ${statusColor};
        padding: 25px;
        text-align: center;
        color: #fff;
      }
      .header h2 {
        margin: 0;
        font-size: 22px;
      }
      .content {
        padding: 30px;
        color: #333;
        line-height: 1.6;
        font-size: 15px;
      }
      .status-box {
        background: #f9fafc;
        border-left: 6px solid ${statusColor};
        padding: 15px 20px;
        margin: 20px 0;
        border-radius: 8px;
        font-weight: 600;
      }
      .order-info {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid #eee;
        border-radius: 8px;
        background: #fafafa;
        font-size: 14px;
      }
      .footer {
        background: #f1f1f1;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>${statusIcon} Order ${status}</h2>
      </div>
      <div class="content">
        <p>Hi <b>${name}</b>,</p>
        <div class="status-box">${statusMessage}</div>
        <div class="order-info">
          <p><b>Order ID:</b> ${orderId}</p>
          <p><b>Total Amount:</b> ₹${amount}</p>
          <p><b>Status:</b> ${status}</p>
        </div>
        <p>Thank you for shopping with <b>PrimeChoice</b>! 🎉</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} PrimeChoice. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};


export const NEWSLETTER_WELCOME_TEMPLATE = (email) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }

      body { 
        font-family: 'Arial', sans-serif; 
        background: linear-gradient(135deg, #f4f7fa, #e8f0fe); 
        padding: 20px; 
      }
      .container { 
        max-width: 600px; 
        margin: 0 auto; 
        background: #fff; 
        padding: 30px; 
        border-radius: 15px; 
        box-shadow: 0 8px 20px rgba(0,0,0,0.1); 
        animation: fadeIn 1s ease-in-out; 
      }
      h2 { 
        color: #4C83EE; 
        text-align: center; 
        margin-bottom: 20px; 
      }
      p { 
        color: #333; 
        line-height: 1.6; 
        font-size: 15px;
      }
      .discount { 
        background: linear-gradient(135deg, #22D172, #20b864); 
        color: #fff; 
        padding: 14px 24px; 
        display: inline-block; 
        border-radius: 10px; 
        margin: 20px auto; 
        font-weight: bold; 
        font-size: 18px; 
        animation: pulse 2s infinite; 
      }
      .btn { 
        display: inline-block; 
        margin-top: 25px; 
        padding: 14px 24px; 
        background: linear-gradient(135deg, #4C83EE, #6A5ACD); 
        color: #fff; 
        text-decoration: none; 
        border-radius: 10px; 
        font-weight: bold; 
        text-align: center; 
        animation: fadeIn 2s ease-in-out; 
      }
      .btn:hover { 
        background: linear-gradient(135deg, #3b6bd6, #5941a9); 
      }
      .footer { 
        margin-top: 30px; 
        font-size: 12px; 
        color: #888; 
        text-align: center; 
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>🎉 Welcome to PrimeChoice Newsletter!</h2>
      <p>Hi <b>${email}</b>,</p>
      <p>We’re excited to have you on board. As a thank you for joining our family, here’s your special reward:</p>
      <div class="discount">✨ 5% OFF on all your orders ✨</div>
      <p>Apply it during checkout and enjoy shopping with us!</p>
      <div style="text-align:center;">
        <a href="${process.env.FRONTEND_URL || "#"}" class="btn">🛒 Start Shopping</a>
      </div>
      <div class="footer">&copy; ${new Date().getFullYear()} PrimeChoice. All rights reserved.</div>
    </div>
  </body>
  </html>
  `;
};
