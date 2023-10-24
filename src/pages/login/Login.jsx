import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/kegiatan");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-md p-4 bg-white rounded shadow-md"
      >
        <div className="flex justify-center m-10">
          <img
            src={process.env.PUBLIC_URL + "/assets/logo_maneasy.svg"}
            alt=""
          />
        </div>
        <div>
          <h6 className="font-quicksand font-bold">Masuk</h6>
        </div>
        <div className="mt-2">
          <label className="block mb-1 font-montserrat font-normal text-gray-auth">
            Email
          </label>
          <input
            type="email"
            className="w-full py-1 border-b outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label className="block mt-4 mb-1 font-montserrat font-normal text-gray-auth">
            Password
          </label>
          <input
            type="password"
            className="w-full py-1 border-b outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            disabled={isLoading}
            className="font-poppins font-normal bg-[#1B9AD0] w-1/2 py-2 px-4 bg-blue-500 text-white rounded-[150px] drop-shadow-md hover:drop-shadow-xl"
          >
            Masuk
          </button>
          {error && <div className="error">{error}</div>}
        </div>
        <div className="text-[15px] mt-4 mb-5">
          Belum punya akun?{" "}
          <Link to="/register" className="underline hover:shadow-md">
            Daftar di sini
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
