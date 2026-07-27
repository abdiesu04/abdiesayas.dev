import Container from "./Container";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Career", href: "#career" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <Container>
        <nav className="flex h-14 items-center justify-between gap-4">
          <a
            href="#top"
            className="label text-[0.625rem] transition-colors hover:text-clay sm:text-[0.6875rem]"
          >
            Abdi Esayas
          </a>

          <ul className="flex items-center gap-4 sm:gap-7">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="label text-[0.625rem] text-ink/55 transition-colors hover:text-clay sm:text-[0.6875rem]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
