import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

// ---- Footer assets ----
const footerLogo = "/home/drishti-logo.png";
const footerMap = "/home/drishti-logo.png";

const pageLinks = [
  { label: "Home", href: "#home" },
  { label: "Workshops", href: "#workshops" },
  { label: "Competitions", href: "#competitions" },
  { label: "Daksha", href: "#daksha" },
  { label: "Team", href: "#team" },
  { label: "About Us", href: "#about" },
];

const contactDetails = [
  { label: "drishti@cet.ac.in", href: "mailto:drishti@cet.ac.in" },
  { label: "Karun Tony : +91 9958541161", href: "tel:+919958541161" },
  { label: "Karun Tony : +91 9958541161", href: "tel:+919958541161" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FaFacebook },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "LinkedIn", href: "#", Icon: FaLinkedin },
  { label: "YouTube", href: "#", Icon: FaYoutube },
];

function Footer() {
  return (
    <footer className="w-full bg-[#383838] px-11 py-16" aria-label="Site footer">
      <div className="mx-auto flex max-w-[1352px] flex-wrap justify-between gap-16">
        {/* Brand + blurb */}
        <div className="max-w-[269px]">
          <div className="mb-3 flex items-center gap-2">
            <img
              className="h-[39px] w-[41px] object-contain"
              alt="Drishti"
              src={footerLogo}
            />
            <p className="font-['Satoshi-Bold',Helvetica] text-[15px] font-bold leading-[normal] text-[#999]">
              Drishti 2026
            </p>
          </div>
          <p className="font-['Satoshi-Medium',Helvetica] text-xs font-normal leading-[normal] text-[#999]">
            Lorem ipsum dolor sit amet consectetur. Pulvinar amet nunc arcu
            mauris lectus mauris enim feugiat. Blandit in nulla in non. Morbi
            et aliquam egestas enim in eget nisl pharetra. Massa justo sed
            fermentum odio.
          </p>
        </div>

        {/* Pages */}
        <nav aria-label="Footer navigation">
          <p className="mb-4 font-['Satoshi-Medium',Helvetica] text-[15px] font-normal leading-[normal] text-[#b7b7b7]">
            Pages
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {pageLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-['Satoshi-Medium',Helvetica] text-xs font-normal leading-[normal] text-[#b7b7b7] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="mb-4 font-['Satoshi-Medium',Helvetica] text-[15px] font-normal leading-[normal] text-[#9a9a9a]">
            Contact
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {contactDetails.map((contact, index) => (
              <li key={index}>
                <a
                  href={contact.href}
                  className="font-['Satoshi-Medium',Helvetica] text-xs font-normal leading-[normal] text-[#a4a4a4] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-3" aria-label="Social media links">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[#b7b7b7] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Icon size={20} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="mb-4 font-['Satoshi-Medium',Helvetica] text-[15px] font-normal leading-[normal] text-[#9a9a9a]">
            Location
          </p>
          <a
            href="https://maps.google.com/?q=College+of+Engineering+Trivandrum"
            target="_blank"
            rel="noreferrer"
            className="block h-[244px] w-[191px] overflow-hidden rounded-xl bg-[#676767] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <img
              className="h-full w-full object-cover"
              alt="Map location of College of Engineering Trivandrum"
              src={footerMap}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;