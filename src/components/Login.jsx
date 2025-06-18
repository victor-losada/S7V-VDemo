import React, { useState } from "react";
import { API_URL } from "../../ConfigUrl";
import { useAuth } from "../../AuthContext";
import useCrud from "../hook/UseCrud";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import banner from "../assets/img/banner.jpg";

const Login = () => {
  const navigate = useNavigate();
  const BASEURL = `${API_URL}/login`;
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const { postApi } = useCrud(BASEURL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const handleLoginSuccess = (response) => {
    localStorage.setItem('showWelcomeToast', '1');
    navigate('/pagos');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await loginWithEmail(email, password);
      
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("firebaseUser", JSON.stringify(userCredential.user));
      const response = await postApi({
        email,
        password,
        authProvider: "local",
        idToken,
      });
      handleLoginSuccess(response);
    } catch (error) {
      let errorMessage = "Error al iniciar sesión";
      switch (error.code) {
        case "auth/operation-not-allowed":
          errorMessage =
            "El inicio de sesión con email/contraseña no está habilitado. Por favor, contacta al administrador.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Email o contraseña incorrectos";
          break;
        case "auth/invalid-email":
          errorMessage = "El email no es válido";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Demasiados intentos fallidos. Por favor, intenta más tarde";
          break;
        default:
          errorMessage = error.message;
      }
      toast.error(errorMessage, {
        position: "top-right",
        duration: 4000,
        style: {
          background: "#EF4444",
          color: "white",
          borderRadius: "8px",
          padding: "16px",
        },
      });
      setError(errorMessage);
      console.error("Error en login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
    
      const idToken = await result.user.getIdToken();
      localStorage.setItem("firebaseUser", JSON.stringify(result.user));
      const response = await postApi({
        authProvider: "google",
        idToken,
      });
      handleLoginSuccess(response);
    } catch (error) {
      let errorMessage = "Error al iniciar sesión con Google";
      switch (error.code) {
        // case "auth/popup-closed-by-user":
        //   errorMessage = "La ventana de inicio de sesión fue cerrada";
        //   break;
        case "auth/popup-blocked":
          errorMessage =
            "La ventana emergente fue bloqueada por el navegador. Por favor, permite las ventanas emergentes para este sitio.";
          break;
        case "auth/cancelled-popup-request":
          errorMessage = "Se canceló la solicitud de inicio de sesión";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Error de red. Por favor, verifica tu conexión a internet.";
          break;
        default:
          errorMessage =
            error.message || "Error desconocido al iniciar sesión con Google";
      }
      toast.error(errorMessage, {
        position: "top-right",
        duration: 4000,
        style: {
          background: "#EF4444",
          color: "white",
          borderRadius: "8px",
          padding: "16px",
        },
      });
      setError(errorMessage);
      console.error("Error en login con Google:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* <img className='absolute' src={banner} alt="" /> */}
      <header className="w-full flex justify-between bg-neutral-900 items-center px-8 py-4 border-b border-yellow-500">
        <span className="text-yellow-400 font-bold text-2xl tracking-widest font-mono">
          S7V
        </span>
        <nav className="space-x-8">
          <a
            href="#"
            className="text-yellow-400 hover:text-yellow-300 transition"
          >
            Contacto
          </a>
        </nav>
      </header>
      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center p-1 sm:p-2">
        <div className="w-full max-w-2/6 bg-black bg-opacity-80 rounded-xl border border-yellow-500 shadow-[0_0_18px_2px_rgba(234,179,8,0.5)] p-2 sm:p-4 flex flex-col items-center">
          <h2 className="mb-4 sm:mb-6 text-center text-xl sm:text-2xl font-extrabold text-yellow-400 font-pixel tracking-wider drop-shadow-lg">
            Iniciar Sesión
          </h2>
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-2 py-2 rounded relative text-center text-xs sm:text-sm"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-yellow-400 mb-1 font-semibold text-sm"
                >
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-yellow-500 bg-black text-yellow-100 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-base"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-yellow-400 mb-1 font-semibold text-sm"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 rounded-md border border-yellow-500 bg-black text-yellow-100 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition text-base"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-6 cursor-pointer  top-10 text-yellow-400 hover:text-yellow-200 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-1 rounded-md bg-yellow-400 text-black font-bold text-base shadow-md hover:bg-yellow-300 transition border-2 border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
          <div className="flex items-center w-full my-3">
            <div className="flex-grow border-t border-yellow-700"></div>
            <span className="mx-2 text-yellow-700 font-bold text-sm">o</span>
            <div className="flex-grow border-t border-yellow-700"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-2 px-2 border border-yellow-500 rounded-md shadow-md text-xs sm:text-sm font-medium bg-white text-black hover:bg-yellow-50 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            disabled={loading}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-black ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : (
              'Continuar con Google'
            )}
          </button>
          <div className="mt-3 text-center">
            <span className="text-yellow-100 text-xs sm:text-sm">¿No tienes cuenta? </span>
            <a href="#" className="text-yellow-400 font-bold hover:underline text-xs sm:text-sm">
              Regístrate
            </a>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-yellow-500 text-yellow-400 bg-neutral-900 bg-opacity-90 text-sm">
        © 2025 S7V Trading Academy. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Login;
