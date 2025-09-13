import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Notify } from "../ContextApi/Context";

const faqs = [
  {
    question: "Can I order by telephone?",
    answer:
      "Yes, you can place an order by calling our customer service team. Our representatives will assist you in completing your purchase securely over the phone.",
  },
  {
    question: "Do you sell gift cards?",
    answer:
      "Yes, we offer gift cards in multiple denominations. They can be purchased online or in-store and are valid for all of our products.",
  },
  {
    question: "Can I order catalog products online?",
    answer:
      "Absolutely. All catalog products are available online, and you can place your orders directly through our website.",
  },
  {
    question: "Who can answer my warranty questions?",
    answer:
      "Our dedicated customer support team will be happy to assist you with any warranty-related queries or concerns.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to select international locations. Shipping costs and delivery times vary depending on your region.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, once your order is shipped, we’ll provide you with a tracking number so you can monitor the delivery status in real time.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const { dark } = useContext(Notify);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-[#f9fafb] text-gray-800"
      }`}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src="https://cb.scene7.com/is/image/Crate/CB_Super_20250710_storage?bfc=on&wid=400&qlt=80&op_sharpen=1"
            alt="FAQ Illustration"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Right FAQs */}
        <div>
          <h2
            className={`text-3xl font-bold mb-3 ${
              dark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Frequently Asked Questions
          </h2>
          <p
            className={`mb-8 leading-relaxed ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Here are some of the most common questions we get from our
            customers. If you can’t find the answer you’re looking for, feel
            free to contact us.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition-shadow ${
                  dark ? "bg-gray-800" : "bg-white"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3
                    className={`text-lg font-medium ${
                      dark ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <Minus className={`w-5 h-5 ${dark ? "text-gray-300" : "text-gray-500"}`} />
                  ) : (
                    <Plus className={`w-5 h-5 ${dark ? "text-gray-300" : "text-gray-500"}`} />
                  )}
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className={`mt-4 text-base leading-relaxed ${
                          dark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
