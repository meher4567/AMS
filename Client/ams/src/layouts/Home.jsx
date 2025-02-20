
import styles from "../styles/Home.module.scss";
import Slider from "./Slider";
import Footer from "./Footer";

// Image imports
import DestinationsDesktop from "../assets/images/Destinations_Dekstop.png";
import FasttrackDesktop from "../assets/images/Fasttrack_Desktop.jpg";
import AlfursanDesktop from "../assets/images/Alfursan_Destop.jpg";
import LargeSustainability from "../assets/images/Large-Sustainability.jpg";
import LargeExperiences from "../assets/images/Large-experiences.jpg";
import LargeUpgrade from "../assets/images/Large-Upgrade.jpg";

const Home = () => {
  return (
    <>
      <Slider />

      <div className={`${styles.row} ${styles.topSection}`}>
        {/* Destination Card */}
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <img
              src={DestinationsDesktop}
              className={styles.cardImage}
              alt="Destinations"
            />
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>
                Discover the destinations you can travel with FAST Airways
              </h5>
            </div>
          </div>
        </div>

        {/* Fast Track Service Card */}
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <img
              src={FasttrackDesktop}
              className={styles.cardImage}
              alt="Fast Track Service"
            />
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>Enjoy our Fast track service</h5>
            </div>
          </div>
        </div>

        {/* Loyalty Program Card */}
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <img
              src={AlfursanDesktop}
              className={styles.cardImage}
              alt="Loyalty Program"
            />
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>
                Learn more about our loyalty program
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Information Row */}
      <div className={styles.infoRow}>
        <div className={styles.infoContent}>
          <h1>Exceptional experiences with FAST Airways</h1>
          <h5>
            Explore the world, earn rewards, and live the best adventures with
            FAST Airways.
          </h5>
        </div>

        {/* Information Cards */}
        <div className={styles.infoCards}>
          {/* Sustainability Card */}
          <div className={styles.infoCard}>
            <img
              src={LargeSustainability}
              className={styles.infoCardImage}
              alt="Sustainable Future"
            />
            <div className={styles.infoCardBody}>
              <h5>Ensure a sustainable future</h5>
              <p>
                Help us reduce our carbon footprint and get rewarded! Join us
                and earn Green Points for sustainable actions.
              </p>
              <a href="#" className={styles.primaryButton}>
                Learn more
              </a>
            </div>
          </div>

          {/* Onboard Experience Card */}
          <div className={styles.infoCard}>
            <img
              src={LargeExperiences}
              className={styles.infoCardImage}
              alt="Onboard Experiences"
            />
            <div className={styles.infoCardBody}>
              <h5>Time flies on board FAST Airways</h5>
              <p>
                Sit back, relax, and enjoy our onboard services. Learn more
                about dining, inflight entertainment, and more.
              </p>
              <a href="#" className={styles.primaryButton}>
                Learn more
              </a>
            </div>
          </div>

          {/* Upgrade Card */}
          <div className={styles.infoCard}>
            <img
              src={LargeUpgrade}
              className={styles.infoCardImage}
              alt="Upgrade"
            />
            <div className={styles.infoCardBody}>
              <h5>Lets get you upgraded</h5>
              <p>
                Upgrade to a higher class and experience the best in comfort,
                services, and entertainment.
              </p>
              <a href="#" className={styles.primaryButton}>
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Start your journey with FAST Airways</h1>
          <h4>Exclusive offers and amazing rewards await premium members</h4>
          <a href="#!" className={styles.joinButton}>
            Join Now
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
