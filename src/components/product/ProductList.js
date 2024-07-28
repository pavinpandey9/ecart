/********imports from react********/
import { useEffect, useState } from "react";

/********imports from redux********/
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { selectProductState } from "../../redux/selectors/productSelectors";

/********imports from components********/
import Product from "./Product";
import Loader from "../Loader";
import Error from "../Error";

/********imports from utils********/
import debounce from "../../utils/debounce";

function ProductList() {
  const dispatch = useDispatch();
  const { products, limit, loading, error } = useSelector(selectProductState);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts({ limit, offset }));
  }, [dispatch, limit, offset]);

  const handleScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 150 &&
      !loading
    ) {
      setOffset((prev) => prev + limit);
    }
  };

  const debounceHandleScroll = debounce(handleScroll, 200);

  useEffect(() => {
    window.addEventListener("scroll", debounceHandleScroll);

    return () => {
      window.removeEventListener("scroll", debounceHandleScroll);
    };
  }, [debounceHandleScroll]);

  if (error) {
    return <Error />;
  }

  return (
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {products.map((product) => (
          <Product key={product?.id} product={product} />
        ))}
      </div>
      {loading && (
        <div className="w-max mx-auto">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default ProductList;
