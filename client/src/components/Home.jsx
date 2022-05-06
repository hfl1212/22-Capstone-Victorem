import React from "react";
import recycle from "../photos/pablo-859.jpg";
import { Link } from "react-router-dom";
import Copyright from "./Copyright";

const Home = () => {
  return (
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
        {/* <div className="home-why">
          <h2>Why pawdy</h2>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <div className="video">
          <h2>Product overview</h2>
          <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
        </div> */}
      </div>

      <Copyright />
    </main>
  );
};

export default Home;
