import Slider from "react-slick";
import type { CustomArrowProps, Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import a_img from "../../../assets/homepage/works/A.png";
import b_img from "../../../assets/homepage/works/B.png";
import c_img from "../../../assets/homepage/works/C.png";
import arrow_btn from "../../../assets/homepage/works/arrow_btn.svg";

type Work = {
  id: number;
  award: string;
  name: string;
  img: string;
};

const works_2021: Work[] = [
  {
    id: 1,
    award: "最佳新聞創新體驗",
    name: "我們只是想要一個家，為什麼那麼難？",
    img: a_img,
  },
  {
    id: 2,
    award: "最佳新聞受眾洞察",
    name: "食光島",
    img: b_img,
  },
  {
    id: 3,
    award: "最佳新聞創新體驗",
    name: "被遺忘的目擊者",
    img: c_img,
  },
  {
    id: 4,
    award: "最佳新聞創心心心",
    name: "我是名字我是名字我是名字",
    img: b_img,
  },
];

const PrevArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <div
      className="absolute left-[-72px] top-1/2 z-10 block h-5 w-5 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-[0] leading-none text-transparent outline-none max-[1440px]:bottom-[-64px] max-[1440px]:left-[calc(50%-48px-12px)] max-[1440px]:top-auto max-[1440px]:translate-y-0 max-[786px]:left-[calc(50%-48px-8px)]"
      onClick={onClick}
    >
      <img src={arrow_btn} alt="prev" />
    </div>
  );
};

const NextArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <div
      className="absolute right-[-72px] top-1/2 z-10 block h-5 w-5 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-[0] leading-none text-transparent outline-none max-[1440px]:bottom-[-64px] max-[1440px]:right-[calc(50%-48px-8px)] max-[1440px]:top-auto max-[1440px]:translate-y-0"
      onClick={onClick}
      style={{ scale: "-1 1" }}
    >
      <img src={arrow_btn} alt="next" />
    </div>
  );
};

const Carousel = () => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="w-fit max-[786px]:self-center">
      <div className="mx-[72px] mt-6 w-[996px] [&_.slick-slide>div]:mx-3">
        <Slider {...settings}>
          {works_2021.map((item) => (
            <div
              className="mb-2.5 flex h-80 w-[308px] flex-col border border-black bg-white px-3 pb-6 pt-3 drop-shadow-[0_10px_0_rgba(0,0,0,0.25)]"
              key={item.id}
            >
              <img className="mb-3" src={item.img} alt={item.name} />
              <div className="flex flex-col px-2 leading-[160%]">
                <p className="text-base">{item.award}</p>
                <p className="text-lg font-bold">{item.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
