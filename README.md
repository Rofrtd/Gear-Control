# Gear Control	
[![Build Status](https://travis-ci.org/Rofrtd/Gear-Control.svg?branch=master)](https://travis-ci.org/Rofrtd/Gear-Control)


## Summary
:gear: Gear Control helps Project Managers to allocate resources shared across different projects. 

:construction: [Work in progress](https://gear-control.herokuapp.com) :construction:

🔵🔵⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️100%

- [x] Setup Project
- [x] Setup CI
- [x] Setup Deployment
- [x] Setup Database and Migrations
- [x] Customer - Create
- [x] Customer - List
- [ ] Customer - Update
- [ ] Project - List
- [ ] Project - Create
- [ ] Project - Update
- [ ] Resources - Create
- [ ] Resources - Update
- [ ] Resources Conflict Notification
- [ ] PM Login
- [ ] Register DNS

## Stack

SPA built with **React** with an API written in **NodeJS** running **Postgress** as database.

* Travis CI
* Heroku
* Express JS
* Postgres
* React
* Parcel
* Bulma CSS


## Host Dependencies
**TODO:** Dockerise dependencies.

* [nvm](https://github.com/nvm-sh/nvm)
* Postgres DB

## How to run
**TODO**: Create a single command to run `build-watch` and `start-dev`

```shell
nvm use
npm install
npx knex migrate:latest
npm run build-watch
npm run start-dev # in a diffrent shell
```
## Deployment

The project is set to run CI/CD, so every merge to `master` is automatically deployed to production.

## Commands Cheat Sheet

    $ npx knex migrate:make migration_name # creating a new migration file
    $ npx knex migrate:latest # migrate to latest version
