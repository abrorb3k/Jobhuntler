"use client";

interface FooterProps {
  theme: string;
}

const Footer = ({theme} : FooterProps) => {
  return (
    <footer className="mt-16 py-8 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 mb-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} All rights reserved.
        </p>

        <div className="flex space-x-4 text-sm">
          <a href="/privacy" className="hover:text-[#4640DE] transition">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-[#4640DE] transition">
            Terms
          </a>
          <a href="/contact" className="hover:text-[#4640DE] transition">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
