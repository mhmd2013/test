const mongodb=require("mongoose");
const userSchema=new mongodb.Schema({ 


    NameDriver:{type:String},
    id:{type:String},
    vehicle:{type:String},
    phone:{type:String},
    visaCard:{type:String},
    userName:{type:String},
    password:{type:String},
    NameOfUser:{type:String},
    Address:{type:String},
    nickName:{type:String}



});

const customerSchema=({

    name:{type:String},
    family:{type:String},
    email:{type:String},
    phone:{type:String},
    address:{type:String}
});
const orderSchema=({
   id:{type:String},
   name:{type:String},
   date:{type:String},
   time:{type:String},
   phone:{type:String},
   address:{type:String},
   comment:{type:String}
})
const barbershopSchema=({
  time:{type:String},
  offset:{type:Int16Array}
});
const pakingSchema=({
    Name:{type:String},
    Id:{type:String},
    Vehicle:{type:String},
    Phone:{type:String},
    Paking:{type:String},
    DatePaking:{type:Date},
    TimePaking:{type:String},
    LocationPointLatuide:{type:String},
    LocationPointLongLatuide:{type:String}


});

const userAvaribleSchema={
     user:{type:String},
     phone:{type:String},
     time:{type:String},
     date:{type:Date},
     usercheckin:{type:Boolean},
     selected:{type:Boolean},
     id:{type:String},
     phoneAdmin:{type:String},
     nameAdmin:{type:String},
     iscancel:{type:Boolean}


};

const catgoriaSchema={
    Name:{type:String},
    Caption:{type:String},
    Image:{type:String},
    Catgira:{type:String}
}

//var USERS=mongodb.model("USERS",userSchema);
module.exports={
    mongodb,
    userSchema,
    pakingSchema,
    orderSchema,
    barbershopSchema,
    customerSchema,
    userAvaribleSchema,
    catgoriaSchema
    
        };

    