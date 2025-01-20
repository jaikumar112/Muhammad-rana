import { Icon } from '@iconify/react'; // Import Iconify icons
import React from 'react';
import Slider from 'react-slick'; // Import React Slick
import SectionHeading from './SectionHeading';
import Ratings from './Ratings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Service({ data }) {
  const { sectionHeading, allService } = data;

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />, 
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading
          miniTitle={sectionHeading.miniTitle}
          title={sectionHeading.title}
        />
        <Slider {...sliderSettings} className="service-slider">
          {allService?.map((item, index) => (
            <div className="service-item" key={index}>
              <div
                className="services-box"
                style={{ backgroundImage: `url(${item.imgUrl})` }}
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
        </Slider>
      </div>
    </section>
  );
}

// Custom Next Arrow Component
function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Background color of the arrow
        color: '#fff', // Icon color
        borderRadius: '50%', // Circular shape
        width: '40px',
        height: '40px',
        zIndex: 2,
        top: '50%',
        transform: 'translateY(-50%)',
        right: '-50px', 
      }}
    >
      <Icon icon="bi:arrow-right" width={20} height={20} />
    </div>
  );
}

// Custom Prev Arrow Component
function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', 
        color: '#fff', 
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        zIndex: 2,
        top: '50%',
        transform: 'translateY(-50%)',
        left: '-50px', 
      }}
    >
      <Icon icon="bi:arrow-left" width={20} height={20} />
    </div>
  );
}
