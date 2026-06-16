import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";
import { scrollToSection } from "../utils/scrollTo";
import { usePageTransition } from "./PageTransitionContext";
import StarPolygon from "./StarPolygon";

const navItems = [
  { label: "關於初聲", target: "about" },
  { label: "賽事說明", target: "info" },
  { label: "2021 入圍作品", target: "works" },
  { label: "報名詳情", target: "details" },
];

const RotatingStarBackground = () => (
  <span className="pointer-events-none absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 max-[1440px]:h-[72px] max-[1440px]:w-[72px]">
    <StarPolygon
      className="star-bg-spin absolute left-[10%] top-[10%] h-full w-full"
      fill="black"
      stroke="none"
      opacity={0.25}
    />
    <StarPolygon className="star-bg-spin absolute left-0 top-0 h-full w-full" />
  </span>
);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { navigateWithTransition } = usePageTransition();

  const handleTransitionClick = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    navigateWithTransition(to, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      size: Math.max(rect.width, rect.height),
    });
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // 不在首頁時導回首頁，並透過 state 讓 HomePage 在繪製前就定位到該 section（避免閃爍）
      navigate("/", { state: { scrollTo: id } });
    } else {
      scrollToSection(id);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-end bg-black">
      <Link to="/" onClick={handleLogoClick}>
        <img
          className="mb-5 ml-40 mr-10 mt-9 max-[1440px]:mb-3 max-[1440px]:ml-6 max-[1440px]:mt-5"
          src={logo}
          alt="logo"
        />
      </Link>
      <div className="flex max-[1440px]:hidden">
        {navItems.map((item) => (
          <a
            key={item.target}
            href={`#${item.target}`}
            onClick={(e) => handleNavClick(e, item.target)}
            className="px-3 pb-5 pt-6 text-base text-white hover:border-b-4 hover:border-[#ffff00] hover:pb-4 hover:text-[#ffff41]"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="absolute bottom-[-50px] right-[11%] flex gap-3 max-[1440px]:bottom-[-40px] max-[1440px]:right-0 max-[1440px]:gap-1 max-[1440px]:pr-[43px] max-[768px]:bottom-[-20px] max-[768px]:pr-4">
        <Link
          to="/register"
          onClick={(e) => handleTransitionClick(e, "/register")}
          className="relative flex h-[100px] w-[100px] items-center justify-center text-center font-medium max-[1440px]:h-[72px] max-[1440px]:w-[72px]"
        >
          <RotatingStarBackground />
          <span className="z-10 leading-[140%] max-[1440px]:px-5">
            點我報名
          </span>
        </Link>
        <Link
          to="/submit"
          onClick={(e) => handleTransitionClick(e, "/submit")}
          className="relative flex h-[100px] w-[100px] items-center justify-center font-medium max-[1440px]:h-[72px] max-[1440px]:w-[72px]"
        >
          <RotatingStarBackground />
          <span className="z-10 leading-[140%] max-[1440px]:px-5">交件專區</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
