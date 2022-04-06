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

DROP TABLE IF EXISTS Profile;                 -- This table is for Profile Page

CREATE TABLE IF NOT EXISTS Profile(
  User_id INT PRIMARY KEY, -- to link profile to user
  User_Img -- need to save an image in her,
  User_Friend_Handles -- need to save an array in here,
  User_Bio TEXT,
  Catch_1_Handle TEXT,
  Catch_2_Handle TEXT,
  Catch_3_Handle TEXT, -- these are to fetch the catches
  Post_id INT -- to fetch most recent post
)

DROP TABLE IF EXISTS Catches;

CREATE TABLE IF NOT EXISTS Catches(
  Catch_id INT PRIMARY KEY,
  Catch_Img -- img,
  Catch_Species VARCHAR(45),
  Catch_Length VARCHAR(5),
  Catch_Weight VARCHAR(10),
  Catch_Date DATE,
  Catch_Location VARCHAR(45)
)