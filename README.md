# Kufunzi APP
Kufunzi it's an app that allows personal trainers to manage their calendar, create and plan workouts for their clients.
## Main Features
### Admin
- Create workout
--Add  phases (Warmup, main and stretching)
--Add  blocks to main phase
---Add exercises
- View workout details
- View all workouts
--Map
--List
- WOD (Workout of the Day-Calendar)
--Month view
--Week view
--Day view
- Manage trainers
-- Add comments to trainer
-- View trainers and number of workouts per trainer
-- Delete trainer

### Trainer
- Create workout
--Add  phases (Warmup, main and stretching)
--Add  blocks to main phase
---Add exercises
- View workout details
- View all workouts
--Map
--List
- WOD (Workout of the Day-Calendar)
--Month view
--Week view
--Day view

## Endpoints

| Route | HTTP Verb | Description |
| ------ | ------ |------ |
|/signup |	GET|	User add form
|/signup|	POST|	Create new user
|/login|GET	|User login form
|/login|	POST|	User logged
|/logout|	GET	|Logout user
|/onboarding|	GET |	Onboarding first login
|/|	GET	|WOD (Workout of the day)
|/workouts|	GET	|Show all workouts
|/workouts/new|	GET	|Create new workout
|/workouts|	POST|	Create new workout
|/workouts/:id|	GET|	Show workout details
|/workouts/:id|	DELETE|	Delete workout
|/workouts/api|	GET|	Workouts as Json
|/workouts/api/:id|	GET|	Workout details as Json
|/profile|	GET |	Show profile details
|/editProfile|	GET|	Profile edit form
|/exercises/api/:id	|GET|Find exercise in database and if is new get it from WGER API and save it to DB"
|exercises/:id|	GET |	Exercise details
|/showAllTrainers|	GET|	Show list of trainers
|/:id/detail|	GET|	Show trainer details
|/:id/delete|	GET|	Delete trainer