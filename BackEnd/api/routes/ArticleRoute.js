const express = require("express");
const router = express.Router();
const { authenticateToken, checkRoleAuthor, checkRoleManager } = require("../middlewares/Authetication");
const articleController = require("../controllers/ArticleController");

// router.use("/AddOrder", donHangController.themDH);
// router.use("/ListOrder", donHangController.getListOrder);
// router.use("/FilterOrder", donHangController.filterOrder);
// router.use("/UpdateOrder", donHangController.updateOrder);
router.use("/add", checkRoleAuthor, articleController.addArticle);
router.use("/update", checkRoleAuthor, articleController.updateArticleForAuthor);
router.use("/check", checkRoleManager,articleController.updateArticleForOfficer);
router.use("/list", authenticateToken, articleController.getList);
router.use("/listForAuthor", checkRoleAuthor,articleController.getListForAuthor);
router.use("/listModify", articleController.getListModify);

router.use("/", articleController.index);

module.exports = router;
