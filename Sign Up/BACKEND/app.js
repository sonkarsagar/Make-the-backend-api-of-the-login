const express=require('express')
const app=express()
const data=require('./models/data')
const sequelize=require('./util/database')
const bodyParser=require('body-parser')
const cors=require('cors')
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res,next)=>{
    data.findAll().then((result) => {
        res.json(result)
    }).catch((err) => {
        res.send('<h1>Page Not Found</h1>')
    });
})

app.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    data
      .findOne({ where: { email, password } })
      .then((user) => {
        if (user) {
          return res.status(200).json({ message: 'User login successful' });
        } else {
          return res.status(401).json({ error: 'Unauthorized' });
        }
      })
      .catch((err) => {
        return res.status(404).json({ error: 'User not found' });
      });
  });
  
  app.post('/data', (req, res, next) => {
    const { name, sur, email, password } = req.body;
    data
      .findOne({ where: { email } })
      .then((user) => {
        if (user) {
          return res.status(401).send('Error');
        } else {
          return data
            .create({ name, sur, email, password })
            .then((result) => {
              res.status(200).send(result);
            })
            .catch((err) => {
              res.status(200).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send('Internal Server Error');
      });
  });

sequelize
.sync()
// .sync({force: true})
.then((res) => {
    const hostname = '127.0.0.1';
    const port = 3000;
    app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})
.catch((err) => {
    console.log(err);
});

