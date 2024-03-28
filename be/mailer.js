// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("3b2201d6-355b-4abe-a307-88660912b44c");

function sendEmail(to, subject, message) {
    try {
        client.sendEmail({
            "From": "e239696@metu.edu.tr",
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