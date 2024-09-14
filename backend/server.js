import { stringify } from 'querystring'

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const SECRET = '00910234'
const fs = require('fs')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


app.post('/base/registration', (req, res) => {
  let userData = req.body;
  const token = jwt.sign(userData, SECRET)
	userData.token = token
  
  fs.readFile('accounts.json', (err, data) => {
    let arrayAccounts = JSON.parse(data || '[]')
    userData.id = arrayAccounts.length;
    userData.completedLevels = [];
    arrayAccounts.push(userData);
    
    fs.writeFile('accounts.json', JSON.stringify(arrayAccounts, null, 2), writeErr => {
      res.send({userData})
    });
  });
});

app.post('/base/login', (req, res) => {
  let dataUser = req.body;

  fs.readFile('accounts.json', (err, data) => {
    let parseData = JSON.parse(data);
    const correctUser = parseData.find(e => e.email === dataUser.email);
    if (correctUser) {
			if (correctUser.password != dataUser.password) {
				return res.send({ errorText: 'Пароль неверный!' })
			} else if (correctUser.name != dataUser.text) {
				return res.send({ errorText: 'Не правильный ник!' })
			} else {
				return res.send({ ok: 'Успешно!', ...correctUser })
			}
    } else {
      return res.send({ errorText: 'Неверная почта!' })

    }
  }) 
});

app.post('/base/add-level', (req, res) => {
  const bodyData = req.body;

  fs.readFile('levels.json', (err, data) => {
    let parseData = JSON.parse(data);
    
    bodyData.id = parseData.length;

    parseData.push(bodyData)

    fs.writeFile('levels.json', JSON.stringify(parseData, null, 2), (writeErr) => {});
  })
})
app.get('/base/getUsers', (req, res) => {
  fs.readFile('accounts.json', (err, data) => {
    let parseData = JSON.parse(data || '[]');

    res.send(parseData)
  })
});

app.get('/base/levels', (req, res) => {
	fs.readFile('levels.json', (err, data) => {
		let levelsData = JSON.parse(data || '[]')
		res.send(levelsData)
	})
})

app.get('/base/levels/:idLevel', (req, res) => {
	let idLevel = req.params.idLevel
  console.log(req.params)
  
	fs.readFile('levels.json', (err, data) => {
		let levelsData = JSON.parse(data || '[]')
		let level = levelsData.find(item => item.id === +idLevel)

		res.send(level)
	})
})

app.post('/base/points', (req, res) => {
  const bodyData = req.body;

  fs.readFile('accounts.json', (err, data) => {
		let parseData = JSON.parse(data || '[]');
    let currentAccount = parseData.find(item => item.token === bodyData.token);
    let countPoint = 0;
    let levelCompleted = parseData[currentAccount.id].completedLevels.find(item => item.idLevel === bodyData.id)

    if (levelCompleted) {
			return res.send({ error: 'Аккаунт уже выполнил это задание!' })
		}
    
    currentAccount.completedLevels.push({idLevel: bodyData.id, point: bodyData.points});
    
    currentAccount.completedLevels.forEach(e => {
      countPoint += e.point; 
    });

		fs.writeFile('accounts.json', JSON.stringify(parseData, null, 2), writeErr => {
        res.send({pointsCount: countPoint});
			}
		)
	})
})

app.get('/base/get-current-user', (req, res) => {
	const token = req.query.token

	fs.readFile('accounts.json', (err, data) => {
		const accounts = JSON.parse(data || '[]')
		const user = accounts.find(account => account.token === token)
    console.log(token)
    
		res.json({ user })
	})
})

app.post('/base/check-form', (req, res) => {
  const currentUser = req.body;
  console.log(currentUser);
  
  fs.readFile('accounts.json', (err, data) => {
    let parseData = JSON.parse(data || '[]');
    const checkUser = parseData.some(i => i.name == currentUser.name);
    const checkEmail = parseData.some(i => i.email == currentUser.email);

    if(checkUser) {
      return res.send({ textError: "Такой ник уже занят!" })
    } else if(checkEmail) {
      return res.send({ textError: "Такая почта уже занята!" })
    } else if (currentUser.password.length < 4) {
      return res.send({ textError: "Минимальная длинна пароля 4 символа!" })
    };
    
    res.send({ ok: "OK" })
  });
})

app.listen(3001, () => {
	console.log('Server run')
})
