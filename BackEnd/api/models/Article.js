const DB = require("../components/SqlDb");

class Article {
  constructor(articleId, summary, authorId, content, title, publishTime, publishOfficer, updatedime, note, views, categoryId, status) {
    this.articleId = articleId;
    this.summary = summary;
    this.authorId = authorId;
    this.content = content;
    this.title = title;
    this.publishTime = publishTime;
    this.publishOfficer = publishOfficer;
    this.updatedime = updatedime;
    this.note = note;
    this.views = views;
    this.categoryId = categoryId;
    this.status = status;
  }

  static insert(params) {
    return DB.excute("SP_ADD_ARTICLE", params);
  }

  static update(params) {
    return DB.excute("SP_UPDATE_ARTICLE", params);
  }
  static updateForOfficer(params) {
    return DB.excute("SP_UPDATE_ARTICLE_FOR_OFFICER", params);
  }
  static list(params) {
    return DB.excute("SP_LIST_ARTICLE", params);
  }
  static listForAuthor(params) {
    return DB.excute("SP_LIST_ARTICLE_FOR_AUTHOR", params);
  }
  static listModify(params) {
    return DB.excute("SP_LIST_ARTICLE_HOME", params);
  }
}

module.exports = Article;
