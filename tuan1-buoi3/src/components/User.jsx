import React from "react";


const DATA_API = [
  { id: 1, name: "Duong Xuan Phu" },
  { id: 2, name: "Nguyen Van A" },
  { id: 3, name: "Tran Thi B" }
]

export default function User() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Giả lập gọi API
    const timeoutId = setTimeout(() => {
      setUsers(DATA_API);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
