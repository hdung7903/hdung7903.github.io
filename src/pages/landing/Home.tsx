import Carousel from "../../components/common/carousel/Carousel";
import HeroSection from "../../components/layout/section/heroSection/HeroSection";
import WhyChooseUs from "../../components/layout/section/whyChooseUs/WhyChooseUs";
import ExpertsSection from "../../components/layout/section/expertsSection/ExpertsSection";

function Home() {
  const whyChooseUsData = {
    title: "Vì sao bạn nên chọn",
    subtitle:
      "Với những tính năng hữu ích và thú vị, Smart Kids tin rằng bạn sẽ có một trải nghiệm tuyệt vời.",
    features: [
      {
        id: 1,
        icon: "📁",
        title: "Định hướng nghề nghiệp đa dạng",
        description: "01",
      },
      {
        id: 2,
        icon: "📋",
        title: "Nguồn tài liệu phong phú",
        description: "02",
      },
      {
        id: 3,
        icon: "📈",
        title: "Hỗ trợ phát triển bản thân",
        description: "03",
      },
      { id: 4, icon: "📖", title: "Nhiều bài học bổ ích", description: "04" },
      {
        id: 5,
        icon: "🐷",
        title: "Tối ưu hóa thời gian học tập",
        description: "05",
      },
      { id: 6, icon: "📑", title: "Học tập theo sở thích", description: "06" },
    ],
  };

  return (
    <main>
      <Carousel />
      <HeroSection />
      <WhyChooseUs {...whyChooseUsData} />
      <ExpertsSection />
    </main>
  );
}

export default Home;
