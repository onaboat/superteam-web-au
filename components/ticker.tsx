import Image from "next/image";

const tickerItems = [
  "30 MEMBERS",
  "150+ EVENTS",
  "45+ PROJECTS BUILT",
];

function TickerTrack() {
  return (
    <div className="ticker-track flex min-w-max shrink-0 items-center gap-6 px-3 py-3 sm:gap-8 sm:px-4 sm:py-4 lg:gap-10 lg:px-5 lg:py-5">
      {tickerItems.map((item) => (
        <div key={item} className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Image
            src="/build Images/Australia.svg"
            alt=""
            width={42}
            height={42}
            aria-hidden
            className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
          />
          <p className="whitespace-nowrap text-lg leading-none font-black tracking-tight text-black sm:text-2xl lg:text-[30px]">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Ticker() {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      <section className="ticker-tilt relative z-10 -mt-7 w-[calc(100%+64px)] -translate-x-[32px] overflow-hidden bg-chart-1 sm:-mt-4 sm:w-[calc(100%+96px)] sm:-translate-x-[48px] lg:-mt-7 lg:w-[calc(100%+120px)] lg:-translate-x-[60px]">
        <div className="ticker-scroll flex w-max items-center">
          <TickerTrack />
          <TickerTrack />
          <TickerTrack />
        </div>
      </section>
    </div>
  );
}
