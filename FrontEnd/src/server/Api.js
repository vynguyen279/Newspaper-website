import {axios} from './Axios';

// TAI KHOAN
export async function registerReader(data) {
    return axios.post('/Reader/register', data);
}
export async function registerAuthor(data) {
    return axios.post('/Author/register', data);
}
export async function signIn(data) {
    return axios.post('/Auth/logIn', data);
}
export async function sendEmail(data) {
    return axios.post('/Auth/sendEmail', data);
}
export async function resetPassword(data) {
    return axios.post('/Auth/resetPassword', data);
}
export async function changePassword(data) {
    return axios.post('/Auth/changePassword', data);
}
export async function listAuthor(data) {
    return axios.post('/Author/list', data);
}
export async function addAuthor(data) {
    return axios.post('/Author/add', data);
}
export async function updateAuthor(data) {
    return axios.post('/Author/update', data);
}
export async function listEmployee(data) {
    return axios.post('/Employee/list', data);
}
export async function addEmployee(data) {
    return axios.post('/Employee/add', data);
}
export async function updateProfile(data) {
    return axios.post('/Employee/updateProfile', data);
}
export async function updateEmployee(data) {
    return axios.post('/Employee/update', data);
}
export async function listReader(data) {
    return axios.post('/Reader/list', data);
}
export async function listArticle(data) {
    return axios.post('/Article/list', data);
}
export async function listArticleForAuthor(data) {
    return axios.post('/Article/listForAuthor', data);
}
export async function listArticleModify(data) {
    return axios.post('/Article/listModify', data);
}
export async function lockAccount(data) {
    return axios.post('/Reader/lock', data);
}

export async function listCategory(data) {
    return axios.post('/Category/list', data);
}
export async function addCategory(data) {
    return axios.post('/Category/add', data);
}
export async function addArticle(data) {
    return axios.post('/Article/add', data);
}
export async function checkArticle(data) {
    return axios.post('/Article/check', data);
}
export async function updateArticle(data) {
    return axios.post('/Article/update', data);
}
export async function updateCategory(data) {
    return axios.post('/Category/update', data);
}
export async function updateUser(data) {
    return axios.post('/Reader/update', data);
}
export async function listComment(data) {
    return axios.post('/Comment/list', data);
}
export async function addComment(data) {
    return axios.post('/Comment/add', data);
}
export async function listCommentByArticle(data) {
    return axios.post('/Comment/listByArticle', data);
}
export async function listRole() {
    return axios.get('/Role/list');
}
export async function checkComment(data) {
    return axios.post('/Comment/check', data);
}
export async function deleteComment(data) {
    return axios.post('/Comment/delete', data);
}
export async function findNameAuthor(data) {
    return axios.post('/Author/findName', data);
}
export async function findNameCategory(data) {
    return axios.post('/Category/findName', data);
}
