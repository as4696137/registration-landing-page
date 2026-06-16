import hero_desktop from "../../assets/homepage/hero/hero_desktop.webp";
import hero_tablet from "../../assets/homepage/hero/hero_tablet.webp";
import hero_moblie from "../../assets/homepage/hero/hero_mobile.webp";

const Hero_section = () => {
  return (
    <section className="relative flex w-full justify-center bg-[#4af864] px-20">
      <picture>
        <source media="(max-width: 786px)" srcSet={hero_moblie} />
        <source media="(max-width: 1440px)" srcSet={hero_tablet} />
        <img src={hero_desktop} alt="Responsive image" />
      </picture>
      <div className="absolute bottom-0 flex w-full overflow-hidden bg-black py-3">
        <div className="inline-block animate-marquee whitespace-nowrap font-bold tracking-[0.2rem] text-[#4af864]">
          {
            "【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】"
          }
        </div>
        <div className="inline-block animate-marquee whitespace-nowrap font-bold tracking-[0.2rem] text-[#4af864]">
          {
            "【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】【新聞要真 也要迷人 好新聞定義2.0】"
          }
        </div>
      </div>
    </section>
  );
};

export default Hero_section;
