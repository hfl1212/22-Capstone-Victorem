import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
              Pawdy is developed by Team Victorem at the Information School of
              the University of Washington.
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Team members</h6>
            <ul class="footer-links">
              <li>Jiezhen Chen</li>
              <li>Zhengyang Wang</li>
              <li>Hongfei Lin</li>
              <li>Hongyi Tang</li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Links</h6>
            <ul class="footer-links">
              <li><a href="http://pawdyuw.com/">About Us</a></li>
              <li><a href = "mailto: wzywzywork@163.com">Contact us</a></li>
              <li><a href="https://github.com/hfl1212/22-Capstone-Victorem">Github Page</a></li>
              <li><a href="#">2022 iSchool Capstone</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; Team-Victorem 2022</p>
          </div>

          {/* <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
              <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
