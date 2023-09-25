import { useGetAllProductsQuery } from "../store/features/productSlice";
import { Link } from "react-router-dom";

export const Home = () => {
  const {
    data: products,
    isSuccess,
    isFetching,
    isLoading,
  } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isFetching) {
    return <h1>Fetching...</h1>;
  }

  return (
    <>
      <div>
        {isSuccess &&
          products &&
          !isFetching &&
          !isLoading &&
          products.products.map((product) => {
            return (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="mb-4 bg-gray-50">
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};
