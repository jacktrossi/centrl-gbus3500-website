export function Mark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15.6 6.6a6.1 6.1 0 1 0 .15 10.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="17.55" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}
