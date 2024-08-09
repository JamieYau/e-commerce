import Link from "next/link";
import { Separator } from "./ui/separator";
import { quickLinks, socialLinks } from "@/lib/footerData";

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">About Us</h3>
            <p className="text-sm">
              Welcome to TechWave, your go-to destination for the best fictional
              products. Browse our categories and find exactly what you need,
              even if it&apos;s just in your imagination!
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Newsletter Signup</h3>
            <p className="mb-4 text-sm">
              Subscribe to our newsletter to get the latest updates.
            </p>
            <form>
              <input
                type="email"
                className="w-full px-4 py-2 text-black"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-8 bg-muted-foreground" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
          <p>© 2024 TechWave. All rights reserved.</p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-white"
                aria-label={social.label}
              >
                {<social.icon className="h-6 w-6" />}
              </a>
            ))}
          </div>
          <div>
            <p>Website designed by Jamie Yau</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
