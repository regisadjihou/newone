
const handleSignin = (req, res, bcrypt,knex) =>{
    const {email, password} = req.body
    knex('login').where('email', email)
    .then(user=>{
        //res.json(user[0].hash)
    bcrypt.compare(password, user[0].hash, function(err, response) {
            // res == true
            if(response){
              knex('users').where('id', user[0].id)
              .then(user=>{
                  res.json(user[0])
              }) 
            }
            else{
                res.json("Data not found")
            }
        });
    }) 
    .catch(error=>{
        console.log(error)
    })
  }


  module.exports = {
    handleSignin: handleSignin
  };