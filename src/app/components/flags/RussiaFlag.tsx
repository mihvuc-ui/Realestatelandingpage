export function RussiaFlag({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="5.33" fill="#FFFFFF"/>
      <rect y="5.33" width="24" height="5.33" fill="#0039A6"/>
      <rect y="10.66" width="24" height="5.34" fill="#D52B1E"/>
    </svg>
  );
}
