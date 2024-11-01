// Estructura de datos a conseguir con las lecturas :
// [{nombre: 'Posicion eje X', nombrevalor:valor, ...}, ...]
const { db } = require("../db/readingsdb.js");

class Station {
  constructor(StationId) {
    this.StationId = StationId;
  }

  async fetchAllData() {
    try {
      const res = await db.query(
        "SELECT * FROM tdb.tdb WHERE id_estacion = $1",
        [this.StationId]
      );
      return res.rows;
    } catch (err) {
      console.error("Error fetching lecturas:", err);
      throw err;
    }
  }

  async fetchLastData() {
    try {
      const res = await db.query(
        "SELECT * FROM tdb.tdb WHERE id=(SELECT max(id) FROM tdb) AND id_estacion = $1",
        [this.StationId]
      );
      return res.rows;
    } catch (err) {
      console.error("Error fetching lecturas:", err);
      throw err;
    }
  }

  async fetchDataByMinutes(minutes) {
    console.log(minutes);
    try {
      const res = await db.query(
        `SELECT * FROM tdb.tdb 
       WHERE fecha < (SELECT max(fecha) FROM tdb.tdb) 
         AND fecha > (SELECT max(fecha) FROM tdb.tdb) - INTERVAL '${minutes}' MINUTE 
         AND id_estacion = $1`,
        [this.StationId]
      );
      return res.rows;
    } catch (err) {
      console.error("Error fetching lecturas:", err);
      throw err;
    }
  }
}
module.exports = { Station };
