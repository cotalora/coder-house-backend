const accountSid = 'AC6eebfecde031f32592a6a0ae94a8ded7'; 
const authToken = '[Redacted]'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Your appointment is coming up on July 21 at 3PM', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+573012637098' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();