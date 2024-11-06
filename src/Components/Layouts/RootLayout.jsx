import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";

const RootLayout = () => {
  return (
    <div className="global-font bg-white">
      <header>
        <Navbar />
      </header>
      <main className="flex gap-3">
        <aside>
          <Sidebar />
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
