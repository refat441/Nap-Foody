import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";

const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex gap-3">
        <aside>
          <Sidebar />
        </aside>
        <div>
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default RootLayout;
