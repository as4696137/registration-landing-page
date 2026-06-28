import number_icon from "../../assets/homepage/info/01/number.svg";
import section_a from "../../assets/homepage/info/01/section_a.svg";
import section_b from "../../assets/homepage/info/01/section_b.svg";
import section_c from "../../assets/homepage/info/01/section_c.svg";
import { SectionTitle, Tag, Card } from "../../design-system";
import { MotionGroup, MotionItem, MotionSection } from "./SectionMotion";
const InfoA_section = () => {
  return (
    <MotionSection id="info" className="relative w-full overflow-hidden bg-[#92f590]">
      <MotionGroup className="relative z-20 mx-auto flex h-fit w-fit flex-col items-center px-[140px] pb-[120px] pt-[88px] max-[1440px]:px-11 max-[1440px]:pb-[90px] max-[1440px]:pt-[60px] max-[786px]:px-8 max-[786px]:pb-20 max-[786px]:pt-10">
        <MotionItem>
          <SectionTitle color="brand" className="mb-20">
            賽事説明
          </SectionTitle>
        </MotionItem>
        <MotionItem className="mb-20 flex items-center max-[1440px]:mb-[30px] max-[1440px]:flex-col max-[1440px]:items-start max-[1440px]:gap-y-4 max-[786px]:mb-10">
          <div className="relative h-fit w-fit pr-6">
            <img
              className="title-shadow-md max-[1440px]:w-[106px]"
              src={number_icon}
              alt=""
            />
            <p className="absolute left-[33px] top-[37px] font-display text-4xl leading-[120%] max-[1440px]:left-[22px] max-[1440px]:top-[25px]">
              01
            </p>
          </div>
          <SectionTitle
            as="h3"
            size="md"
            color="white"
            className="[&_br]:hidden max-[786px]:[&_br]:block"
          >
            創新三大獎項,
            <br />
            定義新世代的超讚新聞
          </SectionTitle>
        </MotionItem>

        <MotionGroup className="flex flex-wrap justify-center gap-x-[22px] gap-y-10 max-[1440px]:gap-x-0 max-[768px]:gap-y-8">
          <MotionItem className="relative flex w-[358px] flex-col">
            <Tag color="teal" className="mb-[260px]">
              最佳新聞受眾洞察獎
            </Tag>
            <img className="absolute left-[53px] top-[88px] -z-10" src={section_a} alt="" />
            <Card className="w-[300px] self-end">
              <p className="mb-2 text-xl font-bold">「新聞要對誰說話？」</p>
              <p>
                找出新聞議題背後的受衆，撬動他們心裡真正關注的事物，讓議題跟受眾，產生連結。
              </p>
            </Card>
          </MotionItem>

          <MotionItem className="relative flex w-[358px] flex-col">
            <Tag color="pink" className="mb-[260px]">
              最佳新聞策略創意獎
            </Tag>
            <img className="absolute left-20 top-[78px] -z-10" src={section_b} alt="" />
            <Card className="w-[300px] self-end">
              <p className="mb-2 text-xl font-bold">「新聞怎麼說話？」</p>
              <p>
                以策略觀點切入新聞議題，並透過適當的創意手法包裝，引起受眾的興趣。
              </p>
            </Card>
          </MotionItem>

          <MotionItem className="relative flex w-[358px] flex-col">
            <Tag color="yellow" className="mb-[260px]">
              最佳新聞體驗創新獎
            </Tag>
            <img className="absolute left-[26px] top-[78px] -z-10" src={section_c} alt="" />
            <Card className="w-[300px] self-end">
              <p className="mb-2 text-xl font-bold">「新聞用什麼說話？」</p>
              <p>
                打破新聞形式的框架，找到最適合此一議題的載體，讓受眾有更不同的閱聽體驗。
              </p>
            </Card>
          </MotionItem>
        </MotionGroup>
      </MotionGroup>
      <div className="grid-bg-blue absolute left-0 top-0 z-10 h-full w-full opacity-25"></div>
    </MotionSection>
  );
};

export default InfoA_section;
