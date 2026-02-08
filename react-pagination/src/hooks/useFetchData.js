import { useEffect, useState } from "react";

const useFetchData = (url) => {
  // Holds the API response data
  const [data, setData] = useState([]);

  // Represents whether the request is currently in progress
  const [loading, setLoading] = useState(true);

  // Stores error message if the request fails
  const [error, setError] = useState(null);

  useEffect(() => {
    /*
      Data fetching is a side-effect, so it lives inside useEffect.

      This effect runs:
      - once on component mount
      - again whenever the URL changes

      This makes the hook declarative:
      "data depends on this URL"
    */
    const fetchData = async () => {
      try {
        // A new request starts → reset loading and error state
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        // Explicitly handle non-2xx HTTP responses
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        // Parse JSON response
        const jsonData = await response.json();

        // Update state with fetched data
        setData(jsonData);
      } catch (err) {
        // Capture and expose error message for the UI
        setError(err.message);
      } finally {
        // Request lifecycle ends here
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-fetch when URL changes

  // Expose only what the consumer needs
  return { data, loading, error };
};

export default useFetchData;