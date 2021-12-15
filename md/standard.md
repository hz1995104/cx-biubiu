# Rebase before branch submission

1.在当前分支 git reflog,copy 出该分支第一次 commitID
2.git rebase -i commitID 进入编辑界面 3.第一条设为 r，后面的提交设为 s，保存 4.再次弹出的界面中修改 commit messsage(例如：feat(btb-10101):[快速达]销售侧 1/3)，保存 5.确认信息再次保存
6.git rebase origin/master 变基远端 master 最新记录，本地解决冲突

- 没有冲突：git push -f
- 有冲突：本地解决冲突-> git add.-> git rebase --continue-> 保存-> git push -f

# zsh 安装相关代码高亮提示插件

cd ~/.on-my-zsh/custom/plugins

## github 地址下载：

git clone https://github.com/zsh-users/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-completions
git clone https://github.com/zsh-users/zsh-history-substring-search

## gitlab 地址下载：

git clone https://gitee.com/who7708/zsh-syntax-highlighting
git clone https://gitee.com/who7708/zsh-autosuggestions
git clone https://gitee.com/who7708/zsh-completions
git clone https://gitee.com/who7708/zsh-history-substring-search
vim ~/.zshrc
plugins=(
git
zsh-syntax-highlighting
zsh-autosuggestions
zsh-completions
zsh-history-substring-search
)
source ~/.zshrc

# 线上 bug 修改统一分支名：hotfix-YYYY-MM-DD

# git reset --hard 提交后恢复代码

使用 git reflog 查看所有的提交记录，包括被回滚的代码的 commitID
再次使用 git reset --hard+需要回滚定位的 commitID

# git 提交规范：

1.feat：新特性
2.fix：修复 bug
3.refactor：代码重构，没有加新功能或者修复 bug
4.docs：文档修改，比如 README 等等
5.style：代码格式修改，仅仅修改空格、格式、逗号等等
6.chore：其他修改，比如改变构建流程，或者增加修改依赖库、工具等等
7.subject：commit 的概述
8.body：commit 具体修改的内容
9.footer：一些备注
10.perf：优化相关，比如提升性能、体验
11.test：测试用例，包括单元测试、集成测试

# CI-Runner

## 强制项目中使用 yarn 包管理器

**设置预先执行脚本**：(preinstall: npx only-allow yarn) [https://www.npmjs.com/package/only-allow]

## 规范 eslint

- 项目存在.eslintrc.js 文件,不需要额外操作
- 项目不存在.eslintrc.js 文件：
  _下载包文件_ @ez/eslint-config-react
  _pakeage.json 添加配置_ eslintConfig

```js
   "eslintConfig": {
   "extends": [
     "@ez/eslint-config-react"
    ]
   }
```

## 下载 commit 提交规范相关包文件

- husky [https://www.npmjs.com/package/husky]
  _package.json_ 脚本中添加("prepare": "husky install")，初始下载包会自动生成.husky 文件
  _更改 pre-commit 中执行的脚本_ (yarn lint-staged)
- lint-staged [https://www.npmjs.com/package/lint-staged]
  _package.josn 中添加配置_ 更多检查可自行配置
  ```js
  "lint-staged": {
    "**/*": [
      "prettier --write --ignore-unknown"
    ],
  "src/**/*.{js,jsx,tsx}": [
    "eslint --max-warnings 0"
    ]
  },
  ```
- prettier [https://www.npmjs.com/package/prettier]

## 统一规范格式化文件.prettierrc

```js
{
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 80,
  "trailingComma": "none",
  "overrides": [
    {
      "files": ["*.{yml,yaml}"],
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```
