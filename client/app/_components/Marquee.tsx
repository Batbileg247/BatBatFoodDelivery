export function Marquee() {
  const text = "Fresh fast delivered";

  return (
    <div className="flex w-full overflow-hidden bg-[#EF4444] py-4">
      <div className="flex min-w-full shrink-0 animate-marquee items-center gap-8 pr-8">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-3xl font-bold tracking-wider text-white"
          >
            {text}
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="flex min-w-full shrink-0 animate-marquee items-center gap-8 pr-8"
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-3xl font-bold tracking-wider text-white"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
