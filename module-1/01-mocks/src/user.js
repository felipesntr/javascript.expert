class User {
  constructor(name, id, profession, age) {
    this.name = name;
    this.id = Number(id);
    this.profession = profession;
    this.birthDay = new Date().getFullYear() - Number(age);
  }
}

module.exports = User;
