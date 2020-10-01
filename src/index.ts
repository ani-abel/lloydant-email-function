import * as functions from "firebase-functions";
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export const sendLloydantEmail = functions.https.onRequest(
  (request, response) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    cors(request, response, () => {
      try {
        /**
         * Here we're using Gmail to send
         */
        const sourceEmail: string = "enyinnayabarnabas@gmail.com";
        const transporter = nodemailer.createTransport({
          service: "gmail",
          //host: "smtp.gmail.com",
          port: 587,
          secure: true,
          auth: {
            user: sourceEmail,
            pass: "01101992",
          },
        });
        // getting dest email by query string
        const name: string = request.body.name;
        const email: string = request.body.email;
        const message: string = request.body.message;
        const subject: string = request.body.subject;

        const mailOptions = {
          from: `Lloydant Business Services <${email}>`, // Something like: Jane Doe <janedoe@gmail.com>
          to: sourceEmail,
          subject, // email subject
          html: `<p style="font-size: 18px;">Hello,</p><br><br>
              <p style="font-size: 16px;">${message}</p><br/>
              <p style="font-size: 17px;">All the best,<br/> From: ${name}</p>
              <br /><br />
              <small>${name?.toUpperCase()}'s email: ${email}</small>
              `, // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (error: any, info: any) => {
          if (error) {
            return response.send(error.toString());
          }
          return response.send({ message: "Message Sent" });
        });
      } catch (ex) {
        throw ex;
      }
    });
  }
);
