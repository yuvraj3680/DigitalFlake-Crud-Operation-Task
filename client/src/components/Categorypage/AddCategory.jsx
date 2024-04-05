import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReqClass } from "../../services/Api";





const AddCategory = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    status: "",
  
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({...inputValue, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await ReqClass.postReq("/category",inputValue);
        navigate("/category");
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Category Name"
                  name="name"
                  value={inputValue.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Description"
                  name="description"
                  value={inputValue.description}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Status"
                    name="status"
                    value={inputValue.status}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className="flex gap-30">
            <button className="mt-4 border  rounded-4" style={{ width:"100px", height:"40px",backgroundColor: '#7C0089',}} type="submit">Save</button>
            <button className="mt-4 border rounded-4" style={{ width:"100px", height:"40px",backgroundColor: '#fff',}} type="submit">Cancel</button>
            </div>
           
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCategory;
