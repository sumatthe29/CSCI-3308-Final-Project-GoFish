var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
var dotenv = require('dotenv').config(); //Lets us pull environement variables from .env for db configuration -- Spencer
var session = require('express-session'); //Lets us track sessions for logins -- Spencer
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
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: "testsessionID",
    saveUninitialized: false
}))




// initial get for 2feed2 page - Matthew


app.get('/feed', function(req, res){
    
    var query = 'select * from Posts ORDER BY Post_Date;';

    db.task(query)
    .then(function(data) {
        res.render('pages/feed', {
            my_title: "GoFishFeed",
            items: data[0],
            user: ''
        })
    })
    .catch(function(err) {
        console.log('error', err)
        res.render('pages/feed', {
            my_title: 'GoFishFeed',
            items: '',
            user: ''

        })
    })

});

// Post function to add new posts (NEED CREATE POSTS PAGE) - Matthew

//Basic get request to render a home page -- Spencer
app.get('/', function(req, res) {
    res.render('pages/home', {
        my_title: "Home",
        user: req.session.user_id
    })
});
//Get request to display login page when you first visit to login -- Spencer
app.get('/login', function(req, res){
    res.render('pages/login', {
        my_title: "Login",
        error:'',
        user: ''
    })
});

//Post request to allow user to login using the login form -- Spencer
app.post('/login', function(req, res){
    var username = req.body.uname;
    var email = req.body.email;
    var pword = req.body.password;
    var user;

    if (email != "") {
        user = `SELECT * FROM users WHERE User_Email = '${email}' AND User_Password = '${pword}';`;
    } else {
        user = `SELECT * FROM users WHERE User_Name = '${username}' AND User_Password = '${pword}';`;
    }

   db.any(user)
    .then(function(rows){
        req.session.username = rows[0].user_name;
        req.session.user_id = rows[0].user_id;
        res.redirect('/') //redirects user to home page if they successfully login
   })
   .catch(function(err) {
        res.render('pages/login', {
            my_title: "Login",
            error: 'Invalid credentials, try again',
            user: ''
        })
   })
   
});


//registration page
app.get('/registration', function(req, res) {
	res.render('pages/registration', {
		my_title: "Register",
        User_id: '', 
		First_Name: '',
        Last_Name: '',
        User_Name: '',
		User_Email: '',
		User_Password: '',
	})
});

app.post('/registration', function(req, res){

    var emailVar = req.body.email;
    var firstNameVar = req.body.first_name;
    var lastNameVar = req.body.last_name;
    var userNameVar = req.body.user_name;
    var passwordVar = req.body.password;

	var regComplete = true;

    var databaseStatement = "INSERT INTO Users(First_Name, Last_Name, User_Name, User_Email, User_Password) VALUES('" + firstNameVar + "', '" + lastNameVar + "', '" + userNameVar + "', '" + emailVar + "',  '" + passwordVar + "');";

	db.task('get-everything', task => {
		return task.batch([
			task.any(databaseStatement)
		]);
	})

	.then(info => {

		if(emailVar != "" && passwordVar != "" && passwordVar.length >= 5) {
			regComplete = true; //check various requirements for registering
		}

		if(regComplete == true) { //When login info is done implement here -Rooney

			res.render('pages/login', {
				my_title: "Login",
				data: info,
				email: emailVar,
                username: userNameVar,
				password: passwordVar,
				regComplete: 'Registration successful',
			})
		}

		else {
			res.render('pages/registration', {
				my_title: "Register",
				data: info,
				email: emailVar,
                username: userNameVar,
				password: passwordVar,
				regComplete: 'Registration incomplete',
			})
		}
	})
	
	.catch(err => {
		console.log('error', err);
		res.render('pages/registration', {
			my_title: "Register",
			data: '',
			email: '',
            username: '',
			password: '',
			regComplete: 'Registration did not work',
		})
	});
})

//user page
app.get('/userprofile/:user_id', function(req, res){
    var id = req.session.user_id;
    var friend_id = `SELECT User_Addressee_Id FROM User_relationship WHERE User_Requester_Id = '${id}';`;

    var friends = `SELECT * FROM Users WHERE User_Id = '${friend_id}';`;
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
                pCount: info[5][0].count,
                user: ''
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
                pCount: '',
                user: ''
		})
	});
});

app.post('/userprofile/:user_id', function(req, res) {
    var id = req.session.user_id;

	var name= req.body.name;
	var length = req.body.length;
    var weight = req.body.weight;
	var date = req.body.date;
    var location = req.body.location;
	var newCatch = `INSERT INTO Catches(Catch_Name, Catch_Length, Catch_Weight, Catch_Location, Catch_Date, User_id) SELECT * FROM( VALUES('${name}', '${length}', '${weight}', '${location}', '${date}', '${id}')) as foo;`;
	var catches = `SELECT * FROM Catches WHERE User_id = '${id}';`;

	db.task('get-everything', task => {
        return task.batch([
            task.any(catches),
            task.any(newCatch)
        ]);
    })
    .then(info => {
    	res.render('pages/userprofile',{
            my_title: 'User Profile',
				user_id: id,
				friends: '',
				catches: info[0],
				posts: '',
				fCount: '',
                cCount: '',
                pCount: '',
                user: ''
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
                pCount: '',
                user: ''
            })
    });
});

app.get('/profile/:user_id', function(req, res){
    var id = req.query.user_id;
    var friend_id = `SELECT User_Addressee_Id FROM User_relationship WHERE User_Requester_Id = '${id}';`;

    var friends = `SELECT * FROM Users WHERE User_Id = '${friend_id}';`;
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
			res.render('pages/profile', {
				my_title: 'Profile',
				user_id: id,
				friends: info[0],
				catches: info[1],
				posts: info[2],
				fCount: info[3][0].count,
                cCount: info[4][0].count,
                pCount: info[5][0].count,
                user: ''
			})
	})
	.catch(err => {
		console.log('error', err);
		res.render('pages/profile', {
			my_title: 'Profile',
				user_id: '',
				friends: '',
				catches: '',
				posts: '',
				fCount: '',
                cCount: '',
                pCount: '',
                user: ''
		})
	});
});

app.post('/profile/:user_id/addfriend', function(req, res) {
    var id = req.session.user_name;

    var friend_id = req.param.id;

    var addFriend = `INSERT INTO User_relationship(User_Requester_Id, User_Addressee_Id) SELECT * FROM( VALUES('${id}', '${friend_id}')) as foo;`;

    db.task('get-everything', task => {
        return task.batch([
            task.any(addFriend)
        ]);
    })
    .then(info => {
    	res.render('pages/profile',{
            my_title: 'Profile',
            added_friend: info[0]
			})
    })
    .catch(err => {
        console.log('error', err);
            res.render('pages/profile', {
                my_title: 'Profile',
                added_friend: ''
            })
    });
});


app.post('/profile/:user_id/removefriend', function(req, res) {
    var id = req.session.user_id;

    var friend_id = `SELECT User_Addressee_Id FROM User_relationship WHERE User_Requester_Id = '${id}';`;

    var removeFriend = `DROP FROM User_relationship(User_Requester_Id, User_Addressee_I) SELECT * FROM( VALUES('${id}', '${friend_id}'));`;

    db.task('drop', task => {
        return task.batch([
            task.any(removeFriend)
        ]);
    })
    .then(info => {
        res.render('pages/profile',{
            my_title: 'ProfileRMV',
            removed_Friend: info[0]
        })
    })
    .catch(err => {
        console.log('error', err);
            res.render('pages/profile', {
                my_title: 'ProfileRMV',
                removed_Friend: ''
            })
    });   
})




// home page searching a friend!!!
app.get('/home/:id/', function(req, res){
    var id = req.query.User_Name;
    var friend_username = `SELECT * FROM Users WHERE User_Name = '${id}';`;
    var friend_id = `SELECT User_Id FROM Users WHERE User_Name = ${id}';`;
    // how to find link to user profile page and redirect i do not know
    db.task('get-everything', task => {
        return task.batch([
            task.any(friend_username),
            task.any(friend_id)
        ]);
    })
	.then(info => {
			res.redirect('profile' + friend_id, {
				my_title: 'friendPage',
				user_id: info[1],
                user_info: info[0]
			})
	})
	.catch(err => {
		console.log('error', err);
		res.render('pages/home', {
			my_title: 'friendPage',
				user_id: '',
                user_info: ''
		})
	});
});
    
app.get('/createpost', function(req, res){
    res.render('pages/createpost', {
        my_title: "Createpost",
        error:'',
        user: ''
    })
});


app.post('/createpost/addpost', function(req, res) {     //post request for the create post page --Yuhe
    var post_name = req.body.Postname;
    var post_content = req.body.Postcontent;
    var post_tag = req.body.Posttag;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    if (month < 10){
        month = "0" + month;
    }
    if (day < 10){
        day = "0" + day;
    }
    var post_date = year + '-' + month + '-' + day;
    var post_tag = req.body.Posttag;
    var insert_posts = `INSERT INTO Posts(Post_Name, Post_Date, Post_Tag, Post_Content) VALUES('${post_name}', '${post_date}', '${post_tag}', '${post_content}');` 
    var query = 'SELECT * FROM Posts;'
    db.task('add-post', task => {
      return task.batch([
        task.any(insert_posts)
      ])
    })
    db.any(query)
    .then(rows => {
      res.render('pages/feed',{
        data: rows
      })
      setInterval("contentRefresh();", 10000 );
    })
    .catch(err => {
      console.log('error', err);
      res.render('pages/createpost', {
          my_title: 'post page'
      })
    });
  });
  

app.post('/2home2', function(req, res){
});    

//Taken from lab 7, keeps server and front end connected
app.listen(3000);
console.log('3000 is the magic port');