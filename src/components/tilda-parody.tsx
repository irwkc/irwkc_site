"use client";

import { useEffect, useRef } from "react";

export function TildaParody({
  onActiveChange,
}: {
  onActiveChange?: (active: boolean) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const sync = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Чуть раньше, чем «впритык к верху»
      const active = rect.top < 56 && rect.bottom > vh * 0.12;
      document.documentElement.classList.toggle("tilda-mode", active);
      onActiveChange?.(active);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.documentElement.classList.remove("tilda-mode");
      onActiveChange?.(false);
    };
  }, [onActiveChange]);

  return (
    <section
      ref={sectionRef}
      id="not-this"
      className="tilda-site relative z-10"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="relative bg-[#f7f2eb] px-6 pb-20 pt-28 text-center md:px-12 md:pb-28 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #efe2d2 0%, #f7f2eb 50%, #e8d5c0 100%)",
          }}
        />
        <div className="relative mx-auto max-w-xl">
          <p className="mb-3 text-[12px] uppercase tracking-[0.2em] text-[#6f4e37]">
            Уютная кофейня в центре
          </p>
          <h2 className="text-[32px] font-bold leading-tight text-[#222] md:text-[48px]">
            Сайт для &quot;плюса&quot;
            <br />
            <span className="text-[#ff0000]">не продаёт</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#666] md:text-[17px]">
            Авторские напитки, домашняя выпечка и тёплая атмосфера. Приходите за
            чашкой настроения.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
            className="border-b border-[#e8ddd0] px-6 py-10 text-center md:border-b-0 md:border-r md:last:border-r-0"
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
          <div key={l} className="px-2 py-8">
            <div className="text-[22px] font-bold md:text-[32px]">{n}</div>
            <div className="mt-1 text-[11px] uppercase tracking-wider text-white/80">
              {l}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#faf7f3] px-6 py-16 text-center md:px-12">
        <h3 className="text-[24px] font-bold text-[#222] md:text-[28px]">
          До сих пор хотите забронировать столик?)
        </h3>
        <p className="mt-2 text-[14px] text-[#777]">
          И мы подтвердим бронь в ближайшее время
        </p>
        <div className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
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
            className="shrink-0 bg-[#6f4e37] px-5 py-2.5 text-[14px] font-medium text-white"
          >
            Отправить
          </button>
        </div>
      </div>

      <div className="bg-[#222] px-4 py-4 text-center text-[11px] text-white/50">
        © 2024 COFFEE HOUSE. Все права защищены. Сделано на сами знаете чём
      </div>
    </section>
  );
}
