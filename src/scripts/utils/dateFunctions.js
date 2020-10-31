const changeMonthFormat = function(data) {
  if (data == 0) {
    return 'января';
  }
  if (data == 1) {
    return 'февряля';
  }
  if (data == 2) {
    return 'марта';
  }
  if (data == 3) {
    return 'апреля';
  }
  if (data == 4) {
    return 'мая';
  }
  if (data == 5) {
    return 'июня';
  }
  if (data == 6) {
    return 'июля';
  }
  if (data == 7) {
    return 'августа';
  }
  if (data == 8) {
    return 'сентября';
  }
  if (data == 9) {
    return 'октября';
  }
  if (data == 10) {
    return 'ноября';
  }
  if (data == 11) {
    return 'января';
  }
}

const changeDateFormat = function(data, changeMonthFormat) {
  const newDate = new Date(data);
  return `${newDate.getDate()} ${changeMonthFormat(newDate.getMonth())}, ${newDate.getFullYear()}`;
}

const currentDate = function(){
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

const getDateAgo = function(date) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - 7);
  const newDate = dateCopy.getDate();
  return `${dateCopy.getFullYear()}-${dateCopy.getMonth()+1}-${dateCopy.getDate()}`;
}

const currentDateToRef = currentDate();
const getDateAgoToRef = getDateAgo(new Date());


// alert(getDateAgo(new Date()));
// alert(getDateAgo(new Date(2015, 0, 1)));

export { getDateAgoToRef, currentDateToRef, changeDateFormat, changeMonthFormat };