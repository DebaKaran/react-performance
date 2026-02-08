import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { PAGE_SIZE } from "../utilities/constants";
import Pagination from "./Pagination";
import usePagination from "../hooks/usePagination";

const Products = () => {
  // Holds the list of products fetched from the API
  const [products, setProducts] = useState([]);

  useEffect(() => {
    /*
      Why fetchProducts is INSIDE useEffect?

      - useEffect is meant for side-effects (API calls, subscriptions, timers).
      - Defining the async function inside ensures:
        1. It runs only when this effect runs
        2. No accidental re-creation or dependency issues
        3. ESLint doesn't warn about setState inside effects
    */
    const fetchProducts = async () => {
      // Calling external API (side-effect)
      const data = await fetch("https://dummyjson.com/products");

      // Converting response to JSON
      const jsonData = await data.json();

      // Updating React state AFTER data is received
      // This triggers a re-render with the fetched products
      setProducts(jsonData.products);
    };

    // Trigger the API call when component mounts
    fetchProducts();
  }, []); // Empty dependency array => runs only once on initial render

  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    goToPage,
    goToPrev,
    goToNext
  } = usePagination(products, PAGE_SIZE);


  // Conditional rendering for empty state
  return !products.length ? (
    <h1>No Product Found</h1>
  ) : (
    <div className="App">
      <h1>Pagination</h1>
      
      <div className="products-container">
        {currentProducts.map((p) => (
          /*
            ProductCard is kept dumb/presentational:
            - It only receives data
            - No business logic inside
          */
          <ProductCard
            key={p.id}
            image={p.thumbnail}
            title={p.title}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages} 
        handlePageChange={p => goToPage(p)}
        handlePrev={goToPrev}
        handleNext={goToNext}
      />
      
    </div>
  );
};

export default Products;