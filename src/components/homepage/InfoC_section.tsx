import number_icon from "../../assets/homepage/info/01/number.svg";
import A from "../../assets/homepage/info/03/A.png";
import B from "../../assets/homepage/info/03/B.png";
import C from "../../assets/homepage/info/03/C.png";
import { MotionGroup, MotionItem, MotionSection } from "./SectionMotion";

const InfoC_section = () => {
  return (
    <MotionSection className="relative w-full overflow-hidden bg-[#9bf3e0]">
      <MotionGroup className="relative z-10 mx-auto flex h-fit w-fit flex-col items-center pb-[120px] pt-[88px] max-[786px]:m-0 max-[786px]:w-full">
        <MotionItem className="mb-20 flex items-center max-[1440px]:mb-[94px] max-[1440px]:flex-col max-[1440px]:items-start max-[1440px]:gap-y-4 max-[786px]:mb-[78px] max-[786px]:px-8">
          <div className="relative h-fit w-fit pr-6">
            <img
              className="title-shadow-md max-[1440px]:w-[106px]"
              src={number_icon}
              alt=""
            />
            <p className="absolute left-[33px] top-[37px] font-display text-4xl leading-[120%] max-[1440px]:left-[18px] max-[1440px]:top-[25px]">
              03
            </p>
          </div>
          <h3 className="title-shadow-md stroke-black font-display text-5xl leading-[120%] text-white max-[1440px]:text-[40px] [&_br]:hidden max-[786px]:[&_br]:block">
            獨家獎勵，
            <br />
            百萬流量+萬元獎金
          </h3>
        </MotionItem>

        <MotionGroup className="relative mb-[91px] max-[1440px]:mb-[85px] max-[1440px]:w-fit max-[786px]:mb-14 max-[786px]:w-full max-[786px]:px-2">
          <MotionItem className="absolute left-1/2 top-[-56px] z-10 max-[1440px]:top-[-54px]">
            <span className="flex -translate-x-1/2 whitespace-nowrap border border-black bg-[#ffff41] px-10 py-4 font-display text-[40px] leading-[120%] drop-shadow-[0_10px_0_rgba(0,0,0,0.25)] max-[1440px]:flex-col max-[1440px]:px-[104px] max-[1440px]:text-[32px] max-[786px]:px-4">
              <span>各獎項首獎獎金</span>
              <span>NT$20,000</span>
            </span>
          </MotionItem>

          <MotionGroup className="flex h-fit w-fit gap-x-[63px] border border-black bg-white px-16 py-12 drop-shadow-[0_10px_0_rgba(0,0,0,1)] max-[1440px]:w-[600px] max-[1440px]:flex-col max-[1440px]:gap-y-6 max-[1440px]:px-6 max-[1440px]:pb-6 max-[1440px]:pt-20 max-[786px]:w-full">
            {renderRewardCard(A, "志祺七七", "平均觀看超過十萬", "單集一分鐘曝光介紹得獎作品")}
            {renderRewardCard(B, "敏迪國際選讀", "每集首週可達到17萬播放", "專訪一集介紹得獎作品及團隊")}
          </MotionGroup>
        </MotionGroup>

        <MotionGroup className="relative max-[786px]:w-full max-[786px]:px-2">
          <MotionItem className="absolute left-[-40px] top-[-30px] z-10 max-[1440px]:top-[-24px] max-[786px]:left-1/2">
            <span className="block whitespace-nowrap border border-black bg-[#9bf3e0] px-4 py-2 text-2xl font-bold leading-[120%] drop-shadow-[0_10px_0_rgba(0,0,0,0.25)] max-[1440px]:text-xl max-[1440px]:drop-shadow-[0_5px_0_rgba(0,0,0,0.25)] max-[786px]:-translate-x-1/2">
              2021年流量獎品
            </span>
          </MotionItem>

          <MotionGroup className="flex h-fit w-fit gap-x-10 border border-black bg-[#9bf3e0] px-10 py-12 drop-shadow-[0_10px_0_rgba(0,0,0,0.25)] max-[1440px]:flex-col max-[1440px]:gap-y-[26px] max-[1440px]:px-[142px] max-[1440px]:py-10 max-[786px]:w-full max-[786px]:px-6 max-[786px]:pb-6">
            {renderTrafficCard(A, "志祺七七", "一分鐘片段介紹得獎作品")}
            {renderTrafficCard(C, "台通", "一分鐘片段介紹得獎作品")}
          </MotionGroup>
        </MotionGroup>
      </MotionGroup>
      <div className="grid-bg-blue absolute left-0 top-0 h-full w-full opacity-25"></div>
    </MotionSection>
  );
};

const renderRewardCard = (
  image: string,
  title: string,
  subtitle: string,
  description: string,
) => (
  <MotionItem className="flex items-center max-[1440px]:flex-col" key={title}>
    <div className="mr-6 h-[180px] w-[180px] overflow-hidden rounded-full border border-black bg-[#ffff41] p-2.5 drop-shadow-[0_10px_0_rgba(0,0,0,0.25)] max-[1440px]:mb-4 max-[1440px]:mr-0 max-[1440px]:h-[120px] max-[1440px]:w-[120px] max-[1440px]:p-1.5 max-[1440px]:[&_img]:w-full">
      <img src={image} alt="" />
    </div>
    <div className="flex w-[280px] flex-col border border-black bg-[#ffff41] p-5 leading-[160%] drop-shadow-[0_10px_0_rgba(0,0,0,1)] max-[1440px]:w-full max-[1440px]:px-0 max-[1440px]:py-4 max-[1440px]:text-center max-[1440px]:drop-shadow-[0_5px_0_rgba(0,0,0,1)]">
      <p className="mb-2 text-xl font-bold">{title}</p>
      <p className="mb-2 text-xl font-bold">{subtitle}</p>
      <p>{description}</p>
    </div>
  </MotionItem>
);

const renderTrafficCard = (image: string, title: string, description: string) => (
  <MotionItem className="flex items-center" key={title}>
    <div className="mr-4 flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-full border border-black bg-white p-2.5 drop-shadow-[0_10px_0_rgba(0,0,0,0.25)] max-[1440px]:h-[100px] max-[1440px]:w-[100px] max-[1440px]:shrink-0 max-[1440px]:drop-shadow-[0_5px_0_rgba(0,0,0,0.25)]">
      <img className="h-[120px] w-[120px] max-[1440px]:h-[86px] max-[1440px]:w-[86px]" src={image} alt="" />
    </div>
    <div className="flex w-[200px] flex-col border border-black bg-white px-5 py-4 leading-[160%] drop-shadow-[0_10px_0_rgba(0,0,0,0.25)] max-[1440px]:px-4 max-[1440px]:py-2 max-[1440px]:drop-shadow-[0_5px_0_rgba(0,0,0,0.25)] max-[786px]:w-full">
      <p className="mb-2 text-xl font-bold">{title}</p>
      <p>{description}</p>
    </div>
  </MotionItem>
);

export default InfoC_section;
