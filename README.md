<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
cp .env.example .env
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Simple, clear, readable code
- How well structured it is? => Module level structure with controller service pair and remaining utils.
- Clear separation of concerns? => Not needed.
- Can anyone just look at it and get the idea to what is being done? => Yes, API => controller => Service (Basic).
- Does it follow any standards? => dependency injection (Solid Property).

## Correctness
- Does the application do what it promises? Can we find bugs or trivial flaws?
- Yes, It provides facility of search using three property which name, stateName and availability (all are optional).
- Search by name and stateName only check if any subset matches from the Clinic Data and consider it in result if any matches.
- URL and Query Params => `search?name=any&stateName=any&availability[from]=00:00&availability[to]=23:59`
- To test the required, instead of mocking response in test, I tested controller and service with actual response of URLS. 


## Security
- Are there any obvious vulnerability? => Well not for now.


## Memory efficiency
- How will it behave in case of large datasets? => It totally depends on the way we want to handle which are as follow
- Case #1: When dataset is small and fixed
  - I save it in on initialization to save multiple API call on every search request and make the required functionality which works efficiently.

- Case #2: When dataset is large  
  - To get large dataset we need to have big system RAM, to store data without pagination.
  - After we can store this data in Database, to make search efficient it will be tough to search on big dataset using JS only (linear search)
  - In JS level, we need to add few algorithm of searching fast but that can be easily done by DB if we index it properly.
  - In Db if we index table using name(separetely), stateName(separetely), availability(separetely), name & stateName(together), name & availability(together), stateName & availability(together) and name,stateName and availability(together) then we can deal very fast and efficiently over 100GB of data.

- Case #3: When dataset is large and keep changing
  - We can follow same like case #2, but to update data we need to go with cron to keep updating data perodically.


## Testing
- How well tested your application is? Can you give some metrics?

-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |    78.7 |    68.96 |   88.46 |   77.27 |                   
 src                   |       0 |      100 |       0 |       0 |                   
  main.ts              |       0 |      100 |       0 |       0 | 1-14              
 src/search            |    82.6 |    68.96 |      92 |   81.94 |                   
  search.controller.ts |     100 |      100 |     100 |     100 |                   
  search.dto.ts        |   83.33 |      100 |   33.33 |   83.33 | 16,21             
  search.module.ts     |       0 |      100 |     100 |       0 | 1-10              
  search.service.ts    |   97.22 |      100 |     100 |   96.29 | 20                
  search.validation.ts |   75.86 |       50 |     100 |   72.72 | 11,16,25,28,38-39 
 src/search/__test__   |     100 |      100 |     100 |     100 |                   
  mocks.ts             |     100 |      100 |     100 |     100 |           

## Documentation
- Is the code self documented and it's easy to understand it by just reading?
 - How code works =>
  - Start server command => `npm start`
  - Initialize server and its module (including search module)
  - In which search api got initialized
  - Which `/search` api available to use



## Stay in touch

- Author - [Shubham Patwa](https://github.com/shubhampatwa)
