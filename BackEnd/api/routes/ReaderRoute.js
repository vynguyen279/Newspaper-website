const express = require("express");
const router = express.Router();
const { authenticateToken, checkRoleReader } = require("../middlewares/Authetication");
const readerController = require("../controllers/ReaderController");

// router.use("/GetList", sanPhamController.getList);
// router.use("/GetListType", sanPhamController.getListType);
// router.use("/Insert", sanPhamController.themSp);
// router.use("/Delete", sanPhamController.xoaSp);
router.use("/lock", authenticateToken, readerController.changeStatus);
router.use("/update", checkRoleReader, readerController.update);
router.use("/register", readerController.register);
router.use("/list", authenticateToken, readerController.list);

router.use("/", readerController.index);

module.exports = router;
