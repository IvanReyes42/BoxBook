
const passport = require('passport')


class IndexController {
    //Formulario para Registrar Usuarios 
    async Register(req, res) {
        res.render('auth/Register');
    }

    //Agregar Usuarios
    AddRegister(req, res,next) {
        passport.authenticate('local.Register',{
            successRedirect: '/Welcome',
            failuredRedirect: '/Register',
            failureFlash:true
        })(req,res,next);
    }

    //Formulario Login
    ViewLogin(req, res) {
        res.render('auth/Login')
    }

    //Evento de logearse
    Login(req, res,next) {
        passport.authenticate('local.signin',{
            successRedirect:'/Welcome',
            failureRedirect:'/Login',
            failureFlash: true
        })(req,res,next);
    }

    //Abrir vista perfil
    

    Welcome(req, res) {
        res.render('Index/Welcome')
    }
    //Terminar Seccion 
    LogOut(req,res){
        req.logOut();
        res.redirect('/Login')
    }


  }
  
  module.exports = IndexController;