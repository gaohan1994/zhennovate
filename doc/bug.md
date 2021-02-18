
## 待解决

https://zhennovate.atlassian.net/browse/PHASE1-197
saved 状态和前三种不是同一级别，是单独存在的
不能采用目前的方案，需要重新写 

https://zhennovate.atlassian.net/browse/PHASE1-170
目前是按照

排序后的action

排序后的assessment

排序后的reflection
期望；
所有的entry项目全部混在一起排序
## 2021-02-18
Quote of the Day Bug https://zhennovate.atlassian.net/browse/PHASE1-173
1、只显示一条 fixed
2、每24小时后台返回需要变化 陈禹
一次配置多条（上百条），每天更换一条，格式重新约定一下

Wrong Headers for New Programs https://zhennovate.atlassian.net/browse/PHASE1-270
fixed

https://zhennovate.atlassian.net/browse/PHASE1-269
陈禹修改

https://zhennovate.atlassian.net/browse/PHASE1-271
fixed

https://zhennovate.atlassian.net/browse/PHASE1-263
fixed

https://zhennovate.atlassian.net/browse/PHASE1-262
未复现

https://zhennovate.atlassian.net/browse/PHASE1-260
fixed

https://zhennovate.atlassian.net/browse/PHASE1-250
fixed 接口调用时没有传递userid

https://zhennovate.atlassian.net/browse/PHASE1-217
fixed

https://zhennovate.atlassian.net/browse/PHASE1-208
fixed

https://zhennovate.atlassian.net/browse/PHASE1-196
fixed

https://zhennovate.atlassian.net/browse/PHASE1-195
fixed

https://zhennovate.atlassian.net/browse/PHASE1-193
fixed

https://zhennovate.atlassian.net/browse/PHASE1-171
fixed

https://zhennovate.atlassian.net/browse/PHASE1-168
fixed
1、programactionstatus 返回加一个时间 陈禹
2、首页quit之后 点击module 应该显示plan

https://zhennovate.atlassian.net/browse/PHASE1-267
fixed

https://zhennovate.atlassian.net/browse/PHASE1-181
陈禹
可能是脏数据问题 并非bug

https://zhennovate.atlassian.net/browse/PHASE1-187
fixed


168 - Missing Action Pieces on demo-us.Zhennovate https://zhennovate.atlassian.net/browse/PHASE1-168
设计稿在bug里面
1、用户若是离开，再点回该Action module的话，应该看到该界面 【等待接口给出当前做到哪一步】
2、卡片内容修改【等待UI出图】
3、动画由paperfrom做，不在自己提供gif fixed
4、complete做完之后重新做正常显示plan，状态为做完 fixed


224 - Cannot Add Program to Calendar https://zhennovate.atlassian.net/browse/PHASE1-224
没修好
fixed

209 - Cannot add action to Outlook and Apple calendars https://zhennovate.atlassian.net/browse/PHASE1-209
与224关联
fixed

208 - Weekly Goal - Copywriting https://zhennovate.atlassian.net/browse/PHASE1-208
未完成、完成、超额完成 话术

🔥 🐛 🔥【高晗Bug 2/16清单】这是第一批需要尽快修好的bug, 请于周二（2月16日）完成：Han's Bug list, to be fixed on 2/16 @nagao8856 

## 2021-02-17
=================
2/9日的剩余4个大bug:
=================

149 - Homepage Action Card dropdown options do not work https://zhennovate.atlassian.net/browse/PHASE1-149
1、calendar fixed
2、complete action fixed
3、quit action fixed

## 测试出的问题
1、重复做paperfrom但是首页没有重复计数 陈禹
2、program跳转是否需要单独判断 陈禹

202 - Weekly Goal Complete - Pop-up should only happen once and never happen again after user closes the pop-up https://zhennovate.atlassian.net/browse/PHASE1-202
A1情况介绍：
用户设定了一星期完成2个action的目标。
目标达到，首页weekly goal的圈圈转满。
用户看到一个庆祝的动画。用户看完并关掉此动画。
fixed

A1情况介绍：
在A1的基础上，用户继续做action. 
首页weekly goal保持饱满。
如果用户在同一周内超标多做了1个action，那么就显示3/2。如果用户超标多做了2个action，那么就显示4/2。以此类推。
用户不会再看到多余的动画。
fixed

B情况介绍：
用户设定了一星期完成2个action的目标。目标达到，首页weekly goal的圈圈转满。用户看到一个庆祝的动画。用户看完并关掉此动画。
用户想提高对自己的挑战，于是把这星期的目标调成4个action.

这时：
首页weekly goal的圈圈从满变成不满。显示2/4，因为用户刚完成了2个action也算在内。
当用户在同一周实现了另外2个action的时候，首页weekly goal的圈圈转满。用户将可以再一次看到庆祝的动画。用户看完并关掉此动画。
如果用户没有在同一周实现另外2个action，那么用户是看不到动画的。
当下一周来临时，weekly goal的圈圈将重新从零开始。目标保留用户最后一次的设定。
fixed

C情况介绍：
用户设定了一星期完成6个action的目标。目标达到，首页weekly goal的圈圈转满。用户看到一个庆祝的动画。用户看完并关掉此动画。
用户想放松一下，于是把这星期的目标调成2个action.

这时 (就像A2情景一样的逻辑）：
首页weekly goal的圈圈仍然保持饱满。显示6/2，因为用户刚完成了6个action。
如果用户在同一周实现了另外的action，比如说用户又做了2个action，这样一来这周就总共有8个action了。这时weekly goal的圈圈仍然保持饱满，显示8/2，但不会出现新动画。
fixed

253 - in-progress program shouldn't appear in New/Available at any time https://zhennovate.atlassian.net/browse/PHASE1-253
陈宇修改

197 -  Make sure when clicking into an in-progress program display coaching path
https://zhennovate.atlassian.net/browse/PHASE1-197
1、点击在首页和在inprogress直接跳转到paperfrom了 fixed

251 - Unable to scroll through paperform results page embedded on our platform after user clicks on submit button on paperform https://zhennovate.atlassian.net/browse/PHASE1-251
paperfrom的适配问题
这是paperfrom的适配问题，并非我们的问题，可以看到在视频里paperfrom使用了类似section的一块一块滑动的布局，可能是这个原因导致

184 - Copywriting - Change Available to New https://zhennovate.atlassian.net/browse/PHASE1-184
fixed

240 - Hide Checkin on Homepage for 3/1 https://zhennovate.atlassian.net/browse/PHASE1-240
fixed

241 - Hide Insights on Header Menu for 3/1 https://zhennovate.atlassian.net/browse/PHASE1-241
fixed

226 - Hide Preview for 3/1 https://zhennovate.atlassian.net/browse/PHASE1-226
fixed 但是这个功能是做好了的确定要隐藏么

256 - Hide # People Working on the Action on Homepage Action Card for 3/1 https://zhennovate.atlassian.net/browse/PHASE1-256
fixed

221 - Copywriting - Action Added Pop-up Window https://zhennovate.atlassian.net/browse/PHASE1-221
fixed


====================================
2/17日新分配的bug （大部分是小bug):
====================================

260 - Coaching Path Formatting - Module Indentation from Session https://zhennovate.atlassian.net/browse/PHASE1-260
fixed

## 2021--2-15

🔥 🐛 🔥【高晗Bug 2/9清单】这是第一批需要尽快修好的12个bug, 请于周二至周三（2月9-10日）完成：Han's Bug list, to be fixed on 2/10 @nagao8856 

168 - Missing Action Pieces on demo-us.Zhennovate https://zhennovate.atlassian.net/browse/PHASE1-168
等待dizhen和linda讨论结果

201 - Action Completed Status	https://zhennovate.atlassian.net/browse/PHASE1-201
前端已经修改成module结束时显示icon，后端需要配合修改
禹哥修改

211 - Error when clicking on "Complete Action" on homepage https://zhennovate.atlassian.net/browse/PHASE1-211
怀疑是脏数据导致

210 - Error with embedded link - Add Action to Google Calendar https://zhennovate.atlassian.net/browse/PHASE1-210
1、地图位置不能放链接 直接放地址
2、404问题已修改 fixed

216 - Cannot add program to calendar https://zhennovate.atlassian.net/browse/PHASE1-216
fleep待沟通
陈宇在后端添加日历的时候对分享日历详情进行配置

224 - Add Program to Calendar - Content / Copywriting https://zhennovate.atlassian.net/browse/PHASE1-224
fleep待沟通，program无法添加富文本到calendar

225 - Add Action to Calendar - Content / Copywriting https://zhennovate.atlassian.net/browse/PHASE1-225
1、地图位置不能放链接

149 - Homepage Action Card dropdown options do not work https://zhennovate.atlassian.net/browse/PHASE1-149
1、calendar fixed
2、complete action fixed
3、quit action 前端问题

222 - Module Completion Status Gets Marked at the Wrong Time - Logic Flaw https://zhennovate.atlassian.net/browse/PHASE1-222	
前端fixed，但是需要后端也修改下含有complete paperfrom的触发机制

188	- Unsaving from available page https://zhennovate.atlassian.net/browse/PHASE1-188
fixed

204	- Bookmark Bug in Saved tab https://zhennovate.atlassian.net/browse/PHASE1-204
fixed 和 182 关联

202 - Weekly Goal Complete - Pop-up should only happen once and never happen again after user closes the pop-up https://zhennovate.atlassian.net/browse/PHASE1-202
