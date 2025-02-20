import styles from "../styles/Stats.module.scss";
import FlightsImage from "../assets/images/flights.avif";
import SatisfactionImage from "../assets/images/satisfaction.png";
import PartnerImage from "../assets/images/partners.jpg";
import OntimeImage from "../assets/images/ontime.jpg";
import PassengersImage from "../assets/images/passengers.jpg";

const Stats = () => {
  return (
    <div className={styles.statsSection}>
      <section className={styles.headerSection}>
        <h2>Airline Statistics</h2>
        <p>Explore our performance metrics to see how we bring you the best travel experience.</p>
      </section>

      <section className={styles.statsCards}>
        <div className={styles.card}>
          <img src={FlightsImage} alt="Number of Flights" className={styles.cardImage} />
          <h3>Number of Flights Managed</h3>
          <p>1500+</p>
        </div>

        <div className={styles.card}>
          <img src={PartnerImage} alt="Airline Partners" className={styles.cardImage} />
          <h3>Airlines Partnered With</h3>
          <p>25</p>
        </div>

        <div className={styles.card}>
          <img src={SatisfactionImage} alt="Customer Satisfaction" className={styles.cardImage} />
          <h3>Average Customer Satisfaction</h3>
          <p>98%</p>
        </div>

        <div className={styles.card}>
          <img src={OntimeImage} alt="On-Time Performance" className={styles.cardImage} />
          <h3>Flights On-Time Performance</h3>
          <p>92%</p>
        </div>

        <div className={styles.card}>
          <img src={PassengersImage} alt="Passengers Managed" className={styles.cardImage} />
          <h3>Total Passengers Managed</h3>
          <p>2,000,000+</p>
        </div>
      </section>

      <section className={styles.footerSection}>
        <p>
          Our system actively tracks and updates these statistics to provide you with accurate data, enhancing your overall airline management experience.
        </p>
      </section>
    </div>
  );
};

export default Stats;
