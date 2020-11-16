module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'https://q0t3rnph2f.execute-api.us-east-1.amazonaws.com/Prod',
        changeOrigin: true,
        pathRewrite: {
          '^/': '/',
        },
      },
    },
  },
};
