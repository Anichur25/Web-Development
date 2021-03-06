var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
    methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
mongoose.connect('mongodb://localhost/blogdata');

var blogSchema = new mongoose.Schema({

    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = new mongoose.model('blog', blogSchema);

app.get('/', function (req, res) {

    res.redirect('/blogs');
});

app.get('/blogs', function (req, res) {

    Blog.find({}, function (err, blogs) {

        if (err)
            console.log('Error has occured' + err);
        else {
            res.render('index', { blogs: blogs });
        }
    });
});


app.get('/blogs/new', function (req, res) {

    res.render('newPost');
});

app.get('/blogs/:id',function(req,res){
   
    Blog.findById(req.params.id,function(err,foundBlog){
       
        if(err)
         res.redirect('/blogs');
        else
         res.render('show',{blog : foundBlog});
    });
});

app.post('/blogs', function (req, res) {

    Blog.create(req.body.blog, function (err, newPost) {

        if (err)
            res.render('newPost');
        else {
            res.redirect('/blogs');
        }
    });
});

app.get('/blogs/:id/edit',function(req,res){
    
    Blog.findById(req.params.id,function(err,foundBlog){
      
        if(err)
         res.redirect('/blogs');
         else
         {
             res.render('edit',{blog : foundBlog});
         }
    });
});

app.put('/blogs/:id',function(req,res){
    
    Blog.findOneAndUpdate(req.params.id,req.body.blog,function(err,updateBlog){
       
        if(err)
         res.redirect('/blogs');
         else
         {
             res.redirect('/blogs/' + req.params.id);
         }
    });
});

app.delete('/blogs/:id',function(req,res){
     
    Blog.findByIdAndRemove(req.params.id,function(err){
     
         res.redirect('/blogs');
    });
});

app.listen(3000, function (req, res) {

    console.log('Server is served');
});