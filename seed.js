const db = require('./models');

const plantedVegetables = [
  { name: 'rutabaga', color: 'beige' },
  { name: 'eggplant emoji', color: 'purple' },
  { name: 'squash (the sport)', color: 'yellow' },
];

const gardener = [
  { name: 'John', age: 8 },
  { name: 'Franklin', age: 82 },
  { name: 'Alfonzo', age: 100 },
  { name: 'Mordechai', age: 802 },
];

const plot = [
  { size: 100, shaded: false },
  { size: 10000, shaded: true },
  { size: 9, shaded: false },
  { size: 20, shaded: true },
];

db.plantrDB.sync({ force: true })
  .then(function() {
    console.log('success');
    const promiseForVeg = db.Vegetable.bulkCreate(plantedVegetables, {
      returning: true,
    });
    const promiseForGard = db.Gardener.bulkCreate(gardener, {
      returning: true,
    });
    const promiseForPlot = db.Plot.bulkCreate(plot, { returning: true });

    return Promise.all([promiseForVeg, promiseForGard, promiseForPlot]);
  })
  .then(insertedData => {
    console.log('inserted Data', insertedData);
  })
  .catch(function(error) {
    console.log('failure', error);
  })
  .finally(() => {
    db.plantrDB.close();
  });
