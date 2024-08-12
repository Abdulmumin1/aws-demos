// BroadcastEmail.js
import React, { useState } from "react";
import { sns } from "./aws.config";

const BroadcastEmail = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = {
        Subject: subject,
        Message: message,
        TopicArn: "YOUR_SNS_TOPIC_ARN",
      };

      await sns.publish(params).promise();
      console.log("Email broadcast successfully!");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error broadcasting email:", error);
    }
  };

  return (
    <div>
      <h2>Broadcast Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          required
        ></textarea>
        <button type="submit">Broadcast</button>
      </form>
    </div>
  );
};

export default BroadcastEmail;
