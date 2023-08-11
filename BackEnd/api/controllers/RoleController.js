const json = require('../components/json');
const Role = require("../models/Role");

class RoleControllers {
  index(req, res) {
    res.send("Role Controllers");
  }
  list = async (req, res) => {

    let rs = await Role.listRole();
    if (rs.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs));
  };

}

module.exports = new RoleControllers();
