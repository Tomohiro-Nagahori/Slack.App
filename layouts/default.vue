<template>
  <div class="app-layout">
    <div class="sidebar">
      <p>チャンネル一覧</p>
      <p v-for="channel in channels" :key="channel.name">
        <nuxt-link :to="`/channels/${channel.id}`">{{ channel.name }}</nuxt-link>
      </p>
      <p v-if="isAuthenticated" class="logout" v-on:click="logout">ログアウト</p>
    </div>
    <div class="main-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { db, firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      channels: []
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    ...mapActions(['setUser']),
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
          window.alert('ログアウトに成功！')
        })
        .catch((e) => {
          window.alert('ログアウトに失敗しました！')
          console.log(e)
        })
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user)
        db.collection('profiles').doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      }
    })
    db.collection('channels').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.channels.push({id: doc.id, ...doc.data()})
        })
      })
  },
}
</script>

<style>
.app-layout {
  display: flex;
}

.sidebar {
  width: 300px;
  background: #4A4141;
  height: 100vh;
  padding: 20px;
}

.sidebar p {
  color: #DDDDDD;
  padding-top: 4px;
}

.main-content {
  width: 100%;
  background: #F1F1F1;
  height: 100vh;
}

.logout {
  position: absolute;
  bottom: 10px;
  cursor: pointer;
}
</style>
