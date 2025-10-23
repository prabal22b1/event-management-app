import { useEffect } from "react";
import React from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

const endpoint = "http://localhost:8000/api/v1/users/getRegisteredUsers/";
const token = localStorage.getItem("accessToken");
export default function AdminDashboard() {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
fetchData();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Table</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created Events</TableCell>
              <TableCell>Registered Events</TableCell>
            </TableRow>
          </TableHead >
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <a href="/created-events">Created Events</a>
                </TableCell>
                <TableCell>
                  <a href="/registered-events">Registered Events</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}