https://zhennovate.atlassian.net/browse/PHASE1-363
fixed

https://zhennovate.atlassian.net/browse/PHASE1-364

https://zhennovate.atlassian.net/browse/PHASE1-365

改密码

## 2021-03-14

352 fixed 目前做法是取消 sign 模块的 icon 点击功能
351 fixed 是全部校验规则都这样还是只有 sign up 的 email？ 现在修改成失去焦点时校验
347 fixed
344 陈禹修改
336 fixed
332 陈禹修改
328 fixed

Good morning,
Here are the following tickets to focus on,

For Han

Stuck Onboarding Loop
https://zhennovate.atlassian.net/browse/PHASE1-354
dizhen

Update copywriting on Sign in Screen
https://zhennovate.atlassian.net/browse/PHASE1-353
fixed

Missing - If user checks the radio button as individual - Currently even when my email address is whitelisted i am being directed to sign in screen
https://zhennovate.atlassian.net/browse/PHASE1-328

linda.zheng+5@zhennovate.com
fixed

Logo should be clickable on the sign-in screen
https://zhennovate.atlassian.net/browse/PHASE1-337
如果用户没有登录的时候会重定向到 signin

Email Field is highlighted red when there is no error message
https://zhennovate.atlassian.net/browse/PHASE1-355
fixed

Remove hexagon pattern in onboarding shown here
https://zhennovate.atlassian.net/browse/PHASE1-327
fixed

Update Timezone dropdown in Learning Reminder settings -> to Han, Is this ticket fixed? or do you need more information on this?
https://zhennovate.atlassian.net/browse/PHASE1-325

Unable to scroll all the way down in coaching path with sessions expanded
https://zhennovate.atlassian.net/browse/PHASE1-334
fixed

For Yu ( Please also double check these tickets to see if there is a backend dependency )
Calculate Progress Bar based on Module Completion %
https://zhennovate.atlassian.net/browse/PHASE1-335

Email case sensitivity shouldn't matter in sign in, sign up, and forgot password - this applies to error messages on Frontend, capitalized whitelisted emails are treated as different emails and not being recognized.
https://zhennovate.atlassian.net/browse/PHASE1-350
陈禹修改

Remove "[MC_Preview_Text]" from HTMLs in Our Email Templates
https://zhennovate.atlassian.net/browse/PHASE1-348

Weekly goal - default value should be 1 for new users
https://zhennovate.atlassian.net/browse/PHASE1-315

Invalid Date on Entries on Entry Page
https://zhennovate.atlassian.net/browse/PHASE1-331

For Han & Yu
Missing Error messages for current password
https://zhennovate.atlassian.net/browse/PHASE1-345
需要讨论

This error message is mainly for the settings page when users already signed in, Please ask Di if you have any questions

## 2021-03-10

Updated with the comment of latest bug issue with session level
https://zhennovate.atlassian.net/browse/PHASE1-289
后端修改

unable to scroll in coaching path when user expands the sessions
https://zhennovate.atlassian.net/browse/PHASE1-334
缺少较多的 session 案例

No progress in coaching path but UI shows 10% in progress bar --> thus when saving a not (New) program, it shows 10% done in saved tab
https://zhennovate.atlassian.net/browse/PHASE1-333
dizhen 添加的默认 10%进度

Program is being put into complete status when there are still unfinished modules ( Most likely related to the session level bug )
https://zhennovate.atlassian.net/browse/PHASE1-332
陈禹修改

Invalid Date on Entries on Entry Page
https://zhennovate.atlassian.net/browse/PHASE1-331
陈玉修改

Quiz Entry not showing up
https://zhennovate.atlassian.net/browse/PHASE1-330
fixed

When users click on error message "Please sign up" direct to sign up page
https://zhennovate.atlassian.net/browse/PHASE1-329
fixed

---

> When users click on sign up, nothing is happening
> https://zhennovate.atlassian.net/browse/PHASE1-316

> 如果 email 在机构里，不管用户选择的是否是 Are you joining through an organization? 都按 organization 继续注册 fixed
> 用户使用不在机构里的邮箱注册时没有报错信息返回 前端解决 fixed

> Update Copywriting for Thank you for signing up
> https://zhennovate.atlassian.net/browse/PHASE1-317
> fixed
> 屏幕适配 不换行 fixed

New Tickets covering sign up, sign in, change password setting page, and learning reminder setting page

Missing toast notification for when users click on send code again
https://zhennovate.atlassian.net/browse/PHASE1-339
fixed

Missing link when users click on the help center
https://zhennovate.atlassian.net/browse/PHASE1-340
fixed

Missing when the user leaves zhennovate site mid-way through confirming the email when user signs in or come back to platform display confirm email screen
https://zhennovate.atlassian.net/browse/PHASE1-341

Missing- When users click on send code again make the previous code invalid
https://zhennovate.atlassian.net/browse/PHASE1-342
陈禹修改

Missing - if users leave midway through onboarding when signing in or coming back to the platform display onboarding paper form
https://zhennovate.atlassian.net/browse/PHASE1-343
fixed

Missing - User clicks on a used forgot password link or expired link
https://zhennovate.atlassian.net/browse/PHASE1-344
后端修改

Missing Error messages for current password
https://zhennovate.atlassian.net/browse/PHASE1-345
1、陈禹对此有不同的看法，目前改为不到 8 位显示错误信息

When users complete change password on the settings page
https://zhennovate.atlassian.net/browse/PHASE1-346
fixed

change password errorcase https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/60301254ed2831a38f8afcfa
fixed

## 2021-03-05

> Hi Han,
> I'm currently testing sign up and sign in, here is a few bugs I filed, I Will be updating this list as I file new bugs
> Update capitalization on sign up screen
> https://zhennovate.atlassian.net/browse/PHASE1-320
> fixed

> Update the error state messages for first name and last name
> https://zhennovate.atlassian.net/browse/PHASE1-319
> fixed

> Disable toast notifcations for error message
> https://zhennovate.atlassian.net/browse/PHASE1-318
> fixed

> Update Error message for when password is wrong or account does not exist
> https://zhennovate.atlassian.net/browse/PHASE1-321
> 陈禹修改 fixed

> Update Forgot Password Error message
> https://zhennovate.atlassian.net/browse/PHASE1-322
> fixed

> Update learning goal changed Toast notifications
> https://zhennovate.atlassian.net/browse/PHASE1-326
> fixed

> Update Timezone dropdown in Learning Reminder settings
> https://zhennovate.atlassian.net/browse/PHASE1-325
> A-Z 排序 ok
> 添加时区时间 ok https://blog.csdn.net/qq_43627981/article/details/107206242
> 选项待定

> Confirmation Code does not work
> https://zhennovate.atlassian.net/browse/PHASE1-324
> 已经修改了

> Add Skip for now button in Confirmation Code UI
> https://zhennovate.atlassian.net/browse/PHASE1-323
> fixed

## 2021-02-24

https://zhennovate.atlassian.net/browse/PHASE1-216 cannot add program to calendar Nanan Gao Di Ye Highest To Do 2021/2/19 7:03 3/1;Program
1、已更新正则表达式 但是 safari 的 apple 和 outlook 还是无法添加到日历 3.1 之后解决
2、From Program 暂时先去掉等 3.1 之后添加一个 program 字段

https://zhennovate.atlassian.net/browse/PHASE1-209 Cannot add action to Outlook and Apple calendars Nanan Gao Di Ye Highest To Do 2021/2/20 3:46 3/1;Program
已更新正则表达式 但是 safari 的 apple 和 outlook 还是无法添加到日历 3.1 之后解决

https://zhennovate.atlassian.net/browse/PHASE1-224 Cannot Add Program to Calendar Nanan Gao Di Ye High To Do 2021/2/19 17:58 3/1;Program
1、因为正则表达式还不是很完善，先去掉 program 的 detail 保证 calendar 功能万无一失

https://zhennovate.atlassian.net/browse/PHASE1-293 Copywriting - Add action to calendar Nanan Gao Di Ye Medium To Do 2021/2/19 23:07 3/1;Program
fixed

---

https://zhennovate.atlassian.net/browse/PHASE1-255 Weekly Action Goal - Copywriting Nanan Gao Di Ye Highest To Do 2021/2/19 17:02 3/1;Goal-Setting
fixed

https://zhennovate.atlassian.net/browse/PHASE1-290 Action entries should be categorized according to spec - backend Nanan Gao Di Ye Highest To Do 2021/2/20 2:09 3/1;Program

https://zhennovate.atlassian.net/browse/PHASE1-277 Add Quiz as its own filter to this page Nanan Gao Linda Zheng Medium To Do 2021/2/19 18:55 3/1;Program
前端根据返回的 key 渲染 filter 中的选项

https://zhennovate.atlassian.net/browse/PHASE1-297 Copywriting - Weekly Goal Complete State Nanan Gao Di Ye Highest To Do 2021/2/20 8:44 3/1;Goal-Setting
fixed

https://zhennovate.atlassian.net/browse/PHASE1-201 Action Completed Status Nanan Gao Linda Zheng Highest In Progress 2021/2/23 19:29 3/1;Program
禹哥帮忙看下这个 bug，目前 bug 是只要完成了 session 中最后一个 module 时，整个 session 会被设置为完成

https://zhennovate.atlassian.net/browse/PHASE1-269 Timezone issue for Date Display on Platform Nanan Gao Di Ye High To Do 2021/2/19 19:18 3/1;Program
moment 插件应该已经做了适配了，晚上找不同时区的人进行测试

https://zhennovate.atlassian.net/browse/PHASE1-292 Copywriting - Weekly Goal Card Nanan Gao Di Ye High To Do 2021/2/19 19:34 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-289 Inconsistent Status for session level on coaching path Nanan Gao Linda Zheng High To Do 2021/2/20 2:46 3/1;Program
陈玉修改
和 201 关联

https://zhennovate.atlassian.net/browse/PHASE1-202 Weekly Goal Complete - Pop-up should only happen once and never happen again after user closes the pop-up Nanan Gao Linda Zheng High To Do 2021/2/20 8:28 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-304 Copywriting - Weekly Goal Nanan Gao Di Ye High To Do 2021/2/24 4:09 3/1;Goal-Setting
fixed

https://zhennovate.atlassian.net/browse/PHASE1-281 Add empty state to (New) program page Nanan Gao Linda Zheng Medium To Do 2021/2/19 18:48 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-287 Copywriting - Weekly Goal Toast Notification Nanan Gao Di Ye Medium To Do 2021/2/19 19:54 3/1;Goal-Setting
fixed 应该需要刷新

https://zhennovate.atlassian.net/browse/PHASE1-276 Change Quiz entry to use the correct icon Nanan Gao Linda Zheng Medium To Do 2021/2/20 2:26 3/1;Program

https://zhennovate.atlassian.net/browse/PHASE1-296 Copywriting - Weekly Goal Complete Pop-Up Nanan Gao Di Ye Medium To Do 2021/2/20 8:38 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-300 Make learning goal pop up bigger Nanan Gao Linda Zheng Medium To Do 2021/2/23 20:28 3/1;Program
fixed

## 2021-02-22

222 fixed
197 陈禹修改

## 2021-02-19

https://zhennovate.atlassian.net/browse/PHASE1-209 PHASE1-209 Cannot add action to Outlook and Apple calendars Nanan Gao Highest To Do 3/1;Program
未复现 晚上测试下

https://zhennovate.atlassian.net/browse/PHASE1-187 PHASE1-187 Update program card displaying logic Nanan Gao Highest To Do 3/1;Program
待解决
跳转问题 fixed
program 列表还是有问题，已经做了的 program 出现在 new 里，有 bug kilobit

https://zhennovate.atlassian.net/browse/PHASE1-255 PHASE1-255 Weekly Action Goal - Copywriting Nanan Gao Highest To Do 3/1;Goal-Setting
fixed

https://zhennovate.atlassian.net/browse/PHASE1-273 PHASE1-273 Copywriting - When there is 1 session left display it as (1 session) Nanan Gao Highest To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-224 PHASE1-224 cannot add program to calendar Nanan Gao Highest To Do 3/1;Program
1、未复现无法添加日历的 bug
2、从 detail 页面添加 program 到 calendar 的时候 默认添加为当前 module 的下一个 module fixed

如果用户已经完成一个 module, 那链接应该指向下一个 module
如果用户还没有完成当前的 module, 那链接应该指向当前的 module

https://zhennovate.atlassian.net/browse/PHASE1-285 PHASE1-285 Hide "Resume" Program button Nanan Gao High To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-284 PHASE1-284 Filter Empty State for Programs > Saved Page and Programs > Complete Page Nanan Gao High To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-282 PHASE1-282 Copywriting - Singular and Plural Forms for "Session" on Program Cards Nanan Gao High To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-288 PHASE1-288 Copywriting - Add action to calendar Nanan Gao High To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-220 PHASE1-220 Total Time Copywriting Update on Program Card Nanan Gao High To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-194 PHASE1-194 Glitchy text on program page Nanan Gao High To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-190 PHASE1-190 Add Gray Circle Icon to modules and sessions that have not gotten started Nanan Gao High To Do 3/1;Program
还没有那个 inprogress icon
目前只有两种状态，完成和未完成没有第三种状态

https://zhennovate.atlassian.net/browse/PHASE1-170 PHASE1-170 Sorting Logic for Entries page currently not working Nanan Gao High In Progress 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-80 PHASE1-80 Copywriting - Coaching Path Nanan Gao High To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-75 PHASE1-75 Copywriting - Home Page String Update Nanan Gao High To Do 3/1;Home
fixed

https://zhennovate.atlassian.net/browse/PHASE1-287 PHASE1-287 Copywriting - Weekly Goal Toast Notification Nanan Gao Medium To Do 3/1;Goal-Setting
fixed

https://zhennovate.atlassian.net/browse/PHASE1-286 PHASE1-286 Copywriting - Program Save/Unsaved Toast Notification Nanan Gao Medium To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-281 PHASE1-281 Add empty state to (New) program page Nanan Gao Medium To Do 3/1;Program

https://zhennovate.atlassian.net/browse/PHASE1-280 PHASE1-280 Copywriting - Update Empty State on entry page Nanan Gao Medium To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-278 PHASE1-278 Copywriting - Update entry page micro-copywriting Nanan Gao Medium To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-277 PHASE1-277 Add Quiz as its own filter to this page Nanan Gao Medium To Do 3/1;Program
陈禹修改

https://zhennovate.atlassian.net/browse/PHASE1-276 PHASE1-276 Add "Quiz" as its own checkbox to entries page Nanan Gao Medium To Do 3/1;Program
等待陈禹添加 Quiz 类别后 新增 Quiz 的 item

https://zhennovate.atlassian.net/browse/PHASE1-130 PHASE1-130 Make Submenu Container bigger so that it does not hide or cut the text off Nanan Gao Medium To Do 3/1;Program
目前先隐藏起来了

https://zhennovate.atlassian.net/browse/PHASE1-104 PHASE1-104 Update Font Weight for Text on Coaching Path Nanan Gao Medium To Do 3/1;Program
fixed

https://zhennovate.atlassian.net/browse/PHASE1-175 PHASE1-175 Learning Goals - Copywriting Typo in Window Title Nanan Gao Low To Do 3/1;Goal-Setting
fixed

https://zhennovate.atlassian.net/browse/PHASE1-28 PHASE1-28 Adding Breakpoints to make the design responsive to browser Window / Device size Nanan Gao Lowest To Do 3/1
手机和 pc 分开设计和 coding

## 待解决

https://zhennovate.atlassian.net/browse/PHASE1-197
saved 状态和前三种不是同一级别，是单独存在的
不能采用目前的方案，需要重新写

https://zhennovate.atlassian.net/browse/PHASE1-170
目前是按照

排序后的 action

排序后的 assessment

排序后的 reflection
期望；
所有的 entry 项目全部混在一起排序

## 2021-02-18

Quote of the Day Bug https://zhennovate.atlassian.net/browse/PHASE1-173
1、只显示一条 fixed
2、每 24 小时后台返回需要变化 陈禹
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
fixed 接口调用时没有传递 userid

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
2、首页 quit 之后 点击 module 应该显示 plan

https://zhennovate.atlassian.net/browse/PHASE1-267
fixed

https://zhennovate.atlassian.net/browse/PHASE1-181
陈禹
可能是脏数据问题 并非 bug

https://zhennovate.atlassian.net/browse/PHASE1-187
fixed

168 - Missing Action Pieces on demo-us.Zhennovate https://zhennovate.atlassian.net/browse/PHASE1-168
设计稿在 bug 里面
1、用户若是离开，再点回该 Action module 的话，应该看到该界面 【等待接口给出当前做到哪一步】
2、卡片内容修改【等待 UI 出图】
3、动画由 paperfrom 做，不在自己提供 gif fixed
4、complete 做完之后重新做正常显示 plan，状态为做完 fixed

224 - Cannot Add Program to Calendar https://zhennovate.atlassian.net/browse/PHASE1-224
没修好
fixed

209 - Cannot add action to Outlook and Apple calendars https://zhennovate.atlassian.net/browse/PHASE1-209
与 224 关联
fixed

208 - Weekly Goal - Copywriting https://zhennovate.atlassian.net/browse/PHASE1-208
未完成、完成、超额完成 话术

🔥 🐛 🔥【高晗 Bug 2/16 清单】这是第一批需要尽快修好的 bug, 请于周二（2 月 16 日）完成：Han's Bug list, to be fixed on 2/16 @nagao8856

## 2021-02-17

=================
2/9 日的剩余 4 个大 bug:
=================

149 - Homepage Action Card dropdown options do not work https://zhennovate.atlassian.net/browse/PHASE1-149
1、calendar fixed
2、complete action fixed
3、quit action fixed

## 测试出的问题

1、重复做 paperfrom 但是首页没有重复计数 陈禹
2、program 跳转是否需要单独判断 陈禹

202 - Weekly Goal Complete - Pop-up should only happen once and never happen again after user closes the pop-up https://zhennovate.atlassian.net/browse/PHASE1-202
A1 情况介绍：
用户设定了一星期完成 2 个 action 的目标。
目标达到，首页 weekly goal 的圈圈转满。
用户看到一个庆祝的动画。用户看完并关掉此动画。
fixed

A1 情况介绍：
在 A1 的基础上，用户继续做 action.
首页 weekly goal 保持饱满。
如果用户在同一周内超标多做了 1 个 action，那么就显示 3/2。如果用户超标多做了 2 个 action，那么就显示 4/2。以此类推。
用户不会再看到多余的动画。
fixed

B 情况介绍：
用户设定了一星期完成 2 个 action 的目标。目标达到，首页 weekly goal 的圈圈转满。用户看到一个庆祝的动画。用户看完并关掉此动画。
用户想提高对自己的挑战，于是把这星期的目标调成 4 个 action.

这时：
首页 weekly goal 的圈圈从满变成不满。显示 2/4，因为用户刚完成了 2 个 action 也算在内。
当用户在同一周实现了另外 2 个 action 的时候，首页 weekly goal 的圈圈转满。用户将可以再一次看到庆祝的动画。用户看完并关掉此动画。
如果用户没有在同一周实现另外 2 个 action，那么用户是看不到动画的。
当下一周来临时，weekly goal 的圈圈将重新从零开始。目标保留用户最后一次的设定。
fixed

C 情况介绍：
用户设定了一星期完成 6 个 action 的目标。目标达到，首页 weekly goal 的圈圈转满。用户看到一个庆祝的动画。用户看完并关掉此动画。
用户想放松一下，于是把这星期的目标调成 2 个 action.

这时 (就像 A2 情景一样的逻辑）：
首页 weekly goal 的圈圈仍然保持饱满。显示 6/2，因为用户刚完成了 6 个 action。
如果用户在同一周实现了另外的 action，比如说用户又做了 2 个 action，这样一来这周就总共有 8 个 action 了。这时 weekly goal 的圈圈仍然保持饱满，显示 8/2，但不会出现新动画。
fixed

253 - in-progress program shouldn't appear in New/Available at any time https://zhennovate.atlassian.net/browse/PHASE1-253
陈宇修改

197 - Make sure when clicking into an in-progress program display coaching path
https://zhennovate.atlassian.net/browse/PHASE1-197
1、点击在首页和在 inprogress 直接跳转到 paperfrom 了 fixed

251 - Unable to scroll through paperform results page embedded on our platform after user clicks on submit button on paperform https://zhennovate.atlassian.net/browse/PHASE1-251
paperfrom 的适配问题
这是 paperfrom 的适配问题，并非我们的问题，可以看到在视频里 paperfrom 使用了类似 section 的一块一块滑动的布局，可能是这个原因导致

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
2/17 日新分配的 bug （大部分是小 bug):
====================================

260 - Coaching Path Formatting - Module Indentation from Session https://zhennovate.atlassian.net/browse/PHASE1-260
fixed

## 2021--2-15

🔥 🐛 🔥【高晗 Bug 2/9 清单】这是第一批需要尽快修好的 12 个 bug, 请于周二至周三（2 月 9-10 日）完成：Han's Bug list, to be fixed on 2/10 @nagao8856

168 - Missing Action Pieces on demo-us.Zhennovate https://zhennovate.atlassian.net/browse/PHASE1-168
等待 dizhen 和 linda 讨论结果

201 - Action Completed Status https://zhennovate.atlassian.net/browse/PHASE1-201
前端已经修改成 module 结束时显示 icon，后端需要配合修改
禹哥修改

211 - Error when clicking on "Complete Action" on homepage https://zhennovate.atlassian.net/browse/PHASE1-211
怀疑是脏数据导致

210 - Error with embedded link - Add Action to Google Calendar https://zhennovate.atlassian.net/browse/PHASE1-210
1、地图位置不能放链接 直接放地址
2、404 问题已修改 fixed

216 - Cannot add program to calendar https://zhennovate.atlassian.net/browse/PHASE1-216
fleep 待沟通
陈宇在后端添加日历的时候对分享日历详情进行配置

224 - Add Program to Calendar - Content / Copywriting https://zhennovate.atlassian.net/browse/PHASE1-224
fleep 待沟通，program 无法添加富文本到 calendar

225 - Add Action to Calendar - Content / Copywriting https://zhennovate.atlassian.net/browse/PHASE1-225
1、地图位置不能放链接

149 - Homepage Action Card dropdown options do not work https://zhennovate.atlassian.net/browse/PHASE1-149
1、calendar fixed
2、complete action fixed
3、quit action 前端问题

222 - Module Completion Status Gets Marked at the Wrong Time - Logic Flaw https://zhennovate.atlassian.net/browse/PHASE1-222
前端 fixed，但是需要后端也修改下含有 complete paperfrom 的触发机制

188 - Unsaving from available page https://zhennovate.atlassian.net/browse/PHASE1-188
fixed

204 - Bookmark Bug in Saved tab https://zhennovate.atlassian.net/browse/PHASE1-204
fixed 和 182 关联

202 - Weekly Goal Complete - Pop-up should only happen once and never happen again after user closes the pop-up https://zhennovate.atlassian.net/browse/PHASE1-202
