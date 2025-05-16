import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function HomeFooter() {
  return (
    <footer className="bg-sidebar-foreground text-background">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-primary">
                Udayee
                <span className="text-secondary">Connect</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-secondary">
              Connecting student founders with investors to bring innovative
              ideas to life.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-secondary hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-secondary hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-secondary hover:text-primary">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-secondary hover:text-primary">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          {/* Quick Links */}
          <div className="mt-8 sm:mt-0">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-secondary hover:text-background transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-secondary hover:text-background transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#startups"
                  className="text-secondary hover:text-background transition-colors"
                >
                  Startups
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary hover:text-background transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* For Founders & Investors */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              For Users
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/signup"
                  className="text-secondary hover:text-background transition-colors"
                >
                  Join as Founder
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-secondary hover:text-background transition-colors"
                >
                  Become an Investor
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary hover:text-background transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary hover:text-background transition-colors"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Information */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-secondary">
                  123 University Road, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-secondary">+880 1712 345678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-secondary">info@Uday.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 sm:mt-10 pt-6 text-center text-sm text-secondary">
          <p>© {new Date().getFullYear()} Uday. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
