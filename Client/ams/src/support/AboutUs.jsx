
import Carousel from "react-bootstrap/Carousel";
import Footer from "../layouts/Footer";
import styles from "../styles/AboutUs.module.scss";
import AirhostessImage from "../assets/images/airhostess.jpg";
import Nc1Image from "../assets/images/nc1.png";
import Nc4Image from "../assets/images/nc4.png";
import About1Image from "../assets/images/about1.jpg";
import VideoFile from "../assets/images/InsideTheWorldsBiggestPassengerPlane.mp4";
import Stats from "../components/Stats";

const AboutUs = () => {
  return (
    <div>
      <section className={styles.headerSection}>
        <div className="row py-4">
          <div className="col-lg-12 d-flex justify-content-center">
            <h2>About Us</h2>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className="container-fluid">
          <div className="row text-center mt-4">
            <h2>About Our Airways</h2>
            <h5>Our goals and values</h5>
          </div>
          <div className="row">
            <div className="col-lg-6 d-flex justify-content-center">
              <img src={AirhostessImage} className={styles.mainImage} alt="Airhostess" />
            </div>
            <div className="col-lg-6">
              <p className={styles.aboutText}>
                Our focus is on your overall well-being, offering luxurious flights at minimal costs. We provide state-of-the-art facilities on all our flights.
              </p>
              <div className="row">
                <div className="col-lg-1">
                  <img src={Nc1Image} alt="Mission Icon" className={styles.icon} />
                </div>
                <div className="col-lg-6">
                  <b className={styles.subheading}>Our Mission</b>
                  <p className={styles.subText}>To make our flights easy, comfortable, and reliable for you.</p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-lg-1">
                  <img src={Nc4Image} alt="Professionals Icon" className={styles.icon} />
                </div>
                <div className="col-lg-6">
                  <b className={styles.subheading}>Professionals in our Airways</b>
                  <p className={styles.subText}>Providing a high-class facility for every journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.promoSection}>
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center text-center">
            <h1 className={styles.promoTitle}>Fly with us and win the TRIP OF A LIFETIME</h1>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <img src={About1Image} className={styles.promoImage} alt="Promo" />
          </div>
        </div>
      </section>

      <section className={styles.clientsSection}>
        <div className="container-fluid text-center">
          <h2 className={styles.clientsTitle}>Our Happy Clients</h2>
          <p className={styles.clientsSubtitle}>What people say about us</p>
          <Carousel className={styles.carousel}>
            <Carousel.Item interval={1000}>
              <p className={styles.carouselText}>“Fast Airways made my journey unforgettable!”</p>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <p className={styles.carouselText}>“Excellent service and comfortable flights!”</p>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <p className={styles.carouselText}>“I love the professionalism of the staff!”</p>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center">
            <video className="w-100" autoPlay loop muted>
              <source src={VideoFile} type="video/mp4" />
            </video>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <div className={styles.infoCard}>
              <h2>Your comfort is our priority</h2>
              <p>
                Enjoy the most comfortable flights ever. Our staff treats you like family, making you feel at home the moment you board.
              </p>
              <button className="btn btn-success">More Information</button>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Stats/>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
