import { server } from './server/Server';
import { Knex } from './server/database/knex';
const port = process.env.PORT || 3000;

const startServer = () => {
  server.listen(port, () => {
    console.log('Server running on port ' + port);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  console.log('#Running migrations...');

  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => {
          startServer();
        })
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}
