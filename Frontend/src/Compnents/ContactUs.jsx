import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import StoreSection from "../Compnents/Mapsections";
import FAQPage from "../Compnents/Frequentlyask";
import { Notify } from "../ContextApi/Context";
import axios from "axios";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { callNoti, dark } = useContext(Notify);

  // Handle input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { name, email, subject, message } = formData;
      if (!name || !email || !message || !subject) {
        callNoti({ message: "Please fill all required fields", type: "error" });
        setIsSubmitting(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        callNoti({
          message: "Please enter a valid email address",
          type: "error",
        });
        setIsSubmitting(false);
        return;
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/User/SendContact`,
        {
          UserName: name,
          UserEmail: email,
          UserSubject: subject,
          UserMess: message,
        },{ withCredentials: true}
      );

      if (data) {
        callNoti({
          message: `Message Sent! Thank you, ${name}`,
          type: "success",
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      callNoti({
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again later.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center mt-10 w-full px-4 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Banner */}
      <div className="relative w-full max-w-6xl">
        <img
          className="h-80 w-full rounded-2xl object-cover"
          src="https://s.alicdn.com/@sc04/kf/H5b81613ebcfa41e19cdd5a6973939c0aR/New-Simple-Stylish-Living-Room-Luxury-Sofa-with-Shaped-Wood-Leg-High-end-Furniture-Sofa-Set-Shaped-Design-Whole-Sales-Sofa.jpg"
          alt="Luxury furniture showcase"
        />

        <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide 
                         bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text 
                         text-transparent drop-shadow-lg">
            Contact Us
          </h1>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 mt-3 text-sm md:text-base font-medium text-gray-200"
          >
            <Link
              to="/"
              className="hover:text-green-400 transition-colors duration-200"
            >
              Home
            </Link>
            <span aria-hidden="true" className="text-gray-400">
              ›
            </span>
            <span className="text-green-300" aria-current="page">
              Contact Us
            </span>
          </nav>
        </div>
      </div>

      {/* Contact + Store */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        {/* Contact Form */}
        <div
          className={`flex flex-col justify-center rounded-2xl shadow-lg p-8 md:p-10 transition-colors duration-300 ${
            dark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-3xl font-bold mb-3 ${
              dark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Get In Touch
          </h2>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-8`}>
            We'd love to hear from you! Please share your message below.
          </p>

          <form className="w-full space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text"
                placeholder="Your Name *"
                className={`w-full rounded-lg p-3 outline-none transition-colors border ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400"
                    : "border-gray-300 focus:ring-2 focus:ring-green-400"
                }`}
                disabled={isSubmitting}
                required
              />
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                placeholder="Your Email *"
                className={`w-full rounded-lg p-3 outline-none transition-colors border ${
                  dark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400"
                    : "border-gray-300 focus:ring-2 focus:ring-green-400"
                }`}
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Subject */}
            <input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              type="text"
              placeholder="Your Subject *"
              className={`w-full rounded-lg p-3 outline-none transition-colors border ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400"
                  : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
              disabled={isSubmitting}
              required
            />

            {/* Message */}
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="5"
              placeholder="Your Feedback / Complaint / Message *"
              className={`w-full rounded-lg p-3 resize-none outline-none transition-colors border ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400"
                  : "border-gray-300 focus:ring-2 focus:ring-green-400"
              }`}
              disabled={isSubmitting}
              required
            ></textarea>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-colors flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        {/* Store Section */}
        <div className="flex items-center justify-center">
          <StoreSection />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-6xl mt-20">
        <FAQPage />
      </div>
    </div>
  );
}

export default ContactUs;
