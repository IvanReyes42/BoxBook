const pool = require('../database');
const fetch = require('node-fetch');

class IndexController {
    
    //Listar Abrir vista con datos 
    async List(req, res) {
        const Books = await pool.query('Select * from Books where FkIdUser = ?',[req.user.IdUser]);
        res.render('Books/list',{Books})
    }

    //Abrir formulario para agregar
    FrmAdd(req, res) {
        
        res.render('books/add');
    }

    //Consumir API ISBN para traer datos
    async ISBN(req,res){
        try {
            const {ISBN} = req.body;
            const API =
              "https://www.googleapis.com/books/v1/volumes?q=isbn:"+ISBN;
              
            const responseM = await fetch(API);
            const Respuesta = await responseM.json();
            const Datos = Respuesta["items"][0]; 

            const Libro = {
                ISBN: ISBN,
                Title: Datos["volumeInfo"]["title"],
                Author: Datos["volumeInfo"]["authors"][0],
                Gender: Datos["volumeInfo"]["categories"][0],
                Image: Datos["volumeInfo"]["imageLinks"]["thumbnail"],
                Editorial: Datos["volumeInfo"]["publisher"],
                Year: Datos["volumeInfo"]["publishedDate"]
            }

            
            res.render("books/add", { Libro, ISBN});
            
          } catch (error) {
            console.log('Entro al catch')
            console.log(error);
            req.flash('message','Error, Libro no encontrado en la base de datos de Google')
            res.redirect("/Mybooks/add");
          }
    }


    //AgregarDatos
    async Add(req, res) {
        const {Review, ISBN, Qualification,Status} = req.body;
        //console.log(Status);
        const API =
              "https://www.googleapis.com/books/v1/volumes?q=isbn:"+ISBN;
              
            const responseM = await fetch(API);
            const Respuesta = await responseM.json();
            const Datos = Respuesta["items"][0]; 

            const NewLibro = {
                ISBN: ISBN,
                Title: Datos["volumeInfo"]["title"],
                Authors: Datos["volumeInfo"]["authors"][0],
                Editoral: Datos["volumeInfo"]["publisher"],
                Gender: Datos["volumeInfo"]["categories"][0],
                Year: Datos["volumeInfo"]["publishedDate"],
                Qualification: Qualification,
                Review: Review,
                CoverPage: Datos["volumeInfo"]["imageLinks"]["thumbnail"],
                Status: Status,
                FkIdUSer : req.user.IdUser
            }

            //console.log(NewLibro);
            await pool.query('Insert into books set ?',[NewLibro]);
            req.flash('success','Book saved successfully');
            res.redirect('/Mybooks');
    }

    async Search(req,res){
        const {Title} = req.body;
        
        const Books = await pool.query(`select * from Books where Title like '%${Title.toLowerCase()}%' and FkIdUser = ${req.user.IdUser} `);
        


        res.render('Books/list',{Books})
    }



    //Abrir formulario para editar
    async FrmEdit(req, res) {
        const {IdBook} = req.params;
        const Libros = await pool.query(`select * from Books where IdBook =${IdBook}`);
        const Progress = await pool.query(`select * from Progress where FkIdBook = ${IdBook};`);
        //console.log(Progress);
        res.render('Books/edit',{Libro:Libros[0],Progress})
    }

    //Editar de BD
    async Edit(req, res) {
        const { IdBook } = req.params;
        const { Review, Qualification,Status} = req.body;
        const newbook ={
            Review,
            Qualification,
            Status 
    
        };
       //console.log(newbook);
        await pool.query('Update books set Review =?, Qualification = ?, Status = ?  where IdBook = ?',[newbook.Review,newbook.Qualification,newbook.Status,IdBook]);
        req.flash('success','Book Updated successfully')
        res.redirect('/MyBooks')
    }
    
    //Eliminar de BD
    async Delete(req,res){
        const {IdBook} = req.params;
        await pool.query('Delete from books where IdBook = ?',[IdBook]);
        req.flash('success','Book removed successfully')
        res.redirect('/Mybooks')
    }


  }
  
  module.exports = IndexController;