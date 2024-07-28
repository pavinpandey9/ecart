/********imports from react-router********/
import { Link } from "react-router-dom";

/********imports from redux********/
import { useDispatch, useSelector } from "react-redux";
import { setCartVisibility } from "../redux/slices/cartSlice";
import { selectTotalCartProducts } from "../redux/selectors/cartSelectors";

function Header() {
  const dispatch = useDispatch();
  const total = useSelector(selectTotalCartProducts);

  return (
    <header className="fixed top-0 left-0 w-full py-5 bg-white border-b border-borderColor z-20">
      <div className="container">
        <div className="flex justify-between items-center">
          <p className="material-symbols-outlined text-3xl font-extralight cursor-pointer">
            search
          </p>

          <Link to="/" className="text-2xl uppercase">
            E-cart
          </Link>

          <div className="flex gap-2">
            <p className="material-symbols-outlined text-3xl font-extralight cursor-pointer">
              account_circle
            </p>
            <p
              className="relative cursor-pointer"
              onClick={() => dispatch(setCartVisibility(true))}
            >
              <span className="material-symbols-outlined text-3xl font-extralight">
                shopping_cart
              </span>
              <span
                className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 
             text-xs bg-black text-white rounded-full"
              >
                {total}
              </span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
