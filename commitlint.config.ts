module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", //新功能
        "fix", //修复bug
        "docs", //文档注释
        "style", //代码格式
        "refactor", //重构
        "perf", //性能优化
        "test", //测试
        "chore", //构建过程或辅助工具变化
        "revert", //回退
        "build", //打包
      ]
    ],
    "subject-case": [0]
  }
}