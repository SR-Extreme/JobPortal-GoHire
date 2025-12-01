import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

