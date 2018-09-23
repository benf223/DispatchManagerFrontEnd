var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dbHelper = require('./db.js');

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
	next();
});

var api = express.Router();
var auth = express.Router();

// Used to wake up the Heroku App
api.get('/start', (req, res) => {
});

// Rounds assigned to each truck on a given day
api.get('/Alllocations/', (req, res) => {
	let params = req.params.date;

	dbHelper.location.getAll(params).then((result) => {
		res.send(result);
	});
});
// Adds a new location to the location collection 
api.get('/add_location'),(req,res)=>{
	console.log(req.body);
	res.sendStatus(200);
}
// Gets a Change object from the frontend and will update the truncated version of the releases in the database with the new information
api.post('/update_location', (req, res) => {
	console.log(req.body);
	dbHelper.releases.update(null, null);
	

	res.sendStatus(200);
});

// Need to find and remove the release based on it's ID as given
api.delete('/delete_location/:locationname', (req, res) => {
	console.log(req.params.release);
	res.sendStatus(200);
});


app.use('/api', api);
app.use('/auth', auth);

app.listen(process.env.PORT || 3000);