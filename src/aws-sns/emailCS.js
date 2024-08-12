// EmailManager.js
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { sns } from "./aws.config";

const EmailManager = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const params = {
        Protocol: "email",
        TopicArn: "YOUR_SNS_TOPIC_ARN",
        Endpoint: email,
      };

      await sns.subscribe(params).promise();
      setSubscribed(true);
      setEmail("");
      setShowSuccessAlert(true);
      setSuccessMessage("Thank you for subscribing!");
    } catch (error) {
      console.error("Error subscribing to topic:", error);
      setShowSuccessAlert(true);
      setSuccessMessage("Error subscribing. Please try again.");
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();

    try {
      const params = {
        Subject: subject,
        Message: message,
        TopicArn: "YOUR_SNS_TOPIC_ARN",
      };

      await sns.publish(params).promise();
      setSubject("");
      setMessage("");
      setShowSuccessAlert(true);
      setSuccessMessage("Email broadcast successfully!");
    } catch (error) {
      console.error("Error broadcasting email:", error);
      setShowSuccessAlert(true);
      setSuccessMessage("Error broadcasting email. Please try again.");
    }
  };

  return (
    <Container className="my-5 gap-2">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center mb-4">Email Manager</h1>
          <Button
            variant={showSubscriptionForm ? "primary" : "outline-primary"}
            onClick={() => setShowSubscriptionForm(true)}
            className="mr-2 m-2"
            style={{ marginRight: 10 }}
          >
            Add Subscriber
          </Button>
          <Button
            variant={!showSubscriptionForm ? "primary" : "outline-primary"}
            onClick={() => setShowSubscriptionForm(false)}
          >
            Broadcast Message
          </Button>
          {showSuccessAlert && (
            <Alert
              variant={successMessage.includes("Error") ? "danger" : "success"}
              onClose={() => setShowSuccessAlert(false)}
              dismissible
              style={{ marginTop: 3 }}
            >
              {successMessage}
            </Alert>
          )}
          {showSubscriptionForm ? (
            <Form onSubmit={handleSubscribe} className="mt-4">
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                style={{ marginTop: 10 }}
                variant="primary"
                type="submit"
                disabled={subscribed}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleBroadcast} className="mt-4">
              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label style={{ marginTop: 7 }}>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </Form.Group>
              <Button style={{ marginTop: 10 }} variant="primary" type="submit">
                Broadcast
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EmailManager;
