const app = require('./components/app')

//init route
const routes = require('./routes/IndexRoute')
routes(app)


app.listen(8080, () => console.log("App running at port " +8080))


