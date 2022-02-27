const pool = require('../database');
class IndexController {
   
    async add(req,res){
        const {Percentage, comment} = req.body;
        const {Idbook} = req.params;

        const NewProgress = {
          Percentage,
          comment,
          FkIdBook : Idbook
        }
        try{
          //console.log(NewProgress);
          await pool.query('Insert into Progress set ?',[NewProgress]);
          req.flash('success','Progress saved successfully');
          res.redirect('/Mybooks/edit/'+Idbook);
        }catch(e){
          console.log(e);
        }
    }



  }
  
  module.exports = IndexController;