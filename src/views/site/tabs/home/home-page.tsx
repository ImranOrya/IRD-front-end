import FooterSection from "../../general/footer/footer-section";

import NewSection from "./news/news-section";
import SliderSection from "./news/slider";

export default function HomePage() {
  return (
    <div>
      <SliderSection />
      <NewSection />
      <FooterSection />
    </div>
  );
}
