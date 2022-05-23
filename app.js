const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");
const { send } = require("express/lib/response");
const router = express.Router()
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃  </h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body.titre;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(email,titre) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
         user: 'Gestion.chantier.pmc@gmail.com',
         pass: 'azerty987654AA'
       },
      tls:{
           rejectUnauthorized:false,
      }
   });
var email=email;
var titre=titre;
  var mailOptions = {
    from: 'trikiracem0@gmail.com',
    to: email, 
    subject: "Gestion chantier 🏭", // Subject line
    html: titre
  };
  let info = await transporter.sendMail(mailOptions);
  callback(info);
}

app.post('/test',async (req, res) =>  {
  try {
    var email = req.body.email; 
    var titre = req.body.titre;
   var sent=sendMail(email,titre)
   if(sent!='0'){
 send("ok")
   }
  } catch (error) {
    send("aaaa")
  }  
});

module.exports=router;
