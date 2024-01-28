import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";

function App() {
  const user = sessionStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/products" exact element={<Main />} />}
      {user && (
        <Route path="/products/:id" exact element={<ProductDetails />} />
      )}

      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/products" element={<Navigate replace to="/login" />} />
      <Route path="/" element={<Navigate replace to="/signup" />} />
    </Routes>
  );
}

export default App;
