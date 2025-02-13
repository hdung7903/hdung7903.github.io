import { useEffect } from "react";

function Carousel() {
  useEffect(() => {
    const BasicSlider = $(".slider-active");
    BasicSlider.on("init", function (e) {
      const $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on(
      "beforeChange",
      function (
        e: JQuery.Event,
        slick: any,
        currentSlide: number,
        nextSlide: number
      ) {
        const $animatingElements = $(
          '.single-slider[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    (BasicSlider as any).slick({
      autoplay: true,
      autoplaySpeed: 10000,
      pauseOnHover: false,
      dots: false,
      fade: true,
      arrows: true,
      prevArrow: '<span class="prev"><i class="fa fa-angle-left"></i></span>',
      nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
      responsive: [
        { breakpoint: 767, settings: { dots: false, arrows: false } },
      ],
    });
    function doAnimations(elements: JQuery<HTMLElement>) {
      const animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        const $this = $(this);
        const $animationDelay = $this.data("delay");
        const $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }, []);
  return (
    <section id="slider-part" className="slider-active">
      <div
        className="single-slider bg_cover pt-150"
        style={{ backgroundImage: "url(./src/assets/images/bg1.png)" }}
        data-overlay="4"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-9">
              <div className="slider-cont">
                <h1 data-animation="bounceInLeft" data-delay="1s">
                  Trải nghiệm học tập tuyệt vời
                </h1>
                <p data-animation="fadeInUp" data-delay="1.3s">
                Website học tập dành cho trẻ em với nội dung đa dạng, phong phú, hình thức tương tác sinh động và áp dụng phương pháp giáo dục tiên tiến, giúp các em tiếp thu kiến thức một cách hiệu quả và hứng thú hơn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="single-slider bg_cover pt-150"
        style={{ backgroundImage: "url(./src/assets/images/bg2.png)" }}
        data-overlay="4"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-9">
              <div className="slider-cont">
                <h1 data-animation="bounceInLeft" data-delay="1s">
                  Học dễ dàng, dạy hiệu quả!
                </h1>
                <p data-animation="fadeInUp" data-delay="1.3s">
                  Nền tảng chatbot thông minh hỗ trợ.{" "}
                  <br />
                  🔹 Cho giáo viên: Tải lên tài liệu, tạo quiz nhanh chóng, quản lý học tập hiệu quả. <br />
                  🔹 Cho học sinh: Hỏi đáp tức thì, luyện tập với quiz, nâng cao khả năng tự học. <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
