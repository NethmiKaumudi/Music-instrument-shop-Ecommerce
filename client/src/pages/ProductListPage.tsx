import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assests/img/nk music logo.png";
import { cart } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import axios from "axios";

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [sortCriteria, setSortCriteria] = useState<string>(""); // Sort criteria state
  const [categoryFilter, setCategoryFilter] = useState<string>(""); // Category filter state
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]); // List of available categories

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<any[]>("http://localhost:4000/products/get");
        setProducts(response.data);
        setLoading(false);
        // Extract categories from products and remove duplicates
        const categories = Array.from(new Set(response.data.map((product) => product.category))) as string[];
        setCategoryFilters(["All", ...categories]); // Include "All" option
      } catch (error:any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Sorting and filtering products based on criteria
  let sortedAndFilteredProducts = [...products];

  if (sortCriteria === "quantity") {
    sortedAndFilteredProducts.sort((a, b) => a.quantity - b.quantity);
  } else if (sortCriteria === "price") {
    sortedAndFilteredProducts.sort((a, b) => a.price - b.price);
  }

  if (categoryFilter && categoryFilter !== "All") {
    sortedAndFilteredProducts = sortedAndFilteredProducts.filter(product => product.category === categoryFilter);
  }

  const currentProducts = sortedAndFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const addToCart = (product: any) => {
    const updatedCart = [...cartItems];
    const existingProductIndex = updatedCart.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity++;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    setCartItems(updatedCart);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "https://via.placeholder.com/150";
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortCriteria = event.target.value;
    setSortCriteria(selectedSortCriteria);
    setCurrentPage(1); // Reset to first page when sorting criteria changes

    // If "All" is selected, reset the sort criteria to empty string to show all products
    if (selectedSortCriteria === "All") {
      setSortCriteria("");
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setCategoryFilter(selectedCategory);
    setCurrentPage(1); // Reset to first page when category filter changes
  };

  const handleResetCategoryFilter = () => {
    setCategoryFilter("");
    setCurrentPage(1); // Reset to first page when category filter changes
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <nav className="nav-bar flex items-center justify-between bg-secondaryDark text-white py-3 px-6">
        <Link to="/" className="text-2xl font-inter flex items-center">
          <img
            alt=""
            src={logo}
            className="mr-1"
            style={{ width: "100px", height: "90px" }}
          />
          NKBEATS
        </Link>
        <div className="flex items-center">
          <IonIcon icon={cart} size="large" className="mr-2 hover:text-secondary" />
          <span className="cart-quantity text-xs bg-secondary hover:bg-secondaryDark text-black rounded-full px-2 py-1">
            {cartItems.length}
          </span>
        </div>
      </nav>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-8 text-center">Products</h1>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <label className="mr-2">Sort by:</label>
            <select
              value={sortCriteria}
              onChange={handleSortChange}
              className="px-2 py-1 border border-gray-300 rounded focus:outline-none"
            >
              <option value="">All</option>
              <option value="quantity">Quantity</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2">Filter by Category:</label>
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="px-2 py-1 border border-gray-300 rounded focus:outline-none"
            >
              {categoryFilters.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            {categoryFilter && (
              <button
                onClick={handleResetCategoryFilter}
                className="ml-2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div key={product.id} className="border border-gray-300 p-4 flex flex-col items-center rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <Link to={`/products/${product.id}`} className="w-full">
                <div className="image-container mb-4 overflow-hidden rounded-md h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={handleImageError}
                    className="product-image object-cover w-full h-full hover:opacity-75 transition duration-300 ease-in-out"
                  />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{product.name}</p>
                  <p className="text-gray-600">RS: {product.price}</p>
                  <p className="text-gray-600">Sold: {product.sold}</p>
                </div>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-primaryDark hover:bg-primary text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          {Array.from({ length: Math.ceil(sortedAndFilteredProducts.length / productsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border border-gray-400 rounded ${
                currentPage === index + 1 ? "bg-gray-900 text-white" : "text-gray-900"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
