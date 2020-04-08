const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

function checkProjectsExists(req, res, next) {
    const { id }  = req.params;
    const project = projects.find(p => p.id == id);

    if(!project)
    {
        return res.status(400).json({ error: 'Project does not exists' })
    }
        
    return next();
}


server.get('/projects', (req, res) => {
    res.json(projects);
});


server.post('/projects', (req, res) => {
    const { id } = req.body;
    const { title } = req.body;

    projects.push({id:`${id}`, title:`${title}`, tasks:[]})

    res.json(projects);
});


server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.map((element, index) => {
        if(element.id == id)
        {
            projects[index].title = title;
        }
    });

    res.json(projects);
});

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    projects.map((element, index) => {
        if(projects[index].id === id ){
            projects.splice(index,1);
        }
    });

    return res.json(projects);
});

server.post('/projects/:id/tasks', checkProjectsExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects.map((element, index) => {
        if(projects[index].id === id)
        {
            projects[index].tasks.push(title);
        }
    });

    return res.json(projects);
})

server.listen(3001);