<template>
  <v-row class="login" justify="center" align="center" style="height: 100%">
    <v-col cols="4" class="px-5 py-5 d-flex flex-column" style="gap: 10px">
      <v-form ref="formLogin" v-model="validForm" class="d-flex flex-column align-center" style="gap: 10px">
        <h1 class="text-center mb-3">Inicio de Sesión</h1>
        <v-text-field 
          v-model="user.email" 
          label="Correo Electrónico"
          :rules="rules.email" 
          filled>
        </v-text-field>

        <v-text-field
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="user.password"
          label="Contraseña"
          :rules="rules.password"
          filled
          @click:append="showPassword = !showPassword"
        >
        </v-text-field>

        <v-btn color="primary" large v-if="validForm && !loading" @click="save">
          Iniciar Sesión
        </v-btn>
        <v-btn color="primary" large v-else disabled :loading="loading">
          Iniciar Sesión
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import helperValidation from '~/helpers/validations';
export default {
  layout: 'not-auth',
  name: 'LoginPage',
  data: () => ({
    validForm: false,
    showPassword: false,
    loading: false,
    user: {
      email: '',
      password: ''
    },
    rules: {
      email: [
          value => helperValidation.isEmailValid(value) || 'Ingrese correo válido'
      ],
      password: [
          // value => helperValidation.isPasswordValid(value) || "Ingrese contraseña válida"
      ]
    }
  }),
  methods: {
    ...mapActions("account",['login']),
    async save(){
      try {
        this.loading = true
        let res = await this.login(this.user)
        console.log("res",res)
      } catch (error) {
        console.log("error",error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.login{
  .v-text-field{
    width: 100%;
  }
  .v-btn{
    max-width: 200px
  }
}
</style>
