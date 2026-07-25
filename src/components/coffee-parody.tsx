"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export function CoffeeParody({
  onActiveChange,
}: {
  onActiveChange?: (active: boolean) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const light = revealRef.current;
    if (!el || !light) return;

    const sync = () => {
      const rect = light.getBoundingClientRect();
      const vh = window.innerHeight;

      // Header только пока на экране светлый блок (не космические зоны)
      const active = rect.top < 36 && rect.bottom > vh * 0.42;
      document.documentElement.classList.toggle("coffee-mode", active);
      onActiveChange?.(active);

      const enter = Math.min(
        1,
        Math.max(0, (vh * 0.92 - rect.top) / (vh * 0.75))
      );
      const leave = Math.min(
        1,
        Math.max(0, (rect.bottom - vh * 0.08) / (vh * 0.55))
      );
      const reveal = Math.min(enter, leave);

      el.style.setProperty("--coffee-reveal", reveal.toFixed(3));
      el.style.setProperty(
        "--coffee-fog-top",
        `${Math.max(0, (1 - enter) * 72).toFixed(1)}vh`
      );
      el.style.setProperty(
        "--coffee-fog-bottom",
        `${Math.max(0, (1 - leave) * 56).toFixed(1)}vh`
      );
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.documentElement.classList.remove("coffee-mode");
      onActiveChange?.(false);
    };
  }, [onActiveChange]);

  return (
    <section
      ref={sectionRef}
      id="not-this"
      className="coffee-site relative z-10"
      style={
        {
          fontFamily: "Arial, Helvetica, sans-serif",
          "--coffee-reveal": "0",
          "--coffee-fog-top": "70vh",
          "--coffee-fog-bottom": "40vh",
        } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none relative z-20 h-[22vh] bg-[#030712] sm:h-[28vh] md:h-[32vh]"
      />

      <div ref={revealRef} className="coffee-reveal relative">
        <div
          aria-hidden
          className="coffee-fog-top pointer-events-none absolute inset-x-0 top-0 z-30"
        />
        <div
          aria-hidden
          className="coffee-fog-bottom pointer-events-none absolute inset-x-0 bottom-0 z-30"
        />

        <div className="relative bg-[#f7f2eb] px-4 pb-16 pt-24 text-center sm:px-6 sm:pb-20 sm:pt-28 md:px-12 md:pb-28 md:pt-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #efe2d2 0%, #f7f2eb 50%, #e8d5c0 100%)",
            }}
          />
          <div className="relative mx-auto max-w-xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#6f4e37] sm:text-[12px]">
              Уютная кофейня в центре
            </p>
            <h2 className="text-[26px] font-bold leading-tight text-[#222] sm:text-[32px] md:text-[48px]">
              Сайт для &quot;плюса&quot;
              <br />
              <span className="text-[#ff0000]">не продаёт</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#666] sm:text-[15px] md:text-[17px]">
              Авторские напитки, домашняя выпечка и тёплая атмосфера. Приходите
              за чашкой настроения.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                className="rounded-none bg-[#6f4e37] px-6 py-3 text-[14px] font-medium text-white"
              >
                Смотреть меню
              </button>
              <button
                type="button"
                className="rounded-none border border-[#222] bg-transparent px-6 py-3 text-[14px] font-medium text-[#222]"
              >
                Как нас найти
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 border-t border-[#e8ddd0] bg-white md:grid-cols-3">
          {[
            {
              title: "Зёрна",
              text: "Обжарка каждую неделю — только свежий кофе",
            },
            {
              title: "Десерты",
              text: "Круассаны, чизкейк и сезонная выпечка",
            },
            {
              title: "Wi‑Fi",
              text: "Удобные места для работы и встреч",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border-b border-[#e8ddd0] px-5 py-8 text-center sm:px-6 sm:py-10 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ebe3] text-[#6f4e37]">
                ★
              </div>
              <h3 className="text-[17px] font-bold text-[#222]">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#777]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 bg-[#6f4e37] text-center text-white">
          {[
            ["50+", "сортов"],
            ["7:00", "открыты"],
            ["4.9", "рейтинг"],
          ].map(([n, l]) => (
            <div key={l} className="px-1 py-6 sm:px-2 sm:py-8">
              <div className="text-[18px] font-bold sm:text-[22px] md:text-[32px]">
                {n}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-white/80 sm:text-[11px]">
                {l}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#faf7f3] px-4 py-12 text-center sm:px-6 sm:py-16 md:px-12">
          <h3 className="text-[20px] font-bold text-[#222] sm:text-[24px] md:text-[28px]">
            До сих пор хотите забронировать столик?)
          </h3>
          <p className="mt-2 text-[13px] text-[#777] sm:text-[14px]">
            И мы подтвердим бронь в ближайшее время
          </p>
          <div className="mx-auto mt-6 flex max-w-lg flex-col gap-3">
            <input
              readOnly
              tabIndex={-1}
              placeholder="Ваше имя"
              className="w-full border border-[#ddd] bg-white px-3 py-2.5 text-[14px] text-[#222] outline-none"
            />
            <input
              readOnly
              tabIndex={-1}
              placeholder="Телефон"
              className="w-full border border-[#ddd] bg-white px-3 py-2.5 text-[14px] text-[#222] outline-none"
            />
            <button
              type="button"
              className="w-full bg-[#6f4e37] px-5 py-2.5 text-[14px] font-medium text-white sm:w-auto"
            >
              Отправить
            </button>
          </div>
        </div>

        <div className="bg-[#222] px-4 py-4 text-center text-[10px] leading-relaxed text-white/50 sm:text-[11px]">
          © 2024 COFFEE HOUSE. Все права защищены. Сделано на сами знаете чём
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none relative z-20 h-[20vh] bg-[#030712] sm:h-[24vh] md:h-[28vh]"
      />
    </section>
  );
}
