# NOVO Elements Automation

## Project Mission

The purpose of the automation project is to integrate automated testing into novo-elements.

The project takes a list of components and dynamically loads each according to a componentName url-parameter (e.g. http://localhost:4200/examples?componentName=basic-ace)

This allows for testing of each example case independently of the demo pages while still allowing integration testing between components. 

this project also allows for examples to be created and tested and not included in the novo-elements demo page.

## Dependencies

- [NodeJS v14.0+](https://nodejs.org/en/)

## Quick Start

    # Clone the project
    git clone git@github.com:bullhorn/novo-elements.git

    # Change directory
    cd novo-elements

    # Install
    npm install
    
    # Generate Examples-Module
    npm run generate:examples

    # Start automation demo
    npm run start:automation

    # Access the automation demo in your browser at
    http://localhost:4200/examples

    # Change directory to automation project
    cd projects/automation

    # Install playwright
    npm install

    # Run tests (you will need two terminals)
    From projects/automation -> npm run test

    





