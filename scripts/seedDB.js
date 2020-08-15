const Runner = require("run-my-sql-file");
 
Runner.connectionOptions({
   host:"localhost",
   user:"root",
   password:"N5D$T*8CmnhK"
});

const seedDB = "./db/seeds.sql";
 
Runner.runFile(seedDB, (err)=>{
   if(err){
      console.log(err);
   } else {
      console.log("Database successfully seeded!");
   }
});

