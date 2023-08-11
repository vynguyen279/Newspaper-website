const ArticleRoute = require("./ArticleRoute");
const AuthRoute = require("./AuthRoute");
const AuthorRoute = require("./AuthorRoute");
const CategoryRoute = require("./CategoryRoute");
const CommentRoute = require("./CommentRoute");
const EmployeeRoute = require("./EmployeeRoute");
const ReaderRoute = require("./ReaderRoute");
const RoleRoute = require("./RoleRoute");

function routes(app) {
  app.use("/Article", ArticleRoute);
  app.use("/Auth", AuthRoute);
  app.use("/Author", AuthorRoute);
  app.use("/Category", CategoryRoute);
  app.use("/Comment", CommentRoute);
  app.use("/Employee", EmployeeRoute);
  app.use("/Reader", ReaderRoute);
  app.use("/Role", RoleRoute);
}

module.exports = routes;
