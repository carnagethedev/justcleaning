const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const Twilio = require("twilio");

// --- CONFIGURATION (REPLACE THESE WITH YOUR REAL KEYS) ---
const TWILIO_SID = "AC34aa301a2b55c7a5a5f1416dafaae31f";
const TWILIO_TOKEN = "5990d540c98c6dbb6e6c5805973e071c";
const TWILIO_PHONE_NUMBER = "+16043329827"; // e.g., +15550000000
const BUSINESS_OWNER_PHONE = "+16046211627"; // The number that should ring when you click "Call"

const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);

exports.twilio = functions.https.onRequest((req, res) => {
  // Enable CORS so your website can talk to this function securely
  cors(req, res, async () => {
    try {
      // 1. Get data from the frontend request
      const { action, to } = req.body;

      if (!to) {
        throw new Error("Missing 'to' phone number");
      }

      // --- HANDLE SMS ---
      if (action === "sms") {
        const message = await client.messages.create({
          body: "Hi! This is Just Cleanings regarding your quote. Do you have a moment to chat?",
          from: TWILIO_PHONE_NUMBER,
          to: to,
        });
        
        console.log(`SMS sent: ${message.sid}`);
        res.status(200).send({ success: true, sid: message.sid });
      } 
      
      // --- HANDLE CALL (Click-to-Call) ---
      else if (action === "call") {
        // This creates XML instructions (TwiML) to connect you to the client
        const twiml = `
          <Response>
            <Say>Connecting you to the client.</Say>
            <Dial>${to}</Dial>
          </Response>
        `;

        // Twilio calls YOU first. When you answer, it runs the instructions above to dial the CLIENT.
        const call = await client.calls.create({
          twiml: twiml,
          to: BUSINESS_OWNER_PHONE, 
          from: TWILIO_PHONE_NUMBER,
        });

        console.log(`Call initiated: ${call.sid}`);
        res.status(200).send({ success: true, sid: call.sid });
      } 
      
      else {
        res.status(400).send({ error: "Invalid action" });
      }

    } catch (error) {
      console.error("Twilio Error:", error);
      res.status(500).send({ error: error.message });
    }
  });
});