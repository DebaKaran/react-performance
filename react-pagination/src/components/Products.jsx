import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 10; // Number of products per page

const Products = () => {
  // Holds the list of products fetched from the API
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // For pagination

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

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // page is 0-indexed, we want 1-indexed
  }

  // Go to previous page (but not below 1)
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Go to next page (but not beyond totalPages)
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
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

      <div className="pagination-container"> 
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="page-arrow"
        >
          ◀
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <span key={i} className={`page-number ${
        currentPage === i + 1 ? "active" : ""
      }`} onClick={() => handlePageChange(i)}>{i + 1}</span>
        ))}

         {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="page-arrow"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Products;