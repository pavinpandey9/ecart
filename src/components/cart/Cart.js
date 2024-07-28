/********imports from react********/
import { useEffect, useState } from "react";

/********imports from react-router********/
import { useNavigate } from "react-router-dom";

/********imports from redux********/
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartState,
  selectTotalCartValue,
} from "../../redux/selectors/cartSelectors";
import {
  updateProductPrice,
  removeProductFromCart,
  setCartVisibility,
  clearCart,
  setCheckoutStatus,
} from "../../redux/slices/cartSlice";

/********imports from utils********/
import formatCurrency from "../../utils/currencyUtils";
import debounce from "../../utils/debounce";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartProducts, isCartVisible, processingCartProductId } =
    useSelector(selectCartState);
  const totalCartValue = useSelector(selectTotalCartValue);

  const [productQuantity, setProductQuantity] = useState({});

  useEffect(() => {
    if (isCartVisible) {
      document.body.classList.add("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCartVisible]);

  const updateCartProductPrice = (quantity, product) => {
    dispatch(
      updateProductPrice({
        productId: product?.id,
        productPrice: product?.unitPrice,
        productQuantity: quantity,
      })
    );
  };

  const updateProductQuantity = debounce((product, action) => {
    const currentQuantity =
      action === "add"
        ? productQuantity[product?.id]
          ? productQuantity[product?.id] + 1
          : 2
        : productQuantity[product?.id] - 1;

    setProductQuantity((prevProductQuantities) => ({
      ...prevProductQuantities,
      [product?.id]: currentQuantity,
    }));

    updateCartProductPrice(currentQuantity, product);
  }, 400);

  const handleProductQuantityChange = debounce((product, quantity) => {
    const regex = /^[1-9]\d*$/;
    if (regex.test(quantity) && quantity > 0 && quantity <= 10) {
      setProductQuantity((prevProductQuantities) => ({
        ...prevProductQuantities,
        [product?.id]: Number(quantity),
      }));

      updateCartProductPrice(Number(quantity), product);
    }
  }, 400);

  const handleCheckout = () => {
    dispatch(setCartVisibility(false));
    dispatch(clearCart());
    dispatch(setCheckoutStatus(true));
    navigate("/order-confirmation");
  };

  const handleRemoveProduct = (cartProduct) => {
    dispatch(removeProductFromCart(cartProduct)).then(() => {
      setProductQuantity((prevProductQuantities) => ({
        ...prevProductQuantities,
        [cartProduct.id]: 1,
      }));
    });
  };

  return (
    <aside>
      <div
        className={`absolute top-0 w-full bg-black opacity-50 z-30	
            ${isCartVisible ? "h-full" : "h-0"}`}
        onClick={() => dispatch(setCartVisibility(false))}
      ></div>
      <div
        className={`fixed top-0 right-0 w-10/12 md:w-400 h-screen transition duration-500 ease-in-out z-50
           ${isCartVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full ms-auto bg-white">
          <div className="flex justify-between items-center p-5 md:p-6 border-b border-borderColor">
            <span className="uppercase">Cart</span>
            <span
              className="material-symbols-outlined text-2xl font-light cursor-pointer"
              onClick={() => dispatch(setCartVisibility(false))}
            >
              close
            </span>
          </div>

          <div className="grow overflow-y-auto">
            {cartProducts?.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-sm uppercase">Your cart is empty</span>
              </div>
            ) : (
              cartProducts?.map((cartProduct) => (
                <div
                  key={cartProduct?.id}
                  className="text-sm grid gap-4 items-center border-b border-borderColor p-5 md:p-6"
                  style={{ gridTemplateColumns: "1fr 2fr" }}
                >
                  <img
                    className="bg-cardColor h-full object-cover"
                    src={cartProduct?.thumbnail}
                    alt={cartProduct?.title}
                  />
                  <div className="flex flex-col gap-5">
                    <div>
                      <p className="uppercase mb-1">{cartProduct?.title}</p>
                      <span className="text-gray">
                        {formatCurrency(cartProduct?.price, "USD")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex p-1 sm:p-2 border border-borderColor">
                        <button
                          type="button"
                          className="material-symbols-outlined text-gray font-extralight"
                          onClick={() =>
                            updateProductQuantity(cartProduct, "minus")
                          }
                          disabled={
                            productQuantity[cartProduct?.id] === 1 ||
                            productQuantity[cartProduct?.id] === "undefined"
                          }
                        >
                          remove
                        </button>
                        <input
                          type="text"
                          value={productQuantity[cartProduct?.id] || 1}
                          className="w-5 md:w-8 text-center outline-none"
                          onChange={(event) =>
                            handleProductQuantityChange(
                              cartProduct,
                              event.target.value
                            )
                          }
                        />
                        <button
                          type="button"
                          className="material-symbols-outlined text-gray font-extralight"
                          onClick={() =>
                            updateProductQuantity(cartProduct, "add")
                          }
                          disabled={productQuantity[cartProduct?.id] === 10}
                        >
                          add
                        </button>
                      </div>

                      <div className="w-20 text-center">
                        <p
                          className="group relative inline-block text-gray text-xs uppercase cursor-pointer"
                          onClick={() => handleRemoveProduct(cartProduct)}
                        >
                          {processingCartProductId === cartProduct?.id
                            ? "Removing"
                            : "Remove"}

                          <span
                            className="absolute right-0 left-0 bottom-0 h-px bg-gray origin-left scale-x-100 transition duration-300 ease-in-out 
                        group-hover:scale-x-0"
                          ></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartProducts?.length > 0 && (
            <>
              <div className="flex justify-between items-center p-5 md:p-6 border-y border-borderColor">
                <span>Sub Total:</span>
                <span>{formatCurrency(totalCartValue, "USD")}</span>
              </div>

              <div className="p-5 md:p-6">
                <button className="btn-primary w-full" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Cart;
