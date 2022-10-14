/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// User
Route.resource('user', 'UsersController').apiOnly().middleware({'*':['auth']})
Route.post('user/login', 'UsersController.login')
Route.post('user/register', 'UsersController.register')
Route.post('user/logout', 'UsersController.logout')

// Activity
Route.resource('activity', 'ActivitiesController').apiOnly().middleware({'*':['auth']})

// Item
Route.resource('item', 'ItemsController').apiOnly().middleware({'*':['auth']})

// Report
Route.resource('report', 'ReportsController').apiOnly()

Route.get('landing', 'UsersController.landing')
Route.get('users', 'UsersController.userLogin').middleware(['auth'])
