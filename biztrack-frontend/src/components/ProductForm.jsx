import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Snackbar, Alert, Grid, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../services/api";

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be an integer")
    .positive("Must be greater than 0")
    .required("Quantity is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
});

const ProductForm = ({ onSuccess, editingProduct, onUpdate }) => {
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", category: "", quantity: "", price: "" },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editingProduct) {
      setValue("name", editingProduct.name);
      setValue("category", editingProduct.category);
      setValue("quantity", editingProduct.quantity);
      setValue("price", editingProduct.price);
    } else {
      reset(); // reset if form switches back to add mode
    }
  }, [editingProduct, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (editingProduct) {
        await onUpdate({ ...editingProduct, ...data });
      } else {
        await api.post("/products/", {
          ...data,
          quantity: parseInt(data.quantity),
          price: parseFloat(data.price),
        });
      }
      reset();
      setSuccess(true);
      onSuccess();
    } catch (err) {
      console.error("❌ Error saving product:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
      <Typography variant="h6" gutterBottom>
        {editingProduct ? "Edit Product" : "Add New Product"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                fullWidth
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity"
                type="number"
                fullWidth
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <div style={{ marginTop: "16px" }}>
        <Button type="submit" variant="contained" color="primary">
          {editingProduct ? "Update" : "Add"}
        </Button>
      </div>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          {editingProduct ? "Product updated!" : "Product added!"}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ProductForm;
