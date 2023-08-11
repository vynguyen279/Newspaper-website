const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const json = require("../components/json");
async function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.send(json(false, "Không có quyền truy cập!", ""));
  }

  try {
    const decoded = jwt.verify(token, 'NewspaperManagement-BCTT-2023');

    if (decoded.role.length == 0) {
      return res.send(json(false, "Không có quyền truy cập", ""));
    }

    let checkRole = false;
    decoded.role.map((role) => {
      if (role.roleId == 1 || role.roleId==2) {
        checkRole = true;
      }
    });

    if (!checkRole) {
      return res.send(json(false, "Không có quyền truy cập", ""));
    }

    const user = await User.findByEmail(decoded.email);
    console.log(user)

    if (user.length == 0) {
      return res.send(json(false, "Token không hợp lệ", ""));
    }

    const userId = user[0].userId;
    req.body = { ...decoded, ...req.body, userId };

    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.send(json(false, "Token đã hết hạn", ""));
    }
    return res.send(json(false, "Token không hợp lệ", ""));
  }
}

async function checkRoleManager(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.send(json(false, "Không có quyền truy cập!", ""));
  }

  try {
    const decoded = jwt.verify(token, 'NewspaperManagement-BCTT-2023');

    if (decoded.role.length == 0) {
      return res.send(json(false, "Không có quyền truy cập", ""));
    }
    let checkRole = false;
    decoded.role.map((role) => {
      if (role.roleId == 1) {
        checkRole = true;
      }
    });

    if (!checkRole) {
      return res.send(json(false, "Không có quyền truy cập", ""));
    }

    const user = await User.findByEmail(decoded.email);

    if (user.length == 0) {
      return res.send(json(false, "Token không hợp lệ", ""));
    }

    const userId = user[0].userId;
    req.body = { ...decoded, ...req.body, userId };

    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.send(json(false, "Token đã hết hạn", ""));
    }
    return res.send(json(false, "Token không hợp lệ", ""));
  }
}
async function checkRoleReader(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.send(json(false, "Không có quyền truy cập!", ""));
  }

  try {
    const decoded = jwt.verify(token, 'NewspaperManagement-BCTT-2023');

    if (decoded.role.length == 0) {
      return res.send(json(false, "Không có quyền truy cập", ""));
    }
    let checkRole = false;
    decoded.role.map((role) => {
      if (role.roleId == 4) {
        checkRole = true;
      }
    });

    if (!checkRole) {
      return res.send(json(false, "Không có quyền truy cập", ""));
    }

    const user = await User.findByEmail(decoded.email);

    if (user.length == 0) {
      return res.send(json(false, "Token không hợp lệ", ""));
    }

    const userId = user[0].userId;
    req.body = { ...decoded, ...req.body, userId };

    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.send(json(false, "Token đã hết hạn", ""));
    }
    return res.send(json(false, "Token không hợp lệ", ""));
  }
}
async function checkRoleAuthor(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.send(json(false, "Không có quyền truy cập!", ""));
  }

  try {
    const decoded = jwt.verify(token, 'NewspaperManagement-BCTT-2023');

    if (decoded.role.length == 0) {
      return res.send(json(false, "Không có quyền truy cập", ""));
    }
    let checkRole = false;
    decoded.role.map((role) => {
      if (role.roleId == 3) {
        checkRole = true;
      }
    });

    if (!checkRole) {
      return res.send(json(false, "Không có quyền truy cập", ""));
    }

    const user = await User.findByEmail(decoded.email);

    if (user.length == 0) {
      return res.send(json(false, "Token không hợp lệ", ""));
    }

    const userId = user[0].userId;
    req.body = { ...decoded, ...req.body, userId };

    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.send(json(false, "Token đã hết hạn", ""));
    }
    return res.send(json(false, "Token không hợp lệ", ""));
  }
}

module.exports = { authenticateToken, checkRoleManager, checkRoleReader, checkRoleAuthor };
