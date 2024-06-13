import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assests/img/nk music logo.png"; // Adjust path as necessary
import { IonIcon } from "@ionic/react";
import { cart as cartIcon } from "ionicons/icons";
import axios from "axios";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

const ProductListingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state || {
    cartItems: {} as { [key: string]: Product },
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:4000/products/get"
      );
      setProducts(response.data);
      setLoading(false);
      const categories = Array.from(
        new Set(response.data.map((product) => product.category))
      ) as string[];
      setCategoryFilters(["All", ...categories]);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  const addToCart = (product: Product) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[product._id]) {
      updatedCart[product._id].quantity++;
    } else {
      updatedCart[product._id] = { ...product, quantity: 1 };
    }
    navigate("/product-list", { state: { cartItems: updatedCart } });
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart.`,
      timer: 1500,
      showConfirmButton: true,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "OK",
      width: "450px",
      heightAuto: false,
    });
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "https://via.placeholder.com/150";
    Swal.fire({
      icon: "error",
      title: "Image Error",
      text: "Failed to load product image. Placeholder image shown.",
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortCriteria = event.target.value;

    setSortCriteria(selectedSortCriteria);
    setCurrentPage(1);

    if (selectedSortCriteria === "quantity") {
      setProducts([...products].sort((a, b) => a.quantity - b.quantity));
    } else if (selectedSortCriteria === "price") {
      setProducts([...products].sort((a, b) => a.price - b.price));
    } else {
      fetchProducts(); // Fetch products in default order or handle 'all' case
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;

    setCategoryFilter(selectedCategory);
    setCurrentPage(1);

    if (selectedCategory === "All") {
      setProducts([...products]); // Show all products
    } else {
      const filteredProducts = products.filter(
        (product) => product.category === selectedCategory
      );
      setProducts(filteredProducts);
    }
  };

  const handleResetCategoryFilter = () => {
    setCategoryFilter("All");
    fetchProducts(); // Reset to fetch all products again
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-secondaryDark h-32 w-32 mb-4"></div>
          <h2 className="text-center text-primaryDark text-xl font-semibold">
            Loading...
          </h2>
          <p className="text-primaryDark">
            Please wait while we fetch the products.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <nav className="nav-bar flex items-center justify-between bg-secendaryDark text-white py-3 px-6">
        <Link to="/" className="text-2xl font-inter flex items-center">
          <img src={logo} alt="NKBEATS Logo" className="h-20 mr-2" />{" "}
          NKBEATS
        </Link>
        <div className="flex items-center">
          <span className="cart-quantity text-xs bg-secendary hover:bg-primary text-black rounded-full px-2 py-1">
            {Object.keys(cartItems).length > 0 &&
              Object.values(cartItems as { [key: string]: Product }).reduce(
                (total, item) => total + item.quantity,
                0
              )}
          </span>
          <Link
            to="/cart"
            state={{ cartItems }}
            className="ml-4 bg-primaryDark text-white px-4 py-2 rounded-lg flex items-center"
          >
            <IonIcon icon={cartIcon} className="mr-2" />
            <span>Cart</span>
          </Link>
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
              <option value="all">All</option>
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
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {categoryFilter && categoryFilter !== "All" && (
              <button
                onClick={handleResetCategoryFilter}
                className="ml-2 text-sm bg-primaryDark hover:bg-primary focus:outline-none text-white rounded px-2 py-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="border border-gray-900 p-6 flex flex-col items-center rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="w-full">
                <div className="image-container mb-4 overflow-hidden rounded-md h-48 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={handleImageError}
                    className="product-image object-cover w-fit h-fit hover:opacity-75 transition duration-300 ease-in-out"
                  />
                </div>
                <div className="text-center bg-primary rounded-md pb-2">
                  <p className="text-lg font-bold">{product.name}</p>
                  <p className="text-white">RS: {product.price}</p>
                  <p
                    className={`text-white ${
                      product.quantity === 0 ? "text-red-500" : ""
                    }`}
                  >
                    {product.quantity === 0 ? "Sold Out" : "Available"}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className={`bg-primaryDark focus:outline-none text-white rounded px-4 py-2 mt-2 transition duration-300 ease-in-out ${
                      product.quantity === 0
                        ? "                    opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 ${
                  index + 1 === currentPage
                    ? "bg-primaryDark text-white"
                    : "bg-white"
                } border border-gray-300 rounded-md`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;

