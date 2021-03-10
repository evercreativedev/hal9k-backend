const ContractService = {
  getAllContracts(db) {
    return db.one(`SELECT * from hal9000`);
  },
};

module.exports = ContractService;
