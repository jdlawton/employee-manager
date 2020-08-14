const Runner = require("run-my-sql-file");
 
Runner.connectionOptions({
   host:"localhost",
   user:"root",
   password:"N5D$T*8CmnhK"
});
 
const file1_path = __dirname + "/scripts/script1.sql";
 
const file2_path = "../script2.sql";
 
const file3_path = "./db/schema.sql";
const file4_path = "./db/seeds.sql";
 
Runner.runFile(file3_path, (err)=>{
   if(err){
      console.log(err);
   } else {
      console.log("Schema successfully reset!");
   }
});

