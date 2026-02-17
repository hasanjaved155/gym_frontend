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
      // Initialize EmailJS (do this once, ideally in App.jsx)
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      // Send email
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID
        {
          // Customer Information
          from_name: formData.name,
          customer_name: formData.name,
          from_email: formData.email,
          customer_email: formData.email,
          phone: formData.phone,

          // Message
          message:
            formData.message +
            "\n\n" +
            +"\n" +
            "Sent from: " +
            formData.email +
            "\n" +
            "Trainee Name : " +
            formData.name +
            "\n" +
            "Phone : " +
            formData.phone +
            ")",

          // Recipient (your email)
          to_email: "pandeya0760@gmail.com",

          // Reply-to (so you can reply to customer)
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

  return (
    <>
      <section id="contact" className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions? Want to visit our gym? Contact us and we'll get
              back to you soon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-primary hover:bg-orange-600"
                  } text-white py-3 rounded-lg font-semibold transition transform hover:scale-105`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {statusMessage && (
                  <p
                    className={`text-center py-2 rounded-lg ${
                      statusMessage.includes("✅")
                        ? "bg-green-900 text-green-200"
                        : "bg-red-900 text-red-200"
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-4">📍</span>
                  Location
                </h3>
                <p className="text-gray-300">
                  Lakhimpur Kheri
                  <br />
                  Nighasan Road
                  <br />
                  (Pandey Gym)
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-4">📞</span>
                  Phone
                </h3>
                <p className="text-gray-300">
                  <a
                    href="tel:+919876543210"
                    className="hover:text-primary transition"
                  >
                    +91 7007734812
                  </a>
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-4">✉️</span>
                  Email
                </h3>
                <p className="text-gray-300">
                  <a
                    href="mailto:info@pandeygym.com"
                    className="hover:text-primary transition"
                  >
                    pandeya0760@gmail.com
                  </a>
                </p>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="text-3xl mr-4">🕐</span>
                  Opening Hours
                </h3>
                <p className="text-gray-300">Mon - Sun: 5:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
