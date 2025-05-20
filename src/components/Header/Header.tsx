"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/popular", label: "Popular" },
  { href: "/now-playing", label: "Now Playing" },
  { href: "/top-rated", label: "Top Rated" },
  { href: "/my-favourites", label: "Favorites" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra menú al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Título */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="text-2xl font-extrabold text-white">
            Home
          </Link>
        </motion.div>

        {/* Botón móvil */}
        <button
          className="md:hidden text-white p-2 rounded hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Menú escritorio */}
        <nav className="hidden md:flex space-x-6">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <motion.div
                key={href}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: links.indexOf({ href, label }) * 0.05,
                }}
              >
                <Link
                  href={href}
                  className={clsx(
                    "relative text-white font-medium py-1 hover:text-blue-400 transition-colors",
                    active &&
                      "text-blue-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-400"
                  )}
                >
                  {label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/95"
          >
            <ul className="flex flex-col px-4 py-2 space-y-2">
              {links.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={clsx(
                        "block text-white py-2 px-3 rounded hover:bg-white/10 transition",
                        active && "bg-blue-400 text-black"
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
