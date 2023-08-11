const json = require("../components/json");
const getToken =  require("../utils/getToken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/User");
const Role = require("../models/Role");
dotenv.config();
const mailer = require("nodemailer");
// const TaiKhoan = require("../models/TaiKhoan");
// const KhachHang = require("../models/KhachHang");

class AuthControllers {
  index(req, res) {
    res.send(dotenv.config());
  }

  sendEmail = async (req, res) => {
    const { EMAIL, mess } = req.body;

    var transporter = mailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "vy279.thpt@gmail.com",
        pass: "wsszyhsufjuqkcov",
      },
    });

    let info = await transporter.sendMail({
      from: "vy279.thpt@gmail.com",
      to: EMAIL,
      subject: "Thay đổi mật khẩu",
      text: "Mật khẩu mới: " + mess,
    });
    res.status(200).send(json(true, "Đã gửi mail!", ""));
  };

  resetPassword = async (req, res) => {
    const { EMAIL } = req.body;

    if (!EMAIL) {
      return res.send(
        json(false, "Bạn chưa nhập email!", "")
      );
    }

    if (!EMAIL.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      return res.send(
        json(false, "Email không hợp lệ!", "")
      );
    }

    let rs = await User.findByEmail(EMAIL);

    if (rs.length == 0) {
      res.send(json(false, "Email này chưa đăng ký tài khoản!"));
      return;
    }

    //random và mã hóa mật khẩu
    let password = Date.now().toString(36);
    let salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
    let params = [
      { name: "EMAIL", type: "Nchar(200)", value: EMAIL },
      { name: "PASSWORD", type: "varchar(200)", value: encryptedPassword }
    ];
    let rs2 = await User.changPassword(params);
    // console.log(rs2)
    if(rs2.rowsAffected[0] > 0){
    // console.log(
    //   "Cấp lại mật khẩu thành công, mật khẩu mới: " +
    //   encryptedPassword +
    //     "  " +
    //     password
    // );
    res.send(json(true, "Reset mật khẩu thành công!", password));
    }
  };

  changePassword = async (req, res) => {
    const { EMAIL, PASSWORD, NEWPASSWORD, REPASSWORD } = req.body;
    let params = [
      { name: "EMAIL", type: "Nvarchar(50)", value: EMAIL },
      { name: "PASSWORD", type: "Nvarchar(200)", value: PASSWORD },
    ];
    if(PASSWORD.trim().length == 0){
      return res.send(
        json(false, "Mật khẩu cũ không được bỏ trống!", "")
      );
    }
    let rs = await User.findPassword(EMAIL)
    const compare = await bcrypt.compare(PASSWORD.trim(), rs[0].password.trim());
    console.log(compare)
    if(!compare){
      return res.send(
        json(false, "Mật khẩu cũ không chính xác!", "")
      );
    }
    if(NEWPASSWORD.trim().length == 0){
      return res.send(
        json(false, "Mật khẩu mới không được bỏ trống!", "")
      );
    }
    if(REPASSWORD.trim().length == 0){
      return res.send(
        json(false, "Bạn chưa xác nhận mật khẩu mới!", "")
      );
    }

    if(NEWPASSWORD.length > 15 || NEWPASSWORD.length < 8){
      return res.send(
        json(false, "Mật khẩu phải có độ dài lớn hơn 8 ký tự và nhỏ hơn 15 ký tự!", "")
      );
    }

    if(NEWPASSWORD.trim().toLowerCase()!=REPASSWORD.trim().toLowerCase()){
      return res.send(
        json(false, "Xác nhận mật khẩu mới không chính xác!", "")
      );
    } 

    let encryptedMATKHAU = await bcrypt.hash(NEWPASSWORD.trim(), 10);
    params[1].value = encryptedMATKHAU;
    let result = await User.changPassword(params);
    if(result.rowsAffected.length > 0)
    return res.send(
      json(true, "Cập nhật mật khẩu thành công!", "")
    );
  };

  logIn = async (req, res) => {
    try {
      const { username, password } = req.body;
      let params = [
        { name: "email", type: "Nvarchar(50)", value: username },
      ];
      if (!username || !password) {
        return res.send(
          json(false, "Tên đăng nhập và mật khẩu không được để trống!", "")
        );
      }

      const user = await User.getUserByEmail(params);
      // console.log(user.recordset.length===0)
      if (user.recordset.length===0) {
        return res.send(json(false, "Email này chưa đăng ký tài khoản!", ""));
      }

      const rs = await bcrypt.compare(password.trim(), user.recordset[0].password.trim());

      if (!rs) {
        return res.send(json(false, "Sai mật khẩu!", ""));
      }

      if (!user.recordset[0].status) {
        return res.send(
          json(false, "Tài khoản đã bị khóa không thể đăng nhập!", "")
        );
      }

      const listRole = await Role.getRoles(params);
      const token = getToken(username, listRole.recordset);
      res.setHeader("Authorization", token);
      res.setHeader("Access-Control-Expose-Headers", "*");
      return res.send(
        json(true, "Đăng nhập thành công!", [
          {
            role: listRole.recordset,
            userId: user.recordset[0].userId,
            name: user.recordset[0].name,
            email: user.recordset[0].email,
            image: user.recordset[0].image,
            status: user.recordset[0].status,
            startWorkingDate: user.recordset[0].startWorkingDate,
            address: user.recordset[0].address,
            gender: user.recordset[0].gender,
            phone: user.recordset[0].phone,
          },
        ])
      );
    } catch (error) {
      console.log(error);
      return res.send(json(false, "Đăng nhập thất bại!"));
    }
  };
}

module.exports = new AuthControllers();
