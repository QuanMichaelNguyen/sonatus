import React, { useEffect, useState } from "react";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetail";
import "./App.css";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { street: string; suite: string; city: string; zipcode: string };
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch users.");
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    results.sort((a, b) => {
      const valA = a[sortBy as keyof User]?.toString().toLowerCase();
      const valB = b[sortBy as keyof User]?.toString().toLowerCase();
      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredUsers(results);
  }, [search, users, sortBy, order]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="sort-options">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order === "asc" ? "👇" : "☝️"}
        </button>
      </div>
      <UserList users={filteredUsers} onSelectUser={setSelectedUser} />
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default App;
