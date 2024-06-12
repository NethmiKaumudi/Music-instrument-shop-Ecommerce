// // import React, { useState } from "react";
// // import Navbar from "../components/Shared/AdminNavBar";
// // import AddProductPopup from "../pages/AdminProductAddPage";
// // import ProductTable from "../pages/AdminProductLoadPage";

// // const AdminDashBordPage: React.FC = () => {
// //   const [showAddProductPopup, setShowAddProductPopup] = useState(false);

// //   const handleOpenPopup = () => {
// //     setShowAddProductPopup(true);
// //   };

// //   const handleClosePopup = () => {
// //     setShowAddProductPopup(false);
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="flex justify-end p-4">
// //         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenPopup}>
// //           Add Product
// //         </button>
// //       </div>
// //       {showAddProductPopup && (
// //         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
// //           <AddProductPopup onClose={handleClosePopup} />
// //         </div>
// //       )}
// //       <div className="w-full">
// //         <ProductTable />
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminDashBordPage;
// import React, { useState } from "react";
// import Navbar from "../components/Shared/AdminNavBar";
// import AddProductPopup from "../pages/AdminProductAddPage";
// import ProductTable from "../pages/AdminProductLoadPage";
// // import { isLoggedIn } from "../api/authApi"; // Import isLoggedIn function

// const AdminDashBordPage: React.FC = () => {
//   const [showAddProductPopup, setShowAddProductPopup] = useState(false);

//   const handleOpenPopup = () => {
//     setShowAddProductPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowAddProductPopup(false);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-end p-4">
//         {isLoggedIn() && ( // Only render the button if user is authenticated
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenPopup}>
//             Add Product
//           </button>
//         )}
//       </div>
//       {showAddProductPopup &&  ( // Conditionally render the popup if user is authenticated{showAddProductPopup && isLoggedIn() && ( 
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
//           <AddProductPopup onClose={handleClosePopup} />
//         </div>
//       )}
//       <div className="w-full">
//         <ProductTable />
//       </div>
//     </>
//   );
// };

// export default AdminDashBordPage;
// // import React, { useState } from "react";
// // import Navbar from "../components/Shared/AdminNavBar";
// // import AddProductPopup from "../pages/AdminProductAddPage";
// // import ProductTable from "../pages/AdminProductLoadPage";

// // const AdminDashBordPage: React.FC = () => {
// //   const [showAddProductPopup, setShowAddProductPopup] = useState(false);

// //   const handleOpenPopup = () => {
// //     setShowAddProductPopup(true);
// //   };

// //   const handleClosePopup = () => {
// //     setShowAddProductPopup(false);
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="flex justify-end p-4">
// //         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenPopup}>
// //           Add Product
// //         </button>
// //       </div>
// //       {showAddProductPopup && (
// //         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
// //           <AddProductPopup onClose={handleClosePopup} />
// //         </div>
// //       )}
// //       <div className="w-full">
// //         <ProductTable />
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminDashBordPage;
import React, { useState } from "react";
import Navbar from "../components/Shared/AdminNavBar";
import AddProductPopup from "../pages/AdminProductAddPage";
import ProductTable from "../pages/AdminProductLoadPage";
// import { isLoggedIn } from "../api/authApi"; // Import isLoggedIn function

const AdminDashBordPage: React.FC = () => {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowAddProductPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddProductPopup(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-end p-4">
        {( // Only render the button if user is authenticated
          <button className="bg-primaryDark hover:bg-primary text-white font-bold py-2 px-4 rounded" onClick={handleOpenPopup}>
            Add Product
          </button>
        )}
      </div>
      {showAddProductPopup &&  ( // Conditionally render the popup if user is authenticated{showAddProductPopup && isLoggedIn() && ( 
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <AddProductPopup onClose={handleClosePopup} />
        </div>
      )}
      <div className="w-full">
        <ProductTable />
      </div>
    </>
  );
};

export default AdminDashBordPage;
