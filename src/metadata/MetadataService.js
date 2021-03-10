const MetadataService = {
  createMetadata(db, newMeta) {
    return db.none(
      "INSERT into hals(id, name, description, image, rarity, set, max_supply) VALUES(${id}, ${name}, ${description}, ${image}, ${rarity}, ${set}, ${max_supply})",
      { ...newMeta }
    );
  },
  getMetadataById(db, tokenId) {
    return db.one(`SELECT * from hals where id=${tokenId}`);
  },
  getMetadataBySet(db, set) {
    return db.many("SELECT * from hals where set=${set} ORDER BY id ASC", {
      set,
    });
  },
};

module.exports = MetadataService;
