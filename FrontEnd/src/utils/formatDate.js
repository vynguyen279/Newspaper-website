function formatDate(date) {
  if (!date) return ["", "", ""];
  // if (date.includes('.000Z')) {
  //     date = date.replace('T', ' ').replace('.000Z', '')
  // }
  var newdate = new Date(date).toISOString().split('T')[0]
  return newdate;
}

export default formatDate;
