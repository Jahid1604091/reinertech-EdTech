const bcrypt = require('bcryptjs');

const users = [
    {
    
      name:"Admin",
      email:"admin@yahoo.com",
      password:bcrypt.hashSync('12345',10),
      isAdmin:true
    },
    {
    
      name:"Jahid",
      email:"jahid@yahoo.com",
      password:bcrypt.hashSync('12345',10),
    },
    {
    
      name:"Hasan",
      email:"hasan@gmail.com",
      password:bcrypt.hashSync('12345',10),
    },

  ]
  
  module.exports =  users
  