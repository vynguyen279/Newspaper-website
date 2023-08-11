const DB = require('../components/SqlDb')

class Comment {
    constructor(commentId, readerId, articleId, content, createdTime,
        status, replyTo){
        this.commentId = commentId
        this.readerId = readerId
        this.articleId = articleId
        this.content = content
        this.createdTime = createdTime
        this.status = status
        this.replyTo = replyTo
    }

    static list(params) {
        return DB.excute("SP_LIST_COMMENT", params);
      }
    static add(params) {
        return DB.excute("SP_ADD_COMMENT", params);
      }
    static updateStatus(params) {
        return DB.excute("SP_CHECK_COMMENT", params);
      }
    static listCommentByArticleId(ID) {
        return DB.query(`SELECT * FROM COMMENT WHERE ARTICLEID='${ID}' AND STATUS='true'`);
      }
    static delete(ID) {
        return DB.query(`DELETE FROM COMMENT WHERE COMMENTID='${ID}'`);
      }

}

module.exports = Comment