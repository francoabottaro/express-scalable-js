#!/usr/bin/env node

const {execSync} = require("child_process")
const fs = require('node:fs')
const nameProject = process.argv[2]?.toLowerCase() ?? "app_project"
const folder = process.cwd().split(/[/\\]/).pop().toLowerCase()
const rootProject = process.argv[2] === "." ? folder : nameProject
const path = require('path')

// ver si ya se creo la carpeta
const existProject = path.join(nameProject, "node_modules")
if(fs.existsSync(existProject)){
  console.error(`Ya existe la carpeta: ${rootProject}!!!`) 
  return
}

const installApp = (instruct) => {
  try { 
    execSync(`${instruct}`, { stdio: 'inherit' })
  }catch(e){
    console.error(e)
    return Error(e)
  }
}



// Clonar Repository
const gitRepository = `git clone --depth 1 https://github.com/francoabottaro/generator-express-scalable.git ${nameProject}`
installApp(gitRepository)

// Si se crea una carpeta entrar dentro
const cd = (`${`cd ${nameProject} &&` ?? ""}`)

// Renombrar repositorio
const rename = `${cd} npm pkg set name=${rootProject}`
installApp(rename)

// Eliminar .git
fs.rmSync(`${nameProject}/.git`, { recursive: true, force: true });

// Instalar dependecia y crear git
const npmGit = `${cd} npm install && git init `
installApp(npmGit)