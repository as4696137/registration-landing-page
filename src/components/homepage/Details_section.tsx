import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import info_img from "../../assets/homepage/details/info.svg";
import download_img from "../../assets/homepage/details/download.svg";
import bg_star_a from "../../assets/homepage/details/bg_star_a.svg";
import bg_star_b from "../../assets/homepage/details/bg_star_b.svg";
import { MotionGroup, MotionItem, MotionSection } from "./SectionMotion";

const Details_section = () => {
  return (
    <MotionSection id="details" className="relative w-full overflow-hidden bg-[#0000ff]">
      <MotionGroup className="relative z-10 mx-auto flex w-fit flex-col px-40 pb-40 pt-[88px] max-[1440px]:w-full max-[1440px]:px-[84px] max-[1440px]:pb-40 max-[1440px]:pt-[95px] max-[786px]:px-2 max-[786px]:pb-20 max-[786px]:pt-10">
        <MotionItem className="max-[1440px]:self-center">
          <h2 className="title-shadow-lg stroke-black mb-16 font-display text-[80px] leading-[120%] text-white max-[1440px]:text-[65px] max-[1440px]:title-shadow-sm max-[786px]:text-5xl">
            報名詳情
          </h2>
        </MotionItem>

        <MotionGroup className="mb-10 flex gap-x-5 max-[1440px]:w-full max-[1440px]:flex-col max-[1440px]:gap-y-5 max-[786px]:mx-4 max-[786px]:mb-0 max-[786px]:px-6 max-[786px]:py-10">
          {renderInfoCard(
            "參賽資格：",
            "全球未滿 28 歲， 新聞領域的青年從業人員、 不分科系的大專院校與研究所學生 對於製作新世代好新聞有興趣者。",
            "eligibility-1",
          )}
          {renderInfoCard(
            "參賽資格：",
            "全球未滿 28 歲， 新聞領域的青年從業人員、 不分科系的大專院校與研究所學生 對於製作新世代好新聞有興趣者。",
            "eligibility-2",
          )}
          {renderInfoCard(
            "團隊人數：",
            "1～6 人，不分個人、團體組。 鼓勵組成新聞結合行銷、設計等專業 跨領域合作的新聞團隊。 所有團隊成員年齡皆需於 2022/07/11 初聲新聞獎收件截止前未滿 28 歲。",
            "team-size",
          )}
        </MotionGroup>

        <MotionGroup className="flex w-[1120px] flex-col border border-black bg-white p-10 drop-shadow-[0_10px_0_rgba(0,0,0,0.25)] max-[1440px]:w-full max-[1440px]:px-[50px] max-[1440px]:py-6 max-[786px]:px-6 max-[786px]:py-4">
          <MotionItem>
            <p className="text-2xl font-bold leading-[160%]">報名及交件流程：</p>
          </MotionItem>

          <MotionGroup className="px-6 max-[1440px]:px-4">
            {renderStep(
              "01",
              <>點選下方「點我報名」按鈕，填寫基本資料完成報名（報名期限：2022/5/25前）</>,
            )}
            {renderStep("02", <>到報名者填寫的聯絡信箱中，收取報名編號 </>)}
            {renderStep(
              "03",
              <>點選下方「交件專區」按鈕，輸入報名編號即可開始交件（交件期限：2022/7/11前）{" "}</>,
            )}
            {renderStep(
              "04",
              <>於交件過程中最後確認報名資料無誤、填寫該獎項的策略單並上傳檔案，即完成交件{" "}</>,
            )}
          </MotionGroup>

          <MotionItem className="self-center">
            <button className="mt-6 flex items-center bg-[#0000ff] px-6 pb-3.5 pt-3 text-white drop-shadow-[0_5px_0_rgba(0,0,0,0.25)] max-[1440px]:text-base">
              交件策略單參考{" "}
              <span className="pl-2">
                <img src={download_img} alt="" />
              </span>
            </button>
          </MotionItem>
        </MotionGroup>

        <MotionGroup className="mt-10 flex w-[1120px] gap-x-5 max-[1440px]:w-full max-[1440px]:flex-col max-[1440px]:gap-y-[30px] max-[1440px]:px-[25px] max-[786px]:gap-y-4 max-[786px]:px-4">
          <MotionItem className="w-full">
            <Link
              to="/register"
              className="block w-full bg-[#ffff41] py-4 text-center text-xl font-bold leading-[120%] drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]"
            >
              點我報名（3/1-5/25）
            </Link>
          </MotionItem>
          <MotionItem className="w-full">
            <Link
              to="/submit"
              className="block w-full bg-[#ffff41] py-4 text-center text-xl font-bold leading-[120%] drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]"
            >
              交件專區（3/1-7/10）
            </Link>
          </MotionItem>
        </MotionGroup>
      </MotionGroup>

      <div className="grid-bg-black absolute left-0 top-0 z-[1] h-full w-full"></div>
      <img className="absolute right-[-80px] top-0 z-[1]" src={bg_star_a} alt="" />
      <img className="absolute left-[-160px] top-[676px] z-[1]" src={bg_star_b} alt="" />
    </MotionSection>
  );
};

const renderInfoCard = (title: string, description: string, key: string) => (
  <MotionItem
    className="relative px-10 pb-[75px] pt-[19px] max-[1440px]:h-[212px] max-[1440px]:w-full max-[1440px]:border max-[1440px]:border-black max-[1440px]:bg-white max-[1440px]:px-[38px] max-[1440px]:pb-20 max-[1440px]:pt-[30px]"
    key={key}
  >
    <div className="flex h-[206px] w-[280px] flex-col leading-[160%] max-[1440px]:w-full">
      <p className="mb-3 text-2xl font-bold">{title}</p>
      <p>{description}</p>
    </div>
    <img
      className="absolute left-0 top-0 -z-10 drop-shadow-[0_15px_0_rgba(0,0,0,0.25)] max-[1440px]:hidden"
      src={info_img}
      alt=""
    />
  </MotionItem>
);

const renderStep = (number: string, children: ReactNode) => (
  <MotionItem
    className="mt-6 flex items-center border-b-2 border-[#0000ff] pb-4 max-[1440px]:flex-col max-[1440px]:items-start max-[1440px]:gap-y-2"
    key={number}
  >
    <p className="stroke-black w-[100px] font-display text-5xl leading-[120%] text-[#ffff41] max-[1440px]:px-2 max-[1440px]:text-2xl">
      {number}
    </p>
    <p className="pl-6 text-xl font-bold leading-[120%] max-[1440px]:px-2 max-[1440px]:text-base">
      {children}
    </p>
  </MotionItem>
);

export default Details_section;
