const DB = require("../components/SqlDb");

class Role {
  constructor(
    roleId,
    name,
    createdTime,
    createdAdmin,
    updatedTime,
    updatedAdmin
  ) {
    this.roleId = roleId;
    this.name = name;
    this.createdTime = createdTime;
    this.createdAdmin = createdAdmin;
    this.updatedTime = updatedTime;
    this.updatedAdmin = updatedAdmin;
  }

  static insert(params) {
    return DB.excute("SP_ADD_ROLE", params);
  }
  static getRoles(params) {
    return DB.excute("SP_GET_ROLES_BY_EMAIL", params);
  }
  static listRole() {
    return DB.query(`SELECT ROLEID, NAME FROM ROLE`);
  }
}

module.exports = Role;
