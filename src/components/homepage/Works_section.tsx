import { useState } from "react";
import Carousel from "./widget/Carousel";
import CustomSelect, { type SelectOption } from "./widget/CustomSelect";
import bg_star from "../../assets/homepage/works/bg_star.svg";

// 假設這是您的選項數據
const options = [
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
];

const Works_section = () => {
  const [selected, setSelected] = useState<SelectOption | null>(null);

  return (
    <section id="works" className="relative w-full overflow-hidden bg-[#4af864]">
      <div className="relative z-10 mx-auto flex h-fit w-full flex-col px-40 pb-[114px] pt-[88px] max-[1440px]:px-40 max-[1440px]:pb-[188px] max-[1440px]:pt-[54px] max-[786px]:px-0 max-[786px]:pb-[168px] max-[786px]:pt-10">
        <h3 className="title-shadow-md stroke-black font-display text-[80px] leading-[120%] text-white max-[1440px]:flex max-[1440px]:flex-col max-[1440px]:items-center max-[1440px]:text-[65px] max-[1440px]:title-shadow-sm max-[786px]:text-5xl">
          <span>2021</span>
          <span>入圍作品</span>
        </h3>
        <div className="mt-16 flex w-fit flex-col self-center max-[1440px]:mt-[35px] max-[786px]:mt-6 max-[786px]:w-full">
          <div className="self-end max-[1440px]:self-center max-[786px]:w-full max-[786px]:px-6">
            <CustomSelect
              options={options}
              selectedOption={selected}
              setSelectedOption={setSelected}
              placeholder="入圍年份"
              className="w-[200px] max-[1440px]:w-[327px] max-[786px]:w-full"
            />
          </div>
          <Carousel />
        </div>
      </div>
      <div className="grid-bg-blue absolute left-0 top-0 h-full w-full opacity-25"></div>
      <img className="absolute left-[-80px] top-px z-[1]" src={bg_star} alt="" />
    </section>
  );
};

export default Works_section;
