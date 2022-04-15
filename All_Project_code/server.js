var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
var dotenv = require('dotenv').config(); //Lets us pull environement variables from .env for db configuration -- Spencer
var session = require('express-session'); //Lets us track sessions for logins -- Spencer
var multer = require('multer');
var path = require('path');
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//Create Database Connection
var pgp = require('pg-promise')();


// Image uploader



const avatarStorage = multer.diskStorage({   
    destination: './avatars', 
      filename: (req, file, cb) => {
          const fileSuffix = '_' + Date.now() + path.extname(file.originalname); //appends date and fileformat to end of file name
          cb(null, file.fieldname + fileSuffix)
    }
});

const avatarUpload = multer({
    storage: avatarStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Not an accepted file format. Please upload a png or jpg file.'))
       }
     cb(undefined, true)
  }
});

const postStorage = multer.diskStorage({    
    destination: './postimages', 
      filename: (req, file, cb) => {
          const fileSuffix = '_' + Date.now() + path.extname(file.originalname); //appends date and fileformat to end of file name
          cb(null, file.fieldname + fileSuffix)
    }
});

const postUpload = multer({
    storage: postStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Not an accepted file format. Pleas upload a png or jpg file.'))
       }
     cb(undefined, true)
  }
});

const catchStorage = multer.diskStorage({    
    destination: './catchimages', 
      filename: (req, file, cb) => {
          const fileSuffix = '_' + Date.now() + path.extname(file.originalname); //appends date and fileformat to end of file name
          cb(null, file.fieldname + fileSuffix)
    }
});

const catchUpload = multer({
    storage: catchStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Not an accepted file format. Please upload a png or jpg file.'))
       }
     cb(undefined, true)
  }
});





// For Single image upload


// const upload = multer({ dest: 'uploads/' })

// app.post('/createposts/addimage', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// })




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
app.post('/userprofile/:user_id/newpic', avatarUpload.single('profile-pic'), function(req, res, next) {
    var id = parseInt(req.params.user_id);
    
    var path = '/' + req.file.path;

    var updateProfPic = `UPDATE users SET User_IMG = '${path}' WHERE User_id = ${id};`;
    db.any(updateProfPic)
	.then(function(rows) {
			res.redirect('back');
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
                user_data: '',
                self: '',
                user: req.session.user_id
		})
	});    
    
});

app.get('/feed', function(req, res){
    
    var query = 'SELECT Posts.Post_Name, Posts.Post_Date, Posts.Post_Content, Posts.Post_Image, Posts.User_Id, Users.User_name FROM Posts INNER JOIN Users ON Users.User_Id=Posts.User_Id ORDER BY Post_ID DESC;';
    // var userpost = 'select username from users inner join posts '

    // db.task('loadfeed', task =>
	// {
	// 	return task.batch([
	// 		task.any(query),
    //         // task.any(userpost)
	// 	]);
	// })

    db.any(query)
    .then(function(data) {
        console.log(data)
        res.render('pages/feed', {
            my_title: "GoFishFeed",
            items: data,
            // names: data[1],
            user: req.session.user_id,
            error: ''
        })
    })
    .catch(function(err) {
        console.log('error', err)
        res.render('pages/feed', {
            my_title: 'GoFishFeed',
            data: '',
            user: req.session.user_id,
            message: 'failed to load feed',
            error: 'failed',
            items: ''
            

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

app.get('/logout', function(req, res) {
    req.session.username = "";
    req.session.user_id = -1;
    res.redirect('/');
})

//registration page
app.get('/registration', function(req, res) {
	res.render('pages/registration', {
		my_title: "Register",
        user: '',
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
    var passwordVar = req.body.password1;
    

	//var regComplete = true;

    var databaseStatement = `INSERT INTO Users(First_Name, Last_Name, User_Name, User_Email, User_Password) VALUES('${firstNameVar}', '${lastNameVar}', '${userNameVar}', '${emailVar}',  '${passwordVar}');`;



    db.any(databaseStatement)
    .then(function(rows){
        res.redirect('/login'); //redirects user to home page if they successfully login
   })
   .catch(function(err) {
        res.render('pages/registration', {
            my_title: "Register",
            user: '',
        })
   })
    
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
});

//user page
app.get('/userprofile/:user_id', function(req, res){
    var id = parseInt(req.params.user_id);
    var view_id;
    if (req.session.user_id) {
        view_id = req.session.user_id;
    } else {
        view_id = -1;
    }
     
    var viewing_self = id === view_id;

    //console.log(req.query);
    console.log(id);
    

    var friends = `SELECT * FROM Users INNER JOIN User_relationship ON Users.User_Id = User_relationship.User_Addressee_Id WHERE User_Requester_Id = ${id};`;
    var catches = `SELECT * FROM Catches WHERE User_id = ${id};`;
    var posts = `SELECT * FROM Posts WHERE User_id = ${id};`;

    var fCount = `SELECT COUNT(*) FROM User_relationship WHERE User_Requester_Id = ${id};`;
    var cCount = `SELECT COUNT(*) FROM Catches WHERE User_id = ${id};`;
    var pCount = `SELECT COUNT(*) FROM Posts WHERE User_id = ${id};`;

    var user_data = `SELECT * FROM Users WHERE User_id = ${id};`;
    var isFriend = `SELECT COUNT(*) FROM User_relationship WHERE User_Addressee_Id = ${id} AND User_Requester_Id = ${view_id};`;


    db.task('get-everything', task => {
        return task.batch([
            task.any(friends),
            task.any(catches),
            task.any(posts),
            task.any(fCount),
            task.any(cCount),
            task.any(pCount),
            task.any(user_data),
            task.any(isFriend)
        ]);
    })

	.then(info => {
         var viewing_Friend = info[7][0].count == 1;
			res.render('pages/userprofile', {
				my_title: 'User Profile',
				user_id: id,
				friends: info[0],
				catches: info[1],
				posts: info[2],
				fCount: info[3][0].count,
                cCount: info[4][0].count,
                pCount: info[5][0].count,
                user_data: info[6],
                self: viewing_self,
                user: req.session.user_id,
                viewingFriend: viewing_Friend
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
                user_data: '',
                self: '',
                user: req.session.user_id
		})
	});
});

app.post('/userprofile/:user_id/submit_catch', function(req, res) {
    var id = parseInt(req.params.user_id);

    var pic = '';
    if (req.file) {
        pic = req.file.path;
    }

	var name= req.body.name;
	var length = req.body.length;
    var weight = req.body.weight;
	var date = req.body.date;
    var location = req.body.location;
	var newCatch = `INSERT INTO Catches(Catch_Name, Catch_Length, Catch_Weight, Catch_Location, Catch_Date, Catch_Image, User_id) VALUES('${name}', ${length}, ${weight}, '${location}', '${date}', '${pic}', ${id});`;

	db.any(newCatch)
    .then(function(rows) {
    	res.redirect('back');
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
                user_data: '',
                self: '',
                user: ''
            })
    });
});

app.post('/userprofile/:user_id/addfriend', function(req, res) {
    
    var id = req.session.user_id;

    var friend_id = parseInt(req.params.user_id);

    var addFriend = `INSERT INTO User_relationship (User_Requester_Id, User_Addressee_Id) VALUES(${id}, ${friend_id});`;

    db.any(addFriend)
    .then(info => {
    	res.redirect('back');
    })
    .catch(err => {
        console.log('error', err);
            res.render('pages/userprofile', {
                my_title: 'User Profile',
                added_friend: '',
                user_id: '',
				friends: '',
				catches: '',
				posts: '',
				fCount: '',
                cCount: '',
                pCount: '',
                user_data: '',
                self: '',
                user: ''
            })
    });
});


app.post('/userprofile/:user_id/removefriend', function(req, res) {
    var id = req.session.user_id;

    var friend_id = parseInt(req.params.user_id);

    var removeFriend = `DELETE FROM User_relationship WHERE User_Addressee_Id = ${friend_id} AND User_Requester_Id = ${id};`;

    db.any(removeFriend)
    .then(function(rows) {
        res.redirect('back');
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
            user_data: '',
            self: '',
            user: ''
        })
    });   
})




// home page searching a friend!!!
app.post('/search', function(req, res){
    var uname = req.body.uname;
    var friend_id = `SELECT User_Id FROM Users WHERE User_Name = '${uname}';`;
    // how to find link to user profile page and redirect i do not know
    db.any(friend_id)
	.then(function(rows) {
            var friend = rows[0].user_id;
			res.redirect(`/userprofile/${friend}`);
	})
	.catch(err => {
		console.log('error', err);
		res.render('pages/home', {
			    my_title: 'Home',
				user_id: '',
                user_info: '',
                user: req.session.user_id
		})
	});
});
    
app.get('/createpost', function(req, res){
    res.render('pages/createpost', {
        my_title: "Createpost",
        error:'',
        user: req.session.user_id
    })
});




app.post('/createpost/addpost', postUpload.single('image'), function(req, res) {     //post request for the create post page --Yuhe
    var post_name = req.body.Postname;
    var post_content = req.body.Postcontent;
    var image = '';
    if (req.file) {
        image = req.file.path;
    }
    console.log(req.body.Postname);
    console.log(req.body.Postcontent);
    if (req.file) {
        console.log(req.file.path);
    }
    
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    if (month < 10){
        month = "0" + month;
    }
    if (day < 10){
        day = "0" + day;
    }
    var post_date = year + '-' + month + '-' + day;
    var query = 'SELECT Posts.Post_Name, Posts.Post_Date, Posts.Post_Content, Posts.Post_Image, Posts.User_Id, Users.User_name FROM Posts INNER JOIN Users ON Users.User_Id=Posts.User_Id ORDER BY Post_Date;';
    var insert_posts = `INSERT INTO Posts(Post_Name, Post_Date, Post_Content, Post_Image, User_Id) VALUES('${post_name}', '${post_date}', '${post_content}', '${image}', ${req.session.user_id});`; 
    db.task('loadfeed', task =>
	 {
	 	return task.batch([
            task.any(insert_posts),
            task.any(query)
  
	 	]);
	 })
     .then(function(data){
        res.render('pages/success',{
            my_title:"feed Page",
            items: data[1],
            user:req.session.user_id,
            error:''
          })
        setInterval("contentRefresh();", 10000 );
    })
    
    .catch(err => {
      console.log('error', err);
      res.render('pages/createpost', {
          my_title: 'post page',
          user:req.session.user_id,
          error: "create post failed"
      })
    });
  });
    

//Taken from lab 7, keeps server and front end connected
app.listen(3000);
console.log('3000 is the magic port');