import hero_desktop from "../../assets/homepage/hero/hero_desktop.webp";
import hero_tablet from "../../assets/homepage/hero/hero_tablet.webp";
import hero_moblie from "../../assets/homepage/hero/hero_mobile.webp";
import { MotionItem, MotionSection } from "./SectionMotion";

const Hero_section = () => {
  return (
    <MotionSection className="relative flex min-h-[calc(100vh-84px)] w-full items-center justify-center overflow-hidden bg-[#4af864] px-10 pb-16 pt-10 max-[1440px]:min-h-[calc(100vh-60px)] max-[786px]:min-h-[620px] max-[786px]:px-4 max-[786px]:pb-14 max-[786px]:pt-6">
      <MotionItem className="relative z-10 flex w-full max-w-[1180px] justify-center">
        <picture>
          <source media="(max-width: 786px)" srcSet={hero_moblie} />
          <source media="(max-width: 1440px)" srcSet={hero_tablet} />
          <img
            className="w-full object-contain drop-shadow-[0_18px_0_rgba(0,0,0,0.16)] max-[786px]:drop-shadow-[0_10px_0_rgba(0,0,0,0.16)]"
            src={hero_desktop}
            alt="Responsive image"
          />
        </picture>
      </MotionItem>
      <MotionItem className="absolute bottom-0 flex w-full overflow-hidden bg-black py-3">
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
      </MotionItem>
    </MotionSection>
  );
};

export default Hero_section;
