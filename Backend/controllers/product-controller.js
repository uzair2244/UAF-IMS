const Product = require("../models/Product");
const User = require("../models/Admin");
const customError = require("../utils/error");

const addNewProduct = async (req, res) => {
  const { name, code, units, price,market,location } = req.body;
  // const { id } = req;
  // console.log(req.body)
  const product = await Product.create({
    name,
    code,
    units,
    price,
    market,
    location,
  });
  if (product) {
    return res.status(200).json({ message: "Product inserted successfully!" });
  } 
};


const DeleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (product) {
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    throw new customError(500, "Something went wrong!");
  }
};

const UpdateProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const {    
    name,
    code,
    units,
    price,
    market,
    location, } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    { name,
      code,
      units,
      price,
      market,
      location, },
    { new: true }
  );
  if (product) {
    return res.status(200).json({ message: "Product updated successfully!" });
  } else {
    throw new customError(500, "Something went wrong!");
  }
};

const getProduct = async (req, res) => {
  const products = await Product.find();
  if (products) {
    res
      .status(200)
      .json({ message: "Successfully got the products", products: products });
  } else {
    throw new customError(500, "Something went wrong!");
  }
};

module.exports = {
  addNewProduct,
  DeleteProduct,
  UpdateProduct,
  getProduct,
};
