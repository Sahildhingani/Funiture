import React, { useContext } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Heart,
  Award,
  Shield,
  Truck,
  Facebook,
  Instagram,
  Share2,
  Home,
  ThumbsUp
} from "lucide-react";
import { Notify } from "../ContextApi/Context";

export default function Footer() {
  const { dark, ToggleTheam } = useContext(Notify);

  return (
    <footer className={`${dark ? "bg-gray-900 text-gray-200" : "bg-[#0e2019] text-white"} mt-25`}>
      {/* Trust Badges */}
      <div className={`${dark ? "bg-gray-800" : "bg-[#112820]"} py-6`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-teal-400" />
            <div>
              <p className="font-medium text-sm">Free Shipping</p>
              <p className="text-xs text-gray-400">On orders over $299</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-teal-400" />
            <div>
              <p className="font-medium text-sm">Premium Quality</p>
              <p className="text-xs text-gray-400">Crafted with care</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-teal-400" />
            <div>
              <p className="font-medium text-sm">2-Year Warranty</p>
              <p className="text-xs text-gray-400">On all products</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-teal-400" />
            <div>
              <p className="font-medium text-sm">Support</p>
              <p className="text-xs text-gray-400">Mon-Fri, 9AM-6PM EST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-teal-700 p-3 rounded-full">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-xl">Stay in the loop</h3>
            <p className={`${dark ? "text-gray-400" : "text-gray-300"}`}>
              Subscribe for exclusive offers, design tips, and new collection previews
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className={`${dark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-[#112820] text-white border-teal-800"} px-5 py-3 rounded-full text-sm outline-none w-full md:w-72 focus:border-teal-500 transition`}
          />
          <button className="bg-teal-700 hover:bg-teal-600 px-6 py-3 rounded-full text-sm font-medium transition whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className={`${dark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"}`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-bold text-lg mb-3">Let's create your dream space together</h4>
              <p className={`${dark ? "text-gray-400" : "text-gray-600"} max-w-md`}>
                Our team of design experts is ready to help you transform your home with
                beautiful, functional furniture that reflects your unique style.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="font-medium">Visit Our Showroom</p>
                  <p className={`${dark ? "text-gray-400" : "text-gray-600"} text-sm`}>
                    123 Design District, New York, NY 10001
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-teal-700 mt-1" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className={`${dark ? "text-gray-400" : "text-gray-600"} text-sm`}>
                    (321) 578-3934
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            {[
              {
                title: "Shop Categories",
                items: [
                  "Living Room",
                  "Dining & Kitchen",
                  "Bedroom",
                  "Home Office",
                  "Outdoor",
                  "Storage Solutions",
                  "Decor & Accessories"
                ]
              },
              {
                title: "Customer Support",
                items: [
                  "Contact Us",
                  "FAQs",
                  "Shipping Information",
                  "Returns & Exchanges",
                  "Warranty",
                  "Product Care",
                  "Track Order"
                ]
              },
              {
                title: "About Us",
                items: [
                  "Our Story",
                  "Sustainability",
                  "Careers",
                  "Press",
                  "Testimonials",
                  "Design Services",
                  "Trade Program"
                ]
              }
            ].map((section, idx) => (
              <div key={idx}>
                <h5 className={`font-semibold mb-4 ${dark ? "text-gray-100" : "text-gray-900"}`}>
                  {section.title}
                </h5>
                <ul className={`space-y-3 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="hover:text-teal-700 cursor-pointer transition"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h5 className={`font-semibold mb-4 ${dark ? "text-gray-100" : "text-gray-900"}`}>
                Connect With Us
              </h5>
              <p className={`${dark ? "text-gray-400" : "text-gray-600"} mb-4`}>
                Follow along for inspiration, updates, and exclusive offers.
              </p>
              <div className="flex gap-4 mb-6">
                {[Facebook, Instagram, Share2, Home].map((Icon, i) => (
                  <div
                    key={i}
                    className={`${dark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-teal-100"} p-3 rounded-full cursor-pointer transition`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>
              <div className={`flex items-center gap-2 text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
                <Clock size={16} />
                <span>Mon-Fri: 9AM-6PM EST | Sat: 10AM-4PM EST</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`mt-12 pt-8 border-t ${dark ? "border-gray-700" : "border-gray-200"} flex flex-col md:flex-row justify-between items-center gap-4`}>
            <div className={`flex items-center gap-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
              <span>© 2025 Artisan Home Interiors.</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>Crafted with care in North Carolina</span>
            </div>

            <div className={`flex gap-6 text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
              <span className="hover:text-teal-700 cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-teal-700 cursor-pointer transition">Terms of Service</span>
              <span className="hover:text-teal-700 cursor-pointer transition">Accessibility</span>
              <span className="hover:text-teal-700 cursor-pointer transition">Do Not Sell My Info</span>
            </div>

            <div className={`flex items-center gap-2 text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
              <ThumbsUp className="h-5 w-5 text-teal-700" />
              <span>We accept all major credit cards</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
