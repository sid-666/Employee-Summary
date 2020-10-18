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
const Questions = [
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
    const Employeelist = [];
    for (var i = 0; i < parseInt(teamnum); i++) {
        var answers = await inquirer.prompt(Questions)
        // window[`teammember${i + 1}`]
        console.log(answers)
        // Checks team members role and if so creates a new instance that will be stored in an array
        switch (answers.role[0]) {
            case "Engineer":
                var man1 = new Engineer(answers.name, answers.id, answers.email, answers.github);
                Employeelist.push(man1)
                break;
            case "Manager":
                var man1 = new Manager(answers.name, answers.id, answers.email, answers.officenumber);
                Employeelist.push(man1)
                break;
            case "Intern":
                var man1 = new Intern(answers.name, answers.id, answers.email, answers.school);
                Employeelist.push(man1)
                break;
            default:
                console.log("Whoops");
        }
        // console.log(Employeelist)
    }
    console.log(Employeelist)
    return Employeelist
}
// Gets html content
async function getHtml() {
    const Employeearray = await generateEmployeeList();
    const html = render(Employeearray)
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

