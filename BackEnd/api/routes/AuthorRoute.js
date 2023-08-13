const express = require("express");
const router = express.Router();
const { authenticateToken, checkRoleAuthor, checkRoleReader } = require("../middlewares/Authetication");
const authorControllers = require("../controllers/AuthorController");
const readerController = require("../controllers/ReaderController");

// router.use("/AddCart", gioHangController.themSP);
// router.use("/DeleteCart", gioHangController.xoaSP);
// router.use("/DeleteAllCart", gioHangController.xoaAll);
// router.use("/ListCart", gioHangController.getListCart);
router.use("/lock", authenticateToken, readerController.changeStatus);
router.use("/list", authenticateToken, authorControllers.list);
router.use("/register", authorControllers.register);
router.use("/update", checkRoleAuthor, authorControllers.update);
router.use("/findName", authorControllers.findName);
router.use("/", authorControllers.index);

module.exports = router;
