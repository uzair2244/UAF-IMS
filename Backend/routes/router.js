// Importing routes
const adminRouter = require("./admin.routes");
const productRouter = require("../routes/product.routes");
const userRouter = require("../routes/user.routes")
const taskRouter = require("../routes/task.routes")
// Importing express router
const router = require("express").Router();

// Using user routes
router.use("/admin", adminRouter);
// Using product routes
router.use("/products", productRouter);

router.use("/user",userRouter)

router.use("/task",taskRouter)

module.exports = router;
