let bodyParser = require('body-parser');
let mongoose = require('mongoose');



//coect to database


mongoose.connect('mongodb+srv://shengo333:shengo333@todo.wdplkzs.mongodb.net/?retryWrites=true&w=majority')


//create a schema - this is like blueprint

let todoSchema = new mongoose.Schema({
    item: String
})

let Todo = mongoose.model('Todo', todoSchema);

let itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('item saved')
})

let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
let urlencodedParser = bodyParser.urlencoded({extended: false})


module.exports = function(app){
    app.get('/todo', function(req, res){
        res.render('todo', {todos: data})
    });
    app.post('/todo',urlencodedParser, function(req, res){
        data.push(req.body)
        console.log(data)
        res.json(data)
    });
    app.delete('/todo/:item', function(req,res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !== req.params.item;
        });
        res.json(data);
    });
};