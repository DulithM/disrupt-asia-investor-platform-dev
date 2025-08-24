import { Facebook, Twitter, Linkedin, Instagram, Youtube, Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/disruptasia", color: "bg-blue-600 hover:bg-blue-700" },
    { icon: Twitter, href: "https://x.com/disruptasia", color: "bg-blue-400 hover:bg-blue-500" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/disruptasia/posts/?feedView=all", color: "bg-blue-700 hover:bg-blue-800" },
    { icon: Instagram, href: "https://www.instagram.com/disruptasia/?igshid=dumfmrpq99t2", color: "bg-pink-500 hover:bg-pink-600" },
    { icon: Youtube, href: "https://www.youtube.com/@disruptasia1278", color: "bg-red-600 hover:bg-red-700" },
    { icon: MessageCircle, href: "https://www.tiktok.com/@disrupt.asia", color: "bg-black hover:bg-gray-800" },
  ]

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Startups", href: "/startups" },
    { label: "Floor Plan", href: "/floor-plan" },
    { label: "Map", href: "/map" },
    { label: "Favorites", href: "/favorites" },
    { label: "Personal Schedule", href: "/personal-schedule" },
  ]

  const contacts = [
    {
      name: "Miuli Kalubowila",
      title: "Project Coordinator",
      phone: "+94 76 709 0757",
      email: "info@disruptasia.today",
    },
    {
      name: "Dilshan Senadeerage",
      title: "Project Coordinator",
      phone: "+94 70 625 9448",
      email: "info@disruptasia.today",
    },
  ]

  return (
    <footer className="bg-gradient-to-r from-teal-700 to-cyan-700 text-white mt-auto">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                <Image
                  src="/logos/logo-02.png"
                  alt="Disrupt Asia Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">DISRUPT</h3>
                <p className="text-sm text-teal-100">Asia 2025</p>
              </div>
            </div>

            <p className="text-teal-100 leading-relaxed max-w-sm text-sm sm:text-base">
              Disrupt Asia 2025 is Sri Lanka's premier startup conference and innovation festival, where visionaries,
              investors, and disruptors come together to shape the future.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${social.color} flex items-center justify-center transition-colors duration-200 hover:scale-105`}
                  aria-label={`Follow us on ${social.icon.name}`}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-teal-100 hover:text-white transition-colors duration-200 hover:translate-x-1 text-sm sm:text-base"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact</h4>
            <div className="space-y-4 sm:space-y-6">
              {contacts.map((contact, index) => (
                <div key={index} className="space-y-2">
                  <div>
                    <h5 className="font-medium text-white text-sm sm:text-base">{contact.name}</h5>
                    <p className="text-xs sm:text-sm text-teal-100">{contact.title}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-teal-100 hover:text-white transition-colors duration-200">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="break-all">{contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-teal-100 hover:text-white transition-colors duration-200">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <a href={`mailto:${contact.email}`} className="break-all hover:underline">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-teal-600 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
          <p className="text-teal-100 text-xs sm:text-sm">© 2025 Disrupt Asia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
