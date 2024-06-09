import React, { useEffect } from 'react';
import Home from '../components/LayOut/Home/Home';
import Navbar from '../components/LayOut/NavBar/Navbar';
import Footer from '../components/LayOut/Footer/Footer';

const App = () => {
  useEffect(() => {
    const ioniconsScript = document.createElement('script');
    ioniconsScript.type = 'module';
    ioniconsScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    document.head.appendChild(ioniconsScript);

    const ioniconsNomoduleScript = document.createElement('script');
    ioniconsNomoduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
    document.head.appendChild(ioniconsNomoduleScript);

    return () => {
      // Clean up by removing the scripts when component unmounts
      document.head.removeChild(ioniconsScript);
      document.head.removeChild(ioniconsNomoduleScript);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
