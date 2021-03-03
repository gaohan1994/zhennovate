接口缺少：
1、send code again fixed
2、user active 报错 fixed
3、remember me 页面关闭的时候 2 天左右

## error case

### SIGN ERRORCASE

error case 1 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f78aace14bbb185238
fixed

error case 2 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f774d0ec1142ffa190
后端 fixed

error case 3 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f78b972ca5b906aa53
后端 去掉了

error case 4 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f7584d0facd343d3d7
fixed

error case 5 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f71325742793d1bcf1
fixed

### RESET-PASSWORD ERRORCASE

error case 1 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024fa6b1bd4ad4eec6b90
fixed

error case 2 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f8e140cb774a35006a
fixed

error case 3 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f8d669a87eda0ebe3d
fixed

error case 4 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f82c9bac1290b04ff8
fixed

error case 5 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f8d4fd62180e499eb5
fixed 但未自测

### FORGOT-PASSWORD ERRORCASE

error case 1 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f8cb3df5157f719c5f
未完成 听说去掉了

error case 2 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f8df3ca51889d1b524
fixed

error case 3 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f7a30a509f174c58a5
fixed

### SIGNUP-CHECK ERRORCASE

error case 1 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f8d7905915c1466ddb
后端修改
fixed

error case 2 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f8e5e62c8aa705dcaf
没有这种情况

### SIGNUP ERRORCASE

error case 1 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f70d9d5f2d10b23250

error case 2 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f775ab7b6ac4e88a69
是否可以分开，如果是一个没法操作
fixed

error case 3 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f7ab277510cb1f225f
fixed

error case 4 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f7cb3df5157f719c06
fixed

error case 5 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f77163e274bb927c62
后端修改 fixed

error case 6 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f7841f3813db610896
fixed

### SIGNUP-CREATE-PASSWORD ERRORCASE

error case 1 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f73e2bd0ab5f230ec1
fixed

error case 2 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f7b4b6317a6fbb1a03
fixed

error case 3 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f706a9bd90153eb0df
fixed

error case 4 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f79583b2a68df7f543
fixed

## sign

1、用户未 check 状态下 在 setting 页面有一行字，提示去 check email，但是不影响用户正常操作，相当于注册完成

2、check 页面 check 成功之后显示 verify email 3s 后显示 paperform

3、如果用户没有 onboarding，进入 zhennovate 任何操作都进入 onboarding paperform 页面，死胡同，必须做完 onboarding paperform 才能进入 zhennovate 操作

4、如果用户在 setpassword 页面没有成功设置密码，则用户在 signup 页面还可以使用该邮箱重新注册（相当于没注册成功）

5、sign up 或者 setpassword 之前点击左上角可以回首页，如果 setpassword，但是还未 check 和做 onboarding paperfrom 则不可以点击左上角返回首页，同时触发 3

## 02-28 Frontend - 这个周末前端需要落实的

### 为什么进入 program describe 页面不是默认在最上面？

### 估时还需要多久上线

### 异常流

sign up errorcase 5 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f77163e274bb927c62
forgot password errorcase 1 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f8cb3df5157f719c5f
reset password errorcase https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f8d4fd62180e499eb5
sign in errorcase 2 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f774d0ec1142ffa190
sign in errorcase 3 https://app.zeplin.io/project/5f6ebe7037ba5f49f5943de8/screen/603024f78b972ca5b906aa53

### Sign up

### Sign in

1、右上角改成 FirstName fixed
2、welcome Name 改成 firstname fixed

> PHASE1-309, Copywriting - Weekly Goal, Highest, 3/1;Goal-Setting
> PHASE1-308, Hide Assessment in Entry before 3/1, Highest, 3/1;Program
> PHASE1-306, Copywriting - Footer, Highest, 3/1
> PHASE1-312, Click into a new program, should see top of the program-about page, not the bottom of the page, High, 3/1;Program
> PHASE1-311, Show progress bar when user has started a program but not done with first session yet, High, 3/1;Program
> PHASE1-310, When users log out, direct to Sign in Page, High, 3/1;Account_Authentication

# 以下事项： 上线后解决 - 3/2 到 3/9 日

5). Settings 账户管理

(b) 新用户刚进到平台，看到首页时，weekly goal 的圈圈，默认状态下选择为“casual - 1 action". 默认是 1 现在是 4 陈禹修改
(c) 新用户刚进平台，看到首页时，learning goal 里面，默认状态下的标签应该是“Career development", 然后具体的字眼应该默认写成"Take a moment to reflect on your career development. "这样简化你们前后端的工作量，你们就不用从 onboarding 的 paprform 里读取数据了。 陈玉修改

```jsx
// 组件失去焦点发生校验

const [help, setHelp] = usestatus('');
const [validateStatus, setvalidateStatus] = usestatus('');

const checkFormStatus = () => {
  form.validateFields([form.name]);
};

<Form.Item help={help} validateStatus={validateStatus}>
  <Input onBlur={checkFormStatus} />
</Form.Item>;

// 提交代码时，按钮触发发生校验
props.help;
const [help, setHelp] = usestatus('');
const [validateStatus, setvalidateStatus] = usestatus('');

<Form.Item help={help} validateStatus={validateStatus}>
  <Input onBlur={checkFormStatus} />
</Form.Item>;
```
