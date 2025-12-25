import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [preview, setPreview] = useState(null);


 
  const onSubmit = async (data) =>{
    try{ 
      console.log("Submitting form data:", {
        username: data.username,
        email: data.email,
        password: data.password,
        hasImage: !!data.image?.[0]
      });

      const response = await api.post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password
      });
      alert("Registered successfully. Please verify your email.");
    } catch (error){
      console.log("Error response:", error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    }
  }
  return (
    <div className="container">
      <h2>User Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: "Username is required"
          })}
        />
        <span>{errors.username?.message}</span>

        <input
          type="email"
          placeholder="Enter your Gmail"
          {...register("email", {
            required: "Email is required"
          })}
        />
        <span>{errors.email?.message}</span>

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters"
            }
          })}
        />
        <span>{errors.password?.message}</span>

        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          onChange={(e) =>
            setPreview(URL.createObjectURL(e.target.files[0]))
          }
        />
        {preview && <img src={preview} alt="preview" />}

        <button type="submit">Register</button>
        <Link to="/login"> already a user? </Link>
      </form>
    </div>
  );
}

export default Register;
