import Image from "next/image";

const links = [
  ["Features", "/#features"],
  ["Activities", "/#activities"],
  ["Themes", "/#themes"],
  ["Privacy", "/privacy"],
  ["Updates", "/updates"],
  ["Support", "/support"],
];

export function Header() {
  return (
    <header className="wrap nav">
      <a href="/" className="brand" aria-label="Fawnly home">
        <Image src="/images/app-icon.png" width={34} height={34} alt="" priority />
        Fawnly
      </a>
      <nav className="navlinks" aria-label="Main navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        <a className="btn btn-primary" href="https://apps.apple.com/in/app/fawnly/id6783288513">Download <span aria-hidden="true">↗</span></a>
      </nav>
      <details className="mobile-nav">
        <summary aria-label="Open navigation"><span aria-hidden="true">Menu</span></summary>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a className="btn btn-primary" href="https://apps.apple.com/in/app/fawnly/id6783288513">Download on the App Store</a>
        </nav>
      </details>
    </header>
  );
}
