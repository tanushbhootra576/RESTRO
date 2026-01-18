import transporter from '../config/email.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const submitContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return errorResponse(res, 400, 'Please provide name, email, and message');
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: process.env.CONTACT_INBOX || process.env.EMAIL_USER,
            subject: `New Contact Request from ${name}`,
            html: `
        <div style="font-family: Montserrat, sans-serif; background: #f5f1e8; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 24px;">
            <h2 style="margin: 0 0 16px 0; color: #0a0a0a;">New Contact Message</h2>
            <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            <p style="margin: 16px 0 0 0; white-space: pre-line;">${message}</p>
          </div>
        </div>
      `
        };

        await transporter.sendMail(mailOptions);

        successResponse(res, 200, 'Message sent successfully');
    } catch (error) {
        errorResponse(res, 500, 'Failed to send message', error.message);
    }
};
