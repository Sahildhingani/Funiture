import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Notify } from "../ContextApi/Context";

function AboutUs() {
  const whyChooseUs = [
    {
      title: "Premium Quality",
      desc: "We craft furniture with the finest materials that last for generations.",
    },
    {
      title: "Modern Designs",
      desc: "Our designs balance aesthetics and functionality for every lifestyle.",
    },
    {
      title: "Customer First",
      desc: "Your happiness is our priority — we design for people, not just spaces.",
    },
  ];

  const { dark } = useContext(Notify);

  return (
    <div
      className={`flex flex-col items-center mt-10 w-full px-4 transition-colors duration-300 
        ${dark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Banner */}
      <div className="relative w-full max-w-6xl">
        <img
          className="h-80 w-full rounded-2xl object-cover"
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
          alt="Furniture Workshop"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col items-center justify-center text-center p-6">
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-wide 
                       bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text 
                       text-transparent drop-shadow-lg"
          >
            About Us
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
              About Us
            </span>
          </nav>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        {/* Image Collage */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
            alt="Modern bright living room"
            className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80"
            alt="Living Room"
            className="absolute -bottom-10 -right-10 w-2/3 rounded-xl shadow-lg border-4 border-white hidden md:block"
            loading="lazy"
          />
        </div>

        {/* Our Story Text */}
        <div
          className={`flex flex-col justify-center p-8 md:p-10 rounded-2xl shadow-lg transition-colors duration-300 
            ${dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
        >
          <h2 className="text-3xl font-bold mb-3">Our Story</h2>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-4`}>
            At <span className="font-bold">FurniSpace</span>, we started as a
            small workshop with a big dream — to bring timeless, handcrafted
            furniture into modern homes. Over the years, our passion has grown
            into a trusted brand serving families across the country.
          </p>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
            For us, furniture is more than just wood and fabric — it’s about
            creating comfort, warmth, and cherished memories in every space.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        {whyChooseUs.map(({ title, desc }, idx) => (
          <article
            key={idx}
            className={`flex flex-col justify-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition
              ${dark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}
            tabIndex={0}
            aria-labelledby={`why-title-${idx}`}
          >
            <h3 id={`why-title-${idx}`} className="text-xl font-semibold mb-4">
              {title}
            </h3>
            <p className={`${dark ? "text-gray-400" : "text-gray-600"}`}>
              {desc}
            </p>
          </article>
        ))}
      </section>

      {/* Mission & Values Section */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
        {/* Text Content */}
        <div
          className={`flex flex-col justify-center p-8 md:p-10 rounded-2xl shadow-lg transition-colors duration-300
            ${dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}
        >
          <h2 className="text-3xl font-bold mb-3">Our Mission & Values</h2>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-4`}>
            We aim to make every home a haven with stylish, sustainable, and
            affordable furniture.
          </p>
          <ul
            className={`space-y-3 list-inside list-disc ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <li>Sustainability in sourcing materials</li>
            <li>Excellence in craftsmanship</li>
            <li>Commitment to customer happiness</li>
          </ul>
        </div>

        {/* Image Collage */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Mission"
            className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
            alt="Craftsmanship"
            className="absolute -bottom-10 -left-10 w-2/3 rounded-xl shadow-lg border-4 border-white hidden md:block"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
