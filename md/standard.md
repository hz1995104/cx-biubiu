# Rebase before branch submission

1.在当前分支git reflog,copy出该分支第一次commitID
2.git rebase -i commitID进入编辑界面
3.第一条设为r，后面的提交设为s，保存
4.再次弹出的界面中修改commit messsage(例如：feat(btb-10101):[快速达]销售侧 1/3)，保存
5.确认信息再次保存
6.git rebase origin/master变基远端master最新记录，本地解决冲突
- 没有冲突：git push -f
- 有冲突：本地解决冲突-> git add.-> git rebase --continue-> 保存-> git push -f


# zsh安装相关代码高亮提示插件
cd ~/.on-my-zsh/custom/plugins
## github地址下载：
git clone https://github.com/zsh-users/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-completions
git clone https://github.com/zsh-users/zsh-history-substring-search
## gitlab地址下载：
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

# 线上bug修改统一分支名：hotfix-YYYY-MM-DD



