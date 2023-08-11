const json = require("../components/json");
const Category = require("../models/Category");

class CategoryControllers {
  index(req, res) {
    res.send("Category Controllers");
  }

  list = async (req, res) => {
    const { KEY, STATUS } = req.body;
    let params = [
      { name: "KEY", type: "Nvarchar(50)", value: KEY },
      { name: "STATUS", type: "bit", value: STATUS },
    ];

    let rs = await Category.getList(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs.recordset));
  };

  findName = async (req, res) => {
    const { ID } = req.body;

    let rs = await Category.findNameById(ID);
    if (rs.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs[0].name));
  };

  update = async (req, res) => {
    const { ID, NAME, UPDATEDEMPLOYEE, STATUS } = req.body;
    let params = [
      { name: "ID", type: "int", value: ID },
      { name: "NAME", type: "Nvarchar(50)", value: NAME },
      { name: "UPDATEDEMPLOYEE", type: "INT", value: UPDATEDEMPLOYEE },
      { name: "STATUS", type: "BIT", value: STATUS },
    ];
    if (!NAME) {
      return res.send(
        json(false, "Tên chuyên mục không được để trống!", "")
      );
    }
    let rs = await Category.update(params);
    if (rs.rowsAffected[0] > 0) {
      res.send(json(true, "Cập nhật chuyên mục thành công!", rs.recordset));
    } else {
      res.send(json(false, "Thêm thất bại!", []));
    }
  };

  add = async (req, res) => {
    const { NAME, CREATEDEMPLOYEE } = req.body;
    let params = [
      { name: "NAME", type: "Nvarchar(50)", value: NAME },
      { name: "CREATEDEMPLOYEE", type: "INT", value: CREATEDEMPLOYEE },
    ];
    if (!NAME) {
      return res.send(
        json(false, "Tên chuyên mục không được để trống!", "")
      );
    }
    let rs = await Category.add(params);
    if (rs.rowsAffected > 0) {
      res.send(json(true, "Thêm chuyên mục thành công!", rs.recordset));
    } else {
      res.send(json(false, "Thêm thất bại!", []));
    }
  };

  // xoaAll = async (req, res) => {
  //   const { MAKH } = req.body;
  //   let params = [{ name: "MAKH", type: "Nchar(10)", value: MAKH }];
  //   let rs = await GioHang.deleteAll(MAKH);
  //   res.send(json(true, "Xóa hết thành công!"));
  // };
}

module.exports = new CategoryControllers();
