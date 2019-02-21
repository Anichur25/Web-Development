var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/embedding');

var postSchema = new mongoose.Schema({
    title : String,
    content : String
});

var userSchema = new mongoose.Schema({
   email : String,
   name : String,
   posts : [postSchema]
});



var User =  mongoose.model('user',userSchema);
var Post =  mongoose.model('post',postSchema);

// var newUser = new User({
//    email : 'aniscseru6125@gmail.com',
//    name : 'anis'
// });

// newUser.posts.push({
    
//     title : 'Hello world',
//     content : 'This is nothing'
// });

// var newPost = new Post({
   
//     title : 'Rajshahi University',
//     content : 'This is my University'
// });

// newUser.save(function(err,newUser){
   
//     if(err)
//     console.log(err);
//     else{
//         console.log(newUser);
//     }
// });

User.findOne({name : 'anis'},function(err,user){
    
    if(err)
     console.log(err);
     else
     {
         user.posts.push({
             title: 'bangladesh',
             content : 'dept of computer science'
         });

         user.save(function(err,User){
             if(err)
              console.log(err);
              else
               console.log(User);
         })
     }
});


