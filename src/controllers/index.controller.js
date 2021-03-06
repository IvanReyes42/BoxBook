const pool = require('../database');

class IndexController {
    async List(req, res) {
      const Title = "";
      const Books = await pool.query('Select * from Books where Qualification >=4');
        res.render('Index/index',{Books,Title})
      
      //res.render("index");
    }

    async search(req, res){
      const {Title} = req.body;
      console.log(Title);
      if(Title === ""){
        
        const Books = await pool.query('Select * from Books where Qualification >=4');
        res.render('Index/index',{Books,Title})
      }
      else{
        const Books = await pool.query(`select * from Books where Title like '%${Title.toLowerCase()}%'`);
        res.render('Index/index',{Books, Title})
      }
    }

    async ViewMore(req,res){
        const {IdBook} = req.params;
        const Libros = await pool.query(`select * from Books where IdBook =${IdBook}`);
        //console.log(Libros);
        const FkIdUser  = Libros[0].FkIdUser;
        //console.log(FkIdUser);
        const Users = await pool.query(`select * from Users where IdUser =${FkIdUser}`)
        const Progress = await pool.query(`select * from Progress where FkIdBook = ${IdBook}`);
        const Comments = await pool.query(`select comment, UserName from Comments, Users where FkIdUser = IdUser and FkIdBook = ${IdBook}`)
       //console.log(Users[0].Imagen);
        res.render('Index/viewmore',{Libro:Libros[0],Progress, User:Users[0],Comments})
    }

    async AddComment(req,res){
        const { Comment } = req.body;
        const {IdBook} = req.params;
        const NewComment = {
          Comment,
          FkIdBook: IdBook,
          FkIdUser: req.user.IdUser
        }
        console.log(NewComment);
        await pool.query('Insert into Comments set ?',[NewComment]);
        req.flash('success','Comment saved successfully');
        res.redirect('/viewmore/'+IdBook);
    }

    Profile(req, res) {
      res.render('Index/Profile')
    }

    async UpdateImage(req,res){
      const NewUser = {
        Imagen:req.file.filename
      }
      console.log(NewUser);
      await pool.query('Update Users set Imagen =? where IdUser =?',[NewUser.Imagen,req.user.IdUser]);
      req.flash('success','Imagen changed successfully');
      res.redirect('/Profile');
      //res.send({data: 'Imagen Cargada'})
    }

    async UpdateGoal(req,res){
      const {Goal} = req.body;
      const NewUser = {
        Goals:Goal
      }
      console.log(NewUser);
      await pool.query('Update Users set Goals =? where IdUser =?',[NewUser.Goals,req.user.IdUser]);
      req.flash('success','Goal changed successfully');
      res.redirect('/Profile');

    }
  }
  
  module.exports = IndexController;