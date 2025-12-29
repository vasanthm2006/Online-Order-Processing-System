import React, { useEffect, useState } from "react";

const THEMES = [
  { id: 'indigo', label: 'Indigo', className: 'theme-indigo' },
  { id: 'teal', label: 'Teal', className: 'theme-teal' },
  { id: 'coral', label: 'Coral', className: 'theme-coral' },
];

const LOCAL_KEY = 'app_theme';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(LOCAL_KEY) || 'indigo' } catch { return 'indigo' }
  });

  useEffect(() => {
    // Remove old theme classes and add the new one on documentElement
    document.documentElement.classList.remove(...THEMES.map(t => t.className));
    const cls = THEMES.find(t => t.id === theme)?.className || 'theme-indigo';
    document.documentElement.classList.add(cls);
    try { localStorage.setItem(LOCAL_KEY, theme); } catch (err) { /* ignore */ }
  }, [theme]);

  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Color theme">
      {THEMES.map(t => (
        <button
          key={t.id}
          aria-checked={theme === t.id}
          role="radio"
          title={t.label}
          className={`theme-swatch ${theme === t.id ? 'active' : ''}`}
          onClick={() => setTheme(t.id)}
        >
          <span className="sr-only">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
