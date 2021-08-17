<template>
  <v-container>
    <form class="entrada-dados">
      <input
        class="input filtro"
        type="search"
        placeholder="Filtre imagens pelo nome"
        v-on:input="pesquisa = $event.target.value"
      />
      <div>
      <input
        class="input add"
        type="text"
        placeholder="Adicionar nova imagem (URL)"
        v-model="novaImagem"
        @keydown.enter="adicionarImagem"
      />
      <v-icon class="hidden-icon" @click="esconder = !esconder">mdi-eye</v-icon>
      
      <div class="exemplos"  :class="{ hidden: esconder }"> 
        <span class="ml-8 font-weight-bold">Exemplos:</span>
        <ul>
          <li class="list-item">https://images.unsplash.com/photo-1504619988368-2911f094bac5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80</li>
          <li class="list-item">https://images.unsplash.com/photo-1455448972184-de647495d428?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1068&q=80</li>
          <li class="list-item">https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80</li>
          <li class="list-item">https://images.unsplash.com/photo-1628883058093-c6a36e3bba27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80</li>
          </ul>
        </div>

      </div>
      
    </form>
    

    <h1 class="pt-5 pl-4">Minha Galeria</h1>

    <v-list-item class="mt-5">
      <v-list-item-icon>
        <v-icon>mdi-exclamation</v-icon>
      </v-list-item-icon>
      <v-list-item-content class="font-italic">
        Role com o mouse sobre a imagem para descer
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-source-commit-start</v-icon>
      </v-list-item-icon>
      <v-list-item-content class="font-italic">
        Segure clique esquerdo sobre a imagem para ampliar
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <table>
      <tr class="table-container">
        <td class="foto-item" v-for="imagem of pesquisaImagem" :key="imagem.id">
          <div class="table-item mt-10">
            <img :src="imagem.url" />
            <p>{{ imagem.titulo }}</p>
          </div>
          <div class="edit mt-8">
            <v-text-field
              label="Adicionar nome para a imagem"
              type="text"
              v-model="novoTitulo[imagem.id]"
              @keydown.enter="adicionarNome(imagem.id)"
            >
              <v-icon slot="append" @click="adicionarNome(imagem.id)" small>mdi-circle-edit-outline</v-icon>
            </v-text-field>
            <v-text-field
              label="Editar (URL)"
              v-model="editURL[imagem.id]"
              @keydown.enter="editarImagem(imagem.id)"
            >
              <v-icon slot="append" class="mr-2" @click="editarImagem(imagem.id)" small>mdi-link-variant</v-icon>
              <v-divider slot="append" vertical></v-divider>
              <v-icon slot="append" class="ml-2" @click="apagarImagem(imagem.id)" small>mdi-delete-circle</v-icon>
            </v-text-field>
            
          
          </div>
        </td>
      </tr>

      <tr></tr>
    </table>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      uid: "",

      esconder: false,

      novaImagem: "",

      novoTitulo: [],

      editURL: [],

      pesquisa: "",

      imagens: [],
    };
  },

  mounted() {
    this.uid = fb.auth.currentUser.uid;
    this.renderMsg();
  },

  methods: {
    async renderMsg() {

      this.imagens = [];

      
      
      const logImagens = await fb.imagensCollection
        .where("owner", "==", this.uid)
        .get();

      for (const doc of logImagens.docs) {
        this.imagens.push({
          id: doc.id,
          titulo: doc.data().titulo,
          url: doc.data().url,
        });
      }
    },
    async adicionarImagem() {
      await fb.imagensCollection.add({
        titulo: "",
        url: this.novaImagem,
        owner: this.uid,
      })
      this.novaImagem = ""
      this.renderMsg();
    },

    async adicionarNome(imagem) {
      await fb.imagensCollection.doc(imagem).update({titulo: this.novoTitulo[imagem]})
      this.novoTitulo = [];

      this.renderMsg();
    },

    async editarImagem(imagem) {
      await fb.imagensCollection.doc(imagem).update({url: this.editURL[imagem]})
      this.editURL = [];

      this.renderMsg();
    },

    async apagarImagem(imagem) {
      await fb.imagensCollection.doc(imagem).delete();
      
      this.renderMsg();
    }

  },

  computed: {
    pesquisaImagem() {
      if (this.pesquisa) {
        let exp = new RegExp(this.pesquisa.trim(), "i");
        return this.imagens.filter((imagem) => exp.test(imagem.titulo));
      } else {
        return this.imagens;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,700;1,400&display=swap");

* {
  font-family: "Karla", sans-serif !important;
}

*::-webkit-scrollbar {
  display: none;
}

.entrada-dados {
  display: flex;
  padding: 0 20px 0;
}

.input {
  border-radius: 8px;
  font-size: 1.4em;
  width: 25%;
  margin: 25px 0 25px 10px;
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 10px;
  box-shadow: 1px 12px 5px rgba(0, 0, 0, 0.1);
  background: white;
}

.filtro {
  width: 500px;

  height: 100%;
  margin-right: 10em;
}

.add {
  margin-left: 14em;
  width: 600px;
}

.hidden {
  display: none;
}

.hidden-icon {
  padding: 20px;
}

.exemplos {
  width: 70%;
  font-size: 0.8em;
  line-height: -1em;
  margin-left: 25em;
  padding-left: 10px;
  box-shadow: 1px 6px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
 

}
.list-item {
  padding: 10px;
  font-size: 0.94em;
}

span {
  font-size: 1.125em;
  letter-spacing: 2px;
  margin-top: 5px;
  overflow: auto;
}

.foto-item {
  position: relative;
  float: left !important;
  margin: 0 5em 2em 2em;
}

.table-item {
  text-align: center;
  width: 300px;
  height: 280px;
  background: white;
  box-shadow: 12px 12px 5px rgba(0, 0, 0, 0.2);
  overflow: auto;
}

.table-item img {
  position: relative;
  width: 300px;
  height: auto;
  transition: ease-out 0.5s;
  border-bottom: 4px solid #cd853f;
}

.table-item img:active {
  position: absolute;
  top: -50px;
  right: -35px;
  left: 40px;
  height: auto;
  width: 400px;
  display: block;
  z-index: 999;
  transition-delay: 0.4s;
  border: 4px solid saddlebrown;
  border-radius: 8px;
}

p {
  font-size: 1.125em;
  letter-spacing: 2px;
  position: static;

  overflow: auto;
}

.edit {
  max-width: 100%;
}




</style>
