import Footer from "./Footer";
import Navbar from "./Navbar";

const RootLayout = ({ children }) => {
  return (
    <div>
      <header>
        <nav className="bg-black text-white ">
          <Navbar />
        </nav>
      </header>

      <main className="min-h-screen my-6">{children}</main>

      <footer className="footer footer-center p-4 bg-black text-white font-semibold">
        {/* footer component  */}
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
