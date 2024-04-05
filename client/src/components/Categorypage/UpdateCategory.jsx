import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ReqClass } from '../../services/Api';

const UpdateCategory = () => {
    const navigate = useNavigate();
    const {id} = useParams();  


  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    status: "",
  
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({...inputValue, [name]: value });
  }

  useEffect (()=>{
    ReqClass.getReq(`/category/${id}`)
     .then((response) => {
        setInputValue (response.data);
         let category = response.data['data'];
        setInputValue({...inputValue, name: category.name, description: category.description, status: category.status});
      })
     .catch(error => {
        console.log(error);
      })
  },[id])

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await ReqClass.putReq(`/category/${id}`, inputValue);
        console.log(response.data);
        navigate("/category");
      } catch (error) {
        console.error("Error adding product:", error);
      }
    console.log(inputValue)
    navigate("/category")
  }

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
            <button type="submit">Submit</button>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default UpdateCategory
