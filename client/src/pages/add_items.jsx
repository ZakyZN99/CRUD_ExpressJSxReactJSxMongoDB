import { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddItems = () => {
  const [harga, setHarga] = useState("");
  const [stock, setStock] = useState("");
  const [inputValue, setInputValue] = useState({
    name: "",
    status: false,
  });

  let navigate = useNavigate();
  const  itemsRoute = () =>{
    let path = '/';
    navigate(path);
  }

  const handleHargaChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");
    setHarga(numericValue);
  };
  const handleStockChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");
    setStock(numericValue);
  };
  const formatCurrency = (value) => {
    const cleanValue = value.replace(/[^\d]/g, "").trim();
    if (cleanValue === "") return "";
    return parseFloat(cleanValue).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };
  

  //ADD DATA
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/add-items", {
        name: inputValue.name,
        price: harga,
        stock: stock,
        status: inputValue.status,
      });
      itemsRoute();
      console.log("Response:", response.data);
      // Handle success or update state accordingly
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <div className="home-container">
      <Card className="card-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <label className="label-add-item">Tambah Produk</label>
          <br />
          <label>Nama</label>
          <br />
          <input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            className="input-data"
            value={inputValue.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, name: e.target.value })
            }
          />
          <br />
          <label>Harga</label>
          <br />
          <input
            name="harga"
            type="text"
            inputMode="numeric"
            placeholder="Harga..."
            value={harga}
            onChange={handleHargaChange}
            className="input-data"
          />
          <br />
          <label>Stock</label>
          <br />
          <input
            name="stock"
            type="number"
            placeholder="Stock..."
            className="input-data"
            value={inputValue.stock} 
            onChange={handleStockChange} 
        />
          <br />
          <input name="status" type="checkbox" value={false} 
             checked={inputValue.status} 
            onChange={(e) => setInputValue({ ...inputValue, status: e.target.checked })} 
          />
          <span> </span>
          <label>Active</label>
          <br />
          <br />
          <button className="button-add">Tambah Produk</button>
        </form>
      </Card>
    </div>
  );
};
