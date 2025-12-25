import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../services/api"; 

function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.get(`/auth/verify/${token}`);
        alert("Email verified successfully. Please login.");
        navigate("/login"); 
      } catch (err) {
        alert("Verification failed or link expired.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return <h2>Verifying email...</h2>;
}

export default Verify;

