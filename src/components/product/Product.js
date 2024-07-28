/********imports from react-router********/
import { Link } from "react-router-dom";

/********imports from utils********/
import formatSlug from "../../utils/stringUtils";
import formatCurrency from "../../utils/currencyUtils";

function Product({ product }) {
  return (
    <div>
      <Link
        className="group relative block bg-cardColor p-10 cursor-pointer aspect-square"
        to={`/product/${formatSlug(product?.title)}/${product?.id}`}
        state={product}
      >
        <img
          className="w-full pb-3 transition duration-300 ease-in-out group-hover:scale-110"
          src={product?.thumbnail}
          alt={product?.title}
          loading="lazy"
        />
      </Link>
      <div className="flex flex-col gap-1 p-5 text-center">
        <p className="text-sm uppercase">{product?.title}</p>
        <p className="text-gray">{formatCurrency(product?.price, "USD")}</p>
      </div>
    </div>
  );
}

export default Product;
