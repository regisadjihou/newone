
const handleRegister = (req, res, bcrypt,knex) => {
    const {name, email, password} = req.body
    bcrypt.hash(password, null, null, function(err, hash) {
        // Store hash in your password DB.
        return knex.transaction(function (t) {
            return knex("users")
              .transacting(t)
              .insert({     
                name: name,
                email: email,
                entries: 0,
                joined: new Date()})
              .then(function (response) {
                return knex('login')
                  .transacting(t)
                  .insert({
                    email: email,
                    hash: hash})
              })
              .then(t.commit)
              .catch(t.rollback)
          })
          .then(function (data) {
            // transaction suceeded, data written
            knex('users').where('id', data[0])
            .then(user=>{
                res.json(user[0])
            }) 
          })
          .catch(function (error) {
            // transaction failed, data rolled back
            res.json("Can't register")
          });
    });
  }

  module.exports = {
    handleRegister: handleRegister
  };