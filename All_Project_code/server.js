var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
var dotenv = require('dotenv').config(); //Lets us pull environement variables from .env for db configuration -- Spencer
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//app.use(express.static(__dirname + '/NodeJS')); lets Node use static files like cs for styling - Spencer
//Create Database Connection
var pgp = require('pg-promise')();


// Copied over from lab7 to use as a test - Matthew
const dbConfig = {
	host: 'db',
	port: 5432,
	database: process.env.POSTGRES_DB, //process.env gets environement variables from .env, we reference them like this -- Spencer
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
//This line is necessary for us to use relative paths 
//and access our resources directory
app.use(express.static(__dirname + '/'));




// initial get for 2feed2 page - Matthew


app.get('/2feed2', function(res,req){
    var query = 'select * from posts;';

    db.any(query)
        .then(function(posts) {
            res.render('views/2feed2', {
                my_title: "GoFishFeed",
                data: posts,
            })
        })
        .catch(function(err) {
            console.log('error', err)
            res.render('views/2feed2', {
                my_title: 'GoFishFeed',
                data: ''

            })
        })

});

// Post function to add new posts (NEED CREATE POSTS PAGE) - Matthew

app.post('/2newpost2/create_post', function (req,res) {
    // post name
    var pname = req.body.post_name;
    // post text
    var ptext = req.body.post_text;
    // post date
    var pdate = req.body.post_text;
    // post time
    var ptime = req.body.post_time;

    // DB Statements

    var insertinto = `INSERT INTO Posts(Post_Name,Post_Text,Post_Date,Post_Time) VALUES ('${pname}', '${ptext}', '${pdate}', '${ptime}');`; 
    var posts = 'SELECT * from Posts;';

    db.task('retrieve', task => {
        return task.batch([
            task.any(insertinto),
            task.any(posts)
        ]);
    })
    .then(posts => {
        res.render('views/2feed2', {
            my_title: "GoFishFeed",
            data: posts[1],
            postn: pname,
            postt: ptext,
            postd: pdate,
            posttime: ptime
        })
    })
    .catch(err => {
        console.log('error', err);
        res.render('views/2feed2', {
            my_title: "GoFishFeed",
            data: '',
            postn: '',
            postt: '',
            postd: '',
            posttime: ''
        })
    });
});

//Post function to process login request
/*
app.post('/login', function(req, res){
    var username = req.body.uname;
    var email = req.body.email;
    var pword = req.body.pword;
    var user;

    if (email != "") {
        user = `SELECT * FROM users WHERE User_Email = '${email}' AND User_Password = '${pword}';`;
    } else {
        user = `SELECT * FROM users WHERE User_Name = '${username}' AND User_Password = '${pword}';`;
    }

   db.any(user)
    .then(function(rows){
            res.render('pages/userprofile', {

            })

   })
   .catch(function(err) {

   })
   
});
*/

//registration page
app.get('/register', function(req, res) {
	res.render('pages/register', {
		my_title: "Register",
        User_id: '', 
		First_Name: '',
        Last_Name: '',
        User_Name: '',
		User_Email: '',
		User_Password: '',
	})
});

app.post('/register', function(req, res){

    var emailVar = req.body.email;
    var firstNameVar = req.body.first_name;
    var lastNameVar = req.body.last_name;
    var userNameVar = req.body.user_name;
    var passwordVar = req.body.password;

	var regComplete = true;

    var databaseStatement = "INSERT INTO Users(First_Name, Last_Name, User_Name, User_Email, User_Password) VALUES('" + firstNameVar + "', '" + lastNameVar + "', '" + userNameVar + "', '" + emailVar + "',  '" + passwordVar + "');";

	db.task('get-everything', task => {
		return task.batch([
			task.any(insert_statement)
		]);
	})

	.then(info => {

		if(emailVar != "" && passwordVar != "" && passwordVar.length >= 5) {
			regComplete = true; //check various requirements for registering
		}

		if(regComplete == true) { //When login info is done implement here -Rooney

			/*res.render('pages/login', {
				my_title: "Login",
				data: info,
				email: emailVar,
				password: passwordVar,
				regComplete: 'Registration successful',
			})*/
		}

		else {

			res.render('pages/register', {
				my_title: "Register",
				data: info,
				email: emailVar,
				password: passwordVar,
				regComplete: 'Registration incomplete',
			})
		}
	})
	
	.catch(err => {
		console.log('error', err);
		res.render('pages/register', {
			my_title: "Register",
			data: '',
			email: '',
			password: '',
			regComplete: '',
		})
	});
})

//user page
app.get('/userprofile/:user_id', function(req, res){
    var id = req.query.user_id;

    var friends = `SELECT * FROM User_relationship WHERE User_Requester_Id = '${id}';`;
    var catches = `SELECT * FROM Catches WHERE User_id = '${id}';`;
    var posts = `SELECT * FROM Posts WHERE User_id = '${id}';`;

    var fCount = `SELECT COUNT(*) FROM User_relationship WHERE User_Requester_Id = '${id}';`;
    var cCount = `SELECT COUNT(*) FROM Catches WHERE User_id = '${id}';`;
    var pCount = `SELECT COUNT(*) FROM Posts WHERE User_id = '${id}';`;

    db.task('get-everything', task => {
        return task.batch([
            task.any(friends),
            task.any(catches),
            task.any(posts),
            task.any(fCount),
            task.any(cCount),
            task.any(pCount)
        ]);
    })

	.then(info => {
			res.render('pages/userprofile', {
				my_title: 'User Profile',
				user_id: id,
				friends: info[0],
				catches: info[1],
				posts: info[2],
				fCount: info[3][0].count,
                cCount: info[4][0].count,
                pCount: info[5][0].count
			})
	})
	.catch(err => {
		console.log('error', err);
		res.render('pages/userprofile', {
			my_title: 'User Profile',
				user_id: '',
				friends: '',
				catches: '',
				posts: '',
				fCount: '',
                cCount: '',
                pCount: ''
		})
	});


});

//Taken from lab 7, keeps server and front end connected
app.listen(3000);
console.log('3000 is the magic port');