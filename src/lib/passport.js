const passport = require('passport');
const Localstrategy = require('passport-local').Strategy

const pool = require("../database")
const helpers = require("../lib/Helpers")

//Login y autenticacion
passport.use('local.signin',new Localstrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username,password,done)=>{
    
    const rows = await pool.query('Select * from users where username = ?',[username])
    if(rows.length>0){
        const user = rows[0];
         const validPassword = await helpers.matchPassword(password,user.password)
         if(validPassword){
             done(null,user,req.flash('success','Welcome '+user.UserName));
         }
         else{
             done(null, false, req.flash('message','Incorrect Password'));
         }
    }
    else{
       return done(null,false,req.flash('message','The username does not exist')) 
    }
}
));



//Registro y cifrado
passport.use('local.Register', new Localstrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,password,done)=>{
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    //console.log(newUser);
    newUser.password = await helpers.encryptPassword(password);
    const resul = await pool.query('Insert into users set ?',[newUser])
    newUser.IdUser = resul.insertId;
    //console.log(newUser.idUser);
    return done(null, newUser);
}));

passport.serializeUser((user,done)=>{
    //console.log(user.IdUser);
    done(null,user.IdUser);
});

passport.deserializeUser(async(IdUser,done)=>{
    const rows= await pool.query('Select * from users where idUser=?',[IdUser])
    //console.log(rows[0]);
    done(null,rows[0]);
})