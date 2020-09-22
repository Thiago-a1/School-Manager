module.exports = {
  age: function (timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1
    }

    return age;
  },
  date: function (timestamp) {
    const today = new Date(timestamp);

    const day = `0${today.getUTCDate()}`;
    const month = `0${today.getUTCMonth() + 1}`;
    const year = today.getUTCFullYear();

    return {
      iso: `${year}-${month.slice(-2)}-${day.slice(-2)}`,
      birthDay: `${day.slice(-2)}/${month.slice(-2)}`
      };
  },
  reverseDate: function (timestamp) {
    const dateString = `${timestamp}`;

    return dateString.split('-').reverse().join('/');
  },
  formatString: function (string) {
    const separetedString = string.split("-");

    if (separetedString[1] == "high") {
      separetedString[1] = "Ensino Medio"
    } else {
      separetedString[1] = "Ensino Fundamental"
    }

    return separetedString.join(" - ");
  }
}
