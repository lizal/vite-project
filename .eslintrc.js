module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    // eslint-config-prettier 的缩写
    "prettier",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "no-unreachable": "warn",
    // 强制所有控制语句使用一致的括号风格
    curly: "warn",
    // 要求使用 === 和 !==
    eqeqeq: "warn",
    // 禁止 if 语句中 return 语句之后有 else 块
    "no-else-return": "warn",
    // 禁止出现空函数
    "no-empty-function": "warn",
    // 禁用不必要的嵌套块
    "no-lone-blocks": "warn",
    // 禁止使用多个空格
    "no-multi-spaces": "warn",
    // 禁止多次声明同一变量
    "no-redeclare": "warn",
    // 禁止自我赋值
    "no-self-assign": "warn",
    // 禁止自身比较
    "no-self-compare": "warn",
    // 禁止空格和 tab 的混合缩进
    "no-mixed-spaces-and-tabs": "warn",
    //关闭驼峰命名规则
    "vue/multi-word-component-names": 0,
    //关闭vue未声明
    "no-unref": "off"
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
};
