const DB = require("../components/SqlDb");

class User {
  constructor(
    userId,
    name,
    email,
    phone,
    image,
    address,
    gender,
    startWorkingDate,
    password,
    status
  ) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.address = address;
    this.gender = gender;
    this.image = image;
    this.phone = phone;
    this.status = status;
    this.startWorkingDate = startWorkingDate;
  }
  static insert(params) {
    return DB.excute("SP_ADD_USER", params);
  }
  static update(params) {
    return DB.excute("SP_UPDATE_USER", params);
  }
  static updateEmployee(params) {
    return DB.excute("SP_UPDATE_EMPLOYEE", params);
  }
  static listReader(params) {
    return DB.excute("SP_LIST_READER", params);
  }
  static listAuthor(params) {
    return DB.excute("SP_LIST_AUTHOR", params);
  }
  static listEmployee(params) {
    return DB.excute("SP_LIST_EMPLOYEE", params);
  }
  static changeStatus(params) {
    return DB.excute("SP_CHANGE_STATUS", params);
  }
  static getUserByEmail(params) {
    return DB.excute("SP_GET_USER_BY_EMAIL", params);
  }
  static addAccount(params) {
    return DB.excute("SP_ADD_ACCOUNT", params);
  }
  static changPassword(params) {
    return DB.excute("SP_CHANGE_PASSWORD", params);
  }
  static findByEmail(email) {
    return DB.query(`SELECT * FROM [USER] WHERE EMAIL='${email}'`);
  }
  static findPassword(email) {
    return DB.query(`SELECT password FROM Account WHERE username='${email}'`);
  }
  static findById(ID) {
    return DB.query(`select name from [User] where userId='${ID}'`);
  }
}

module.exports = User;
