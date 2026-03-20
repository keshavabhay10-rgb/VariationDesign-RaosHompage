import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-8 bg-bg-secondary border-t border-gold/10">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="font-display text-xl font-semibold text-gold tracking-wide">
          Rao&apos;s
        </Link>

        <span className="text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} Rao&apos;s Bar &amp; Restaurant Ltd. All Rights Reserved.
        </span>

        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=61567812172506"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-gold transition-colors group"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-text-secondary group-hover:fill-gold transition-colors">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/raosbarandrestaurant"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-gold transition-colors group"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-text-secondary group-hover:stroke-gold transition-colors" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
