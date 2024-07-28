/********imports from react********/
import { useEffect, useState } from "react";

/********imports from redux********/
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/slices/productSlice";
import { selectCartState } from "../../redux/selectors/cartSelectors";
import { toggleProductInCart } from "../../redux/slices/cartSlice";

/********imports from react-router********/
import { useLocation, useParams } from "react-router-dom";

/********imports from components********/
import Loader from "../Loader";
import Error from "../Error";

/********imports from utils********/
import formatCurrency from "../../utils/currencyUtils";
import { selectProductState } from "../../redux/selectors/productSelectors";

function ProductDetail() {
  const locationProductData = useLocation().state;
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(selectProductState);
  const { cartProducts, isProcessingCart } = useSelector(selectCartState);
  const { id } = useParams();
  const product = locationProductData ? locationProductData : selectedProduct;

  const [activeProductInfo, setActiveProductInfo] = useState(1);

  useEffect(() => {
    if (!locationProductData) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id, locationProductData]);

  const isProductAdded = cartProducts.find(
    (cartProduct) => cartProduct?.id === product?.id
  );

  const productInfo = [
    {
      id: 1,
      title: "Product info",
      description: product.description,
    },
    {
      id: 2,
      title: "Shipping",
      description: product.shippingInformation,
    },
    {
      id: 3,
      title: "Warranty",
      description: product.warrantyInformation,
    },
  ];

  if (error) {
    return <Error />;
  }

  if (loading || !product) {
    return (
      <div className="w-max mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          className="w-full bg-cardColor"
          src={product?.thumbnail}
          alt={product?.title}
          loading="lazy"
        />
        <div className="flex flex-col gap-4 py-1">
          <p className="md:w-4/5 text-lg md:text-xl uppercase">
            {product?.title}
          </p>
          <p className="text-gray text-lg">
            {formatCurrency(product?.price, "USD")}
          </p>

          <button
            type="button"
            className="btn-primary"
            onClick={() => dispatch(toggleProductInCart(product))}
            disabled={isProcessingCart ? true : false}
          >
            {isProcessingCart ? (
              isProductAdded ? (
                "Go to cart"
              ) : (
                <>
                  <span className="w-7 pr-2">
                    <Loader />
                  </span>
                  Adding
                </>
              )
            ) : isProductAdded ? (
              "Go to cart"
            ) : (
              "Add to cart"
            )}
          </button>

          <ul className="pb-10">
            {productInfo?.map((product) => (
              <li className="pt-5 border-b border-borderColor" key={product?.id}>
                <div
                  onClick={() =>
                    activeProductInfo !== product?.id
                      ? setActiveProductInfo(product?.id)
                      : setActiveProductInfo(null)
                  }
                  className="flex justify-between items-center pb-5 cursor-pointer"
                >
                  <span className="uppercase tracking-wider">
                    {product?.title}
                  </span>
                  <span className="material-symbols-outlined font-extralight">
                    {activeProductInfo === product?.id ? "remove" : "add"}
                  </span>
                </div>
                <p
                  className={`${
                    activeProductInfo === product?.id
                      ? "overflow-visible h-auto pb-5"
                      : "overflow-hidden h-0"
                  } text-gray pr-10 transition-all duration-200 ease-in-out`}
                >
                  {product?.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
