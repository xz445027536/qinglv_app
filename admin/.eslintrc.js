module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'eslint:recommended',
  plugins: [
    'html'
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },

  rules: {
    'accessor-pairs': 2,//getter 和 setter 在对象中必须成对出现
    'arrow-spacing': [2, { 'before': true, 'after': true }],//箭头函数的箭头前后使用一致的空格
    'block-spacing': [2, 'always'],//在代码块中开括号前和闭括号后有空格
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],//使用one true brace style大括号风格(允许单行)
    'camelcase': [1, { 'properties': 'always' }],//使用骆驼命名
    'comma-dangle': [2, 'never'],//禁止末尾逗号
    'comma-spacing': [2, { 'before': false, 'after': true }],//逗号前不空格、逗号后空格
    'comma-style': [2, 'last'],//标准逗号风格（对应逗号前置风格）
    'constructor-super': 2,//构造函数中要有 super() 的调用
    'curly': [2, 'multi-line'],//容许单行控制语句省略大括号
    'dot-location': [2, 'property'],//点操作符和属性放在同一行
    'eqeqeq': [2, 'always'],//强制使用 === 和 !==
    'generator-star-spacing': [2, { 'before': true, 'after': true }],//generator函数中 * 号前后需空格
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, { 'SwitchCase': 1 }],//统一缩进2个空格
    'jsx-quotes': [2, 'prefer-single'],//不包含单引号的 JSX 属性值使用单引号
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],//对象属性健和冒号间无空格，值和冒号间有空格
    'keyword-spacing': [2, { 'before': true, 'after': true }],//关键字前后都要有空格
    'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }],//构造函数首字母大写
    'new-parens': 2,//调用无参构造函数时带括号
    'no-array-constructor': 2,//禁止使用 Array 构造函数
    'no-caller': 2,//禁用 caller 或 callee
    'no-console': 'off',//允许调用console
    'no-class-assign': 2,//禁止修改类声明的变量
    'no-cond-assign': 2,//禁止在条件语句中出现赋值操作符
    'no-const-assign': 2,//禁止改变用const声明的变量
    'no-control-regex': 2,//禁止在正则表达式中使用控制字符
    'no-delete-var': 2,//禁止对变量使用 delete 操作符
    'no-dupe-args': 2,//禁止在 function 定义中出现重复的参数
    'no-dupe-class-members': 2,//禁止类成员中出现重复的名称
    'no-dupe-keys': 2,//禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2,//禁止出现重复的 case 标签
    'no-empty-character-class': 2,//禁止在正则表达式中使用空字符集
    'no-empty-pattern': 2,//禁止使用空解构模式
    'no-eval': 2,//禁用 eval()
    'no-ex-assign': 2,//禁止对 catch 子句中的异常重新赋值
    'no-extend-native': 2,//禁止扩展原生类型
    'no-extra-bind': 2,//禁止不必要的函数绑定
    'no-extra-boolean-cast': 2,//禁止不必要的布尔类型转换
    'no-extra-parens': [2, 'functions'],//在函数表达式周围禁止不必要的圆括号
    'no-fallthrough': 2,//禁止 case 语句落空
    'no-floating-decimal': 2,//禁止浮点小数省略0
    'no-func-assign': 2,//禁止对 function 声明重新赋值
    'no-global-assign': 2,//禁止对原生对象或只读的全局对象进行赋值
    'no-implied-eval': 2,//禁用隐式的eval()
    'no-inner-declarations': [2, 'functions'],//禁止 function 声明出现在嵌套的语句块中
    'no-invalid-regexp': 2,//禁止在 RegExp 构造函数中出现无效的正则表达式
    'no-irregular-whitespace': 2,//禁止不规则的空白
    'no-iterator': 2,//禁用已废弃的迭代器
    'no-label-var': 2,//禁用与变量同名的标签
    'no-labels': [2, { 'allowLoop': false, 'allowSwitch': false }],//禁用标签语句
    'no-lone-blocks': 2,//禁用不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2,//禁止使用空格和tab混合缩进
    'no-multi-spaces': 2,//禁止出现多个空格
    'no-multi-str': 2,//禁止多行字符串
    'no-multiple-empty-lines': [2, { 'max': 1 }],//允许的最多空行数为1
    'no-new-object': 2,//禁止使用Object构造函数
    'no-new-require': 2,//禁止 new require
    'no-new-symbol': 2,//禁止Symbol和new操作符一起使用
    'no-new-wrappers': 2,//禁止原始包装实例
    'no-obj-calls': 2,//禁止把全局对象作为函数调用
    'no-octal': 2,//禁用八进制字面量
    'no-octal-escape': 2,//禁止在字符串中使用八进制转义序列
    'no-path-concat': 2,//禁止对 __dirname 和 __filename 进行字符串连接
    'no-proto': 2,//禁用 __proto__ 属性
    'no-redeclare': 2,//禁止多次声明同一变量
    'no-regex-spaces': 2,//禁止正则表达式字面量中出现多个空格
    'no-return-assign': [2, 'except-parens'],//禁止在 return 语句中使用赋值语句,除非使用括号把它们括起来
    'no-self-assign': 2,//禁止自我赋值
    'no-self-compare': 2,//禁止自身比较
    'no-sequences': 2,//禁用逗号操作符
    'no-shadow-restricted-names': 2,//禁止用关键字定义标识符
    'func-call-spacing': 2,//
    'no-sparse-arrays': 2,//禁用稀疏数组
    'no-this-before-super': 2,//禁止在构造函数中调用 super()之前使用this或super
    'no-throw-literal': 2,//禁止抛出异常字面量
    'no-trailing-spaces': 2,//禁用行尾空格
    'no-undef': 2,//禁用未声明的变量
    'no-undef-init': 2,//禁止将变量初始化为 undefined
    'no-unexpected-multiline': 2,//禁止出现令人困惑的多行表达式(换行不结束语句等)
    'no-unmodified-loop-condition': 2,//禁用一成不变的循环条件
    'no-unneeded-ternary': [2, { 'defaultAssignment': false }],//禁止条件表达式作为默认的赋值模式
    'no-unreachable': 2,//禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'no-unsafe-finally': 2,//禁止在 finally 语句块中出现控制流语句
    'no-unsafe-negation': 2,//禁止对关系运算符的左操作数使用否定操作符
    'no-unused-vars': [1, { 'vars': 'all', 'args': 'none' }],//警告出现未使用过的变量
    'no-useless-call': 2,//禁止不必要的 .call() 和 .apply()
    'no-useless-computed-key': 2,//禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 2,//禁用不必要的构造函数
    'no-useless-escape': 0,//禁用不必要的转义字符
    'no-whitespace-before-property': 2,//禁止属性前有空白
    'no-with': 2,//禁用 with 语句
    'one-var': [2, { 'initialized': 'never' }],//每个作用域的初始化的变量有多个变量声明
    'operator-linebreak': [2, 'after', { 'overrides': { '?': 'before', ':': 'before' } }],//强制换行符放在操作符后面
    'padded-blocks': [2, 'never'],//禁止块语句和类的开始或末尾有空行
    'quotes': [1, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],//推荐尽可能地使用单引号
    'semi': [2, 'never'],//禁止使用分号代替 ASI
    'space-before-blocks': [2, 'always'],//强制块语句必须至少有一个前置空格
    'space-before-function-paren': [2, 'never'],//禁止函数圆括号之前有空格
    'space-in-parens': [2, 'never'],//强制圆括号内没有空格
    'space-infix-ops': 1,//要求操作符周围有空格
    'space-unary-ops': [2, { 'words': true, 'nonwords': false }],//单词类一元操作符需要空格
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],//统一注释风格
    'template-curly-spacing': [2, 'never'],//禁止模板字符串花括号内出现空格
    'use-isnan': 2,//要求使用 isNaN() 检查 NaN
    'valid-typeof': 2,//强制 typeof 表达式与有效的字符串进行比较
    'wrap-iife': [2, 'any'],//需要把立即执行的函数包裹起来
    'yield-star-spacing': [2, 'both'],//强制在 yield* 表达式中 * 前后使用空格
    'yoda': [2, 'never'],//禁止Yoda条件
    'prefer-const': 2,//要求使用 const 声明那些声明后不再被修改的变量
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,//production环境禁用debugger
    'object-curly-spacing': [2, 'always', { objectsInObjects: false }],//要求花括号内有空格(以对象元素开始或结尾除外)
    'array-bracket-spacing': [2, 'never']//禁止在数组括号内出现空格
  }
}
