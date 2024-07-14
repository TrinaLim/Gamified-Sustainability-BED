const pool = require("../services/db");

const SQLSTATEMENT = `

DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Task;

DROP TABLE IF EXISTS TaskProgress;

DROP TABLE IF EXISTS TaskPoints;

DROP TABLE IF EXISTS MagicalItems;

DROP TABLE IF EXISTS Pets;

DROP TABLE IF EXISTS Inventory;

DROP TABLE IF EXISTS Quests;

DROP TABLE IF EXISTS Messages;

CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Task (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  description TEXT,
  points INT
);

CREATE TABLE TaskProgress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  completion_date TIMESTAMP,
  notes TEXT
);

CREATE TABLE TaskPoints (
  taskPoints_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  totalPoints INT
);
CREATE TABLE MagicalItems (
  magicalItems_id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  abilities TEXT NOT NULL,
  damage INT NOT NULL,
  pointsNeeded INT NOT NULL
);

CREATE TABLE Pets (
  pet_id INT PRIMARY KEY AUTO_INCREMENT,
  breed TEXT NOT NULL,
  abilities TEXT NOT NULL,
  hunger INT NOT NULL CHECK (hunger BETWEEN 0 AND 100),
  groom INT NOT NULL CHECK (groom BETWEEN 0 AND 100), 
  level INT NOT NULL CHECK (level >= 0)
);

CREATE TABLE Inventory (
  inventory_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  magicalItems_id INT,
  name TEXT,
  abilities TEXT,
  damage INT,
  pet_id INT,
  breed TEXT,
  pet_abilities TEXT,
  hunger INT CHECK (hunger BETWEEN 0 AND 100),
  groom INT CHECK (groom BETWEEN 0 AND 100), 
  level INT CHECK (level >= 0)
);

CREATE TABLE Quests (
  quest_id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  magicalItems_id INT NOT NULL,
  magicalItems_name TEXT NOT NULL,
  pet_id INT NOT NULL,
  FOREIGN KEY (magicalItems_id) REFERENCES MagicalItems(magicalItems_id),
  FOREIGN KEY (pet_id) REFERENCES Pets(pet_id)
);

INSERT INTO Task (title, description, points) VALUES
('Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);

INSERT INTO MagicalItems (name, abilities, damage, pointsNeeded) VALUES 
('Celestial Staff', 'Summons a radiant shield, providing protection from dark forces.', 30, 40),
('Frostbite Dagger', ' Inflicts frostbite on enemies, slowing their movements.', 50, 60),
('Thunderstrike Hammer', 'Unleashes thunderstorms upon impact, stunning foes.', 70, 100),
('Flameburst Wand', 'Shoots bursts of magical flames, igniting targets.', 40, 50),
('Earthquake Gauntlets', 'Creates seismic waves upon striking the ground, causing tremors.', 60, 80);

INSERT INTO Pets (breed, abilities, hunger, groom, level) VALUES 
('Celestial Fawn', 'Healing Aura - Gradually restores health to the party.', 5, 5, 1),
('Magma Drake Hatchling', 'Fire Breath - Deals area-of-effect fire damage.', 10, 15, 1),
('Arctic Fox Kit', 'Frost Nova - Freezes enemies in place temporarily.', 5, 10, 2),
('Phantom Rat Spirit', 'Ghostly Scurry - Evades attacks for a short duration.', 10, 10, 1),
('Stone Golem Pup', 'Earthquake Stomp - Disrupts and damages enemies in an area.', 10, 5, 2);

INSERT INTO Quests (name, magicalItems_id, magicalItems_name, pet_id) VALUES 
('The Enchanted Grove', 2, 'Frostbite Dagger', 1),
('Emberstone Caverns Expedition', 1, 'Celestial Staff', 2),
('Frostfall Retreat Rescue', 4, 'Flameburst Wand', 3),
('The Labyrinth of Whispers', 3, 'Thunderstrike Hammer', 4),
('Golem Guardians Legacy', 5, 'Earthquake Gauntlets', 5);

;`

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});
