const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/Authetication");
const categoryController = require("../controllers/CategoryController");

router.use("/list", categoryController.list);
router.use("/update", authenticateToken, categoryController.update);
router.use("/add", authenticateToken, categoryController.add);
router.use("/findName", categoryController.findName);

router.use("/", categoryController.index);

module.exports = router;
