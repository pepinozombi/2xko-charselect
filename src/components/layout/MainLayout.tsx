import React from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="p-4 bg-white shadow flex items-center justify-between">
        <h1 className="font-bold text-xl">2xKO Selector</h1>
        <nav className="flex gap-4">
          <a href="/" className="text-blue-500 hover:underline">
            Inicio
          </a>
          {/* <a href="/loading" className="text-blue-500 hover:underline">
            Pantalla de carga
          </a> */}
        </nav>
      </header>

      <main className="flex-1 p-6">{children}</main>

      <footer className="p-4 bg-gray-100 text-center text-sm text-gray-500">
        © 2025 — League 2xKO Selector
      </footer>
    </div>
  );
}