import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Library", href: "/library" },
  { label: "About", href: "/about" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-200/10 bg-[#050814]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-[0.18em] text-cyan-100">
          LILAC LAB
        </Link>
        <nav className="flex gap-1 overflow-x-auto text-sm text-slate-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 transition hover:bg-cyan-300/10 hover:text-cyan-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
