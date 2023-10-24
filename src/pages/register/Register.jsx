import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";

const Register = () => {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mahasiswa");
  const {register, error, isLoading} = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    await register(name, nim, username, email, password, role);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md p-4 bg-white rounded shadow-md">
        <div className="flex justify-center m-10">
          <img
            src={process.env.PUBLIC_URL + "/assets/logo_maneasy.svg"}
            alt=""
          />
        </div>
        <div>
          <h6 className="font-quicksand font-bold">Daftar</h6>
        </div>
        <div className="mt-2">
          <label className="block mb-1 font-montserrat font-normal text-gray-auth">
            Nama
          </label>
          <input
            type="text"
            className="w-full py-1 border-b outline-none"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label className="block mb-1 font-montserrat font-normal text-gray-auth">
            NIM
          </label>
          <input
            type="text"
            className="w-full py-1 border-b outline-none"
            onChange={(e) => setNim(e.target.value)}
            value={nim}
          />
          <label className="block mb-1 font-montserrat font-normal text-gray-auth">
            Username
          </label>
          <input
            type="text"
            className="w-full py-1 border-b outline-none"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
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
          <button disabled={isLoading} className="font-poppins font-normal bg-[#1B9AD0] w-1/2 py-2 px-4 bg-blue-500 text-white rounded-[150px] drop-shadow-md hover:drop-shadow-xl">
            Daftar
          </button>
          {error && <div className="error">{error}</div>}
        </div>
        <div className="text-[15px] mt-4 mb-5">
          Sudah punya akun?{" "}
          <Link to="/login" className="underline hover:shadow-md">
            Masuk di sini
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
