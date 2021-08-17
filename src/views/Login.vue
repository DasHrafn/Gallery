<template>
  <v-container fill-height fluid align-center justify-center>
    <v-flex>
      <v-card class="elevation-12 card">
        <v-toolbar color="primary">
          <v-toolbar-title class="login">Login </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field label="Email" v-model="user.email"></v-text-field>
            <v-text-field
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mb-8 mr-4" dark color="success" @click="login"
            >Login</v-btn
          >
          <v-btn class="mb-8 mr-4" dark color="warning" @click="reset"
            >Cancelar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-snackbar color="red" v-model="errorLogin" danger multline timeout="2000"
      >Usuário ou senha inválidos</v-snackbar>
      <v-dialog v-model="novaConta" persistent max-width="300">
        <v-card>
          <v-card-title>Conta não encontrada</v-card-title>
          <v-card-text>
            Deseja cadastrar a conta?
          </v-card-text>
          <v-card-actions>
            <v-spacer>
              <v-btn color="green darken-1" text @click="criarNovaConta">Sim</v-btn>
              <v-btn color="red darken-1" text @click="novaConta = false">Não</v-btn>
            </v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data() {
    return {
      user: {},
      show: false,
      errorLogin: false,
      novaConta: false,
    };
  },
  methods: {

      reset() {
      this.user = {};
    },

    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
        this.$router.push({ name: 'Home'})
      } catch(error) {
        const errorCode = error.code
        switch(errorCode) {
          case "auth/wrong-password":
            this.errorLogin = true
            break
          case "auth/invalid-email":
            this.errorLogin = true
            break
          case "auth/user-not-found":
            this.novaConta = true
            break
          default:
            this.errorLogin = true
            break
        }
      }
    },
    async criarNovaConta() {
      this.novaConta = false
      await fb.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)

      this.login();
    },
  },
};
</script>

<style>
.login {
  color: white;
}

.card {
  width: 900px;
}

#app > div > main {
  margin: 0 auto;
}

#app > div > main > div > div > div > div > header {
  width: 100%;
}
</style>
