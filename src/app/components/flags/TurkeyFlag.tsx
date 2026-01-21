export function TurkeyFlag({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#E30A17"/>
      <circle cx="9" cy="8" r="3.5" fill="white"/>
      <circle cx="10.5" cy="8" r="2.8" fill="#E30A17"/>
      <path d="M14 6.5L13 8.5L14.8 8.2L13.5 9.8L15 10L13.5 11L14.8 11.2L13 11.5L14 13.5L12.5 12L12 14L11.5 12L10 13.5L11 11.5L9.2 11.2L10.5 11L9 10L10.5 9.8L9.2 8.2L11 8.5L10 6.5L11.5 8L12 6L12.5 8L14 6.5Z" fill="white"/>
    </svg>
  );
}
