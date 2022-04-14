DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users (          -- This table is for register page
  User_Id SERIAL NOT NULL,
  First_Name VARCHAR(45),
  Last_Name VARCHAR(45),
  User_Name VARCHAR(45) NOT NULL,
  User_Email VARCHAR(45) NOT NULL,		
  User_Password VARCHAR(45) NOT NULL,
  User_Friend_List_Id INT,
  PRIMARY KEY(User_Id)
);

DROP TABLE IF EXISTS User_relationship;             --User Buddies

CREATE TABLE IF NOT EXISTS User_relationship(
  User_Requester_Id INT NOT NULL,
  User_Addressee_Id INT NOT NULL,
  Created_Date DATE NOT NULL,
  PRIMARY KEY(User_Requester_Id, User_Addressee_Id)
);

DROP TABLE IF EXISTS Posts;

CREATE TABLE IF NOT EXISTS Posts(            -- This table is for Feed page
  Post_Id SERIAL NOT NULL,
  Post_Name VARCHAR(45) NOT NULL,
  Post_Date DATE NOT NULL, 
  Post_Content TEXT NOT NULL,
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
  User_id INT,
  PRIMARY KEY(Catch_Id),
  FOREIGN KEY(User_Id) REFERENCES Users(User_Id)
);

INSERT INTO users (User_Name, User_Email, User_Password) VALUES('testuser','testemail@notactuallyarealemail.com','testpassword');

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
