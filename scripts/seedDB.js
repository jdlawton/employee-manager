//script file that is run when "npm run-script seed" is invoked from the CLI. It runs the ./db/seeds.sql file to reset the database.
//I added this to make it easier to reset/reseed my databases from the bash command line

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

