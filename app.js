const express = require("express");
const app = express();
const fetch = require("node-fetch");
const bodyParser = require("body-parser")

const api_key = "60b6846233a0a272d5096a6cd33e4ee0"
app.use(express.static("public"));
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))

const database = [ 
	
]
const trackdata = [
	
]

let counter = 1
app.get('/',(req,res) => {
		res.render("home.ejs")
})

app.post('/' , (req,res) => {
	database.push(req.body);
	console.log(database[database.length-1])
	res.redirect("/lyric")
})

app.get("/lyric", (req,res) => {
	
	fetch(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${database[database.length-1].Song_title}&q_artist=${database[database.length-			1].singer}&apikey=${api_key}`)
			
	
			.then((data) => data.json())

			.then((data)=>  {
				
				if (data.message.header.status_code===404) {
					res.render("Error.ejs")
				}else {
					res.render("land.ejs", {data:data})	
				}
	})
			 .catch( err => res.send(err))
})



app.listen(3000, ()=>{
		console.log("Listening...")
})