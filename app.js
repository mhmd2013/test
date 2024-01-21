// this is a javascript file
const express = require("express");
const cors=require("cors");
const mongodb=require("mongoose");
// const  RNFS=require("react-native-fs");
const database = require("./dd");
const databaseName='/Hairdresser2';
const multer=require("multer");
const storage=multer.memoryStorage();
const update=multer({storage:storage});
const fs=require("fs");
const { request } = require("http");
const fspromise=require("fs").promises;

// const { json } = require("express");

//mongodb
//mnazrth
//jX7krpmbpVa3I3GN
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
require("dotenv").config();


//const path=RNFS.DocumentDirectoryPath+"/user.txt";
/*
if(RNFS.exists(path)==false){
  RNFS.writeFile(path,"no-user");
  
}
*/

// connect mongodb with mongoose
database.mongodb
 .connect(`${process.env.MONGODB_URI}`)
 .then((ex) => {
  //console.log(ex);
   console.log("Connected to MongoDB");
 })
 .catch((err) => console.log("error:"+err));

 //local connect to mongodb
 /*
 
 database.mongodb
 .connect(`${process.env.MONGODB_URI}`, {//${databaseName}
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
 .then((ex) => {
  //console.log(ex);
   console.log("Connected to MongoDB");
 })
 .catch((err) => console.log(err));
 
 */
 
 
 app.post("/loginM",function(req,res){
  console.log("pk")

  res.json({connected:true})
 })
 app.post("/login",function(req,res){
     //var userBody=req.body;
     console.log(req.body)

   var userName=req.body.userName;
    var password=req.body.password;
    // console.log(userName);
    console.log("Nodejs Connected!!");
  // return  res.json(req.body);



  var user;
  
  //  console.log("errr:"+database.mongodb.model("paking"));
  if(database.mongodb.models.users){
    // console.log("done")
    user=database.mongodb.model("users")//database.mongodb.pakingSchema;
   }
   else{
     user=database.mongodb.model("users",database.userSchema);
   }

   //var user=database.mongodb.model("users",database.userSchema);
   
   if(user){
     console.log("Model is created!!");
   
var f=function(res){

 user.find({'userName':userName,'password':password}).then((rows)=>{
 
   console.log(rows.length)
   if(rows && rows.length==1){
     const row=rows[0];
   

     res(
       {'connected':true,
       
       'user':row
     } 
      );
   }
   else{
     res({
       'connected':false,
       'user':{}

     });
   }
  // res(rows.length>0?true:false);

 });
}

f(function(call){

 console.log(call);
 return res.json(call);//{'connected':call}
})
}
 
//  return res.json({connected:true});
 
 });

app.get("/",async function(req,res){

  console.log("server is running!!");
//  var user=database.mongodb.model("users",database.userSchema);

//  try{
   
//     var d=new user({
//         NameDriver:'test',
//         id:'1234',
//         vehicle:'private',
//         phone:'0509444164',
//         visaCard:'1234567890',
//         userName:'mm',
//         password:'1234'

//     });
//    // user.find
//     await d.save();
//     res.status(200).json({

//         'message':'ok',
//         d
//     });
//     //console.log(d);
// }
// catch(err){
//     console.log("error:\n")
//     console.log(err);
//     res.status(500).json(err);
//}
});


app.post("/register",async function(req,res){

 // var user=database.mongodb.model("users",database.userSchema);

  // var img=require('../imageusers/pic-1.jpg')
  var user;
  
  //  console.log("errr:"+database.mongodb.model("paking"));
    if(database.mongodb.models.users){
     // console.log("done")
     user=database.mongodb.model("users")//database.mongodb.pakingSchema;
    }
    else{
      user=database.mongodb.model("users",database.userSchema);
    }
  var name=req.body.NameDriver;
  var clientid=req.body.id;    
  var vehiclelicense=req.body.vehicle;
  var phone=req.body.phone;
  var visaCard=req.body.visaCard;
  var username=req.body.userName;
  var password=req.body.password;

  var f=(r)=>{
    user.find({$or:[{'userName':username},{'phone':phone}]}).then((data)=>{
          
      r(data.length>0?true:false);
    });
    
  };

  f(async function(d){

    if(d){

      return res.json({'message':'user exists'});
    }
    else{
      var d=new user({

        NameDriver:name,
        id:clientid,
        vehicle:vehiclelicense,
        phone:phone,
        visaCard:visaCard,
        userName:username,
        password:password

    });

    await d.save();

    return res.json({'message':'A new user is saved'});

    }
  });
  
  
 });
 app.post("/getDataBaraber",(req,res)=>{
  var date=req.body.date;
  var phoneAdmin=req.body.phone;
  var __user;

    if(database.mongodb.models.usersAvirable){
 
      __user=database.mongodb.model("usersAvirable");
    }
    else{
      __user=database.mongodb.model("usersAvirable",database.userAvaribleSchema);
    }

    __user.find({$and:[{
              date:date.trim(),
              phoneAdmin:phoneAdmin.trim()

    }]}).then((data,err)=>{
    
      try{
      if(err){
        throw err;
      }

      //console.log("len:"+data.length);
      return res.json({data:data,exception:false,message:''});
    }
    catch(ex){

      return res.json({data:null,exception:true,message:ex});
    }

    });
    

 });


 app.post("/getDataBaraberById",(req,res)=>{
  var date=req.body.date;
  var phone=req.body.phone;
 // console.log(`phone:${phone}`)
  var __user;

    if(database.mongodb.models.usersAvirable){
 
      __user=database.mongodb.model("usersAvirable");
    }
    else{
      __user=database.mongodb.model("usersAvirable",database.userAvaribleSchema);
    }

    __user.find({$and:[{
              date:date,
              phone:phone

    }]}).then((data,err)=>{
    
      try{
      if(err){
        throw err;
      }

      //console.log("len:"+data.length);
      return res.json({ok:data && data.length>0?true:false,data:data,exception:false,message:''});
    }
    catch(ex){

      return res.json({ok:false,exception:true,message:ex});
    }

    });
    

 });

 app.post("/saveDataBaraber",async (req,res)=>{
  /*     user:{type:String},
     phone:{type:String},
     time:{type:String},
     date:{type:Date},
     usercheckin:{type:String},
     id:{type:String},
     phoneAdmin:{type:String} */
    var user=req.body.user;
    var phone=req.body.phone;
    var time=req.body.time;
    var date=req.body.date;
    var  nameadmin=req.body.nameadmin;
    //var usercheckin=req.body.usercheckin;
    var phoneAdmin=req.body.phoneAdmin;
    var __user;

    if(database.mongodb.models.usersAvirable){
 
      __user=database.mongodb.model("usersAvirable");
    }
    else{
      __user=database.mongodb.model("usersAvirable",database.userAvaribleSchema);
    }

    /*
         user:{type:String},
     phone:{type:String},
     time:{type:String},
     date:{type:Date},
     usercheckin:{type:String},
     id:{type:String},
     phoneAdmin:{type:String}
    */

    var store=new __user({

        user:user.trim(),
        phone:phone.trim(),
        time:time.trim(),
        date:date.trim(),
        usercheckin:false,
        phoneAdmin:phoneAdmin.trim(),
        nameAdmin:nameadmin.trim(),
        iscancel:false


    });


    try{

      await store.save();
  
      return res.json({data:null,exception:false,message:''})
      
     }
     catch(ex){
  
      return res.json({data:null,exception:true,message:ex});
     }
  

 })


 app.post("/___saveDataBaraber",async (req,res)=>{
 
  console.log("ook");
  return res.json({e:true});

 })
 app.post("/getDataByUser",(req,res)=>{

  var userRequest=req.body.userRequest;
  var date=req.body.userDate;
 // console.log(date);
 // console.log("user:"+userRequest);
  var user;
  if(database.mongodb.models.usersAvirable){
    
    user=database.mongodb.model("usersAvirable");

  }
  else{

    user=database.mongodb.model("usersAvirable",database.userAvaribleSchema);
  }

  user.find({$and:[{'phoneAdmin':userRequest},{'date':date},{'usercheckin':false},{'iscancel':false}]}).then((data,err)=>{
         if(err)
          throw err;
     
         // console.log(data.length);
          return res.json({data:data.length==0?[]:data,message:'done'});

         

        
  });
 })
 
 app.post("/updateuser",function(req,res){
  var username=req.body.user;
  var phone=req.body.phone;
  var address=req.body.address;
  var nickName=req.body.nickname;

  var usernameOrginal=req.body.userOrginal;
  var phoneOrginal=req.body.phoneOrginal;
  var addressOrginal=req.body.addressOrginal;
  var nickNameOrginal=req.body.nicknameOrginal;

  console.log("username:"+username);
  console.log("phone:"+phone);
  console.log("nickname"+nickName);
  console.log("address"+address);


  //return res.json({data:null,message:'done'})
  
    var user;
   if(database.mongodb.models.users)
      user=database.mongodb.model("users");
    else
    user=database.mongodb.model("users",database.userSchema);
  if(user){

    //console.log("ok")
  
    
  user.updateMany({$and:[{'NameDriver':usernameOrginal},{'phone':phoneOrginal}]},//{'NameDriver':username},//{$and:[{'NameDriver':username},{'phone':phone}]}
  {
  $set:
      {
       
      'phone':phone,
      'visaCard':nickName}
  
  }
  

  ).then((data,err)=>{
    if(err)throw err;

    console.log(data);

    return res.json({data:null,message:'done'});
  });
  }
  else{
    return res.json({data:null,message:'error'});
  }
  
  
 })
 
 app.post("/updateuserAvirable",function(req,res){
  var admin=req.body.admin;
  var checkin=req.body.checkin;
  var iscancel=req.body.iscancel;
  var date=req.body.date;
  var time=req.body.time;


  console.log("start")

  //return res.json({data:null,message:'done'})
  
    var user;
   if(database.mongodb.models.usersAvirable)
      user=database.mongodb.model("usersAvirable");
    else
    user=database.mongodb.model("usersAvirable",database.userAvaribleSchema);
  if(user){

    //console.log("ok")
  
    
  user.updateMany({$and:[{'date':date},{'time':time},{'phoneAdmin':admin}]},//{'NameDriver':username},//{$and:[{'NameDriver':username},{'phone':phone}]}
  {
  $set:
      {
      
      'usercheckin':checkin,
      'iscancel':iscancel}
  
  }
  

  ).then((data,err)=>{
    if(err)throw err;

    console.log(data);

    return res.json({data:null,message:'done',d:true});
  });
  }
  else{
    return res.json({data:null,message:'error',d:false});
  }
  
  
 })

 app.post("/deleteuser",async function(req,res){

  // var user=database.mongodb.model("users",database.userSchema);
 
   
   var user;
   
   //  console.log("errr:"+database.mongodb.model("paking"));
     if(database.mongodb.models.users){
      // console.log("done")
      user=database.mongodb.model("users")//database.mongodb.pakingSchema;
     }
     else{
       user=database.mongodb.model("users",database.userSchema);
     }
   var name=req.body.NameDriver;

   var phone=req.body.phone;
  
   var f=(r)=>{
    user.deleteOne({$and:[{'NameDriver':name},{'phone':phone}]}).then((data)=>{
      
      return res.json({message:'done'});
    //   r(data.length>0?true:false);
     });
     
   };
    f(false)

   //return res.json({message:'done'})
  
   
  });

 app.post("/registercustomer",async function(req,res){

  // var user=database.mongodb.model("users",database.userSchema);
 
  var name=req.body.name;
  var family=req.body.family;    
  var email=req.body.email;
  var phone=req.body.phone;
  var address=req.body.address;
  // console.log("name:"+name);
  // console.log("family:"+family);
  // console.log("email:"+email);
  // console.log("phone:"+phone);
  // console.log("address:"+address);

  var user;
   
  //  console.log("errr:"+database.mongodb.model("paking"));
    if(database.mongodb.models.customer){
     // console.log("done")
     user=database.mongodb.model("customer")//database.mongodb.pakingSchema;
    }
    else{
      user=database.mongodb.model("customer",database.customerSchema);
    }
 
 

  var f=(r)=>{
    user.find({$or:[{'phone':phone},{"email":email}]}).then((data)=>{
          
      console.log(data);
      r(data.length>0?true:false);
    });
    
  };

  f(async function(d){

    if(d){

      return res.json({'message':'exsits'});
    }
    else{
      var d=new user({

        name:name,
        family:family,
        email:email,
        phone:phone,
        address:address

    });

    await d.save();

    return res.json({'message':'new'});

    }
  });
  /*
    
   
  */
   

   
  });
 app.post("/order",async function(req,res){

  // var user=database.mongodb.model("users",database.userSchema);
 
   
   var user;
   
   //  console.log("errr:"+database.mongodb.model("paking"));
     if(database.mongodb.models.users){
      // console.log("done")
      user=database.mongodb.model("order")//database.mongodb.pakingSchema;
     }
     else{
       user=database.mongodb.model("order",database.orderSchema);
     }
   var id=req.body.id;
   var name=req.body.name;    
   var date=req.body.date;
   var time=req.body.time;
   var phone=req.body.phone;
   var address=req.body.address;
   var comment=req.body.comment;
 
   var f=(r)=>{
     user.find({'date':date}).then((data)=>{
           
       r(data.length>=15?true:false);
     });
     
   };
 
   f(async function(d){
 
     if(d){
 
       return res.json({'message':'full'});
     }
     else{
       var d=new user({
 
        id:id,
       name:name,   
         date:date,
         time:time,
         phone:phone,
         address:address,
         comment:comment
 
     });
 
     await d.save();
 
     return res.json({'message':'done'});
 
     }
   });
   
   
  });

  app.post("/users",async function(req,res){

    // var user=database.mongodb.model("users",database.userSchema);
   
  console.log("ok");
     

  var user;
     
  //  console.log("errr:"+database.mongodb.model("paking"));
    if(database.mongodb.models.users){
     // console.log("done")
     user=database.mongodb.model("users")//database.mongodb.pakingSchema;
    }
    else{
      user=database.mongodb.model("users",database.userSchema);
    }
  
  user.find({}).then(d=>{

    console.log(d);
   return res.json({'data':d});
  });
     
    });
app.post("/paking",async function(req,res){

  //var paking=database.mongodb.model("paking",database.pakingSchema);

  var paking;
  
  //  console.log("errr:"+database.mongodb.model("paking"));
    if(database.mongodb.models.paking){
     // console.log("done")
      paking=database.mongodb.model("paking")//database.mongodb.pakingSchema;
    }
    else{
      paking=database.mongodb.model("paking",database.pakingSchema);
    }

  var name=req.body.name;
  var id=req.body.id;    
  var vehicle=req.body.vehicle;
  var phone=req.body.phone;
  var pakingnumber=req.body.paking;
  var date= req.body.date;
  var time=new Date().toLocaleTimeString();
  var latuide=req.body.latuide;
  var longlatuide=req.body.longlatuide;
  // console.log(date+"\n"+time);
 
  console.log("Name:"+name+"\n");
  console.log("id:"+id+"\n");
  console.log("vehicle:"+vehicle+"\n");
  console.log("phone:"+phone+"\n");
  console.log("pakingnumber:"+pakingnumber+"\n");
  console.log("date:"+date+"\n");
  console.log("time:"+time+"\n");
  console.log("latuide:"+latuide+"\n");
  console.log("longlatuide:"+longlatuide+"\n");
  var f=(r)=>{
    paking.find({$and:[{'Id':id},{'Paking':pakingnumber},{'DatePaking':date}]}).then((data)=>{
          
      r(data.length>0?true:false);
    });
    
  };

  f(async function(d){

    if(d){

      return res.json({'done':false, 'message':'there is a reserved place'});
    }
    else{
      var d=new paking({

        Name:name,
        Id:id,
        Vehicle:vehicle,
        Phone:phone,
        Paking:pakingnumber,
        DatePaking:date,
        TimePaking:time,
        LocationPointLatuide:latuide,
        LocationPointLongLatuide:longlatuide

    });

    await d.save();

    return res.json({'done':true, 'message':'a parking space is reserved'});

    }
  });
  
  
 });

 app.post("/getPacking",async function(req,res){
 
  var paking;
  
//  console.log("errr:"+database.mongodb.model("paking"));
  if(database.mongodb.models.paking){
   // console.log("done")
    paking=database.mongodb.model("paking")//database.mongodb.pakingSchema;
  }
  else{
    paking=database.mongodb.model("paking",database.pakingSchema);
  }
  //=mongodb.models.pakingSchema||database.mongodb.model("paking",database.pakingSchema);
  //var name=req.body.name;
  var id=req.body.id;    
  //var vehicle=req.body.vehicle;
 // var phone=req.body.phone;
 // var pakingnumber=req.body.paking;
  var date= new Date().toISOString().slice(0,10);
  //var time=new Date().toLocaleTimeString();
 // var latuide=req.body.latuide;
 // var longlatuide=req.body.longlatuide;
  // console.log(date+"\n"+time);
 
  // console.log("Name:"+name+"\n");
  // console.log("id:"+id+"\n");
  // console.log("vehicle:"+vehicle+"\n");
  // console.log("phone:"+phone+"\n");
  // console.log("pakingnumber:"+pakingnumber+"\n");
  // console.log("date:"+date+"\n");
  // console.log("time:"+time+"\n");
  // console.log("latuide:"+latuide+"\n");
  // console.log("longlatuide:"+longlatuide+"\n");
 try{

  var f=(r)=>{
    paking.find({$and:[{'Id':id},{'DatePaking':date}]}).then((data)=>{
          
      r(data.length>0?true:false,data)
    });
    
  };

  f(async function(b,d){

    if(b){

     // console.log(d[0].LocationPointLatuide);
      return res.json({'done':true, 'message':'successfully','data':d[0]});
    }

    return res.json({'done':false,'message':'no data'});
    // else{
    //   var d=new paking({

    //     Name:name,
    //     Id:id,
    //     Vehicle:vehicle,
    //     Phone:phone,
    //     Paking:pakingnumber,
    //     DatePaking:date,
    //     TimePaking:time,
    //     LocationPointLatuide:latuide,
    //     LocationPointLongLatuide:longlatuide

    // });

    // await d.save();

    // return res.json({'done':true, 'message':'a parking space is reserved'});

    // }
  });
  
 }
 catch(err){

  console.log("error");
 }
  
 });
 
// listen on port 3000
const _port=process.env.PORT||3000;
app.listen(_port, () => {
 console.log("Server is listening on port 3000");
});