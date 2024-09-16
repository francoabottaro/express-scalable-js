#!/usr/bin/env node

const {execSync} = require("child_process")

const installApp = (instruct) => {
  try { 
    execSync(`${instruct}`, { stdio: 'inherit' })
  }catch(e){
    console.error(e)
    return Error(e)
  }
}

const nameProject = process.argv[2]?.toLowerCase() ?? "app_project"
const folder = process.cwd().split(/[/\\]/).pop().toLowerCase()
const rootProject = process.argv[2] === "." ? folder : nameProject

// Clonar Repository
const gitRepository = `git clone --depth 1 https://github.com/francoabottaro/generator-express-scalable.git ${nameProject}`
installApp(gitRepository)

// Si se crea una carpeta entrar dentro
const cd = (`${`cd ${nameProject} &&` ?? ""}`)

// Renombrar repositorio
const rename = `${cd} npm pkg set name=${rootProject}`
installApp(rename)

// Instalar dependecia y crear git
const npmGit = `${cd} npm install && git init `
installApp(npmGit)