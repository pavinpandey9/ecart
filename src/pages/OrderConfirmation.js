/********imports from react-router********/
import { Link } from "react-router-dom";

/********imports from redux********/
import { useDispatch } from "react-redux";
import { setCheckoutStatus } from "../redux/slices/cartSlice";

function OrderConfirmation() {
  const dispatch = useDispatch();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 w-full flex flex-col items-center gap-5 text-center px-5">
      <span className="material-symbols-outlined text-8xl font-extralight text-green">
        check_circle
      </span>
      <p className="uppercase">Order confirmed!</p>
      <p className="text-sm md:text-base">
        Your order has been successfully placed.
        <br /> It will be delivered within 3-5 business days.
      </p>
      <Link
        to="/"
        className="btn-primary"
        onClick={() => dispatch(setCheckoutStatus(false))}
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderConfirmation;
