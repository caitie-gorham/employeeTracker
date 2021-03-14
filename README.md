# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents 

* [Overview](#Overview)
* [Access](#Access)
* [Details](#Details)
* [Questions](#Questions)


# Overview

This CLI application allows the user to select from an options list and then accomplish the task they select. The application is to track employees in a database of three tables that are connected through id primary and foreign keys. 
 
![Alt Text](./assets/EmployeeTracker.gif)

# Access

To use this application, clone the repo, run npm intall, and then run node index.js. This will allow you to fill in the prompts and populate new entries/edit entries in your database. 

You can find the GitHub repo here: https://github.com/caitie-gorham/employeeTracker

# Details

This CLI application allows the user to pick from a list of choices upon starting the application that are related to keeping a database of employee information. The database has three tables - employees, roles, and departments - that hold information for each employee. 

Once the application is started (node index.js), the user can select a choice of what action that would like to take. Some of these include viewing, editing and adding employees, viewing roles, and viewing departments. This is enabled through using the npm inquirer package. 

The database is managed through mysql, and the connection is through a local host mysql database. To use, please edit the .env.EXAMPLE file so you can connect to your own database. Once you clone the repo to your local machine, copy the schema and seeds files into SQL Workbench. 

# Questions
Project Created By: Cait Gorham

GitHub User Name: caitie-gorham

Email: em.caitie@gmail.com