var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/NodeJS')); //lets Node use static files like cs for styling - Spencer
var numStudents = 0;
var numAssignments = 0;
//Create Database Connection
var pgp = require('pg-promise')();


// Copied over from lab7 to use as a test - Matthew
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'football_db',
	user: 'postgres',
	password: 'pwd'
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

