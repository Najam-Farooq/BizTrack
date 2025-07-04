import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import api from "../services/api";
import ExpenseForm from "../components/ExpenseForm";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/expenses/");
      setExpenses(res.data);
    } catch (error) {
      console.error("❌ Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("❌ Error deleting expense:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Expenses</Typography>

      <ExpenseForm
        onSuccess={fetchExpenses}
        editingExpense={editingExpense}
        cancelEdit={() => setEditingExpense(null)}
      />

      <Paper sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>{exp.description}</TableCell>
                <TableCell>{exp.amount}</TableCell>
                <TableCell>{exp.category}</TableCell>
                <TableCell>
                  <Button onClick={() => setEditingExpense(exp)} variant="outlined" size="small">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(exp.id)}
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {expenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No expenses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Expenses;
