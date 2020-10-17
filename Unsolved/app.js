const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const Questions = [
    {
        type: "input",
        message: "What's the team-members name?",
        name: "name"
    },
    {
        type: "checkbox",
        message: "Whats their role?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    },
    {
        type: "input",
        message: "What is their id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is their email? ",
        name: "email"
    },
    {
        type: "input",
        message: "What is their gitHub link?",
        when: (answers) => answers.role == "Engineer",
        name: "github"
    },
    {
        type: "input",
        message: "What school did they attend?",
        when: (answers) => answers.role == "Intern",
        name: "school"
    },
    {
        type: "input",
        message: "What is their officenumber?",
        when: (answers) => answers.role == "Manager",
        name: "officenumber"
    }
]
const generateEmployeeList = () => {
    inquirer.prompt({
        type: "input",
        message: "How many memebers in team?",
        type: "teamnum"
    }).then(answer => {
        for (var i = 0; i < parseInt(answer) + 1; i++) {
            inquirer.prompt(Questions)
                .then(answers => {
                    const Employeelist = [];
                    switch (answers) {
                        case answers.role == "Engineer":
                            window[`teammember${i + 1}`] = new Engineer(answers.name, answers.id, answers.email, answers.github);
                            Employeelist.push(window[`teammember${i + 1}`])
                            break;
                        case answers.role == "Manager":
                            window[`teammember${i + 1}`] = new Manager(answers.name, answers.id, answers.email, answers.officenumber);
                            Employeelist.push(window[`teammember${i + 1}`])
                            break;
                        case answers.role == "Intern":
                            window[`teammember${i + 1}`] = new Intern(answers.name, answers.is, answers.email, answers.school);
                            Employeelist.push(window[`teammember${i + 1}`])
                            break;
                    }
                    return Employeelist
                })
        }
    })
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
