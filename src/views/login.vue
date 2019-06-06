<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录ESAP云平台
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="server">
                            <Input v-model="form.server" placeholder="请填入ESAP服务器地址，如erp8.net:9090">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <!-- <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem> -->
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请填入admin密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">用户名和密码不能为空</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import md5 from 'md5';
import { Message } from 'element-ui';
export default {
    data () {
        return {
            form: {
                server: '',
                userName: 'admin',
                password: '',
                user: '',
                pwd: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            Cookies.set('esap_server', this.form.server);
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.form.user = this.form.userName;
                    this.form.pwd = md5(this.form.password);
                    this.form.password = '';
                    let apiUrl = 'http://' + this.form.server + '/login/';
                    // let apiUrl = this.$store.state.app.appUrl + 'login/'
                    this.$http.post(apiUrl, this.form)
                        .then(r => {
                            if (r.data.result) {
                                localStorage.token = r.data.token;
                                this.$store.commit('setUserName', this.form.user);
                                localStorage.setItem('esap_user', this.form.user);
                                localStorage.setItem('esap_token', r.data.token);

                                Cookies.set('user', this.form.userName);
                                Cookies.set('password', this.form.pwd);
                                this.$store.commit('setAvator', 'https://erp8.net/static/img/avatar.jpg');
                                if (this.form.userName === 'admin') {
                                    Cookies.set('access', 0);
                                } else {
                                    Cookies.set('access', 1);
                                }
                                this.getData();
                                this.$router.push({
                                    name: 'home_index'
                                });
                            } else {
                                Message({ message: '登陆失败:' + r.data.errmsg });
                            }
                        })
                        .catch(e => {
                            Message({ message: '连接超时，请检查esap服务是否已启动...\n' + e });
                        });
                }
            });
        },
        getData () {
            this.$http.get('http://' + this.form.server + '/admin/config')
                .then(r => { this.$store.state.app.form = r.data.data; });
        }
    },
    mounted () {
        let s = Cookies.get('esap_server');
        if (s !== '' && s !== undefined) this.form.server = s;
    }
};
</script>