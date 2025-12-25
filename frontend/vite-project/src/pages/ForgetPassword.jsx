import { useForm } from "react-hook-form";
import api from "../services/api";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/auth/forgot-password", data);
      alert("Reset email sent");
    } catch {
      alert("User not found");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Forgot Password</h2>
      <input placeholder="Email" {...register("email", { required: true })} />
      <button type="submit">Send Reset Link</button>
    </form>
  );
}

export default ForgotPassword;
