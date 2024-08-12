// SubscriptionForm.js
import React, { useState } from "react";
import { sns } from "../aws.config";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = {
        Protocol: "email",
        TopicArn: "SNS_TOPIC_ARN",
        Endpoint: email,
      };

      await sns.subscribe(params).promise();
      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to topic:", error);
    }
  };

  return (
    <div>
      {subscribed ? (
        <p>Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      )}
    </div>
  );
};

export default SubscriptionForm;
