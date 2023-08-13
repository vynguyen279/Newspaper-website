const json = require("../components/json");
const Comment = require("../models/Comment");

class CommentControllers {
  index(req, res) {
    res.send("Comment Controllers");
  }

  getList = async (req, res) => {
    const { KEY, STATUS } = req.body;
    let params = [
      { name: "KEY", type: "int", value: KEY },
      { name: "STATUS", type: "bit", value: STATUS },
    ];

    let rs = await Comment.list(params);
    console.log(rs)
    if (rs.recordset.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs.recordset));
  };

  add = async (req, res) => {
    const { readerId, articleId, content, replyTo } = req.body;
    let params = [
      { name: "content", type: "Nvarchar(1000)", value: content },
      { name: "readerId", type: "INT", value: readerId },
      { name: "articleId", type: "INT", value: articleId },
      { name: "status", type: "bit", value: false },
      { name: "replyTo", type: "INT", value: replyTo },
    ];
    if (!content) {
      return res.send(
        json(false, "Bình luận không được để trống!", "")
      );
    }
    if (content.length > 1000) {
      return res.send(
        json(false, "Bình luận không được quá 1000 ký tự!", "")
      );
    }
    let rs = await Comment.add(params);
    if (rs.rowsAffected[0] > 0) {
      res.send(json(true, "Thêm bình luận thành công. Bình luận của bạn sẽ được kiểm duyệt sau!", rs.recordset));
    } else {
      res.send(json(false, "Thêm bình luận thất bại!", []));
    }
  };

  listByArticle = async (req, res) => {
    const { ID } = req.body;

    let rs = await Comment.listCommentByArticleId(ID);
    console.log(rs)
    if (rs.length == 0) {
      res.send(json(false, "Không tìm thấy dữ liệu phù hợp!", []));
      return;
    }
    res.send(json(true, "Lấy dữ liệu thành công!", rs));
  };

  changeStatus = async (req, res) => {
    const { ID, STATUS } = req.body;
    let params = [
      { name: "ID", type: "int", value: ID },
      { name: "STATUS", type: "BIT", value: STATUS },
    ];
    let rs = await Comment.updateStatus(params);
    // console.log(rs)
    if (rs.rowsAffected[0] > 0) {
      if(STATUS=='0')
      res.send(json(true, "Ẩn bình luận thành công!", rs.recordset));
      else
      res.send(json(true, "Duyệt bình luận thành công!", rs.recordset));
    } else {
      res.send(json(false, "Duyệt bình luận thất bại!", []));
    }
  };
  delete = async (req, res) => {
    const { ID } = req.body;
    let rs = await Comment.delete(ID);
    // console.log(rs)
    // if (rs.rowsAffected[0] > 0) {
    //   if(STATUS=='0')
      res.send(json(true, "Xóa bình luận thành công!", ""));
    //   else
    //   res.send(json(true, "Duyệt bình luận thành công!", rs.recordset));
    // } else {
    //   res.send(json(false, "Duyệt bình luận thất bại!", []));
    // }
  };

  // //     let rs = await DonHang.update(MSDDH, TRANGTHAI);
  // //     res.send(json(true, "Hủy thành công!"));
  // //   };
  //   themHD = async (req, res) => {
  //     const { MANV, TONGGIA, MSDDH } = req.body;

  //     let params = [
  //       { name: "MANV", type: "Nchar(10)", value: MANV },
  //       { name: "TONGGIA", type: "float", value: TONGGIA },
  //       { name: "MSDDH", type: "Nchar(10)", value: MSDDH },
  //     ];
  //     let rs = await HoaDon.insert(params);
  //     if (rs.rowsAffected > 0) {
  //       res.send(json(true, rs.recordset));
  //     } else {
  //       res.send(json(false, rs));
  //     }
  //   };
}

module.exports = new CommentControllers();
