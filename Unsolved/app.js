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
// Question array
const questions = [
    {
        type: "input",
        message: "What's the team-members name?",
        validate: async (input) => {
            if (!input) return 'Enter response please!'
            return true
        },
        name: "name"
    },
    {
        type: "checkbox",
        message: "Whats their role?",
        choices: ["Manager", "Engineer", "Intern"],
        validate: async (input) => {
            if (input.length < 1) return 'Enter response please!'
            return true
        },
        name: "role"
    },
    {
        type: "input",
        message: "What is their id?",
        validate: async (input) => {
            if (!input) return 'Enter response please!'
            return true
        },
        name: "id"
    },
    {
        type: "input",
        message: "What is their email? ",
        validate: async (input) => {
            if (!input) return 'Enter response please!'
            return true
        },
        name: "email"
    },
    {
        type: "input",
        message: "What is their gitHub link?",
        validate: async (input) => {
            if (!input) return 'Enter response please!'
            return true
        },
        when: (answers) => answers.role == "Engineer",
        name: "github"
    },
    {
        type: "input",
        message: "What school did they attend?",
        validate: async (input) => {
            if (!input) return 'Enter response please!'
            return true
        },
        when: (answers) => answers.role == "Intern",
        name: "school"
    },
    {
        type: "input",
        message: "What is their officenumber?",
        validate: async (input) => {
            if (!input) return 'Enter response please!'
            return true
        },
        when: (answers) => answers.role == "Manager",
        name: "officenumber"
    }
]
// Async function to convert response from user to a usable team member list that can be rendered to html
async function generateEmployeeList() {
    // prompts user for team capacity
    var { teamnum } = await inquirer.prompt({
        type: "input",
        message: "How many members in team?",
        validate: async (input) => {
            if (!input) return 'Enter response please!'
            return true
        },
        name: "teamnum"
    })
    const employeelist = [];
    for (var i = 0; i < parseInt(teamnum); i++) {
        console.log(`team member ${i + 1}`)
        var answers = await inquirer.prompt(questions)
        // Checks team members role and if so creates a new instance that will be stored in an array
        switch (answers.role[0]) {
            case "Engineer":
                var employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
                employeelist.push(employee)
                break;
            case "Manager":
                var employee = new Manager(answers.name, answers.id, answers.email, answers.officenumber);
                employeelist.push(employee)
                break;
            case "Intern":
                var employee = new Intern(answers.name, answers.id, answers.email, answers.school);
                employeelist.push(employee)
                break;
            default:
                console.log("Whoops");
        }
    }
    return employeelist
}
// Gets html content
async function getHtml() {
    const employeearray = await generateEmployeeList();
    const html = render(employeearray)
    console.log(html)
    return html
}
// Writes html content in team.html
async function postToteamHtml() {
    var html = await getHtml();
    fs.writeFile(outputPath, html, function (err) {
        if (err) throw err;
        console.log('it worked')
    })
}
postToteamHtml()

