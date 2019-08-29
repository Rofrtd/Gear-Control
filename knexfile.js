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
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations'
    }
  }
};
