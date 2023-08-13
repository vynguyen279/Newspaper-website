const DB = require("../components/SqlDb");

class Category {
  constructor(categoryId, name) {
    this.categoryId = categoryId;
    this.name = name;
  }

  static insert(params) {
    return DB.excute("SP_ADD_CATEGORY", params);
  }
  static delete(params) {
    return DB.excute("SP_DELETE_CATEGORY", params);
  }
  static getList(params) {
    return DB.excute("SP_LIST_CATEGORY", params);
  }
  static update(params) {
    return DB.excute("SP_UPDATE_CATEGORY", params);
  }
  static add(params) {
    return DB.excute("SP_ADD_CATEGORY", params);
  }
  static findNameById(ID) {
    return DB.query(`select name from Category where categoryId='${ID}'`);
  }
}

module.exports = Category;
