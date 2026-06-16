import logo from "../assets/logo.svg";
import fb_icon from "../assets/footer/fb.svg";
import topArrow_icon from "../assets/footer/arrow-up.svg";
import star_icon from "../assets/footer/star.svg";

const Footer = () => {
  return (
    <footer className="relative flex w-full flex-col justify-between overflow-hidden bg-black py-12 pl-40 pr-0 max-[768px]:pl-6">
      <div>
        <div className="relative z-20 w-[210px] pb-10">
          <img src={logo} alt="" />
        </div>

        <p className="relative z-10 pb-[18px] text-2xl text-white">
          firstvoiceawards@gmail.com
        </p>

        <div>
          <img src={fb_icon} alt="" />
        </div>
      </div>

      <p className="relative z-10 mt-[162px] text-lg text-white">
        Copyright © CHUSHENG.GAMANIA, all rights reserved.
      </p>

      <p className="absolute bottom-10 right-40 z-10 flex items-center text-lg max-[768px]:right-6">
        go to top{" "}
        <span className="ml-3 flex h-10 w-10 items-center justify-center rounded-full border border-black bg-white">
          <img src={topArrow_icon} alt="" />
        </span>
      </p>

      <div className="absolute right-0 top-20">
        <img src={star_icon} alt="" />
      </div>
    </footer>
  );
};

export default Footer;
