'use strict'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

process.on('unhandledRejection', (err) => {
  throw err
})

require('../config/env')

const fs = require('fs')
const chalk = require('react-dev-utils/chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
const semver = require('semver')
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')
const createDevServerConfig = require('../config/webpackDevServer.config')
const getClientEnvironment = require('../config/env')
const react = require(require.resolve('react', { paths: [paths.appPath] }))

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY //确定 Node.js 是否在终端上下文中运行

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9999
const HOST = process.env.HOST || '0.0.0.0'

//如果重设了主机名，提供重新绑定提示
if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  )
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  )
  console.log(
    `Learn more here: ${chalk.yellow('https://cra.link/advanced-config')}`
  )
  console.log()
}

//检查browserslist配置是否存在
const { checkBrowsers } = require('react-dev-utils/browsersHelper')
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT)
  })
  .then((port) => {
    if (port == null) {
      return
    }

    //生成webpack的开发环境配置
    const config = configFactory('development')
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const appName = require(paths.appPackageJson).name

    const useTypeScript = fs.existsSync(paths.appTsConfig)
    const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true'
    const urls = prepareUrls(
      protocol,
      HOST,
      port,
      paths.publicUrlOrPath.slice(0, -1)
    )
    const devSocket = {
      warnings: (warnings) =>
        devServer.sockWrite(devServer.sockets, 'warnings', warnings),
      errors: (errors) =>
        devServer.sockWrite(devServer.sockets, 'errors', errors)
    }

    //创建编译器
    const compiler = createCompiler({
      appName,
      config,
      devSocket,
      urls,
      useYarn,
      useTypeScript,
      tscCompileOnError,
      webpack
    })

    const proxySetting = require(paths.appPackageJson).proxy
    const proxyConfig = prepareProxy(
      proxySetting,
      paths.appPublic,
      paths.publicUrlOrPath
    )

    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    )

    //创建devServer配置
    const devServer = new WebpackDevServer(compiler, serverConfig)

    //启动服务
    devServer.listen(port, HOST, (err) => {
      if (err) {
        return console.log(err)
      }
      if (isInteractive) {
        clearConsole()
      }

      if (env.raw.FAST_REFRESH && semver.lt(react.version, '16.10.0')) {
        console.log(
          chalk.yellow(
            `Fast Refresh requires React 16.10 or higher. You are using React ${react.version}.`
          )
        )
      }

      console.log(chalk.cyan('Starting the development server...\n'))
      openBrowser(urls.localUrlForBrowser)
    })
    ;['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        devServer.close()
        process.exit()
      })
    })

    if (process.env.CI !== 'true') {
      process.stdin.on('end', function () {
        devServer.close()
        process.exit()
      })
    }
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
