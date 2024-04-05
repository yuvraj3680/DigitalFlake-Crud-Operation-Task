import React, { useState, useEffect } from "react";
import { ReqClass } from '../../services/Api';
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    ReqClass.getReq('/category')
      .then((response) => {
        let categories = response.data['data'];
        setCategories(categories.map(category => ({
          id: category.id,
          name: category.name,
          description: category.description,
          status: category.status,
        })));
        setFilteredCategories(categories);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  //handle the delete functinality
  const handleDelete = (id) => {
    ReqClass.deleteReq(`/category/${id}`)
      .then(() => {
        setCategories(currentCategories =>
          currentCategories.filter(category => category.id !== id)
        );
        setFilteredCategories(currentCategories =>
          currentCategories.filter(category => category.id !== id)
        );
      })
      .catch(error => {
        console.error('Failed to delete category:', error);
       
      });
  };

  // const handleSearch = (value) => {
  //   if (value && typeof value === 'string') {
  //     const filtered = categories.filter(category =>
  //       typeof category.name === 'string' &&
  //       category.name.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredCategories(filtered);
  //   } else {
     
  //   }
  // };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "status", headerName: "Status", width: 110 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <EditIcon
            onClick={() => navigate(`/updatecategory/${params.id}`)}
            style={{ cursor: "pointer", marginRight: 16 }}
          />
          <DeleteIcon
            onClick={() => handleDelete(params.id)}
            style={{ cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Divider />
      <Box height={10} />
      <Stack direction="row" alignItems="center" spacing={12} className="my-2 mb-2">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Category List
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categories}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => handleSearch(value)}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search Categories" />
          )}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={() => navigate("/addcategory")}
          sx={{ backgroundColor: '#7C0089', color: 'white' }}
        >
          Add Category
        </Button>
      </Stack>
      <Box height={10} />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredCategories}
          columns={columns}
          hideFooter
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Category;



  
 