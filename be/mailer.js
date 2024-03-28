// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("30f4721b-bc20-4b41-98df-d763ab318b7f");

function sendEmail(to, subject, message) {
    try {
        client.sendEmail({
            "From": "e2396968@ceng.metu.edu.tr",
            "To": to,
            "Subject": subject,
            "HtmlBody": message,
            "MessageStream": "outbound"
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = { sendEmail };