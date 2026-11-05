// Ikon SVG sederhana yang dipakai di halaman publik.

export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.53 2 2.05 6.47 2.05 11.98c0 1.76.46 3.48 1.34 5L2 22l5.14-1.35a9.96 9.96 0 0 0 4.9 1.25h.01c5.5 0 9.98-4.47 9.98-9.98A9.92 9.92 0 0 0 12.04 2Zm0 18.22h-.01a8.27 8.27 0 0 1-4.21-1.15l-.3-.18-3.05.8.82-2.97-.2-.31a8.24 8.24 0 0 1-1.27-4.4c0-4.57 3.73-8.29 8.3-8.29a8.29 8.29 0 0 1 8.29 8.3c0 4.57-3.72 8.2-8.37 8.2Z" />
    </svg>
  );
}

export function TelegramIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.3 18.9 18.63c-.23 1.01-.83 1.26-1.68.79l-4.63-3.41-2.23 2.15c-.25.25-.45.45-.93.45l.33-4.71 8.58-7.75c.37-.33-.08-.52-.58-.18L7.16 12.64l-4.57-1.43c-.99-.31-1.01-.99.21-1.47L20.65 2.86c.83-.31 1.55.18 1.29 1.44Z" />
    </svg>
  );
}

const strokeProps = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function MailIcon({ className = 'h-5 w-5' }) {
  return <svg className={className} viewBox="0 0 24 24" {...strokeProps} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
}

export function PinIcon({ className = 'h-5 w-5' }) {
  return <svg className={className} viewBox="0 0 24 24" {...strokeProps} aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
}

export function ClockIcon({ className = 'h-5 w-5' }) {
  return <svg className={className} viewBox="0 0 24 24" {...strokeProps} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
}

export function ChatIcon({ className = 'h-5 w-5' }) {
  return <svg className={className} viewBox="0 0 24 24" {...strokeProps} aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg>;
}

export function TrendIcon({ className = 'h-5 w-5' }) {
  return <svg className={className} viewBox="0 0 24 24" {...strokeProps} aria-hidden="true"><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>;
}

export function UsersIcon({ className = 'h-5 w-5' }) {
  return <svg className={className} viewBox="0 0 24 24" {...strokeProps} aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" /></svg>;
}

export function TeacherIcon({ className = 'h-5 w-5' }) {
  return <svg className={className} viewBox="0 0 24 24" {...strokeProps} aria-hidden="true"><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /></svg>;
}

export function AwardIcon({ className = 'h-5 w-5' }) {
  return <svg className={className} viewBox="0 0 24 24" {...strokeProps} aria-hidden="true"><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" /></svg>;
}
