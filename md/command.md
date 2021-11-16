# *Google*
- cmd + shift + T     打开刚关闭的文件
- cmd + T             新开窗口
- cmd + W             关闭当前标签页
- cmd + shift + P     打开调试台控制面板

***
# *Linux*
- rm - rf filename		            永久删除某个文件
- cat filename		                查看某个文件内容
- pwd		                        当前文件路径
- ls - la	                        查看隐藏文件
- chflags noschg                    修改文件权限为无权限
- lsof -i:端口号                     查看端口号引用情况

***
# *ReactSnap*
- imrc	            import React / Component
- imrse	            import React / useState useEffect
- impc	            import React / pureComponent
- imp		        import moduleName from 'module'
- imd		        import { destructuredModule } from 'module'
- imn		        import 'module'
- exp		        export default moduleName
- enf		        export const functionName = (params) => { }		
- cc		        Class Component
- ccc		        Class Component With Constructor
- cpc		        Class Pure Component
- hoc		        Higher Order Component
- sfc		        Stateless Function Component
- est		        this.state={}
- ss		        this.setState
- ssf		        Functional setState
- usf		        Declare a new state variable using State Hook
- uef		        useEffect Hook
- nfn		        const functionName = (params) => { }
- sti		        setInterval(() => { }, intervalTime
- sto		        setTimeout(() => { }, delayTime
- cmmb	            注释
- cp		        const { } = this.props
- cs		        const { } = this.state
- clg		        console.log(object)
- clo		        console.log(`object`, object)
- ccl		        console.clear()

***

# *VsCode*
- option + T               新建终端
- command+shift+T          打开刚关闭的标签页
- command + T              打开新窗口
- option+F		           全屏模式
- command .                提示，可自动导入模块
- commad + del	           删除整个一行
- option + del	           删除上个单词


***

# *Nrm*
- nrm ls             查看镜像源
- nrm use 	         切换镜像源
- nrm del 	         删除源地址
- nrm add 	         添加源地址
- nrm test           测试源的速度

***
# *Npm*
- npm view package 			        查看包的具体信息
- npm view package versions         查看包发布的所有版本
- npm list/ls package 		        查看本地项目包版本
- npm i package@latest		        更新包到最新版本
- npm i package@版本  		         更新包到指定版本(如果版本号只有一个数字，默认安装该数字的最版本)
- npm uninstall package		        删除包及删除配置项
- npm install package -D		    安装包到开发环境
- npm outdated				        列出当前项目所有可以更新的包【针对含有^和～的包版本有更新】
- npm update                        更新项目的包到期望版本
- npm config get registry 	        查看当前镜像源
- npm config list				    当前npm配置
- npm version patch	                升级补丁版本号
- npm version minor	                升级小版本号  
- npm version major	                升级大版本号
- npm login	                        登陆
- npm publish	                    发布
- npm list                          查看当前项目所有包的树形依赖关系
- npm list | grep package           查看某一个包的树形依赖关系
- npm i -production                 只装生产环境下的包
- npm cache clean -force            清除项目包缓存
- npm config get registry           当前npm源
- npm config set registry + adr     切换npm源  
- npm root -g                       全局包下载的路径


***

# *Git*
- git log                                        提交日志
- git status                                     本地修改文件状态
- git checkout test                              切换分支
- git push  -set -upstream origin  test	         将本地分支提交到远端（远端不存在时会创建）
- git branch  test	                             在当前分支下创建一个分支
- git push origin -delete  test	                 删除远程分支
- git branch -d   test                           删除本地分支
- git reset commitId  --hard	                 重置当前本地分支至commitid对应的版本
- git reset --hard origin/uat                    将本地回退到远端一样的版本
- git push origin  test:master	                 将本地分支test提交到远程分支master
- git checkout  -b test origin/test	             根据远程分支tset创建本地分支test
- git checkout  -src/index.js		             还原文件的修改