import "./style/footer.css";
function Footer() {
  return <>
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>Customer Support</h5>
            <ul className="list-unstyled">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Return & Exchange</a></li>
              <li><a href="#">Shipping Locations</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">Ingredients Index</a></li>
              <li><a href="#">Hotel & Spa</a></li>
              <li><a href="#">Media</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Your Account</h5>
            <ul className="list-unstyled">
              <li><a href="#">My Account</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Privacy and Terms</h5>
            <ul className="list-unstyled">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <img src="path_to_logo.png" alt="Logo" className="footer-logo"/>
            <p className="mt-2">Worldwide Copyright © The Great Ayurveda (brand owners of The Great Ayurveda). All rights reserved.</p>
        </div>
      </div>
    </footer>
  </>
}
export default Footer;