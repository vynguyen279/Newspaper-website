const json = require("../components/json");
const Article = require("../models/Article");

class ArticleControllers {
  index(req, res) {
    res.send("Article Controller");
  }

  getList = async (req, res) => {
    const { KEY, STATUS, CATE } = req.body;
    let params = [
      { name: "KEY", type: "Nvarchar(50)", value: KEY },
      { name: "STATUS", type: "Nvarchar(20)", value: STATUS },
      { name: "CATE", type: "int", value: CATE }
    ];

    // if(!FROM || !TO){
    //   res.send(json(false, "Bạn chưa chọn đủ khoảng thời gian!", []));
    //   return;
    // }

    let rs = await Article.list(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs.recordset));
  };

  getListForAuthor = async (req, res) => {
    const { CATEGORYID, STATUS, ARTICLEID, AUTHORID} = req.body;
    let params = [
      { name: "CATEGORYID", type: "int", value: CATEGORYID },
      { name: "AUTHORID", type: "int", value: AUTHORID },
      { name: "STATUS", type: "Nvarchar(20)", value: STATUS },
      { name: "ARTICLEID", type: "int", value: ARTICLEID }
    ];

    let rs = await Article.listForAuthor(params);
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs.recordset));
  };

  getListModify = async (req, res) => {
    const { KEY, TOP, TYPE } = req.body;
    let params = [
      { name: "KEY", type: "int", value: KEY },
      { name: "TOP", type: "int", value: TOP },
      { name: "TYPE", type: "int", value: TYPE },
    ];

    let rs = await Article.listModify(params);
    if (!rs.recordset) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs.recordset));
  };

  addArticle = async (req, res, next) => {
    const { summary, authorId, content, title, categoryId, status, image } = req.body;
    let params = [
      { name: "summary", type: "Nvarchar(300)", value: summary },
      { name: "authorId", type: "int", value: authorId },
      { name: "content", type: "Nvarchar(MAX)", value: content },
      { name: "title", type: "Nvarchar(200)", value: title },
      { name: "categoryId", type: "int", value: categoryId },
      { name: "status", type: "Nvarchar(20)", value: status },
      { name: "image", type: "varchar(250)", value: image },
    ];
    try {
      if (!title) {
        res.send(json(false, "Tiêu đề không được để trống!", []));
        return;
      }
      if (!summary) {
        res.send(json(false, "Tóm tắt không được để trống!", []));
        return;
      }
      if (!image) {
        res.send(json(false, "Bạn chưa chọn ảnh đạu diện cho bài viết!", []));
        return;
      }

      let rs = await Article.insert(params);
      if (rs.rowsAffected.length > 0) {
        res.send(json(true, "Thêm bài viết thành công!", rs.recordset[0]));
      } else {
        res.send(json(false, "Thêm bài viết thất bại!", []));
      }
    } catch (err) {
      next(err);
    }
  };

  updateArticleForAuthor = async (req, res, next) => {
    const { articleId, summary, content, title, categoryId, status, image } = req.body;
    let params = [
      { name: "summary", type: "Nvarchar(300)", value: summary },
      { name: "articleId", type: "Nvarchar(20)", value: articleId },
      { name: "content", type: "Nvarchar(MAX)", value: content },
      { name: "title", type: "Nvarchar(200)", value: title },
      { name: "image", type: "Nvarchar(250)", value: image },
      { name: "categoryId", type: "int", value: categoryId },
      { name: "status", type: "Nvarchar(20)", value: status },
    ];
    try {
      if (title.length == 0) {
        res.send(json(false, "Tiêu đề không được để trống!", []));
        return;
      }
      if (summary.length == 0) {
        res.send(json(false, "Tóm tắt không được để trống!", []));
        return;
      }

      let rs = await Article.update(params);
      if (rs.rowsAffected > 0) {
        res.send(json(true, "Cập nhật bài viết thành công!", rs.recordset[0]));
      } else {
        res.send(json(false, "Cập nhật viết thất bại!", []));
      }
    } catch (err) {
      next(err);
    }
  };

  updateArticleForOfficer = async (req, res, next) => {
    const { articleId, checkedEmployee, note, status } = req.body;
    let params = [
      { name: "articleId", type: "int", value: articleId },
      { name: "checkedEmployee", type: "int", value: checkedEmployee },
      { name: "note", type: "Nvarchar(MAX)", value: note },
      { name: "status", type: "Nvarchar(20)", value: status },
    ];
    try {
      if (status==='Chưa đạt' && note.length ==0) {
        res.send(json(false, "Bạn chưa điền ghi chú lý do bài viết chưa đạt!", []));
        return;
      }
      if (status==='Đã ẩn' && note.length ==0) {
        res.send(json(false, "Bạn chưa điền ghi chú lý do bài viết bị ẩn!", []));
        return;
      }

      let rs = await Article.updateForOfficer(params);
      if (rs.rowsAffected.length > 0) {
        res.send(json(true, "Cập nhật bài viết thành công!", rs.recordset[0]));
      } else {
        res.send(json(false, "Cập nhật viết thất bại!", []));
      }
    } catch (err) {
      res.send(json(false, err, []));
      next(err);
    }
  };
}

module.exports = new ArticleControllers();
