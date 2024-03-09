import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const EditItems = () => {
  const [name, setName] = useState("");
  const [harga, setHarga] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useParams();

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/edit-items/${id}`, {
        name,
        price: parseFloat(harga),
        stock: parseInt(stock),
        status,
      });
      console.log("Edit success:", response.data);
      HomeRoute()
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/detail-items/${id}`);
        const item = response.data;
        setName(item.name);
        setHarga(item.price.toString());
        setStock(item.stock.toString());
        setStatus(item.status);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };
    fetchItem();
  }, [id]);

  let navigate = useNavigate();
  const  HomeRoute = () =>{
    let path = '/';
    navigate(path);
  }
  
  return (
    <div className="home-container">
      <Card className="card-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <label className="label-add-item">Edit Produk</label>
          <br />
          <br />
          <label>Nama</label>
          <br />
          <input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            className="input-data"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={stock}
            onChange={handleStockChange}
          />
          <br />
          <input
            name="status"
            type="checkbox"
            value={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <span> </span>
          <label>Active</label>
          <br />
          <br />
          <button className="button-add">Edit Produk</button>
        </form>
      </Card>
    </div>
  );
};
