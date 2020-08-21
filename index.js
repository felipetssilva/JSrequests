const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'Javascript' },
    { id: 2, name: 'React' },
    { id: 3, name: 'NodeJs' }
];

app.get('/', (req, res) => {
    res.send("Hello world");

});

app.get('/api/listOfCourses', (req, res) => {
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course doesnt exist');


    const { error } = validateRequest(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);

    }
    course.name = req.body.name;
    res.send(course);
});


app.get('/api/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("this course was not found");
    res.send(course);
});
app.post('/api/courses', (req, res) => {

    const { error } = validateRequest(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);

    }
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.send(newCourse);
});

app.delete('/app/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateRequest(course) {
    const schema = {
        name: Joi.string().min(4).required()
    }
    return result = Joi.validate(course, schema);
}

const port = process.env.Port || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
