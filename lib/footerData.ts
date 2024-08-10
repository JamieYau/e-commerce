import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io5";

export const quickLinks = [
//   { href: "/about", label: "About Us" },
//   { href: "/contact", label: "Contact Us" },
//   { href: "/terms", label: "Terms of Service" },
//   { href: "/privacy", label: "Privacy Policy" },
  { href: "/attributions", label: "Attributions" },
] as const;

export const socialLinks = [
  {
    href: "#",
    label: "Facebook",
    icon: IoLogoFacebook,
  },
  {
    href: "#",
    label: "Twitter",
    icon: IoLogoTwitter,
  },
  {
    href: "#",
    label: "Instagram",
    icon: IoLogoInstagram,
  },
] as const;
