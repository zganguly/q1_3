import React from 'react';
import UserList from './components/List';
import { User, UserRole } from './user_types/Types';
import records from './data/records.json';
import './App.css';

const users: User[] = records.map(record => ({
  id: record.id,
  name: record.name,
  email: record.email,
  role: record.role as UserRole,
  isActive: record.isActive
}));

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <UserList users={users} />
    </div>
  );
}

export default App;
