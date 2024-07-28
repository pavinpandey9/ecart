/********imports from react-router********/
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-3 border-t border-borderColor text-sm">
      <div className="container">
        <div className="text-center">
          @2024 <Link to="/">E-cart</Link>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
