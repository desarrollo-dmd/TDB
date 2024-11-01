const { db } = require("../db/readingsdb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class user {
  constructor(userId) {
    this.userId = userId;
  }

  async register(username, password, role) {
    if (!username) {
      throw new Error("Ingresar usuario");
    }
    if (!password) {
      throw new Error("Ingresar contrasenia");
    }
    if (!role) {
      throw new Error("Ingresar rol");
    }

    const existingUser = await db.query(
      `SELECT * FROM tdb.users WHERE username=$1`,
      [username]
    );
    if (existingUser.rows.length > 0) {
      throw new Error("Usuario duplicado");
    }

    try {
      const hash = await bcrypt.hash(password, 10);
      const res = await db.query(
        "INSERT INTO tdb.users (username, user_password, role) VALUES ($1, $2, $3)",
        [username, hash, role]
      );
      return "usuario creado con exito";
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(username, password) {
    if (!password) {
      throw new Error("Ingresar Contrasenia");
    }

    if (!username) {
      throw new Error("Ingresar Nombre de usuario");
    }
    try {
      const result = await db.query(
        `SELECT user_password FROM tdb.users WHERE username='${username}'`
      );

      if (result.length === 0) {
        throw new Error("Usuario no encontrado");
      }

      const hashedPass = result.rows[0].user_password;
      console.log(hashedPass);
      const isMatch = await bcrypt.compare(password, hashedPass);

      if (isMatch) {
        return jwt.sign(username, process.env.TOKEN_SECRET, {
          expiresIn: "1h",
        });
      } else {
        throw new Error("Usuario o contrasenia incorrectos");
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(username) {
    if (!username) {
      throw new Error("Ingresar Usuario");
    }

    try {
      const res = await db.query(
        `DELETE FROM tdb.users WHERE username='${username}'`
      );
      console.log(res.rowCount);
      if (res.rowCount <= 0) {
        throw new Error("Usuario no encontrado");
      }
      return "Usuario eliminado con exito";
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = user;
