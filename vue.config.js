const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // proxy any unknown requests to tomcat
    proxy: 'http://localhost:8080',
  }
})
