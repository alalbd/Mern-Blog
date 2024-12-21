import { useEffect, useState } from "react";

const UseFetch = (url, method, headers, bodyData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch(url, {
          method: method || "GET",
          headers: headers,
          body: bodyData,
        });

        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch {
        setLoading(false);
        setError(true);
      }
    };

    fetchRequest();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    result,
  };
};

export default UseFetch;
