import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export const Detail = () => {
  const [Product, setProduct] = useState(null);
  const {id} = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/detail-items/${id}`); // Fetch product details by ID
        setProduct(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const  backRoute = () =>{
    let path = '/';
    navigate(path);
  }
  if (!Product) {
    return <div>Loading...</div>; // Render loading state while product data is being fetched
  }
  return (
    <div className="home-container">
      <Card className="card-container">
        <div className="home-header">
          <button className="button-back" onClick={backRoute}>Kembali</button>
        </div>
        <Row className="row-custom">
          <Col>ID</Col>
          <Col className="col-custom" xs={"auto"}>:</Col>
          <Col>{Product._id}</Col>
        </Row>
        <Row className="row-custom">
          <Col>Nama Produk</Col>
          <Col xs={"auto"}>:</Col>
          <Col>{Product.name}</Col>
        </Row>
        <Row className="row-custom">
          <Col>Harga</Col>
          <Col xs={"auto"}>:</Col>
          <Col>Rp. {Product.price}</Col>
        </Row>
        <Row className="row-custom">
          <Col>Stock</Col>
          <Col xs={"auto"}>:</Col>
          <Col>{Product.stock}</Col>
        </Row>
      </Card>
    </div>
  );
};
