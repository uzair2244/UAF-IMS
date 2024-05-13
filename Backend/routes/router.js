const productRouter = require("../routes/product.routes");
const userRouter = require("../routes/user.routes")
const taskRouter = require("../routes/task.routes")
const transactionRouter = require("../routes/transaction.routes")

const router = require("express").Router();

router.use("/products", productRouter);

router.use("/user", userRouter)

router.use("/task", taskRouter)

router.use("/transaction", transactionRouter)

module.exports = router;
