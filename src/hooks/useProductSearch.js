import { useState, useEffect, useCallback } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};


export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Erreur lors de la lecture du localStorage :', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn('Erreur lors de l’écriture dans le localStorage :', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};


const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 9;


  const fetchProducts = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.daaif.net/products?delay=1000&skip=${page}&limit=${productsPerPage}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();

      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / productsPerPage));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  const reloadProducts = () => {
    fetchProducts(currentPage);
  };


  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return {
    products,
    loading,
    error,
    reloadProducts,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
  };
};

export default useProductSearch;