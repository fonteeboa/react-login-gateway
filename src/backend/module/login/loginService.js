const DataBaseService = require('../helpers/dataBase');
const dataBaseService = new DataBaseService();

class LoginService {
  getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  validateLogin() {
    const randomNumber = this.getRandomNumber();
    return randomNumber === 1 ? { success: randomNumber } : { error: randomNumber };
  }
}

module.exports = LoginService;
