<template>
  <div class="modal" :class="{'modal--show': isModalOpen}" @click.self="closeModal">
    <div class="modal__content">
      <div class="modal__close" @click.self="closeModal"></div>
      <component :is="modalType"></component>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import RegisterForm from "@/components/RegisterForm.vue";
  import LoginForm from "@/components/LoginForm.vue";
  import RestoreForm from "@/components/RestoreForm.vue";
  import Story from "@/components/Story.vue";
  import Message from "@/components/Message.vue";

  export default {
    name: "Modal",
    components: {RegisterForm, LoginForm, RestoreForm, Story, Message},
    methods: {
      closeModal() {
        this.$store.dispatch("closeModal");
      },
      closeModalKeyboard(e) {
        if (e.code === "Escape" || e.keyCode === 27) {
          this.closeModal();
        }
      },
    },
    computed: {
      ...mapGetters(["isModalOpen", "modalType", "modalData"]),
    },
    watch: {
      isModalOpen() {
        if (this.isModalOpen) {
          window.addEventListener("keyup", this.closeModalKeyboard);
        } else {
          window.removeEventListener("keyup", this.closeModalKeyboard);
        }
      },
    },
  }
</script>

<style lang="scss">
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(#ffffff, 0.5);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    &__content {
      max-height: 90vh;
      overflow: auto;
      transition: all 0.3s ease;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 40%;
      left: 50%;
      background-color: var(--common-bg-color);
      width: 900px;
      padding: 70px;
      border-radius: 5px;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.21), 0 10px 20px 0 rgba(0, 0, 0, 0.1);
      @media (max-width: 991px) {
        width: 95vw;
        padding: 50px 30px;
      }
    }
    &__close {
      top: 40px;
      right: 40px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      position: absolute;
      @media (max-width: 991px) {
        top: 15px;
        right: 15px;
      }
      &:before, &::after {
        transition: all 0.1s ease;
        position: absolute;
        display: block;
        content: "";
        width: 40px;
        height: 3px;
        background-color: var(--light-bg-color);
        border-radius: 1px;
        left: 50%;
        top: 50%;
      }
      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &:hover {
        &::before, &::after {
          background-color: var(--prime-color);
        }
      }
    }
    &--show {
      opacity: 1;
      visibility: visible;
      .modal__content {
        top: 50%;
      }
    }
  }
</style>