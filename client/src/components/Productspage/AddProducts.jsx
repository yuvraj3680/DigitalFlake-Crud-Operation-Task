
import React, { useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReqClass } from "../../services/Api";

const AddProducts = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    status: "",
    packsize: "",
    mrp: 0, 
    categoryId: 0, 
    image: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({...inputValue, [name]: name === "mrp" ? parseFloat(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ReqClass.postReq("/product", inputValue);
      navigate("/product");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="categoryId-label">Category</InputLabel>
                <Select
                  labelId="categoryId-label"
                  name="categoryId"
                  value={inputValue.categoryId}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Milk</MenuItem>
                  <MenuItem value={2}>Fruits</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField 
                label="Product Name"
                name="name"
                value={inputValue.name}
                onChange={handleChange}
                variant="outlined" 
                fullWidth 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField 
                label="Pack Size"
                name="packsize"
                value={inputValue.packsize}
                onChange={handleChange}
                variant="outlined" 
                fullWidth 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField 
                label="MRP"
                name="mrp"
                type="number" 
                value={inputValue.mrp}
                onChange={handleChange}
                variant="outlined" 
                fullWidth 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField 
                label="Product Image URL"
                name="image"
                value={inputValue.image}
                onChange={handleChange}
                variant="outlined" 
                fullWidth 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={inputValue.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <div>
          <Button className="mt-4 border  rounded-4" style={{ width:"100px", height:"40px",backgroundColor: '#7C0089'}}type="submit" variant="contained" color="primary">Save</Button>
          {/* <button className="mt-4 border rounded-4" style={{ width:"100px", height:"40px",backgroundColor: '#fff',}} type="submit">Cancel</button> */}
          </div>
          
        </form>
      </Grid>
    </Grid>
  );
};

export default AddProducts;


