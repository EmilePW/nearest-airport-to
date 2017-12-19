module.exports = {
  findWithinRadius: {
    // returns airports within specified radius of the supplied coordinates
    // radius is in miles
    sql: function(lat, lng, radius) {
      return `
        SELECT * FROM airports
        WHERE point(${lng}, ${lat}) <@> lng_lat < ${radius}`;
    },
    postQuery: function(result) {
      return result.rows;
    }
  }
};
