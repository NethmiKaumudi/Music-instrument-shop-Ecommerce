// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// interface Order {
//   _id: string;
//   orderId: string;
//   name: string;
//   address: string;
//   contactNumber: string;
//   totalAmount: number;
//   status: string;
// }

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
//   const handleClick = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };

//   return (
//     <div className="flex justify-center my-4">
//       <button
//         className="bg-secondaryDark text-white font-bold py-2 px-4 rounded mx-1"
//         onClick={() => handleClick(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Previous
//       </button>
//       {[...Array(totalPages)].map((_, index) => (
//         <button
//           key={index}
//           className={`${
//             currentPage === index + 1 ? 'bg-primaryDark text-black' : 'bg-secondaryDark text-black border border-black'
//           } font-bold py-2 px-4 rounded mx-1`}
//           onClick={() => handleClick(index + 1)}
//         >
//           {index + 1}
//         </button>
//       ))}
//       <button
//         className="bg-secondaryDark text-black font-bold py-2 px-4 rounded mx-1 border border-black"
//         onClick={() => handleClick(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// const OrderLoadPage: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ordersPerPage] = useState(10); // Adjust as necessary
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchOrders();
//   }, [currentPage]);

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('Token not found in localStorage');
//       }

//       const response = await axios.get('/orders/get', {
//         baseURL: 'http://localhost:4000',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setOrders(response.data.orders);
//       setTotalPages(Math.ceil(response.data.orders.length / ordersPerPage));
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       // Handle error with alert or other UI feedback
//     }
//   };

//   const handleUpdateStatus = async (orderId: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('Token not found in localStorage');
//       }

//       await axios.put(`/orders/put/${orderId}`, { status: 'Done' }, {
//         baseURL: 'http://localhost:4000',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Update the order status locally
//       const updatedOrders = orders.map(order => {
//         if (order._id === orderId) {
//           return { ...order, status: 'Done' };
//         }
//         return order;
//       });

//       setOrders(updatedOrders);

//       Swal.fire({
//         icon: 'success',
//         title: 'Order Updated',
//         text: `Order ${orderId} status updated to Done.`,
//       });
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'Failed to update order status. Please try again later.',
//       });
//     }
//   };

//   // Calculate the current orders to display
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <main className="container mx-auto px-4 py-4 flex-grow">
//         <h1 className="text-3xl font-bold mb-8 text-center">Orders</h1>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead className="bg-primaryDark">
//               <tr>
//                 <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Address
//                 </th>
//                 <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Contact Number
//                 </th>
//                 <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Total Amount
//                 </th>
//                 <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentOrders.map((order) => (
//                 <tr key={order._id}>
//                   <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">{order.name}</td>
//                   <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">{order.address}</td>
//                   <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">{order.contactNumber}</td>
//                   <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">{order.totalAmount}</td>
//                   <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
//                     {order.status === 'Pending' ? (
//                       <span className="bg-red-500 text-white px-2 py-1 rounded-full">{order.status}</span>
//                     ) : (
//                       <span className="bg-green-500 text-white px-2 py-1 rounded-full">{order.status}</span>
//                     )}
//                   </td>
//                   <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
//                     <button
//                       className={`px-2 py-1 rounded-full ${
//                         order.status === 'Pending' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       }`}
//                       onClick={order.status === 'Pending' ? () => handleUpdateStatus(order._id) : undefined}
//                       disabled={order.status !== 'Pending'}
//                     >
//                       Done
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       </main>
//     </div>
//   );
// };

// export default OrderLoadPage;
// // 
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

interface Order {
  _id: string;
  orderId: string;
  name: string;
  address: string;
  contactNumber: string;
  totalAmount: number;
  status: string;
  orderDate: string;
  orderDoneDate: string | null;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <button
        className="bg-secondaryDark text-white font-bold py-2 px-4 rounded mx-1"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`${
            currentPage === index + 1 ? 'bg-primaryDark text-black' : 'bg-secondaryDark text-black border border-black'
          } font-bold py-2 px-4 rounded mx-1`}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="bg-secondaryDark text-black font-bold py-2 px-4 rounded mx-1 border border-black"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

const OrderLoadPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const response = await axios.get('/orders/get', {
        baseURL: 'http://localhost:4000',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders);
      setTotalPages(Math.ceil(response.data.orders.length / ordersPerPage));
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Handle error with alert or other UI feedback
    }
  };

  const handleUpdateStatus = async (orderId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const currentDate = new Date().toISOString();

      await axios.put(`/orders/put/${orderId}`, { status: 'Done', orderDoneDate: currentDate }, {
        baseURL: 'http://localhost:4000',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, status: 'Done', orderDoneDate: currentDate };
        }
        return order;
      });

      setOrders(updatedOrders);

      Swal.fire({
        icon: 'success',
        title: 'Order Updated',
        text: `Order ${orderId} status updated to Done.`,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update order status. Please try again later.',
      });
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-4 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center">Orders</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-primaryDark">
              <tr>
                <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Address
                </th>
                <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Contact Number
                </th>
                <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Order Date
                </th>
                <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Order Done Date
                </th>
                <th className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">{order.name}</td>
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">{order.address}</td>
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">{order.contactNumber}</td>
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">{order.totalAmount}</td>
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                    {order.status === 'Pending' ? (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full">{order.status}</span>
                    ) : (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full">{order.status}</span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                    {order.orderDoneDate ? new Date(order.orderDoneDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                    <button
                      className={`px-2 py-1 rounded-full ${
                        order.status === 'Pending' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      onClick={order.status === 'Pending' ? () => handleUpdateStatus(order._id) : undefined}
                      disabled={order.status !== 'Pending'}
                    >
                      Done
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default OrderLoadPage;

