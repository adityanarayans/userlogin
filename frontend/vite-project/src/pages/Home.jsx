import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // 🔒 redirect safely
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  if (!token) return null;

  const decoded = jwtDecode(token);
  const email = decoded.email || "";
  const initialName = email.split("@")[0];
  const initialImage = decoded.image || null;

  // STATES
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [file, setFile] = useState(null);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  // SEARCH USERS
  useEffect(() => {
    if (!search.trim()) {
      setUsers([]);
      return;
    }

    api.get(`/users?search=${search}`).then(res => {
      setUsers(res.data);
    });
  }, [search]);

  const saveProfile = async () => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    if (file) formData.append("image", file);

    const res = await api.put("/users/me", formData);

    setName(res.data.name);
    setImage(res.data.image);

    setEditing(false);
    setFile(null);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Save failed");
  }
};

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>

        {/* EDIT BAR */}
        <div className={styles.editBar}>
          {!editing && (
            <button
              className={styles.editBtn}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          )}
        </div>

        <div className={styles.card}>

          {/* SEARCH */}
          <div className={styles.searchBox}>
            <input
              className={styles.searchInput}
              placeholder="Search users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {users.length > 0 && (
            <ul className={styles.searchList}>
              {users.map(u => (
                <li key={u.id} className={styles.searchItem}>
                  <img
                    src={
                      u.image
                        ? `http://localhost:5000/uploads/${u.image}`
                        : "https://via.placeholder.com/40"
                    }
                    alt=""
                  />
                  <span>{u.name}</span>
                </li>
              ))}
            </ul>
          )}

          <hr />

          {/* IMAGE */}
          {editing ? (
            <>
              <img
                className={styles.profileImg}
                src={
                  file
                    ? URL.createObjectURL(file)
                    : image
                    ? `http://localhost:5000/uploads/${image}`
                    : "https://via.placeholder.com/120"
                }
                alt="profile"
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          ) : (
            <img
              className={styles.profileImg}
              src={
                image
                  ? `http://localhost:5000/uploads/${image}`
                  : "https://via.placeholder.com/120"
              }
              alt="profile"
            />
          )}

          {/* NAME */}
          {editing ? (
            <input
              className={styles.nameInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <h3>Mr {name}007!</h3>
          )}

          <p>{email}</p>

          {/* SAVE BUTTON */}
          {editing && (
            <button
              className={styles.saveBtn}
              onClick={saveProfile}
            >
              Save
            </button>
          )}

          <button
            className={styles.logoutBtn}
            onClick={logout}
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

export default Home;


