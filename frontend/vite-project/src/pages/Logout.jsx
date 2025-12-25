 function Logout() {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("Logged out");
  };

  return <button onClick={logout}>Logout</button>;
}

export default Logout;
