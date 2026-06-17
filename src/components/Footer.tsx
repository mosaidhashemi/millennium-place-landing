import ScrollReveal from "./ScrollReveal";
import CookieSettingsLink from "./consent/CookieSettingsLink";

const footerLinks = {
  "Millennium Place": [
    { label: "Über uns", href: "#" },
    { label: "Karriere", href: "#" },
    { label: "Presse", href: "#" },
    { label: "Partner werden", href: "#" },
  ],
  Events: [
    { label: "Hochzeiten", href: "/events/hochzeiten" },
    { label: "Firmenveranstaltungen", href: "/events/firmenveranstaltungen" },
    { label: "Steakhouse", href: "/#restaurant" },
    { label: "Räume", href: "/#raeume" },
  ],
  Service: [
    { label: "Event anfragen", href: "/#kontakt" },
    { label: "Pakete & Preise", href: "/#preise" },
    { label: "FAQ", href: "/#faq" },
    { label: "Galerie", href: "/#galerie" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 px-6 border-t border-midnight-800/30">
      <div className="absolute inset-0 bg-midnight-950" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full border border-gold-400/50 flex items-center justify-center">
                  <span className="font-heading text-gold-400 text-xl">M</span>
                </div>
                <span className="font-heading text-xl text-gold-100">
                  Millennium Place
                </span>
              </div>
              <p className="text-midnight-400 font-light text-sm leading-relaxed mb-6">
                Premium Event & Dining Destination
                <br />
                Lorch am Rhein, Rheingau
                <br />
                Ab 2026
              </p>
              <div className="flex gap-4">
                {["Instagram", "LinkedIn", "Facebook"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-midnight-500 hover:text-gold-400 transition-colors text-sm"
                    aria-label={social}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {Object.entries(footerLinks).map(([title, links], i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div>
                <h4 className="text-gold-300 font-medium text-sm tracking-wider uppercase mb-6">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-midnight-400 hover:text-gold-200 transition-colors text-sm font-light"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="border-t border-midnight-800/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-midnight-600 text-xs">
            &copy; 2026 Millennium Place. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a
              href="/impressum"
              className="text-midnight-500 hover:text-gold-300 text-xs transition-colors"
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="text-midnight-500 hover:text-gold-300 text-xs transition-colors"
            >
              Datenschutz
            </a>
            <a
              href="/agb"
              className="text-midnight-500 hover:text-gold-300 text-xs transition-colors"
            >
              AGB
            </a>
            <a
              href="/verbraucherinformationen"
              className="text-midnight-500 hover:text-gold-300 text-xs transition-colors"
            >
              Verbraucherinformationen
            </a>
            <CookieSettingsLink className="text-midnight-500 hover:text-gold-300 text-xs transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
