const {format} = require('timeago.js')


const helpers = {};

helpers.timeago = (timestamp) =>{
    return format(timestamp);
};

helpers.xif = (q, valor,options)=>{
    if(q === valor)
    return options.fn(this);
}

helpers.zif = (q, valor,options)=>{
    if(q === valor)
    return options.fn(this);
}

helpers.sif = (q,valor,options)=>{
    if(q.length == valor){
        console.log(q)
        return options.fn(this);
    }
}

helpers.aif = (q,valor,options)=>{
    if(q.length > valor){
        console.log(q)
        return options.fn(this);
    }
}
    
module.exports = helpers;