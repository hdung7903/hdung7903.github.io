import { useEffect } from "react";

function Carousel() {
    useEffect(() => {
        let BasicSlider = $('.slider-active');
        BasicSlider.on('init', function (e, slick) {
            let $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
            let $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        BasicSlider.slick({
            autoplay: true,
            autoplaySpeed: 10000,
            pauseOnHover: false,
            dots: false,
            fade: true,
            arrows: true,
            prevArrow: '<span class="prev"><i class="fa fa-angle-left"></i></span>',
            nextArrow: '<span class="next"><i class="fa fa-angle-right"></i></span>',
            responsive: [
                { breakpoint: 767, settings: { dots: false, arrows: false } }
            ]
        });
        function doAnimations(elements) {
            let animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                let $this = $(this);
                let $animationDelay = $this.data('delay');
                let $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
    },[])
    return (
        <section id="slider-part" className="slider-active">
            <div className="single-slider bg_cover pt-150" style={{ backgroundImage: 'url(./src/assets/images/slider/s-1.jpg)' }} data-overlay="4">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-9">
                            <div className="slider-cont">
                                <h1 data-animation="bounceInLeft" data-delay="1s">Choose the right theme for education</h1>
                                <p data-animation="fadeInUp" data-delay="1.3s">Donec vitae sapien ut libearo venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt  Sed fringilla mauri amet nibh.</p>
                                <ul>
                                    <li><a data-animation="fadeInUp" data-delay="1.6s" className="main-btn" href="#">Read More</a></li>
                                    <li><a data-animation="fadeInUp" data-delay="1.9s" className="main-btn main-btn-2" href="#">Get Started</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="single-slider bg_cover pt-150" style={{ backgroundImage: 'url(./src/assets/images/slider/s-2.jpg)' }} data-overlay="4">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-9">
                            <div className="slider-cont">
                                <h1 data-animation="bounceInLeft" data-delay="1s">Choose the right theme for education</h1>
                                <p data-animation="fadeInUp" data-delay="1.3s">Donec vitae sapien ut libearo venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt  Sed fringilla mauri amet nibh.</p>
                                <ul>
                                    <li><a data-animation="fadeInUp" data-delay="1.6s" className="main-btn" href="#">Read More</a></li>
                                    <li><a data-animation="fadeInUp" data-delay="1.9s" className="main-btn main-btn-2" href="#">Get Started</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="single-slider bg_cover pt-150" style={{ backgroundImage: 'url(./src/assets/images/slider/s-3.jpg)' }} data-overlay="4">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-9">
                            <div className="slider-cont">
                                <h1 data-animation="bounceInLeft" data-delay="1s">Choose the right theme for education</h1>
                                <p data-animation="fadeInUp" data-delay="1.3s">Donec vitae sapien ut libearo venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt  Sed fringilla mauri amet nibh.</p>
                                <ul>
                                    <li><a data-animation="fadeInUp" data-delay="1.6s" className="main-btn" href="#">Read More</a></li>
                                    <li><a data-animation="fadeInUp" data-delay="1.9s" className="main-btn main-btn-2" href="#">Get Started</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Carousel;