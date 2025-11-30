import React, { useState, useEffect } from "react";
import "./hero.css";

import PaymentButton from "../PaymentButton/PaymentButton";
import ThankfulPage from "../PaymentSuccess/ThankfulPage";
import { Navigate } from "react-router-dom";

const HeroSection = () => {
  const [heroText, setHeroText] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [userCountry, setUserCountry] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showThankful, setShowThankful] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  // NEW STATES
  const [category, setCategory] = useState("general");
  const [visibility, setVisibility] = useState("private");

  const handleBeforePay = () => {
    if (!heroText.trim()) {
      alert("Please write your confession before proceeding.");
      return false;
    }
    setIsProcessing(true);

    setTimeout(() => {
      setHeroText("");
      setCharacterCount(0);
      setIsProcessing(false);
    }, 1200);

    return true;
  };
  const REACT_APP_API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const handlePaymentSuccess = async (amount, response) => {
    try {
      const verifyRes = await fetch(
        `${REACT_APP_API}/api/confession/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,

            text: heroText,
            visibility,
            type: category,
          }),
        }
      );

      const data = await verifyRes.json();

      if (!data.success) {
        alert("Payment verified but confession not saved.");
        return;
      }

      // Reset UI
      setHeroText("");
      setCharacterCount(0);
      setIsWriting(false);
      setPaidAmount(amount);
      setShowThankful(true);

      setSuccessModal(true);
    } catch (err) {
      console.error("Verify Error:", err);
      alert("Payment was successful but verification failed.");
    }
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setHeroText(text);
    setCharacterCount(text.length);
    setIsWriting(text.length > 0);
  };

  // Detect location
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setUserCountry(data.country);
      } catch (error) {
        console.log("Country detection failed");
      }
    };
    detectCountry();
  }, []);

  return (
    <div className="modern-hero-section">
      <div className="hero-background"></div>

      <div className="hero-container">
        <div className="hero-heading-container">
          <h1 className="hero-title">
            <span className="title-gradient">Confess Your</span>
            <span className="title-glitch">Sins</span>
          </h1>
        </div>

        {/* TEXTAREA SECTION */}
        <div
          className={`modern-textarea-container ${
            isWriting ? "writing-active" : ""
          }`}
        >
          <div className="textarea-glow-effect"></div>
          <div className="dynamic-border"></div>
          <div className="sparkle-container">
            <div className="sparkle s1"></div>
            <div className="sparkle s2"></div>
            <div className="sparkle s3"></div>
          </div>

          <textarea
            className="modern-textarea"
            placeholder="Write your confession here... Let your heart speak freely"
            value={heroText}
            onChange={handleTextChange}
            rows={5}
          ></textarea>

          
          <div className="options-below-text">
            {/* CATEGORY SELECTOR */}
            

            {/* VISIBILITY SELECTOR */}
            <div className="visibility-container">
              <span
                className={`visibility-label ${
                  visibility === "public" ? "public" : "private"
                }`}
                onClick={() =>
                  setVisibility(
                    visibility === "private" ? "public" : "private"
                  )
                }
              >
                {visibility === "public" ? "Public" : "Private"}
              </span>

              <div
                className={`visibility-toggle-clean ${
                  visibility === "public" ? "active" : ""
                }`}
                onClick={() =>
                  setVisibility(
                    visibility === "private" ? "public" : "private"
                  )
                }
              >
                <div className="visibility-circle"></div>
              </div>
            </div>
          </div>

          {/* CHARACTER COUNTER */}
          <div className="character-feedback">
            <div className="character-counter">
              {characterCount} / 1000 characters
            </div>
          </div>

          {/* TYPING ANIMATION */}
          {isWriting && (
            <div className="typing-animation">
              <div className="glow-dot dot-1"></div>
              <div className="glow-dot dot-2"></div>
              <div className="glow-dot dot-3"></div>
            </div>
          )}
        </div>

        {/* PROGRESS */}
        {characterCount > 0 && (
          <div className="progress-indicator">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(100, (characterCount / 1000) * 100)}%`,
                }}
              ></div>
            </div>
            <div className="progress-label">
              {characterCount < 200
                ? "Burden Lifting..."
                : characterCount < 500
                ? "Soul Cleansing..."
                : "Almost Free..."}
            </div>
          </div>
        )}

        {/* PAYMENT */}
        <div className="hero-action-section">
          {isProcessing ? (
            <div className="processing-overlay">
              <div className="processing-spinner"></div>
              <p>Processing your confession...</p>
            </div>
          ) : userCountry === null ? (
            <div className="payment-loading">
              <div className="loading-spinner"></div>
              <p>Connecting to divine redemption...</p>
            </div>
          ) : (
            <div className="payment-integration">
              <PaymentButton
                baseAmount={1}
                userCountry={userCountry}
                onBeforePay={handleBeforePay}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          )}
        </div>
      </div>

      {showThankful && (
        <div className="thankful-modal-overlay">
          <div className="thankful-modal-content">
            <ThankfulPage
              amount={paidAmount}
              onClose={() => setShowThankful(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
