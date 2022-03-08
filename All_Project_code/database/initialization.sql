DROP TABLE IF EXISTS Users;

CREATE TABLE IF NOT EXISTS Users(          -- This table is for register page
  User_id INT PRIMARY KEY,
  First_Name VARCHAR(45) NOT NULL,
  Last_Name VARCHAR(45) NOT NULL,
  User_Name VARCHAR(45) NOT NULL,
  User_Email VARCHAR(45) NOT NULL,		
  User_Password VARCHAR(45) NOT NULL,
  User_Handle TEXT NOT NULL
);

DROP TABLE IF EXISTS Posts;

CREATE TABLE IF NOT EXISTS Posts(            -- This table is for Feed page
  Post_id INT PRIMARY KEY,
  Post_Name VARCHAR(45) NOT NULL,
  Post_Date DATE NOT NULL,
  Post_Time TIME NOT NULL
);