import React, { useState } from "react";
import { User, UserRole } from "../user_types/Types";

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const filteredUsers = users.filter(user => {
    const roleMatch =
      roleFilter === "all" || user.role === roleFilter;

    const activeMatch =
      !showActiveOnly || user.isActive;

    return roleMatch && activeMatch;
  });

  return (
    <div>
      <h2>User List</h2>

      {/* Filters */}
      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "2rem" }}>
        <label style={{ fontWeight: 500, fontSize: "1.05em", color: "#333" }}>
          Role:&nbsp;
          <select
            value={roleFilter}
            onChange={e =>
              setRoleFilter(e.target.value as UserRole | "all")
            }
            style={{
              padding: "0.45em 1.5em 0.45em 0.85em",
              border: "1.5px solid #1976d2",
              borderRadius: "6px",
              background: "#f8fafd",
              color: "#1a237e",
              fontSize: "1em",
              fontWeight: 500,
              outline: "none",
              boxShadow: "0 2px 6px 0 rgba(25, 118, 210, 0.08)",
              appearance: "none",
              backgroundImage:
                "linear-gradient(45deg, #e3f2fd 0%, #fff 100%), url(\"data:image/svg+xml;charset=UTF-8,<svg width='18' height='18' xmlns='http://www.w3.org/2000/svg'><path d='M6 7l3 3 3-3' stroke='%231976d2' stroke-width='2' fill='none' fill-rule='evenodd'/></svg>\")",
              backgroundRepeat: "no-repeat, no-repeat",
              backgroundPosition: "right 0.6em center, right 1.2em center"
            }}
          >
            <option value="all">All</option>
            <option value="ut_admin">Admin</option>
            <option value="ut_user">User</option>
            <option value="ut_manager">Manager</option>
            <option value="ut_viewer">Viewer</option>
            <option value="ut_editor">Editor</option>
          </select>
        </label>

        <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontWeight: 500, fontSize: "1.05em", color: "#333" }}>
          <span
            style={{
              position: "relative",
              display: "inline-block",
              width: "24px",
              height: "24px",
              marginRight: "6px"
            }}
          >
            <input
              type="checkbox"
              checked={showActiveOnly}
              onChange={e => setShowActiveOnly(e.target.checked)}
              style={{
                opacity: 0,
                width: "24px",
                height: "24px",
                position: "absolute",
                left: 0,
                top: 0,
                cursor: "pointer",
                margin: 0,
                zIndex: 2
              }}
            />
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                border: showActiveOnly ? "2.4px solid #1976d2" : "2px solid #bdbdbd",
                background: showActiveOnly ? "#e3f2fd" : "#f3f6f9",
                boxShadow: showActiveOnly ? "0 2px 6px 0 rgba(25, 118, 210, 0.13)" : "none",
                transition: "all 0.18s",
              }}
            >
              {showActiveOnly && (
                <svg width="16" height="16" viewBox="2 2 20 20" fill="none">
                  <polyline
                    points="5.5 13 10 17.5 18.5 8.5"
                    stroke="#1976d2"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </span>
          Active only
        </label>
      </div>

      {/* List */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredUsers.map(user => (
          <li
            key={user.id}
            style={{
              background: "#f8f9fa",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              marginBottom: "0.75rem",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 600, fontSize: "1.1em", color: "#1a237e" }}>
                {user.name}
              </span>
              <span style={{ color: "#555", marginLeft: 8 }}>({user.email})</span>
            </div>
            <div style={{
              background: "#e3f2fd",
              color: "#1976d2",
              borderRadius: "4px",
              padding: "2px 10px",
              fontSize: "0.95em",
              fontWeight: 500,
              minWidth: 80,
              textAlign: "center"
            }}>
              {user.role.replace('ut_', '').charAt(0).toUpperCase() + user.role.replace('ut_', '').slice(1)}
            </div>
            <div style={{
              color: user.isActive ? "#388e3c" : "#b71c1c",
              background: user.isActive ? "#e8f5e9" : "#ffebee",
              borderRadius: "4px",
              padding: "2px 12px",
              fontWeight: 500,
              fontSize: "0.95em",
              minWidth: 110,
              textAlign: "center"
            }}>
              {user.isActive ? "Active" : "Inactive"}
            </div>
          </li>
        ))}
      </ul>

      {filteredUsers.length === 0 && (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
