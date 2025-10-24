import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip, TablePagination
} from "@mui/material";
function UsersTable({ users }) {
  // State to manage pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
// Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
// Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
// Calculate the users to display for current page
  const usersToDisplay = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
return (
    <Box sx={{ marginBottom: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: "#333", marginBottom: 2 }}>
        User Management
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersToDisplay.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={user.role === 'Admin' ? 'success' : user.role === 'Organizer' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination Component */}
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[3, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
}
export default UsersTable;