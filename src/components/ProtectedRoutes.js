/********imports from react-router********/
import { Navigate, Outlet } from "react-router-dom";

/********imports from react-router********/
import { useSelector } from "react-redux";
import { selectCartState } from "../redux/selectors/cartSelectors";

function ProtectedRoutes() {
  const { isCheckoutComplete } = useSelector(selectCartState);
  return isCheckoutComplete ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
