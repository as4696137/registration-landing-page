import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Hero_section from "../components/homepage/Hero_section";
import About_section from "../components/homepage/About_section";
import InfoA_section from "../components/homepage/InfoA_section";
import InfoB_section from "../components/homepage/InfoB_section";
import InfoC_section from "../components/homepage/InfoC_section";
import Works_section from "../components/homepage/Works_section";
import Details_section from "../components/homepage/Details_section";
import { scrollToSectionWhenReady } from "../utils/scrollTo";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 從其他頁面點導覽列導回首頁時，於繪製前就開始立即定位到對應 section，避免先顯示頁首再跳動的閃爍
  useLayoutEffect(() => {
    const targetId = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!targetId) return;
    // 清除 state，避免重新整理或返回時再次觸發
    navigate(".", { replace: true, state: null });
    scrollToSectionWhenReady(targetId);
  }, [location.state, navigate]);

  return (
    <div className="mt-[84px] flex flex-col items-center max-[1440px]:mt-[60px]">
      <Hero_section />
      <About_section />
      <InfoA_section />
      <InfoB_section />
      <InfoC_section />
      <Works_section />
      <Details_section />
    </div>
  );
};

export default HomePage;
