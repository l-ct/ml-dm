// load OpenAI
const OpenAI = require('openai')

// load Express
const express = require('express')

// initialize express
const app = express()


// ----------------
// configure OpenAI
const openai = new OpenAI({
    ////////////////////////////
    ////////////////////////////
    // replace with your own key
    apiKey: 'place-your-API-key-here'
    ////////////////////////////
    ////////////////////////////
})


// --------
// homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


// ------------
// prompt route
app.get('/:prompt', async (req, res) => {

    // get prompt from URL
    const { prompt } = req.params

    // check prompt has been sent correctly
    console.log(prompt)

    // using the newer chat completion method
    const completion = await openai.chat.completions.create({

        ////////////////////////////
        ////////////////////////////
        // Modify this section
        // different models are available
        model: 'gpt-3.5-turbo',
        // messages is an array of objects
        messages: [
            // these can be chained into a chat,
            // but for now we're just looking at one off prompts
            {
                role: 'system',
                // you can modify the feel of the app by
                // modifying the system role's content
                content: 'You are a surly teenager.'
            },
            {
                role: 'user',
                // place prompt as user content
                content: prompt
            }
        ],
        // increase number to lengthen responses
        max_tokens: 30
        ////////////////////////////
        ////////////////////////////

    })

    // server will send plain text in response
    // if no response, server will crash
    res.send(completion.choices[0].message.content)
})


// ------------
// start server
// if deploying to a host replace 3000 with:
// process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`app listening at 3000...`)
})
