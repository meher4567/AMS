import styles from '../styles/footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className="bg-dark text-center text-white">
        <div className="container p-4">

          {/* Sign-up Section */}
          <section>
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-light mb-4">
                    Sign up for queries
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Tagline */}
          <section className="mb-4">
            <p>
            <strong>&quot;Come Fly with Us&quot;</strong>
            </p>
          </section>

        </div>

        {/* Footer Bottom Text */}
        <div className={styles.footerBottom}>
          © 2022 All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
