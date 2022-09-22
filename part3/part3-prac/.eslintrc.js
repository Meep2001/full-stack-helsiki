module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'jest':true
  },
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'eqeqeq':'error',
    'no-trailing-spaces':'error',
    'object-curly-spacing':['error','always'],
    'arrow-spacing':[
      'error',{ 'before':true,'after':true }
    ],
    'no-console':0,
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
