const express = require("express");

const {
  addNewProduct,
  DeleteProduct,
  UpdateProduct,
  getProduct,
} = require("../controllers/product-controller");

// Middlewares
const tokenVerification = require("../middlewares/tokenverification");


const {
  productValidationSchema,
  updateProductValidationSchema,
} = require("../utils/validationSchema");

// Creating a router instance
const router = express.Router();

// Route for adding a new product
router.post(
  "/",
  [
    tokenVerification,
  ],
  addNewProduct
);

// Route for deleting a product by ID
router.delete("/:id", [tokenVerification], DeleteProduct);

// Route for updating a product by ID
router.put(
  "/:id",
  [
    tokenVerification,
  ],
  UpdateProduct
);

// Route for getting a product by ID
router.get("/", getProduct);

module.exports = router;
