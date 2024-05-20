/*
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 * En este ejemplo se están insertando 500 artículos con textos ficticios.
 */

const faker = require("@faker-js/faker").fakerES;
const User = require("../models/User");
const Tweet = require("../models/Tweet");

module.exports = async () => {
  const tweets = [];
  const users = await User.find();
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      const createdTweet = new Tweet({
        text: faker.lorem.sentence(2),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      tweets.push(createdTweet);
      user.tweets.push(createdTweet._id);
      await user.save();
    }
  }
  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de Tweets.");
};
