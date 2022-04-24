DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users (          -- This table is for register page
  User_Id SERIAL NOT NULL,
  First_Name VARCHAR(45),
  Last_Name VARCHAR(45),
  User_Name VARCHAR(45) NOT NULL UNIQUE,
  User_Email VARCHAR(45) NOT NULL UNIQUE,		
  User_Password VARCHAR(99) NOT NULL,
  User_Friend_List_Id INT,
  User_IMG TEXT,
  PRIMARY KEY(User_Id)
);

DROP TABLE IF EXISTS User_relationship;             --User Buddies

CREATE TABLE IF NOT EXISTS User_relationship(
  User_Requester_Id INT NOT NULL,
  User_Addressee_Id INT NOT NULL,
  PRIMARY KEY(User_Requester_Id, User_Addressee_Id)
);

DROP TABLE IF EXISTS Posts;

CREATE TABLE IF NOT EXISTS Posts(            -- This table is for Feed page
  Post_Id SERIAL NOT NULL,
  Post_Name VARCHAR(45) NOT NULL,
  Post_Date DATE NOT NULL, 
  Post_Content TEXT NOT NULL,
  Post_Image TEXT,
  User_id INT,
  PRIMARY KEY(Post_Id),
  FOREIGN KEY(User_Id) REFERENCES Users(User_Id)
);

DROP TABLE IF EXISTS Catches;

CREATE TABLE IF NOT EXISTS Catches(                           --This table is for Catches
  Catch_Id SERIAL NOT NULL,
  Catch_Name VARCHAR(45) NOT NULL,
  Catch_Length FLOAT NOT NULL,
  Catch_Weight FLOAT NOT NULL,
  Catch_Location TEXT NOT NULL,
  Catch_Date DATE NOT NULL,
  Catch_Image TEXT,
  User_id INT,
  PRIMARY KEY(Catch_Id),
  FOREIGN KEY(User_Id) REFERENCES Users(User_Id)
);

-- INSERT INTO users (First_Name, Last_Name, User_Name, User_Email, User_Password, User_IMG) VALUES('Matthew', 'Su', 'matthewsu','matthewsu@notactuallyarealemail.com','$2b$10$ICVLCjqLnDj8kyHjs.Pm7.3Aq1iGwn1DHTcJ0r2ZotGDQ9VtDQBca', '/images/loginphoto.png');
-- INSERT INTO users (First_Name, Last_Name, User_Name, User_Email, User_Password, User_IMG) VALUES('Spencer', 'Jackson', 'spencerj','spencerj@notactuallyarealemail.com','$2b$10$4wd1otnJ11yKTAvMUst4SOl/3O6Z.1fDzG5mQa9lYMocp/8pbkN5i', '/images/loginphoto.png');
-- INSERT INTO users (First_Name, Last_Name, User_Name, User_Email, User_Password, User_IMG) VALUES('John', 'Rooney', 'johnr','johnr@notactuallyarealemail.com','$2b$10$2ZxHFpLSzxci2IanSHCUq.YjMM44IANrJvT7XNuX4Wm6QLO212/ua', '/images/loginphoto.png');
-- INSERT INTO users (First_Name, Last_Name, User_Name, User_Email, User_Password, User_IMG) VALUES('Caelus', 'Kasparek','caelusk','caelus@notactuallyarealemail.com','$2b$10$clFT5Bc10e80out0VMC8feuJzZgVVrRzphxsGe34B1r/IIT9wx5kW', '/images/loginphoto.png');
-- INSERT INTO users (First_Name, Last_Name, User_Name, User_Email, User_Password, User_IMG) VALUES('Yuhe', 'Zou','yuhez','yuhez@notactuallyarealemail.com','$2b$10$67cU58ssRczLEJ01zl2R0.OdpEqVqhg7LhV890Nl7cxf5eJmbzc4G', '/images/loginphoto.png');
-- INSERT INTO users (First_Name, Last_Name, User_Name, User_Email, User_Password, User_IMG) VALUES('Victoria', 'Nawalany','victorian','victorian@notactuallyarealemail.com','$2b$10$zVa3wGS2027DUwJXtCh5c.UPxMHuP5.ooK4hVZFVmPm8oSSdirHLK', '/images/loginphoto.png');
-- INSERT INTO posts (Post_Name, Post_Date, Post_Content, Post_Image, User_Id) VALUES ('See picture', '2022-04-03', 'To catch the best fish, you gotta look your best', 'postimages/johnsuit.png', 3), ('Caught another one', '2022-04-03', 'Just a lil guy this time', 'postimages/mattfish.png', 1), ('I love the outdoors!', '2022-04-04', 'Being outdoors is great!', 'postimages/victoriamountain.png', 6), ('I am the hotdog man!', '2022-04-05', 'I love hotdogs!!!', 'img/hotdogman.png', 4), ('Anyone know any good fishing spots?', '2022-04-06', 'Hoping to catch a big one this weekend.', '', 5);
-- INSERT INTO catches (Catch_Name, Catch_Length, Catch_Weight, Catch_Location, Catch_Date, Catch_Image, User_id) VALUES('Blue Catfish', 43, 36, 'St. Louis, MO','2022-01-01', '../img/bluecat.png', 2), ('Largemouth Bass', 34, 25, 'Jefferson City, MO','2021-06-18', '../img/lmbass.png', 2), ('Great White Shark', 200, 1000, 'Little Rock, AK','2021-07-04', '../img/greatwhite.png', 2);



-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
-- INSERT INTO Posts (Post_Name,Post_Date,Post_Content) VALUES('testpost','2001-03-01','This is a sentence about the post');
