import bg_star from "../../assets/homepage/about/bg_star.svg";
import bgbox_desktop from "../../assets/homepage/about/bgbox_desktop.svg";
import bgbox_tablet from "../../assets/homepage/about/bgbox_tablet.svg";
import dialogbox_A from "../../assets/homepage/about/dialogbox_A.svg";
import dialogbox_B from "../../assets/homepage/about/dialogbox_B.svg";
import dialogbox_C from "../../assets/homepage/about/dialogbox_C.svg";
import shiny from "../../assets/homepage/about/shiny.svg";
import { MotionItem, MotionSection } from "./SectionMotion";

const About_section = () => {
  return (
    <MotionSection id="about" className="relative w-full overflow-hidden bg-[#0000ff]">
      <MotionItem className="relative z-30 mx-auto mb-[100px] mt-[276px] h-fit w-fit max-[1440px]:mb-[132px] max-[1440px]:mt-[243px] max-[768px]:mb-[79px] max-[768px]:mt-[162px]">
        <h2 className="title-shadow-lg stroke-black absolute left-[-205px] top-[-188px] z-50 whitespace-nowrap font-display text-[80px] leading-[120%] text-white max-[1440px]:left-1/2 max-[1440px]:top-[-183px] max-[1440px]:-translate-x-1/2 max-[1440px]:text-[65px] max-[768px]:top-[-122px] max-[768px]:text-5xl">
          關於初聲
        </h2>
        <h4 className="absolute left-[-44px] top-[-44px] z-40 border border-black bg-[#4af864] px-4 py-2 text-2xl font-bold leading-[160%] drop-shadow-[10px_15px_0_rgba(0,0,0,0.25)] max-[1440px]:left-[-20px] max-[768px]:left-0 max-[768px]:top-[-24px] max-[768px]:text-xl">
          為什麼新聞要真，也要 #迷人？
        </h4>
        <div className="z-20 h-fit w-fit">
          <div className="relative z-10 block w-[560px] border border-black bg-white p-10 text-lg leading-[160%] drop-shadow-[10px_15px_0_rgba(0,0,0,0.25)] max-[786px]:mx-2 max-[786px]:hidden max-[786px]:w-fit">
            我們相信，優質的新聞內容是被世界需要的。
            <br />
            但在碎片化的數位時代，
            <br />
            新聞必須跟更多媒介競爭人們的注意力。
            <br />
            當新聞真實的基礎結合了行銷性，
            <br />
            便可能讓更多閱聽人注意，
            <br />
            進一步理解新聞背後的議題，
            <br />
            讓新聞的意義得以發揮。
            <br />
            <br />
            2022，初聲新聞獎來到了第二屆，
            <br />
            鼓勵每一個對新聞有熱情、想法和企圖的你，
            <br />
            出聲定義新時代的好新聞。
          </div>
          <img
            className="absolute left-[-240px] top-[-116px] block max-[1440px]:hidden"
            src={bgbox_desktop}
            alt=""
          />
          <img
            className="absolute left-[-64px] top-[-66px] hidden max-[1440px]:block max-[786px]:hidden"
            src={bgbox_tablet}
            alt=""
          />
          <img
            className="absolute left-[300px] top-[-172px] max-[1440px]:left-[445px] max-[1440px]:top-[-118px] max-[786px]:hidden"
            src={dialogbox_A}
            alt=""
          />
          <img
            className="absolute left-[-369px] top-10 max-[1440px]:left-[-344px] max-[1440px]:top-[125px] max-[786px]:hidden"
            src={dialogbox_B}
            alt=""
          />
          <img
            className="absolute bottom-[60px] right-[-249px] max-[1440px]:bottom-[26px] max-[1440px]:right-[-247px] max-[786px]:hidden"
            src={dialogbox_C}
            alt=""
          />
          <img
            className="absolute bottom-[37px] left-[-131px] max-[1440px]:bottom-[-96px] max-[1440px]:left-[-71px] max-[786px]:bottom-[-56px] max-[786px]:left-8 max-[786px]:w-12"
            src={shiny}
            alt=""
          />
          <img
            className="absolute bottom-[352px] right-[-280px] w-[88px] scale-x-[-1] max-[1440px]:bottom-[486px] max-[1440px]:right-[-36px] max-[786px]:right-2 max-[786px]:top-[-80px] max-[786px]:w-12"
            src={shiny}
            alt=""
          />

          <div className="relative z-10 hidden w-fit border border-black bg-white p-10 text-lg leading-[160%] drop-shadow-[10px_15px_0_rgba(0,0,0,0.25)] max-[786px]:mx-2 max-[786px]:block">
            我們相信，優質的新聞內容是被世界需要的。 但在碎片化的數位時代，
            新聞必須跟更多媒介競爭人們的注意力。
            <br />
            <br />
            當新聞真實的基礎結合了行銷性， 便可能讓更多閱聽人注意，
            進一步理解新聞背後的議題， 讓新聞的意義得以發揮。
            <br />
            <br />
            2022，初聲新聞獎來到了第二屆，
            鼓勵每一個對新聞有熱情、想法和企圖的你， 出聲定義新時代的好新聞。
          </div>
        </div>
      </MotionItem>
      <div className="grid-bg-black absolute left-0 top-0 z-10 h-full w-full"></div>
      <img className="absolute left-[-116px] top-[-96px] z-[5]" src={bg_star} alt="" />
      <img
        className="absolute bottom-[-164px] right-[-157px] z-[5] w-[596px]"
        src={bg_star}
        alt=""
      />
    </MotionSection>
  );
};

export default About_section;
