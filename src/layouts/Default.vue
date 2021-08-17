<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon>mdi-arrow-left-circle-outline</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Galeria</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>mdi-account</v-icon>
    </v-app-bar>
      <form>
        <input class="pesquisar" type="text" placeholder="Filtre imagens pelo nome">
      </form>
    <v-navigation-drawer app v-model="drawer" fixed temporary>
      <v-list dense>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-account</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list rounded>
          <v-list-item v-for="item in items" :key="item.title" :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
               </v-list-item-icon>
              <v-list-item-content>{{ item.title }}</v-list-item-content>
          </v-list-item>
        </v-list>
    
      </v-list>

    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
   data: () => (
     { drawer: null,
     items: [
       {title: "Home", icon: "mdi-home-circle", to: "/"},
       {title: "Perfil", icon: "mdi-clipboard-account", to: "/perfil"},
       {title: "Sair", icon: "mdi-exit-to-app", to: "/login"}
     ]}

      
     
     ),

}
</script>

<style>
 .v-toolbar {
    width: 90%;
    margin: 0 auto;
  }
</style>