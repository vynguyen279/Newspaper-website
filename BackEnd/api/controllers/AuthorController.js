const json = require("../components/json");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");

class AuthorControllers {
  index(req, res) {
    res.send("Author Controllers");
  }

  list = async (req, res) => {
    const { KEY, STATUS, GENDER } = req.body;
    let params = [
      { name: "KEY", type: "Nvarchar(50)", value: KEY },
      { name: "STATUS", type: "bit", value: STATUS },
      { name: "GENDER", type: "bit", value: GENDER },
    ];

    let rs = await User.listAuthor(params);
    console.log(rs);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs.recordset));
  };

  findName = async (req, res) => {
    const { ID } = req.body;

    let rs = await User.findById(ID);
    if (rs.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs[0].name));
  };

  update = async (req, res) => {
    const { ID, NAME, EMAIL, ADDRESS, GENDER, IMAGE, PHONE } = req.body;
    let params = [
      { name: "ID", type: "int", value: ID },
      { name: "NAME", type: "Nvarchar(50)", value: NAME },
      { name: "EMAIL", type: "Nvarchar(50)", value: EMAIL },
      { name: "ADDRESS", type: "Nvarchar(50)", value: ADDRESS },
      { name: "GENDER", type: "BIT", value: GENDER },
      { name: "IMAGE", type: "Nchar(200)", value: IMAGE },
      { name: "PHONE", type: "Nchar(10)", value: PHONE },
      // { name: "STATUS", type: "BIT", value: STATUS },
      // { name: "STARTWORKINGDATE", type: "DATE", value: null },
    ];
    if (!NAME) {
      return res.send(json(false, "Họ tên không được để trống!", ""));
    }

    if (!EMAIL) {
      return res.send(json(false, "Email không được để trống!", ""));
    }

    if (!EMAIL.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      return res.send(json(false, "Email không hợp lệ!", ""));
    }

    if (!IMAGE) {
      return res.send(json(false, "Bạn chưa chọn ảnh đại diện!", ""));
    }

    if (!PHONE) {
      return res.send(json(false, "Số điện thoại không được để trống!", ""));
    }

    if (!PHONE.match(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)) {
      return res.send(json(false, "Số điện thoại không hợp lệ!", ""));
    }
    let rs = await User.update(params);
    if (rs.rowsAffected > 0) {
      res.send(json(true, "Cập thông tin cá nhân thành công!", rs.recordset));
    } else {
      res.send(json(false, "Cập thông tin cá nhân thất bại!", []));
    }
  };

  register = async (req, res) => {
    let { PASSWORD, NAME, EMAIL, ADDRESS, GENDER, IMAGE, PHONE } = req.body;
    let params = [
      { name: "ROLEID", type: "int", value: 3 },
      { name: "USERNAME", type: "Nvarchar(50)", value: EMAIL },
      { name: "PASSWORD", type: "Nvarchar(200)", value: PASSWORD },
      { name: "CREATEDUSER", type: "Int", value: null },
    ];
    if (!NAME) {
      return res.send(json(false, "Họ tên không được để trống!", ""));
    }

    if (!EMAIL) {
      return res.send(json(false, "Email không được để trống!", ""));
    }

    if (!EMAIL.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      return res.send(json(false, "Email không hợp lệ!", ""));
    }

    if (!IMAGE) {
      return res.send(json(false, "Bạn chưa chọn ảnh đại diện!", ""));
    }

    if (!PHONE) {
      return res.send(json(false, "Số điện thoại không được để trống!", ""));
    }

    if (!PHONE.match(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)) {
      return res.send(json(false, "Số điện thoại không hợp lệ!", ""));
    }
    if (PASSWORD.length > 15 || PASSWORD.length < 8) {
      return res.send(
        json(
          false,
          "Mật khẩu phải có độ dài lớn hơn 8 ký tự và nhỏ hơn 15 ký tự!",
          ""
        )
      );
    }
    let encryptedMATKHAU = await bcrypt.hash(PASSWORD, 10);
    params[2].value = encryptedMATKHAU;
    let params3 = [{ name: "EMAIL", type: "Nvarchar(50)", value: EMAIL }];
    let params2 = [
      { name: "NAME", type: "Nvarchar(50)", value: NAME },
      { name: "EMAIL", type: "Nvarchar(50)", value: EMAIL },
      { name: "ADDRESS", type: "Nvarchar(50)", value: ADDRESS },
      { name: "GENDER", type: "BIT", value: GENDER },
      { name: "IMAGE", type: "Nchar(200)", value: IMAGE },
      { name: "PHONE", type: "Nchar(10)", value: PHONE },
      { name: "STATUS", type: "BIT", value: true },
      { name: "STARTWORKINGDATE", type: "DATE", value: null },
    ];

    let rs = await Role.getRoles(params3);
    if (rs.recordset.length > 0) {
      for (let i = 0; i < rs.recordset.length; i++) {
        if (rs.recordset[i].roleId == 3) {
          res.send(json(false, "Địa chỉ email này đã được đăng ký!", []));
          return;
        }
      }
      let insert = await User.addAccount(params);
      if (insert.recordset.length > 0) {
        res.send(json(true, "Thêm tài khoản thành công!", insert.recordset));
      } else {
        res.send(json(false, "Thêm tài khoản thất bại!", []));
      }
    } else {
      let rs = await User.insert(params2);
      if (rs.recordset.length > 0) {
        let insert = await User.addAccount(params);
        if (insert.recordset.length > 0) {
          res.send(
            json(true, "Đăng ký tài khoản thành công!", insert.recordset)
          );
        } else {
          res.send(json(false, "Đăng ký tài khoản thất bại!", []));
        }
      }
    }
  };
}

module.exports = new AuthorControllers();
