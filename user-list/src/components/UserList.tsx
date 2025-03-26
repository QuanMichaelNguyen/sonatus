import React from "react";
import { User } from "../App";
import "../UserList.css";

interface Props {
  users: User[];
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<Props> = ({ users, onSelectUser }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div
          key={user.id}
          className="user-card"
          onClick={() => onSelectUser(user)}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
