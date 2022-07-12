import React, { useEffect } from "react";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProducts } from "../../actions/productAction";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Metadata";
import Sidebar from "./Sidebar";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminProducts());
  }, [dispatch, alert, error]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "price",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "action",
      headerName: "action",
      type: "number",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`All Products -- ADMIN`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
