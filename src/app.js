const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const hbs = require('hbs');
const staticPath = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")


// HBS view engine
app.set('view engine', 'hbs');
app.set('views', template_path)
hbs.registerPartials(partials_path)

// middleware
app.use(express.static(staticPath))

// routing
app.get("/", (req, res) => {
  res.render(`index`)
})

app.get("/weather", (req, res) => {
  res.render(`weather`)
})

app.get("/*", (req, res) => {
  res.send(`404error`)
})

app.get("*", (req, res) => {
  res.send(`Oops you have arrived to wrong page`)
})


// listening to port
app.listen(port, () => {
  console.log(`listening to ${port}`);
})