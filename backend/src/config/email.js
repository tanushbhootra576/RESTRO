import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Verify connection
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error.message);
    } else {
        console.log('✓ Email service connected and ready');
    }
});

/**
 * Send order confirmation email
 */
export const sendOrderConfirmation = async (userEmail, orderData) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: userEmail,
        subject: `Order Confirmation - ${orderData.orderId}`,
        html: `
      <div style="font-family: Montserrat, sans-serif; background: #f5f1e8; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); color: #d4af37; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px; font-family: 'Playfair Display', serif;">🎉 Order Confirmed</h1>
            <p style="margin: 10px 0 0 0; color: #f5f1e8;">Thank you for your order!</p>
          </div>

          <!-- Order Details -->
          <div style="padding: 30px;">
            <div style="margin-bottom: 30px;">
              <p style="margin: 0; color: #9a8a7e; font-size: 14px; text-transform: uppercase;">Order ID</p>
              <p style="margin: 5px 0 0 0; color: #0a0a0a; font-size: 20px; font-weight: bold;">#${orderData.orderId}</p>
            </div>

            <!-- Items -->
            <div style="margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px 0; color: #0a0a0a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Order Items</h3>
              ${orderData.items
                .map(
                    (item) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #e0d5c7;">
                  <div>
                    <p style="margin: 0; color: #0a0a0a; font-weight: 500;">${item.name}</p>
                    <p style="margin: 5px 0 0 0; color: #9a8a7e; font-size: 14px;">Qty: ${item.quantity}</p>
                  </div>
                  <p style="margin: 0; color: #d4af37; font-weight: bold; font-size: 16px;">₹${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              `
                )
                .join('')}
            </div>

            <!-- Total -->
            <div style="background: #f5f1e8; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="color: #9a8a7e;">Subtotal</span>
                <span style="color: #0a0a0a; font-weight: 500;">₹${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="color: #9a8a7e;">Delivery Fee</span>
                <span style="color: #0a0a0a; font-weight: 500;">₹${orderData.deliveryFee.toFixed(2)}</span>
              </div>
              ${orderData.discount
                ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #9a8a7e;">Discount</span>
                  <span style="color: #8b3a3a; font-weight: 500;">-₹${orderData.discount.toFixed(2)}</span>
                </div>
              `
                : ''
            }
              <div style="border-top: 2px solid #d4af37; padding-top: 10px; display: flex; justify-content: space-between;">
                <span style="color: #0a0a0a; font-weight: bold;">Total Amount</span>
                <span style="color: #d4af37; font-weight: bold; font-size: 18px;">₹${orderData.total.toFixed(2)}</span>
              </div>
            </div>

            <!-- Delivery Address -->
            <div style="margin-bottom: 30px;">
              <h3 style="margin: 0 0 15px 0; color: #0a0a0a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Delivery Address</h3>
              <p style="margin: 0; color: #0a0a0a; line-height: 1.6;">
                ${orderData.deliveryAddress}<br>
                <strong>Delivery Time: </strong>${orderData.estimatedDelivery}
              </p>
            </div>

            <!-- Status -->
            <div style="background: #0a0a0a; color: #d4af37; padding: 20px; border-radius: 4px; text-align: center; margin-bottom: 30px;">
              <p style="margin: 0; font-size: 14px; text-transform: uppercase;">Order Status</p>
              <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold;">${orderData.status}</p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; color: #9a8a7e; font-size: 13px; border-top: 1px solid #e0d5c7; padding-top: 20px;">
              <p style="margin: 0;">Thank you for choosing us! 🙏</p>
              <p style="margin: 10px 0 0 0;">Questions? Contact us at support@restro.com</p>
            </div>
          </div>
        </div>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✓ Order confirmation email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error.message);
        throw error;
    }
};

/**
 * Send booking confirmation email
 */
export const sendBookingConfirmation = async (userEmail, bookingData) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: userEmail,
        subject: `Booking Confirmation - ${bookingData.bookingId}`,
        html: `
      <div style="font-family: Montserrat, sans-serif; background: #f5f1e8; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); color: #d4af37; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px; font-family: 'Playfair Display', serif;">🎯 Booking Confirmed</h1>
          </div>

          <div style="padding: 30px;">
            <div style="margin-bottom: 20px;">
              <p style="margin: 0; color: #9a8a7e; font-size: 14px;">Booking ID</p>
              <p style="margin: 5px 0 0 0; color: #0a0a0a; font-size: 18px; font-weight: bold;">#${bookingData.bookingId}</p>
            </div>

            <div style="background: #f5f1e8; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
              <p style="margin: 0; color: #9a8a7e;"><strong>Date:</strong> ${bookingData.date}</p>
              <p style="margin: 10px 0 0 0; color: #9a8a7e;"><strong>Time:</strong> ${bookingData.time}</p>
              <p style="margin: 10px 0 0 0; color: #9a8a7e;"><strong>Guests:</strong> ${bookingData.guests}</p>
              <p style="margin: 10px 0 0 0; color: #9a8a7e;"><strong>Table:</strong> ${bookingData.tableName}</p>
            </div>

            <div style="text-align: center; color: #9a8a7e; font-size: 13px;">
              <p>We look forward to your visit!</p>
            </div>
          </div>
        </div>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✓ Booking confirmation email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error.message);
        throw error;
    }
};

/**
 * Send password reset email
 */
export const sendPasswordReset = async (userEmail, resetLink) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Password Reset Request',
        html: `
      <div style="font-family: Montserrat, sans-serif; background: #f5f1e8; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px;">
          <div style="background: #0a0a0a; color: #d4af37; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Password Reset</h2>
          </div>
          <div style="padding: 30px;">
            <p style="color: #0a0a0a;">Click the link below to reset your password:</p>
            <a href="${resetLink}" style="display: inline-block; background: #d4af37; color: #0a0a0a; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; font-weight: bold;">Reset Password</a>
            <p style="color: #9a8a7e; font-size: 12px;">This link expires in 1 hour.</p>
          </div>
        </div>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error.message);
        throw error;
    }
};

export default transporter;
