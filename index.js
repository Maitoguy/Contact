const express = require('express');
const path = require('path');
const port = 8000; 
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();
app.set('view engine' , 'ejs');
app.set('views',path.join(__dirname , 'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

app.get('/' , function(req , res){
    Contact.find({})
    .then(contacts => {
      return res.render('home', {
        title: 'Contact List',
        contact_list: contacts
      });
    })
    .catch(err => {
      console.log('Error in fetching contacts from database');
      return;
    });
  
});

app.post('/create-contact' , function(req , res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    });
    return res.redirect('back');
});

app.get('/delete-contact/', function(req, res) {
    let phone = req.query.phone;
    let id = req.query.id;
  
    Contact.findByIdAndDelete(id)
      .then(() => {
        console.log('Contact deleted successfully');
        return res.redirect('back');
      })
      .catch(err => {
        console.log('Error in deleting contact from database:', err);
        return res.redirect('back');
      });
  });
  

app.listen(port , function(err){
    if(err){console.log('Error in running the server ' , err);}
    console.log('Yup! my express server is running on port: ' , port);
});