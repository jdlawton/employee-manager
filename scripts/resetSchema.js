//script file that is run when "npm run-script reset" is invoked from the CLI. It runs the ./db/schema.sql file to reset the database.
//I added this to make it easier to reset/reseed my databases from the bash command line

const Runner = require("run-my-sql-file");
 
Runner.connectionOptions({
   host:"localhost",
   user:"root",
   password:"N5D$T*8CmnhK"
});
 
const resetSchema = "./db/schema.sql";
 
Runner.runFile(resetSchema, (err)=>{
   if(err){
      console.log(err);
   } else {
      console.log("Schema successfully reset!");
   }
});

