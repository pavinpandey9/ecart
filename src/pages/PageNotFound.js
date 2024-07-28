/********imports from react-router********/
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-full  flex flex-col items-center gap-3 text-center px-5">
      <p className="text-8xl md:text-9xl">404</p>
      <p className="uppercase">Oops! Page not found</p>
      <p className="text-gray text-sm">
        The page you are looking for doesn't exist <br/> or might have been moved or
        deleted.
      </p>
      <Link to="/" className="btn-primary">
        Go to homepage
      </Link>
    </div>
  );
}

export default PageNotFound;
