<template>
  <div class="start">
    <div class="container start__container">
      <div class="start__icon"><span>18+</span></div>
      <h1 class="start__head">Привет!</h1>
      <span class="start__subhead">Для доступа необходимо подтвердить возраст.*</span>
      <span class="start__text">Дата рождения:</span>
      <form class="start__form" @submit.prevent="checkAge">
        <input type="date" class="start__input" v-model="age">
        <Button type="submit" class="start__btn">Перейти на сайт</Button>
      </form>
      <div class="start__note">*Сайт содержит информацию для лиц совершеннолетнего возраста. Сведения, размещенные на сайте, не являются рекламой, носят исключительно информационный и развлекательный характер, и предназначены только для личного использования.</div>
    </div>
  </div>
</template>

<script>
  import MetaInfo from "@/mixins/metaInfo.mixin.js";

  export default {
    name: "Start",
    mixins: [MetaInfo],
    data() {
      return {
        age: CONFIG.START_DEFAULT_BIRTH_DATE,
      };
    },
    methods: {
      checkAge() {
        const birthDate = new Date(this.age);
        const now = new Date();
        const age = now.getFullYear() - birthDate.getFullYear();
        const diff = now.setFullYear(1972) < birthDate.setFullYear(1972) ? age - 1 : age;
        if (diff >= 18) {
          this.$router.push("/");
          localStorage.setItem("agePass", true);
        } else {
          this.$store.dispatch("openModal", {
            type: "Message",
            data: this.$messages.YOUNG_ACCESS_DENIED_MESSAGE,
          });
        }
      }
    }
  }
</script>

<style lang="scss">
  .start {
    background: url("../assets/images/bg-01.jpg") center no-repeat;
    background-size: cover;
    height: 100vh;
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    &__icon {
      margin-top: auto;
      font-family: var(--second-font);
      font-weight: 700;
      font-size: 30px;
      color: var(--prime-color);
      width: 85px;
      height: 85px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 2px solid var(--prime-color);
      margin-bottom: 35px;
      @media (max-width: 1279px) {
        margin-bottom: 0;
        width: 60px;
        height: 60px;
        font-size: 22px;
        margin-bottom: 10px;
      }
    }
    &__head {
      font-family: var(--second-font);
      font-weight: 700;
      font-size: 48px;
      margin-bottom: 35px;
      @media (max-width: 1279px) {
        margin-bottom: 10px;
        font-size: 36px;
      }
    }
    &__subhead {
      font-size: 24px;
      margin-bottom: 35px;
      @media (max-width: 1279px) {
        margin-bottom: 10px;
        font-size: 18px;
      }
      @media (max-width: 575px) {
        text-align: center;
      }
    }
    &__text {
      margin: 15px;
      @media (max-width: 1279px) {
        margin: 10px;
      }
    }
    &__note {
      margin-top: auto;
      font-size: 14px;
      opacity: 0.7;
      max-width: 930px;
      text-align: center;
      margin-bottom: 50px;
      @media (max-width: 1279px) {
        margin-bottom: 20px;
      }
    }
    &__form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__input {
      padding: 12px 10px 12px 18px;
      border: 1px solid var(--prime-color);
      border-radius: 5px;
      background-color: transparent;
      color: var(--common-text-color);
      margin-bottom: 35px;
      &::placeholder {
        color: rgba(#ffffff, 0.5);
      }
      @media (max-width: 1279px) {
        margin-bottom: 10px;
      }
    }
  }
</style>