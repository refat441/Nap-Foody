import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
import { useState } from "react";

const RootLayout = () => {
  const [togle, setTogel] = useState(true);

  const toggleswp = () => {
    setTogel((priv) => !priv);
  };

  return (
    <div className="global-font   bg-white">
      <header>
        <Navbar toggle={setTogel} toggleswp={toggleswp} />
      </header>
      {/* ` absolute sm:relative transition-all ${togle? "left-0" : "-left-96"}  top-0 h-full sm:h-auto  ` */}
      <main className="flex h-full relative  ">
        {/* for pc */}
        <aside className={" hidden md:block "}>
          <Sidebar togle={togle} toggleswp={toggleswp}></Sidebar>
        </aside>
        {/* for mobile */}
        <aside
          className={` block md:hidden absolute sm:relative transition-all ${
            togle ? "left-0" : "-left-96"
          }  top-0 h-full sm:h-auto  `}
        >
          <Sidebar togle={togle} toggleswp={toggleswp} />
        </aside>

        <div className="flex-1 h-[calc(100vh-70px)] overflow-auto bg-[#f7f7fc] pl-3">
          <Outlet />
          <footer>
            <Footer />
          </footer>
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
