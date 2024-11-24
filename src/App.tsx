import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import Header from "./components/organisms/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import "./styles/index.css";
import Footer from "./components/organisms/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import { AuthProvider } from "@/context/authContext"; // Import the AuthProvider
import User from "./pages/User";

export default function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap your app with AuthProvider */}
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <div className="flex flex-col min-h-screen items-center w-full justify-between bg-primary-background">
            <Header />
            <main className="flex  flex-1 w-full justify-center items-center max-w-[1140px] mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />
                <Route path="*" element={<div>Not Found</div>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
