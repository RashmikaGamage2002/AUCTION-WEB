import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminPanel() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const api = (path) => fetch((import.meta.env.VITE_API_URL||"http://localhost:7172/api") + path, { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.json());
      try {
        setUsers(await api("/admin/users"));
        setProducts(await api("/admin/products"));
        setMessages(await api("/admin/messages"));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load admin data");
      }
    })();
  }, [token]);

  // For brevity, editing/deleting UI omitted: implement using fetch PUT/DELETE to admin endpoints
  return (
    <div>
      <h2>Admin Panel</h2>
      <section><h3>Users</h3>{users.map(u=> <div key={u.id}>{u.email} - {u.name}</div>)}</section>
      <section><h3>Products</h3>{products.map(p=> <div key={p.id}>{p.title}</div>)}</section>
      <section><h3>Messages</h3>{messages.map(m=> <div key={m.id}>{m.email}: {m.text}</div>)}</section>
    </div>
  );
}
