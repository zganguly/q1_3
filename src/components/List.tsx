import React, { useState } from "react";
import { User, UserRole } from "../user_types/Types";

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  // By Default it will show all types of users with all roles
  const [roleFilter, setRoleFilter] = useState("all");
  // By Default user state is false. It will show all
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  let filteredUsers = users;

  // Role Specific Filter
  if (roleFilter !== "all") {
    filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
  }

  // Active Wise Filter
  if (showActiveOnly) {
    filteredUsers = filteredUsers.filter(user => user.isActive);
  }

  function formatRole(role: string) {
    let name = role.replace("ut_", "");
    return name.charAt(0).toUpperCase() + name.slice(1);
    // eta use hocche to format the role, for showcase purpose
  }

  return (
    <div>
      <h2>User List</h2>

      {/* Filter part */}
      <div style={{ marginBottom: "1rem" }}>
        {/* Dropdown for user roles */}
        <label>
          Role:&nbsp;
          <select
            value={roleFilter}
            // When we pick a role, change roleFilter
            onChange={e => setRoleFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ut_admin">Admin</option>
            <option value="ut_user">User</option>
            <option value="ut_manager">Manager</option>
            <option value="ut_viewer">Viewer</option>
            <option value="ut_editor">Editor</option>
          </select>
        </label>

        {/* Checkbox for Active users only */}
        <label style={{ marginLeft: "2rem" }}>
          <input
            type="checkbox"
            checked={showActiveOnly}
            // When we click the checkbox, change showActiveOnly
            onChange={e => setShowActiveOnly(e.target.checked)}
          />
          Active only
        </label>
      </div>

      {/* The actual user list */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredUsers.map(user => (
          <li
            key={user.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "10px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}
          >
            {/* Show user name and email */}
            <div style={{ flex: 1 }}>
              <strong>{user.name}</strong> ({user.email})
            </div>
            {/* Show role, formatted nicely */}
            <div>
              {formatRole(user.role)}
            </div>
            {/* Show if active */}
            <div>
              {user.isActive ? "Active" : "Inactive"}
            </div>
          </li>
        ))}
      </ul>

      {/* If no user found after filtering, show a message */}
      {filteredUsers.length === 0 && (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
