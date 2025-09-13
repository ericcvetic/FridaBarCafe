// Inspired by Frida Kahlo's iconic look
export default function FridaLogo({ className }: { className?: string }) {
    return (
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Frida Bar Cafe Logo"
      >
        <g clipPath="url(#clip0_801_2)">
          {/* Face shape */}
          <path
            d="M50 90C66.5685 90 80 76.5685 80 60C80 43.4315 66.5685 30 50 30C33.4315 30 20 43.4315 20 60C20 76.5685 33.4315 90 50 90Z"
            stroke="currentColor"
            strokeWidth="4"
          />
          {/* Unibrow */}
          <path
            d="M35 52C37.5 48.5 45.3333 46.5 50 46.5C54.6667 46.5 62.5 48.5 65 52"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Hair parting */}
          <path d="M50 30V40" stroke="currentColor" strokeWidth="4" />
          {/* Flowers */}
          <circle cx="50" cy="25" r="8" fill="hsl(var(--primary))" stroke="currentColor" strokeWidth="3" />
          <circle cx="38" cy="30" r="6" fill="hsl(var(--accent))" stroke="currentColor" strokeWidth="3" />
          <circle cx="62" cy="30" r="6" fill="hsl(var(--accent))" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="25" r="3" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_801_2">
            <rect width="100" height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
  