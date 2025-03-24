const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5500' }));

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.listen(PORT)

app.get('/api/quotes', (req, res, next)=>{

    if(Object.keys(req.query).length > 0 && Object.hasOwn(req.query,'person') === true){
        const quote = quotes.filter(element=> element.person === req.query.person)
        const data = {quotes: quote}
        res.json(data)
    } else{
        const data = {
            quotes
        }
        res.send(data)
    }

})

app.get('/api/quotes/random', (req, res, next) =>{
    const quote = getRandomElement(quotes)
    const randomQuote = {quote}
    randomQuote ? res.send(randomQuote) : res.status(404).send
})


app.post('/api/quotes', (req, res, next)=>{
    const query = req.query
    if(Object.hasOwn(query,'person') && Object.hasOwn(query,'quote')){
        const newQuote = {
            quote: query.quote,
            person: query.person,
        }
        quotes.push(newQuote)
        res.status(201).send(quotes)
    }
    res.status(404).send()

})