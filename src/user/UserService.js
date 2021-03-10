const UserService = {
    async createUser(db, newUser) {
      newUser.address = newUser.address.slice(2);
      let result = await db.one(
        "INSERT INTO hal9kuser(address, reward) VALUES(${address}, ${reward}) RETURNING address",
        { ...newUser },
        result => result
      );
      return result;
    },
    updateUser(db, newUser) {
      newUser.address = newUser.address.slice(2);
      let SQLQuery = `UPDATE hal9kuser SET reward = ${newUser.reward} WHERE address = '${newUser.address}' RETURNING address, reward`;
      console.log(SQLQuery);
      return db.one(SQLQuery, result => result);
    },
    async getReward(db, address) {
      let newAddress = address.slice(2);
      let SQLQuery = `SELECT * from hal9kuser WHERE address='${newAddress}'`; 
      let result = await db.one(SQLQuery);
      return result;
    }
  };
  
  module.exports = UserService;