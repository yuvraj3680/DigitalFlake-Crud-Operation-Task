import React from 'react'
import Header from "../components/Headerpage/Header";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from '../components/Homepage/Home';
import Registration from '../components/User/Registration';
import Login from '../components/User/Login';
import Category from '../components/Categorypage/Category';
import Products from '../components/Productspage/Products';
import AddCategory from '../components/Categorypage/AddCategory';
import AddProducts from '../components/Productspage/AddProducts';
import UpdateProducts from '../components/Productspage/UpdateProducts';
import UpdateCategory from '../components/Categorypage/UpdateCategory';
const RouteManager = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Header/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/addcategory" element={<AddCategory/>}/>
        <Route path="/product" element={<Products/>}/>
        <Route path="/addproduct" element={<AddProducts/>}/>
        <Route path="/updateproduct/:id" element={<UpdateProducts/>}/>
        <Route path="/updatecategory/:id" element={<UpdateCategory/>}/>
        

              


        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default RouteManager
