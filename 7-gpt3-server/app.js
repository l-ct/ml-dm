// https://beta.openai.com/playground/p/default-tweet-classifier


// load OpenAI
const { Configuration, OpenAIApi } = require('openai')

// load Express
const express = require('express')

// initialize express
const app = express()

// configure OpenAI
const configuration = new Configuration({
    ////////////////////////////
    // PLEASE,
    // replace with your own key
    apiKey: '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'
    ////////////////////////////
})

// initialize OpenAI
const openai = new OpenAIApi(configuration)

// homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// prompt route
app.get('/:prompt', async (req, res) => {

    // check to see what server is receiving
    console.log(req.params.prompt)

    const response = await openai.createCompletion({
        ////////////////////////////
        // Modify this section to guide user
        // towards a particular kind of response
        model: "text-davinci-002",
        // grabs text right from url
        prompt: req.params.prompt,
        // reduce number to keep responses short
        max_tokens: 100,
        // lowering temperature (0-1) reduces variability
        temperature: 1
        ////////////////////////////
    })

    // server will send plain text in response
    // if no response, server will crash
    res.send(response.data.choices[0].text)
})

// start server
// if trying to deploy to a host replace 3000 with
// process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`app listening at 3000...`)
})
