import ProductCard from "./ProductCard";
import { PAGE_SIZE } from "../utilities/constants";
import Pagination from "./Pagination";
import usePagination from "../hooks/usePagination";
import useFetchData from "../hooks/useFetchData";

const Products = () => {
  /*
    useFetchData handles:
    - API call
    - loading state
    - error state

    Products component does NOT care how data is fetched,
    only that it receives data to render.
  */
  const { data: apiData, loading, error } =
    useFetchData("https://dummyjson.com/products");

  // Safely extract products from API response
  // Prevents crashes during initial render before data arrives
  const products = apiData.products || [];

  /*
    usePagination is responsible only for pagination behavior.
    It is completely independent of how data is fetched.
  */
  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    goToPage,
    goToPrev,
    goToNext
  } = usePagination(products, PAGE_SIZE);

  // Handle loading state explicitly
  if (loading) {
    return <h1>Loading products...</h1>;
  }

  // Handle error state explicitly
  if (error) {
    return <h1>Error: {error}</h1>;
  }

  // Empty state (data fetched but no products available)
  if (!products.length) {
    return <h1>No Product Found</h1>;
  }

  return (
    <div className="App">
      <h1>Pagination</h1>

      <div className="products-container">
        {currentProducts.map((p) => (
          /*
            ProductCard is a presentational component:
            - Receives data via props
            - Contains no business logic
          */
          <ProductCard
            key={p.id}
            image={p.thumbnail}
            title={p.title}
          />
        ))}
      </div>

      {/* Pagination component handles only UI interactions */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(p) => goToPage(p)}
        handlePrev={goToPrev}
        handleNext={goToNext}
      />
    </div>
  );
};

export default Products;