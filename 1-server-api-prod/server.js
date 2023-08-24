const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
   res.status(404).send('Available endpoints are /range and /intro');
   return;
});


app.get('/intro', (req, res) => {
   res.status(200).send('Yeah. You see, we’re putting the cover sheets on all TPS reports now before they go out. Did you see the memo about this?');
   return;
});

app.get('/debug/:param', (req, res) => {
   res.status(200).send(`you sent ${req.params.param}\n`);
   return;
});

app.get('/range',  (req, res) => {
   res.status(400).send('ERROR - /range is submitted as /range/start/[int]/end/[int]\n');
   return;
});


app.get('/range/start/:start/end/:end', (req, res) => {
    try {
//        res.write(`Start was ${req.params.start} and end was ${req.params.end}\n`);

        let start = eval(req.params.start);
        let end = eval(req.params.end);

        // Make sure both start and end are numbers
        if (typeof start !== 'number' || typeof end !== 'number') {
            res.status(400).send(`Both start (submitted: ${start}) and end (submitted: ${end}) must be numbers.\n`);
            return;
        }

        // Check if start is greater than end
        if (start >= end) {
            res.status(400).send('Start should be less than end.\n');
            return;
        }

        // Generate range
        let result = [];
        for (let i = start + 1; i < end; i++) {
            result.push(i);
        }

        res.json(result);
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


