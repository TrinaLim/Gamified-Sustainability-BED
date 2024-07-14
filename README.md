## Setup
2. Create a .env file with the following content

    ```
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_DATABASE=
    DB_CONNECTION_LIMIT=1
    PORT=3000
    ```

3. Update the .env content with your database credentials accordingly.

4. Install dependencies by running `npm install`

5. Start the app by running `npm start`. Alternatively to use hot reload, start the app by running `npm run dev`.

6. You should see `App listening on port 3000`

8. (Optional) install the plugins recommended in `.vscode/extensions.json`

## Instructions

Open the page, `http://localhost:3000`, replace the port number accordingly if you app is not listening to port 3000
# Folder structure 
gamified-sustainability-BED
public 
    - css
        - color.css
        - style.css
    - js
        - getCurrentURL.js
        - index.js
        - inventory.js
        - login.js
        - magicalItems.js
        - queryCmds.js
        - quests.js
        - register.js
        - singlePet.js
        - taskProgress.js
        - tasks.js
        - userNavbarToggle.js
    - magicalItemImages
        - <img 1 to 5>
    - petImages 
        - <img 1 to 5>
    - index.html
    - inventory.html
    - login.html
    - magicalItems.html
    - queryCmds.html
    - quests.html
    - register.html
    - singlePet.html
    - taskProgress.html
    - tasks.html
src 
    - configs
        - createSchema.js
        - initTables.js
    - controllers
        - magicalItemsController.js
        - messageController.js
        - playerController.js
        - taskController.js
        - taskProgressController.js
        - userController.js
    - middlewares
        - bcryptMiddleware.js
        - jwtMiddleware.js
    - models 
        - magicalItemsModel.js
        - messageModel.js
        - playerModel.js
        - taskModel.js
        - taskProgress.js
        - userModel.js
    - routes
        - magicalItemsRoutes.js
        - mainRoutes.js
        - messageRoutes.js
        - playerRoutes.js
        - taskProgressRoutes.js
        - taskRoutes.js
        - userRoutes.js
    - services
        - db.js
.env 
.gitignore 
app.js
index.js
package-lock.json
package.json
README.md

# src file endpoints, testing on POSTman
- SECTION A - 
1.POST http://localhosthttp://localhost/users
request body:
{
"username": "greenUser123",
"email": "user123@example.com"
}
|||||||||||||||||||||||||||||||||||||||||||||||
response body:
{
"user_id": 1,
"username": "greenUser123",
"email": "user123@example.com"
}
-----------------------------------------------
2.GET http://localhost/users
Get All Users With The GET Function
response body:
[
{
"user_id": 1,
"username": "greenUser123",
"email": "user123@example.com"
},
{
"user_id": 2,
"username": "ecoWarrior",
"email": "warrior@example.com"
}
]
-----------------------------------------------
3.GET http://localhost/users/{user_id}
Get User By Id With The GET Function
response body:
{
"user_id": 1,
"username": "greenUser123",
"email": "user123@example.com",
"total_points": 250
}
-----------------------------------------------
4.PUT http://localhost/users/{user_id}
Update User By Id With The PUT Function
request body:
{
"username": "sustainableUser",
"email": "user123_updated@example.com"
}
response body:
{
"user_id": 1,
"username": "sustainableUser",
"email": "user123_updated@example.com"
}
-----------------------------------------------
5.DELETE http://localhost/users/{user_id}
Delete User By Id With The DELETE Function
request body {
    -
}
response body {
    - 
}
-----------------------------------------------
6.POST /tasks
Add A New Task Using The POST Function
request body:
{
"title": "No Plastic Bottles",
"description": "Avoid purchasing bottled water and use a reusable water bottle instead.",
"points": 40
}
response body:
{
"task_id": 6,
"title": "No Plastic Bottles",
"description": "Avoid purchasing bottled water and use a reusable water bottle instead.",
"points": 40
}
-----------------------------------------------
7.GET /tasks
Get All Tasks Using GET Function
response body:
[
{
"task_id": 1,
"title": "Plant a Tree",
"description": "Plant a tree in your neighborhood or a designated green area.",
"points": 50
},
{
"task_id": 2,
"title": "Use Public Transportation",
"description": "Use public transportation or carpool instead of driving alone.",
"points": 30
}
]
-----------------------------------------------
8.GET /tasks/{task_id}
Get Task By Id Using The GET Function
response body:
{
"task_id": 1,
"title": "Plant a Tree",
"description": "Plant a tree in your neighborhood or a designated green area.",
"points": 50
}
-----------------------------------------------
9.PUT /tasks/{task_id}
Update Task By Id Using The Put Funtion
request body:
{
"title": "Plant Two Trees",
"description": "Plant two trees in your neighborhood or a designated green area.",
"points": 60
}
response body:
{
"task_id": 1,
"title": "Plant Two Trees",
"description": "Plant two trees in your neighborhood or a designated green area.",
"points": 60
}
-----------------------------------------------
10.DELETE /tasks/{task_id}
Delete Task By Id Using DELETE Function
No Output
----------------------------------------------
11.POST /task_progress
Add A New Task Progress Using The POST Function
request body:
{
"user_id": 1,
"task_id": 1,
"completion_date": "2023-07-30",
"notes": "Planted a tree in the park near my house."
}
response body:
{
"progress_id": 1,
"user_id": 1,
"task_id": 1,
"completion_date": "2023-07-30",
"notes": "Planted a tree in the park near my house."
}
-----------------------------------------------
12.GET /task_progress/{progress_id}
Get Task Progress By Id Using GET Function
response body:
{
"progress_id": 1,
"user_id": 1,
"task_id": 1,
"completion_date": "2023-07-30",
"notes": "Planted a tree in the park near my house."
}
-----------------------------------------------
13.PUT /task_progress/{progress_id}
Update Task Progress By Id Using PUT Function
Example Input:
{
"notes": "Planted two trees this time!"
}
response body:
{
"progress_id": 1,
"user_id": 1,
"task_id": 1,
"completion_date": "2023-07-30",
"notes": "Planted two trees this time!"
}
-----------------------------------------------
14.DELETE/task_progress/{progress_id}
request body {
    -
}
response body {
    - 
}
-----------------------------------------------
- SECTION B - 
All magical items available
GET http://localhost:3000/api/magicalItems
body {
    -
}
response body {
[
    {
        "magicalItems_id": 1,
        "name": "Celestial Staff",
        "abilities": "Summons a radiant shield, providing protection from dark forces.",
        "damage": 30,
        "pointsNeeded": 40
    },
    {
        "magicalItems_id": 2,
        "name": "Frostbite Dagger",
        "abilities": " Inflicts frostbite on enemies, slowing their movements.",
        "damage": 50,
        "pointsNeeded": 60
    },
    {
        "magicalItems_id": 3,
        "name": "Thunderstrike Hammer",
        "abilities": "Unleashes thunderstorms upon impact, stunning foes.",
        "damage": 70,
        "pointsNeeded": 100
    },
    {
        "magicalItems_id": 4,
        "name": "Flameburst Wand",
        "abilities": "Shoots bursts of magical flames, igniting targets.",
        "damage": 40,
        "pointsNeeded": 50
    },
    {
        "magicalItems_id": 5,
        "name": "Earthquake Gauntlets",
        "abilities": "Creates seismic waves upon striking the ground, causing tremors.",
        "damage": 60,
        "pointsNeeded": 80
    }
]
}
-----------------------------------------------
buy a new magical item
POST http://localhost:3000/api/magicalItems/{user_id}/{magicalItems_id}
requestbody {
    -
}
response body {
    message: "Item purchased successfully. Please check your inventory."
}
-----------------------------------------------
get all items in user inventory
GET http://localhost:3000/api/player/{user_id}/inventory (if user has already bought a magical item and completed a quest)
request body {
    -
} 
response body {
    {
    "magicalItemsOwned": [
        {
            "inventoryId": 1,
            "magicalItemId": 2,
            "name": "Frostbite Dagger",
            "abilities": " Inflicts frostbite on enemies, slowing their movements.",
            "damage": 50
        }
    ],
    "petsOwned": [
        {
            "inventoryId": 3,
            "petId": 1,
            "petBreed": "Celestial Fawn",
            "petLevel": 1
        }
    ]
}
}
-----------------------------------------------
get all available quests
GET http://localhost:3000/api/player/quests
request body {
    -
}
response body {
    [
    {
        "quest_id": 1,
        "name": "The Enchanted Grove",
        "requirements": {
            "magicalItemId": 2,
            "magicalItemName": "Frostbite Dagger"
        },
        "rewards": {
            "petBreed": "Celestial Fawn",
            "petAbilities": "Healing Aura - Gradually restores health to the party."
        }
    },
    {
        "quest_id": 2,
        "name": "Emberstone Caverns Expedition",
        "requirements": {
            "magicalItemId": 1,
            "magicalItemName": "Celestial Staff"
        },
        "rewards": {
            "petBreed": "Magma Drake Hatchling",
            "petAbilities": "Fire Breath - Deals area-of-effect fire damage."
        }
    },
    {
        "quest_id": 3,
        "name": "Frostfall Retreat Rescue",
        "requirements": {
            "magicalItemId": 4,
            "magicalItemName": "Flameburst Wand"
        },
        "rewards": {
            "petBreed": "Arctic Fox Kit",
            "petAbilities": "Frost Nova - Freezes enemies in place temporarily."
        }
    },
    {
        "quest_id": 4,
        "name": "The Labyrinth of Whispers",
        "requirements": {
            "magicalItemId": 3,
            "magicalItemName": "Thunderstrike Hammer"
        },
        "rewards": {
            "petBreed": "Phantom Rat Spirit",
            "petAbilities": "Ghostly Scurry - Evades attacks for a short duration."
        }
    },
    {
        "quest_id": 5,
        "name": "Golem Guardians Legacy",
        "requirements": {
            "magicalItemId": 5,
            "magicalItemName": "Earthquake Gauntlets"
        },
        "rewards": {
            "petBreed": "Stone Golem Pup",
            "petAbilities": "Earthquake Stomp - Disrupts and damages enemies in an area."
        }
    }
]
}
-----------------------------------------------
get player task points
GET http://localhost:3000/api/player/{user_id}/taskPoints (if user has already completed some tasks)
request body {
    -
}
response body {
    75
}
-----------------------------------------------
get item in user inventory by id
GET http://localhost:3000/api/player/:user_id/inventory/:id 
body {
    -
} 
response body {
    {
    "id": 3,
    "pet_id": 1,
    "breed": "Celestial Fawn",
    "abilities": "Healing Aura - Gradually restores health to the party.",
    "hunger": 5,
    "groom": 5,
    "level": 1
}
}
-----------------------------------------------
complete a quest
POST http://localhost:3000/api/player/{user_id}/quests/{quest_id}/complete
request body {
    -
} 
response body {
    message: "Quest completed successfully. New pet unlocked." 
}
-----------------------------------------------
update player pet health status
PUT http://localhost:3000/api/player/{user_id}/{inventory_id}/updateHealthStatus
request body {
    -
}
response body {
    message: "Pet health status updated successfully."
}
-----------------------------------------------
delete an inventory item by id
DELETE http://localhost:3000/api/player/{user_id}/inventory/{inventory_id}
request body {
    -
}
response body {
    - 
}