const { statSync, writeFileSync, readFileSync } = require('fs')
const { join } = require('path')
const colors = require('colors')

const {
  PROBLEMS_DIR_PATH,
  REPOSITORY,
  MD_LIST_PATHS,
  MD_LIST_TEMPLATE_PATH,
  LATEST_NUMBER,
} = require('../common')
const { getAccepted, getProblems } = require('../store')

function getLatestProblems(problems) {
  const latest = problems.map(problem => {
    problem.mtimeMs = statSync(
      join(PROBLEMS_DIR_PATH, problem.filename)
    ).mtimeMs
    return problem
  })

  latest.sort((a, b) => b.mtimeMs - a.mtimeMs)
  return latest.slice(0, LATEST_NUMBER)
}

const { DIFFICULTIES } = require('../common')
function toItemString(problem, type) {
  const { stat, filename, difficulty } = problem
  const id = stat.frontend_question_id
  const title = stat.question__title
  const level = difficulty.level

  if (type === 'list') {
    return `- [${id}. ${title}](${REPOSITORY + filename})`
  } else if (type === 'table') {
    return `| ${id} | [${title}](${REPOSITORY + filename}) | ${
      DIFFICULTIES[level - 1]
    } |`
  } else {
    return ''
  }
}

function toLatestList(problems) {
  return problems.map(problem => toItemString(problem, 'list')).join('\n')
}

function toTableString(problems) {
  return problems.map(problem => toItemString(problem, 'table')).join('\n')
}

function generateListFile(content) {
  for (let path of MD_LIST_PATHS) {
    writeFileSync(path, content, { encoding: 'utf8', flag: 'w+' })
    console.log(`Generate <${colors.yellow(path)}> successed.`)
  }
}

module.exports = function main() {
  const accepted = getAccepted()
  const problems = getProblems(accepted)

  const template = readFileSync(MD_LIST_TEMPLATE_PATH, 'utf8')
  const content = template
    .replace('{{latest}}', toLatestList(getLatestProblems(problems)))
    .replace('{{accepted_num}}', accepted.length)
    .replace('{{table}}', toTableString(problems.reverse()))

  generateListFile(content)
}
