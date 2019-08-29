module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://postgres:@localhost:5432/gear-control',
    migrations: {
      tableName: 'migrations'
    }
  },
  production: {
    client: 'pg',
    connection: 'postgresql://???:???@???:5432/gear-control',
    migrations: {
      tableName: 'migrations'
    }
  }
};
