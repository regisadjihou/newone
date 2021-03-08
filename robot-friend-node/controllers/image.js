
const handleimage = (req, res, knex)=> {
    const {id} = req.body
    knex('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .then(data=>{
      if(data===1){
        knex('users').where('id', id)
        .then(user=>{
          res.json(user[0].entries)
        }) 
      }
    })
}

module.exports = {
  handleimage: handleimage
  };