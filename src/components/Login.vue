<template>
  <div class="login">
    <a v-if="userInfo" class="login__name" @click.prevent="isUserMenuOpen = !isUserMenuOpen">{{ fullName }}</a>
    <ul v-if="isUserMenuOpen" class="login__list" ref="loginList">
      <li class="login__item" @click="goToProfile"><span>Профиль</span></li>
      <li class="login__item" @click="logout"><span>Выйти</span></li>
    </ul>
    <Button v-if="!userInfo" class="login__btn" @click.native="openLoginForm">Войти</Button>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import logout from "@/mixins/logout.mixin.js";

  export default {
    name: "Login",
    mixins: [logout],
    data() {
      return {
        isUserMenuOpen: false,
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
      fullName() {
        return `${this.userInfo.profile.first_name} ${this.userInfo.profile.surname}`;
      },
    },
    methods: {
      openLoginForm() {
        this.$store.dispatch("openModal", {type: "LoginForm"});
      },
      closeUserMenuKeyboard(e) {
        if (e.code === "Escape" || e.keyCode === 27) { //e.keyCode - deprecated
          this.closeUserMenu();
        }
      },
      closeUserMenu() {
        this.isUserMenuOpen = false;
      },
      goToProfile() {
        this.closeUserMenu();
        this.$router.push("/profile", () => {});
      },
    },
    watch: {
      isUserMenuOpen() {
        if (this.isUserMenuOpen) {
          window.addEventListener("keyup", this.closeUserMenuKeyboard);
          setTimeout(() => {document.addEventListener("click", this.closeUserMenu);}, 0);
        } else {
          window.removeEventListener("keyup", this.closeUserMenuKeyboard);
          document.removeEventListener("click", this.closeUserMenu);
        }
      },
    },
  }
</script>

<style lang="scss">
  .login {
    flex-shrink: 0;
    width: 350px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &__list {
      position: absolute;
    }
    &__name {
      cursor: pointer;
      color: var(--prime-color);
      transition: all 0.2s ease;
      &:hover {
        color: var(--common-text-color);
      }
      @media (max-width: 1719px) {
        font-size: 16px;
      }
    }
    &__btn {
      flex-shrink: 0;
    }
    &__list {
      width: 200px;
      right: 0;
      bottom: -60px;
    }
    &__item {
      transition: all 0.2s ease;
      cursor: pointer;
      padding: 10px 30px;
      color: var(--prime-color);
      background-color: #363636;
      text-align: center;
      &:not(:last-child) {
        border-bottom: 1px solid var(--prime-color);
      }
      &:hover {
        color: var(--common-text-color);
      }
    }
  }
</style>