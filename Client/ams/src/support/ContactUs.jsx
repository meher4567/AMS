import Footer from "../layouts/Footer";
import styles from "../styles/ContactUs.module.scss";
import ContactImage from "../assets/images/contact.png";
import MapImage from "../assets/images/map.jpg";
import Carousel from "react-bootstrap/Carousel";

const ContactUs = () => {
  return (
    <div>
      <section className={styles.headerSection}>
        <div className="row py-4">
          <div className="col-lg-12 d-flex justify-content-center">
            <h2>Contact Us</h2>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container-fluid">
          <div className="row text-center mt-4">
            <h2>Get in Touch</h2>
            <h5>We would love to hear from you</h5>
          </div>
          <div className="row">
            <div className="col-lg-6 d-flex justify-content-center">
              <img src={ContactImage} className={styles.mainImage} alt="Contact Us" />
            </div>
            <div className="col-lg-6">
              <p className={styles.contactText}>
                For inquiries, feedback, or support, please reach out to us. We are here to make your experience seamless.
              </p>
              <div className="row mt-4">
                <div className="col-lg-6">
                  <b className={styles.subheading}>Customer Support</b>
                  <p className={styles.subText}>Phone: +123 456 789</p>
                  <p className={styles.subText}>Email: support@fastairways.com</p>
                </div>
                <div className="col-lg-6">
                  <b className={styles.subheading}>Office Location</b>
                  <p className={styles.subText}>123 Airways Street, Aviation City</p>
                  <p className={styles.subText}>Open: Mon-Fri, 9am - 6pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          <div className="row text-center">
            <h2 className={styles.formTitle}>Send Us a Message</h2>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-8">
              <form>
                <div className="form-group mb-3">
                  <input type="text" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="form-group mb-3">
                  <input type="email" className="form-control" placeholder="Your Email" required />
                </div>
                <div className="form-group mb-3">
                  <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="btn btn-success">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.locationSection}>
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center">
            <img src={MapImage} className={styles.mapImage} alt="Office Location" />
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <div className={styles.locationInfo}>
              <h2>Visit Our Office</h2>
              <p>We welcome you to stop by our office during business hours.</p>
              <p>Address: 123 Airways Street, Aviation City</p>
              <button className="btn btn-info">Get Directions</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.clientsSection}>
        <div className="container-fluid text-center">
          <h2 className={styles.clientsTitle}>What Our Clients Say</h2>
          <Carousel className={styles.carousel}>
            <Carousel.Item interval={1000}>
              <p className={styles.carouselText}>“Fast Airways always exceeds my expectations!”</p>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <p className={styles.carouselText}>“Responsive and friendly customer service!”</p>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <p className={styles.carouselText}>“Highly recommend Fast Airways for anyone!”</p>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
