export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Pandey Gym</h3>
            <p className="text-sm mb-3">
              <span className="font-semibold text-primary">Owner:</span> Arvind
              Pandey
            </p>
            <p className="text-sm mb-3">
              <span className="font-semibold text-primary">Location:</span>{" "}
              Lakhimpur Kheri, Nighasan Road
            </p>
            <p className="text-sm">
              Your ultimate destination for fitness and wellness. Transform your
              life with our expert trainers and world-class facilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-primary transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          {/* <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-primary transition">
                fac
              </a>
              <a href="#" className="text-2xl hover:text-primary transition">
                🐦
              </a>
              <a href="#" className="text-2xl hover:text-primary transition">
                📷
              </a>
              <a href="#" className="text-2xl hover:text-primary transition">
                ▶️
              </a>
            </div>
          </div> */}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} Pandey Gym. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
