const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// router.use("/AddOrder", donHangController.themDH);
// router.use("/ListOrder", donHangController.getListOrder);
// router.use("/FilterOrder", donHangController.filterOrder);
// router.use("/UpdateOrder", donHangController.updateOrder);
// router.use("/CancelOrder", donHangController.cancelOrder);

router.use("/changePassword", authController.changePassword);
router.use("/sendEmail", authController.sendEmail);
router.use("/resetPassword", authController.resetPassword);
router.use("/logIn", authController.logIn);
router.use("/", authController.index);

module.exports = router;
