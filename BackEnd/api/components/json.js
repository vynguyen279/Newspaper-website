
module.exports = function json(status = true, message='', data = '') {
  return { status, message, data };
}

