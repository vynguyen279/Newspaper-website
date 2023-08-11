const express = require("express");
const router = express.Router();
const { checkRoleReader, authenticateToken } = require("../middlewares/Authetication");
const CommentController = require("../controllers/CommentController");

router.use("/list", authenticateToken, CommentController.getList);
router.use("/listByArticle", checkRoleReader, CommentController.listByArticle);
router.use("/check", authenticateToken, CommentController.changeStatus);
router.use("/delete", authenticateToken, CommentController.delete);
router.use("/add", checkRoleReader, CommentController.add);
router.use("/", CommentController.index);

module.exports = router;
