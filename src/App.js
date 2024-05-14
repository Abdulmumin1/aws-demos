// App.js
import React from "react";
import SubscriptionForm from "./SubscriptionForm";
import BroadcastEmail from "./sendMail";
import EmailManager from "./emailCS";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      {/* <h1>Email Subscription</h1>
      <SubscriptionForm />

      <h1>Send message</h1>
      <BroadcastEmail /> */}
      <EmailManager />
    </div>
  );
};

export default App;
