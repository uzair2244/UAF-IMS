// const adminRouter = require("./admin.routes");
const productRouter = require("../routes/product.routes");
const userRouter = require("../routes/user.routes")
const taskRouter = require("../routes/task.routes")

const router = require("express").Router();

// router.use("/admin", adminRouter);

router.use("/products", productRouter);

router.use("/user", userRouter)

router.use("/task", taskRouter)

module.exports = router;
