import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import Ratings from './Ratings';


export default function Service({ data }) {
  const { sectionHeading, allService } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4); // Default for desktop

  // Dynamically update slides per view based on screen width - only mobile and desktop
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth <= 576) {
        setSlidesPerView(1); // Mobile
      } else {
        setSlidesPerView(4); // Desktop
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Calculate total slides needed
  const totalSlides = Math.ceil(allService.length / slidesPerView);

  // Handle previous slide navigation
  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Handle next slide navigation
  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />

        <div className="slider-container relative">
          <div
            className="slider-wrapper"
            style={{
              display: 'flex',
              gap: '20px',
              transition: 'transform 0.5s ease-in-out',
              transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
              width: `${(100 / slidesPerView) * allService.length}%`,
            }}
          >
            {allService.map((item, index) => (
              <div
                key={index}
                className="slide"
                style={{
                  flex: `0 0 calc(${100 / slidesPerView}% - 20px)`,
                  maxWidth: `calc(${100 / slidesPerView}% - 20px)`,
                }}
              >
                <div
                  className="services-box"
                  style={{
                    backgroundImage: `url(${item.imgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '300px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div className="services-body">
                    <div className="icon">
                      <Icon icon={item.icon} />
                    </div>
                    <h5>{item.title}</h5>
                    <p>{item.subTitle}</p>
                    <div className="rating-wrap">
                      <Ratings ratings={item.ratings} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="navigation-arrows">
            <button
              onClick={handlePrevSlide}
              className="nav-arrow prev-arrow"
              aria-label="Previous slide"
            >
              <Icon icon="mdi:chevron-left" width="24" height="24" />
            </button>
            <button
              onClick={handleNextSlide}
              className="nav-arrow next-arrow"
              aria-label="Next slide"
            >
              <Icon icon="mdi:chevron-right" width="24" height="24" />
            </button>
          </div>

          <div className="slider-dots">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`dot ${currentIndex === index ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}