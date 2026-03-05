import { useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          customer_name: formData.name,
          from_email: formData.email,
          customer_email: formData.email,
          phone: formData.phone,
          message:
            formData.message +
            "\n\n" +
            "Sent from: " +
            formData.email +
            "\n" +
            "Trainee Name: " +
            formData.name +
            "\n" +
            "Phone: " +
            formData.phone,
          to_email: "pandeya0760@gmail.com",
          reply_to: formData.email,
        },
      );

      if (result.status === 200) {
        setStatusMessage("✅ Email sent successfully! We'll contact you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatusMessage(
        "❌ Failed to send email. Please try again or contact us directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  const locations = [
    {
      city: "Lakhimpur Kheri",
      address: "Nighasan Road, Lakhimpur Kheri",
      phone: "+91 7007734812",
      email: "pandeya0760@gmail.com",
      delay: "0.2s",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen md:w-[95rem] overflow-hidden pt-24 pb-10"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 text-white">
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              CONTACT US
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
            Get In{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Have a question, suggestion, or just want to say hi? We're here and
            happy to hear from you!
          </p>
        </div>

        {/* Locations Grid */}
        <div className="mb-20">
          <h2
            className="text-3xl font-black text-white text-center mb-12 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Visit Our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Locations
            </span>
          </h2>

          <div className=" max-w-4xl mx-auto">
            {locations.map((location, index) => (
              <div
                key={index}
                className="group relative animate-fade-in"
                style={{ animationDelay: location.delay }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 -z-10"></div>

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:bg-white/10">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">📍</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-white mb-4">
                        {location.city}
                      </h3>
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-start gap-3">
                          <span className="text-lg mt-1">📌</span>
                          <p className="text-sm leading-relaxed">
                            {location.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📞</span>
                          <a
                            href={`tel:${location.phone.replace(/\s+/g, "")}`}
                            className="text-orange-400 hover:text-orange-300 transition-colors font-semibold text-sm"
                          >
                            {location.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">✉️</span>
                          <a
                            href={`mailto:${location.email}`}
                            className="text-orange-400 hover:text-orange-300 transition-colors font-semibold text-sm"
                          >
                            {location.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div
          className="max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-3xl font-black text-white text-center mb-12">
            Send us a{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Message
            </span>
          </h2>

          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-2xl"></div>

            <form
              onSubmit={handleSubmit}
              className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 space-y-6 hover:border-white/40 transition-all duration-300"
            >
              {/* Gradient Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-t-3xl"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                      👤
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                      ✉️
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Field */}
              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                    📞
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="group">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder="Share your questions or feedback..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-600/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:-translate-y-1 shadow-lg shadow-orange-600/50 hover:shadow-orange-500/60 text-white"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl text-center font-semibold animation-scale-in ${
                    statusMessage.includes("✅")
                      ? "bg-green-600/20 border border-green-500/50 text-green-400"
                      : "bg-red-600/20 border border-red-500/50 text-red-400"
                  }`}
                >
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Operating Hours */}
        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🕐</div>
              <div>
                <h3 className="text-white font-black text-lg mb-3">
                  Operating Hours
                </h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>
                    <span className="font-semibold">Monday - Friday:</span> 5:00
                    AM - 10:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Saturday:</span> 6:00 AM -
                    10:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Sunday:</span> 7:00 AM -
                    9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="text-4xl">✨</div>
              <div>
                <h3 className="text-white font-black text-lg mb-3">
                  Why Choose Us?
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Expert trainers</li>
                  <li>✓ Modern equipment</li>
                  <li>✓ Personalized programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className="mt-16 text-center animate-fade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="tel:+917007734812"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold shadow-lg shadow-orange-600/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call Us Now: +91 7007734812
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-scale-in {
          animation: scaleIn 0.3s ease-out;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
