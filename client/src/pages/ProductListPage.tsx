// ProductListingPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assests/img/nk music logo.png";
import { cart } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]); // Update the type accordingly
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8); // Display 8 products per page
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // Function to generate dummy product data
    const generateDummyData = () => {
      const dummyProducts = [];
      for (let i = 0; i < 20; i++) {
        // Generate a unique ID for each product (you can use a library like uuid)
        const id = i + 1;
        // Generate dummy image links from Google
        const image = `https://via.placeholder.com/150/0000FF/808080?text=Product+${id}`;
        // Generate dummy product name and price
        const name = `Product ${id}`;
        const price = Math.floor(Math.random() * 100) + 1; // Random price between 1 and 100
        // Create the product object
        const product = { id, name, price, image };
        // Push the product into the dummyProducts array
        dummyProducts.push(product);
      }
      return dummyProducts;
    };

    // Set the dummy products as the initial state
    setProducts(generateDummyData());
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const addToCart = (product: any) => {
    const updatedCart = [...cartItems];
    const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, increase the quantity
      updatedCart[existingProductIndex].quantity++;
    } else {
      // Product is not in the cart, add it with quantity 1
      updatedCart.push({ ...product, quantity: 1 });
    }
    setCartItems(updatedCart);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="nav-bar flex items-center justify-between bg-secendaryDark text-white py-3 px-6">
        <Link to="/" className="text-2xl font-inter flex items-center">
          <img
            alt=""
            src={logo}
            className="mr-1"
            style={{ width: "100px", height: "90px" }} // Adjust logo size if needed
          />
          NKBEATS
        </Link>
        <Link to="/cart" className="flex items-center">
          <IonIcon icon={cart} size="large" className="mr-2 hover:text-secendary" />
          <span className="cart-quantity text-xs bg-white hover:bg-secendary text-black rounded-full px-2 py-1">{cartItems.length}</span>
        </Link>
      </nav>
      {/* Product Listing */}
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-8">Product Listing</h1>
        <div className="grid grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <div key={product.id} className="border border-gray-300 p-4">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} className="mb-4" />
                <p className="text-lg font-bold">{product.name}</p>
                <p className="text-gray-600">${product.price}</p>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border border-gray-400 rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "text-blue-500"
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
