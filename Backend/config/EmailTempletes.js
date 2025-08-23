export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #f4f7fa;
    }

    table,
    td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 50px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
    }

    .header {
      background: linear-gradient(135deg, #FF6B6B, #FFD93D);
      padding: 30px;
      text-align: center;
      color: #fff;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }

    .main-content {
      padding: 40px 30px;
      color: #333;
      text-align: left;
    }

    .main-content h2 {
      margin-top: 0;
      color: #FF6B6B;
    }

    .main-content p {
      font-size: 14px;
      line-height: 1.6;
      margin: 10px 0;
    }

    .otp-box {
      display: inline-block;
      margin: 20px 0;
      padding: 15px 30px;
      background: #22D172;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 3px;
      border-radius: 8px;
      text-align: center;
    }

    .footer {
      background: #f1f1f1;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #888;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
      }
      .otp-box {
        font-size: 18px !important;
        padding: 12px 20px !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
    <tbody>
      <tr>
        <td align="center">
          <table class="container" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <!-- Header -->
              <tr>
                <td class="header">
                  <h1>🔒 Password Reset Request</h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td class="main-content">
                  <h2>Hello,</h2>
                  <p>We received a password reset request for your PrimeChoice account:</p>
                  <p><b style="color:#4C83EE;">{{email}}</b></p>
                  <p>Use the OTP below to reset your password. This OTP is valid only for the next <b>15 minutes</b>.</p>
                  
                  <div class="otp-box">{{otp}}</div>

                  <p>If you didn’t request this, please ignore this email. Your account is safe.</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td class="footer">
                  &copy; ${new Date().getFullYear()} PrimeChoice. All rights reserved.
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>

`;


export const REGISTER_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Welcome Email</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #f4f7fa;
    }

    table,
    td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 50px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
    }

    .header {
      background: linear-gradient(135deg, #4C83EE, #22D172);
      padding: 30px;
      text-align: center;
      color: #fff;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }

    .main-content {
      padding: 40px 30px;
      color: #333;
      text-align: left;
    }

    .main-content h2 {
      margin-top: 0;
      color: #4C83EE;
    }

    .main-content p {
      font-size: 14px;
      line-height: 1.6;
      margin: 10px 0;
    }

    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background: #22D172;
      color: #fff !important;
      text-decoration: none;
      font-weight: bold;
      border-radius: 6px;
      font-size: 14px;
    }

    .footer {
      background: #f1f1f1;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #888;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
    <tbody>
      <tr>
        <td align="center">
          <table class="container" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <!-- Header -->
              <tr>
                <td class="header">
                  <h1>🎉 Welcome to PrimeChoice!</h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td class="main-content">
                  <h2>Hi {{name}},</h2>
                  <p>Thank you for joining us! Your email <b>{{email}}</b> has been successfully registered.</p>
                  <p>We’re thrilled to have you on board 🚀. Start exploring and make the most of your new account.</p>
                  <a href="https://primechoice.onrender.com/" class="button">Go to Website</a>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td class="footer">
                  &copy; ${new Date().getFullYear()} PrimeChoice. All rights reserved.
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>

`;

