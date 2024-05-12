const express = require("express");

const {
  addNewProduct,
  DeleteProduct,
  UpdateProduct,
  getProduct,
  getAllProductNames
} = require("../controllers/product-controller");


const tokenVerification = require("../middlewares/tokenverification");

const router = express.Router();

router.get("/", getProduct);

router.get("/names", getAllProductNames);

router.post(
  "/",
  [tokenVerification],
  addNewProduct
);

router.delete("/:id", [tokenVerification], DeleteProduct);

router.put(
  "/:id",
  [tokenVerification],
  UpdateProduct
);


module.exports = router;
