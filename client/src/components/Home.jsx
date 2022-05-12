import React from "react";
import recycle from "../photos/pablo-859.jpg";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <main>
        <div id="landing-page">
          <div id="home">
            <div id="home-caption">
              <h1>Pawdy, the pet sitting designed for UW Huskies.</h1>
              <p>
                Get your pet sitted today! Our mission is to help UW pet owners
                find afford and reliable in network pet sittiing on demand. Join
                us today to check out all the cute pets waiting to be sitted!
              </p>
              <Link to="/posts">
                <button className="btn btn-main">Explore More</button>
              </Link>
            </div>
            <div id="home-img">
              <img src={recycle} alt="dog play with a human" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
