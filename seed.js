const db = require('./models');

db.sync({ force: true })
  .then(function() {
    console.log('success');
    db.close();
  })
  .catch(function() {
    console.log('failure')
    db.close();
  });
