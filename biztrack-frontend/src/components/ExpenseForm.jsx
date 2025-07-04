import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../services/api";


const schema = yup.object().shape({
  description: yup.string().required("Description is required"),
  amount: yup.number().typeError("Amount must be a number").positive().required(),
  category: yup.string().required("Category is required"),
});


const ExpenseForm = ({ onSuccess, editingExpense, cancelEdit }) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { description: "", amount: "", category: "" },
    resolver: yupResolver(schema),
  });

  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    if (editingExpense) {
      setValue("description", editingExpense.description);
      setValue("amount", editingExpense.amount);
      setValue("category", editingExpense.category);
    }
  }, [editingExpense, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editingExpense) {
        await api.put(`/expenses/${editingExpense.id}`, data);
      } else {
        await api.post("/expenses/", data);
      }
      setSuccess(true);
      reset();
      onSuccess();
    } catch (err) {
      console.error("❌ Error saving expense:", err);
    }
  };

    return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
      <h3>{editingExpense ? "Edit Expense" : "Add Expense"}</h3>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Amount"
            fullWidth
            margin="normal"
            type="number"
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Category"
            fullWidth
            margin="normal"
            error={!!errors.category}
            helperText={errors.category?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        {editingExpense ? "Update" : "Add"}
      </Button>

      {editingExpense && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={cancelEdit}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      )}

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          {editingExpense ? "Expense updated!" : "Expense added!"}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ExpenseForm;
