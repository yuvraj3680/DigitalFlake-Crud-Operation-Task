import React, { useEffect, useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ReqClass } from '../../services/Api';

const UpdateProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialProductState = {
    name: "",
    status: "",
    packsize: "",
    mrp: "",
    image: "",
    categoryId: "",
  };

  const [product, setProduct] = useState(initialProductState);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ReqClass.getReq(`/product/${id}`);
        if(response.data) {
          
          setProduct(response.data.data || response.data); 
        } 
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if(id) fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ReqClass.putReq(`/product/${id}`, product);
      navigate("/product");
    } catch (error) {
      console.error("Error updating product:", error);

    }
    console.log("product",product);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <TextField
            label="Pack Size"
            name="packsize"
            value={product.packsize}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="MRP"
            name="mrp"
            value={product.mrp}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={product.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
             
            </Select>
          </FormControl>
          
          <Button type="submit" variant="contained" color="primary">
            Update Product
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default UpdateProducts;
