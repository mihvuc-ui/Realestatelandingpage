export function UKFlag({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="16" fill="#012169"/>
      <path d="M0 0L24 16M24 0L0 16" stroke="white" strokeWidth="3"/>
      <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.8"/>
      <path d="M12 0V16M0 8H24" stroke="white" strokeWidth="5"/>
      <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="3"/>
    </svg>
  );
}
