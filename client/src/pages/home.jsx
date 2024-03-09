import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Home = () => {
  const [Products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //SHOW DATA
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/items');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    try {
      const response = await axios.get(`/api/items?search=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (confirmDelete) {
        await axios.delete(`/api/delete-item/${id}`);
        setProducts(Products.filter(product => product._id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  //Route ADD ITEM
  let navigate = useNavigate();

  const  itemsRoute = () =>{
    let path = '/add-item';
    navigate(path);
  }
  
  const  detailItem = (id) =>{
    let path1 = `/detail-items/${id}`;
    navigate(path1);
  }

  const  editItem = (id) =>{
    let path2 = `/edit-items/${id}`;
    navigate(path2);
  }
  return (
    <div className="home-container">
      <Card className="card-container">
        <div className="home-header">
          <button className="button-add" onClick={itemsRoute}>Tambah produk</button>
          <div className="search">
            <input type="text" placeholder="Masukan kata kunci..." value={searchTerm} 
              onChange={handleSearch} />
          </div>
        </div>

        <Table className="table-container">
          <thead className="thead">
            <th>No</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Stock</th>
            <th>Aksi</th>
          </thead>
          <tbody>
          {Products.map((Product, index) => (
              <tr key={Product._id}>
                <td>{index + 1}</td>
                <td>{Product.name}</td>
                <td>{Product.price}</td>
                <td>{Product.stock}</td>
                <td className="button-group">
                  <Link to={`/detail-items/${Product._id}`} className="btn btn-sm btn-info" onClick={() => detailItem(Product._id)}>Detail</Link><span> </span>
                  <Link to={`/edit-items/${Product._id}`} className="btn btn-sm btn-warning" onClick={() => editItem(Product._id)}>Edit</Link><span> </span>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteItem(Product._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>1</td>
              <td>Laptop Asus</td>
              <td>Rp.10.0000.000</td>
              <td className="button-group">
                <Link to="/detail" className="btn btn-sm btn-info ">Detail</Link><span> </span>
                <Link to="/edit" className="btn btn-sm btn-warning">Edit</Link><span> </span>
                <Link to="#" className="btn btn-sm btn-danger">Delete</Link><span> </span>
              </td>
            </tr> */}
            {/* <tr>
              <td>2</td>
              <td>Laptop Compact</td>
              <td>Rp.10.0000.000</td>
              <td className="button-group">
                <Link to="/detail" className="btn btn-sm btn-info ">Detail</Link><span> </span>
                <Link to="/edit" className="btn btn-sm btn-warning">Edit</Link><span> </span>
                <Link to="#" className="btn btn-sm btn-danger">Delete</Link><span> </span>
              </td>
            </tr> */}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};
