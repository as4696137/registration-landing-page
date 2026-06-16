import number_icon from "../../assets/homepage/info/01/number.svg";
import a from "../../assets/homepage/info/02/a.png";
import b from "../../assets/homepage/info/02/b.png";
import c from "../../assets/homepage/info/02/c.png";
import d from "../../assets/homepage/info/02/d.png";
const InfoB_section = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#ffff41]">
      <div className="relative z-10 mx-auto flex h-fit w-fit flex-col items-center px-[84px] pb-[94px] pt-[88px]">
        <div className="mb-20 flex items-center max-[1440px]:mb-10 max-[1440px]:flex-col max-[1440px]:items-start max-[1440px]:gap-y-4 max-[786px]:mb-10">
          <div className="relative h-fit w-fit pr-6">
            <img
              className="title-shadow-md max-[1440px]:w-[106px]"
              src={number_icon}
              alt=""
            />
            <p className="absolute left-[30px] top-[37px] font-display text-4xl leading-[120%] max-[1440px]:left-[18px] max-[1440px]:top-[25px]">
              02
            </p>
          </div>
          <h3 className="title-shadow-md stroke-black font-display text-5xl leading-[120%] text-white max-[1440px]:text-[40px] [&_br]:hidden max-[786px]:[&_br]:block">
            跨界專業評審，
            <br />
            兼顧新聞專業與行銷性
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 max-[1440px]:gap-x-[60px] max-[1440px]:gap-y-10 max-[786px]:gap-x-0 max-[786px]:gap-y-8">
          <div className="flex flex-col items-center">
            <div className="mb-6 h-[180px] w-[180px] overflow-hidden rounded-full border border-black bg-white p-2.5 drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]">
              <img src={a} alt="" />
            </div>
            <div className="flex w-[280px] flex-col items-center border border-black bg-white px-2 py-4 leading-[160%] drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]">
              <p className="mb-2 text-xl font-bold">學界權威</p>
              <p className="text-center">
                台灣事實查核教育基金會教育總監
                <br />
                前公廣集團華視新聞部經理
                <br />
                黃兆徽
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-6 h-[180px] w-[180px] overflow-hidden rounded-full border border-black bg-white p-2.5 drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]">
              <img src={b} alt="" />
            </div>
            <div className="flex w-[280px] flex-col items-center border border-black bg-white px-2 py-4 leading-[160%] drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]">
              <p className="mb-2 text-xl font-bold">學界權威</p>
              <p className="text-center">
                政治大學新聞系教授
                <br />
                劉慧雯
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-6 h-[180px] w-[180px] overflow-hidden rounded-full border border-black bg-white p-2.5 drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]">
              <img src={c} alt="" />
            </div>
            <div className="flex w-[280px] flex-col items-center border border-black bg-white px-2 py-4 leading-[160%] drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]">
              <p className="mb-2 text-xl font-bold">新媒體代表</p>
              <p className="text-center">
                自由撰稿人
                <br />
                前端傳媒台灣組主編
                <br />
                何欣潔
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-6 h-[180px] w-[180px] overflow-hidden rounded-full border border-black bg-white p-2.5 drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]">
              <img src={d} alt="" />
            </div>
            <div className="flex w-[280px] flex-col items-center border border-black bg-white px-2 py-4 leading-[160%] drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]">
              <p className="mb-2 text-xl font-bold">數位行銷專業</p>
              <p className="text-center">
                台灣奧美數位事業發展副總
                <br />
                李宛芸
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-bg-blue absolute left-0 top-0 h-full w-full opacity-25"></div>
    </section>
  );
};

export default InfoB_section;
