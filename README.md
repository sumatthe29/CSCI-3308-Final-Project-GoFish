# csci-3308-spring22-017-04

# Go Fish
## Project Description
Go Fish is a social media website designed primarily for fishing enthusiasts. Once a user registers for an account and logs in, they can see posts from all other users in a feed, make posts themselves, log the fish they've caught on their profile (including pictures of their catch), and add other users as "fishing buddies". 
## Repo Organization
The main files needed for the website's front-end and middleware functionality is contained in `All_Project_Code/src`. Preliminary unit tests as well as documentation for user acceptance testing is contained in `All_Project_Code/test`. `All_Project_Code/heroku` contains a dockerfile necessary for deployment. `All_Project_Code/database` contains a dockerfile for deployment and the initialization script for the database.
## Building/Running This Project
This project has been deployed to heroku [here](https://go-fish-site.herokuapp.com/).
To run locally (requires docker):
- Clone this repository
- Add a .env file to `All_Project_Code` on your local machine. In this file, define parameters for POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, and SESSION_SECRET as you wish.
- Add a .env file to `All_Project_Code/heroku`. You need not put anything here unless you are trying to deploy the app.
- Run the command `docker-compose up` from `All_Project_Code`.
- To view your built local version, navigate to [localhost:3000](localhost:3000) in your browser.
## Credits
The general structure of the repo as well as the Dockerfiles were taken from lab 10 of this class.
