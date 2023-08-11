const managerPath = [
  "/manage/author",
  "/manage/reader",
  "/manage/author",
  "/manage/comment",
  "/manage/article",
  "/manage/category",
  "/manage/employee",
  "/manage/check",
];
const employeePath = [
  "/manage/author",
  "/manage/reader",
  "/manage/author",
  "/manage/comment",
  "/manage/article",
  "/manage/category",
  "/manage/check",
];
const authorPath = ["/article/new", "/manage/edit", "/manage/articleAU"];

function checkRole(e) {
  // JSON.parse(localStorage.getItem('role'))[0].roleId
  // Authorization
  if (!localStorage.Authorization) {
    if (
      managerPath.includes(window.location.pathname) ||
      authorPath.includes(window.location.pathname) ||
      employeePath.includes(window.location.pathname)
    ) {
      window.location.href = "/";
      //    alert("Bạn không có quyền truy cập! Vui lòng đăng nhập bằng tài khoản admin")
    }
    // console.log(customerPath.includes(window.location.pathname))
  } else {
    if (JSON.parse(localStorage.getItem("role"))[0].roleId == 1) {
      if (!managerPath.includes(window.location.pathname)) {
        window.location.href = "/manage/article";
        // alert("Vui lòng đăng nhập bằng tài khoản khách hàng!")
      }
    }
    if (JSON.parse(localStorage.getItem("role"))[0].roleId == 2) {
      if (!employeePath.includes(window.location.pathname)) {
        // localStorage.clear();
        window.location.href = "/manage/article";
        // alert("Vui lòng đăng nhập bằng tài khoản khách hàng!")
      }
    }
    if (JSON.parse(localStorage.getItem("role"))[0].roleId == 3) {
      if (!authorPath.includes(window.location.pathname)) {
        // localStorage.clear();
        window.location.href = "/manage/articleAU";
        // alert("Vui lòng đăng nhập bằng tài khoản khách hàng!")
      }
    }
    if (JSON.parse(localStorage.getItem("role"))[0].roleId == 4) {
      if (
        managerPath.includes(window.location.pathname) ||
        authorPath.includes(window.location.pathname) ||
        employeePath.includes(window.location.pathname)
      ) {
        // localStorage.clear();
        window.location.href = "/";
        // alert("Vui lòng đăng nhập bằng tài khoản khách hàng!")
      }
    }
  }
}

export default checkRole;
