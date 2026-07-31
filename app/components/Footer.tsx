import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand"><Image src="/images/app-icon.png" width={34} height={34} alt="" />Fawnly</div>
            <p className="muted footer-tagline">Walk gently. Track beautifully.</p>
          </div>
          <div className="footer-links">
            <a href="https://apps.apple.com/in/app/fawnly/id6783288513">App Store ↗</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>
            <a href="/support">Support</a>
            <a href="/blog">Blog</a>
            <a href="mailto:fawnlyapp@outlook.com">fawnlyapp@outlook.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Fawnly. Made for everyday walking.</span>
          <span>Local-first. No account, ads, or cross-app tracking.</span>
        </div>
      </div>
    </footer>
  );
}
