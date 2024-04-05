import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReqClass } from '../../services/Api';
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, Divider, Box, Stack, Autocomplete, TextField } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, AddCircle as AddCircleIcon } from "@mui/icons-material";

const Category = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    ReqClass.getReq('/product')
      .then(response => {
        const products = response.data.data;
        setProduct(products);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await ReqClass.deleteReq(`/product/${id}`);
      setProduct(products => products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleSearch = (searchValue) => {
    setProduct(current => current.filter(product => product.name.toLowerCase().includes(searchValue?.toLowerCase() || '')));
  };

  const handleEdit = (id) => {
    console.log("hello edit");
    navigate(`/updateproduct/${id}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'packsize', headerName: 'Pack Size', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'mrp', headerName: 'MRP', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'image',
      headerName: 'Image',
      width: 50,
      renderCell: (params) => (
        <img src={params.value} alt="Product" style={{ width: '100%', height: 'auto', maxWidth: '130px' }} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <EditIcon onClick={() => handleEdit(params.id)} style={{ cursor: "pointer", marginRight: 16 }} />
          <DeleteIcon onClick={() => handleDelete(params.id)} style={{ cursor: "pointer" }} />
        </>
      ),
    },
  ];
  
  return (
    <div>
      <Divider /><Box height={10} />
      <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 2, mb: 2 }}>
        <Typography variant="h5" sx={{ padding: "20px" }}>Product List</Typography>
        <Autocomplete
          id="search-product"
          options={product}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => handleSearch(value)}
          renderInput={(params) => <TextField {...params} label="Search product" size="small" />}
          sx={{ width: 300 }}
        />
        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={() => navigate("/addproduct")} sx={{ bgcolor: '#7C0089' }}>
          Add Product
        </Button>
      </Stack>
      <Box height={10} />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={product} columns={columns} hideFooter disableSelectionOnClick />
      </div>
    </div>
  );
};

export default Category;








