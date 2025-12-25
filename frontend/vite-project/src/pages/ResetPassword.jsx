import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post(`/auth/reset-password/${token}`, data);
      alert("Password reset successful");
      navigate("/login");
    } catch {
      alert("Invalid or expired link");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        {...register("password", { required: true })}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default ResetPassword;

