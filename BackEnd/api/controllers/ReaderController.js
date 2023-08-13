const json = require("../components/json");
const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");

class ReaderControllers {
  index(req, res) {
    res.send("Reader Controllers");
  }

  update = async (req, res) => {
    try {
      const { ID, NAME, EMAIL, ADDRESS, GENDER, IMAGE, PHONE } = req.body;

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
      let rs = await User.update(params);
      console.log(rs);
      if (rs.rowsAffected > 0) {
        res.send(json(true, "Cập thông tin cá nhân thành công!", rs.recordset));
      } else {
        res.send(json(false, "Cập thông tin cá nhân thất bại!", []));
      }
    } catch (error) {
      console.log(error);
      return res.send(json(false, "Cập thông tin cá nhân thất bại!"));
    }
  };

  changeStatus = async (req, res) => {
    const { email, status } = req.body;
    let params = [
      { name: "email", type: "Nvarchar(50)", value: email },
      { name: "status", type: "BIT", value: status },
    ];
    let rs = await User.changeStatus(params);
    if (rs.rowsAffected > 0) {
      if (status == "0")
        res.send(json(true, "Khóa tài khoản thành công!", rs.recordset));
      else res.send(json(true, "Mở khóa tài khoản thành công!", rs.recordset));
    } else {
      res.send(json(false, "Cập thông tin cá nhân thất bại!", []));
    }
  };

  list = async (req, res) => {
    const { KEY, STATUS } = req.body;
    let params = [
      { name: "KEY", type: "Nvarchar(50)", value: KEY },
      { name: "STATUS", type: "bit", value: STATUS },
    ];

    let rs = await User.listReader(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs.recordset));
  };

  register = async (req, res) => {
    let { PASSWORD, NAME, EMAIL, ADDRESS, GENDER, IMAGE, PHONE } = req.body;
    let params = [
      { name: "ROLEID", type: "int", value: 4 },
      { name: "USERNAME", type: "Nvarchar(50)", value: EMAIL },
      { name: "PASSWORD", type: "Nvarchar(200)", value: PASSWORD },
      { name: "CREATEDUSER", type: "Int", value: null },
    ];

    if (!PASSWORD) {
      return res.send(json(false, "Mật khẩu không được để trống!", ""));
    }
    let encryptedMATKHAU = await bcrypt.hash(PASSWORD, 10);
    params[2].value = encryptedMATKHAU;
    let params3 = [{ name: "EMAIL", type: "Nvarchar(50)", value: EMAIL }];
    let params2 = [
      { name: "NAME", type: "Nvarchar(50)", value: NAME },
      { name: "EMAIL", type: "Nvarchar(50)", value: EMAIL },
      { name: "ADDRESS", type: "Nvarchar(50)", value: ADDRESS },
      { name: "GENDER", type: "BIT", value: GENDER },
      { name: "IMAGE", type: "varchar(200)", value: IMAGE },
      { name: "PHONE", type: "varchar(11)", value: PHONE },
      { name: "STATUS", type: "BIT", value: true },
      { name: "STARTWORKINGDATE", type: "DATE", value: null },
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

    let rs = await Role.getRoles(params3);
    if (rs.recordset.length > 0) {
      for (let i = 0; i < rs.recordset.length; i++) {
        if (rs.recordset[i].roleId == 4) {
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

  // themKh = async (req, res) => {
  //   const { HOTEN, DIACHI, SDT, EMAIL, NGAYSINH, GIOITINH } = req.body;
  //   let params = [
  //     { name: "HOTEN", type: "Nvarchar(50)", value: HOTEN },
  //     { name: "DIACHI", type: "Nvarchar(100)", value: DIACHI },
  //     { name: "SDT", type: "Nchar(10)", value: SDT },
  //     { name: "EMAIL", type: "Nchar(200)", value: EMAIL },
  //     { name: "NGAYSINH", type: "Date", value: NGAYSINH },
  //     { name: "GIOITINH", type: "Bit", value: GIOITINH },
  //   ];
  //   let rs = await KhachHang.insert(params);
  //   if (rs.rowsAffected > 0) {
  //     res.send(json(true, rs));
  //   } else {
  //     res.send(json(false, rs));
  //   }
  // };

  // capNhatKh = async (req, res) => {
  //   const { MAKH, HOTEN, DIACHI, SDT, EMAIL, NGAYSINH, GIOITINH } = req.body;
  //   let params = [
  //     { name: "MAKH", type: "Nchar(10)", value: MAKH },
  //     { name: "HOTEN", type: "Nvarchar(50)", value: HOTEN },
  //     { name: "DIACHI", type: "Nvarchar(100)", value: DIACHI },
  //     { name: "SDT", type: "Nchar(10)", value: SDT },
  //     { name: "EMAIL", type: "Nchar(200)", value: EMAIL },
  //     { name: "NGAYSINH", type: "Date", value: NGAYSINH },
  //     { name: "GIOITINH", type: "Bit", value: GIOITINH },
  //   ];

  //   let rs = await KhachHang.update(params);
  //   if (rs.returnValue == 1) {
  //     res.send(json(true, rs));
  //   } else {
  //     res.send(json(false, rs));
  //   }
  // };

  // xoaKh = async (req, res) => {
  //   const { MAKH } = req.body;
  //   let params = [{ name: "MAKH", type: "Nchar(10)", value: MAKH }];
  //   let rs = await KhachHang.delete(params);
  //   if (rs.returnValue == 1) {
  //     res.send(json(true, rs));
  //   } else {
  //     res.send(json(false, "Khách hàng đang có đơn không thể xóa!"));
  //   }
  // };

  // timKiemKh = async (req, res) => {
  //   const { KEY } = req.body;
  //   let params = [{ name: "KEY", type: "nvarchar(50)", value: KEY }];
  //   let rs = await KhachHang.search(params);
  //   if (rs.recordset.length == 0) {
  //     res.send(json(false, "Không có kết quả phù hợp"));
  //     return;
  //   }
  //   res.send(json(true, rs));
  // };
}

module.exports = new ReaderControllers();
