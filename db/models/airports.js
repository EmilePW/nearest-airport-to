module.exports = {
  findWithinRadius: {
    // returns airports within specified radius of the supplied coordinates
    // radius is in miles
    sql: function(lat, lng, radius) {
      return `
        SELECT name, iata_code, point(${lng}, ${lat}) <@> lng_lat AS distance FROM airports
        WHERE point(${lng}, ${lat}) <@> lng_lat < ${radius}
        ORDER BY distance ASC`;
    },
    postQuery: function(result) {
      return result.rows;
    }
  }
};
