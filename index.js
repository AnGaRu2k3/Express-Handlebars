const express = require('express')
const expressHbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/html"))


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine(
    'hbs', 
    expressHbs.engine({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        extname: "hbs",
        defaultLayout: "layout",
    })
)


app.set("view engine", "hbs");



app.get("/", (req, res) => res.render("index", {title: "Jeopardize Contest"}))


// app.get("/task1", (req, res) => res.render("task1", {title: "Inspiring Quotes"}))
app.use("/task1", require("./routes/task1Route"))
app.use("/task2", require("./routes/task2Route"))
app.use("/task3", require("./routes/task3Route"))
app.use("/task4", require("./routes/task4Route"))

app.use((req, res) => {
    res.send("Resquest not found")
})
app.use((error, req, res, next) => {
    console.error(error);
    res.send("Server error")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

