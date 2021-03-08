
const handleProfile = (req, res, knex) =>{
    const {id} = req.params
    knex('users').where('id', id)
    .then(data=>{
        if(data.length){
            res.json(data[0])
        }
        else{
            res.json("data not found")
        } 
    })
    .catch(error=>{
        res.status(404).json("error getting user")
    })
  }


  module.exports = {
    handleProfile: handleProfile
  };