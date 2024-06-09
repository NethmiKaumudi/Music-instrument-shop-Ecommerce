import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/LayOut/SideBar/SideBar";

const AdminProductAddPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please upload an image",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("image", image);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const response = await axios.post(
        "http://localhost:4000/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Product created successfully
        await Swal.fire({
          icon: "success",
          title: "Product Added",
          text: "The product has been added successfully.",
        });
        navigate("/admin/products");
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred. Please try again later.",
      });
    }
  };

  const handleAddProductClick = () => {
    setShowForm(true);
    setShowSidebar(true);
  };

  const handleLoadProductsClick = () => {
    // Define your logic to load products here
    console.log("Load products clicked");
  };

  useEffect(() => {
    handleAddProductClick();
  }, []);

  useEffect(() => {
    console.log(image); // Log the image object
  }, [image]); // Trigger the effect whenever image changes

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        showSidebar={true} // Set the showSidebar prop to true
        handleAddProductClick={handleAddProductClick}
        handleLoadProductsClick={handleLoadProductsClick} // Pass the function to handle Load Products click
      />
      {/* Form */}
      {showForm && (
        <div className="flex-1 bg-secondary p-2">
          <h1 className="text-3xl font-bold mb-3 mt-[6px] text-center">
            Add Product
          </h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto p-4"
          >
            {/* Form fields */}
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product name"
              />
            </div>
            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20 resize-none"
                placeholder="Enter product description"
              ></textarea>
            </div>
            {/* Price */}
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter product price"
              />
            </div>
            {/* Image upload */}
            <div className="mb-4" style={{ height: "200px" }}>
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Image
              </label>
              <Dropzone
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border border-dashed rounded-md p-6 text-center cursor-pointer"
                  >
                    <input
                      type="file"
                      id="image"
                      {...getInputProps()}
                      multiple
                    />
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Product"
                        className="max-w-fit h-[200px] mx-auto"
                      />
                    ) : (
                      <p>
                        Drag 'n' drop an image here, or click to select one
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="w-64 flex justify-center bg-primaryDark hover:bg-secondaryDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto mt-24"
            >
              Add Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProductAddPage;
