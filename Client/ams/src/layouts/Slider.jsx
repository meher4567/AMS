import Carousel from 'react-bootstrap/Carousel';
import classes from '../styles/slider.module.scss';
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';

function Slider() {
  const slides = [
    {
      src: slide1,
      alt: 'Fly to Qatar with FAST Airways',
      title: 'Fly to Qatar with FAST Airways',
      description: 'Be there at the World Cup 2022 with FAST Airways and cheer your team to victory.',
    },
    {
      src: slide2,
      alt: 'Discover the wonders of the world',
      title: 'Discover the wonders of the world',
      description: 'Journey with us on a unique adventure to discover the world.',
    },
    {
      src: slide3,
      alt: 'Extra legroom, extra space, extra easy',
      title: 'Extra legroom, extra space, extra easy',
      description: 'Pick from a choice of extras to make flying with us even more comfortable and convenient.',
    },
  ];

  return (
    <Carousel className={classes.carousel} interval={2000} fade>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className={classes.image}
            src={slide.src}
            alt={slide.alt}
          />
          <Carousel.Caption className={classes.carouselCaption}>
            <h3 className={classes.title}>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
