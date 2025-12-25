import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";


function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", data);

      // save tokens
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      navigate("/home"); 
    } catch (err) {
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        {...register("email", { required: true })}
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />

      <button type="submit">Login</button>
      <Link to="/forgot-password">Forgot Password?</Link>

    </form>
  );
}

export default Login;
