<template>
  <section class="promo">
    <div class="container promo__container">
      <div class="promo__box1">
        <p class="promo__phraze">Прими участие в конкурсе от St-Remy <a :href="promoVkLink" class="promo__link" target="blank">#ДрузьяForever</a>.</p>
        <div class="promo__box2">
          <h2 class="promo__head">St-Remy создаёт историю уже более 120-лет. Историю вечную как определение настоящей и крепкой дружбы.</h2>
          <p class="promo__text"><span>П</span>амять – это прекрасное дарование человеку, с помощью которого можно вернуться в любое место и время. Конкурс от St-Remy дарит вам возможность вернуться в самые лучшие моменты вашей жизни, связанные с близкими друзьями. Всегда интересно сравнивать «тогда» и «сейчас». Что изменилось в мире, и как изменились мы сами, единственное, что остается неизменным - это наша дружба!</p>
          <div class="promo__text">Повторите снимок точь-в-точь с тем, который вы нашли в фотоальбоме, повторяя не только место, но и эмоции, изображенные на этом снимке. Загружайте фотографии «тогда» и «сейчас» на наш сайт, участвуйте в конкурсе #ДрузьяForever. Участники, чьи снимки наберут большее количество голосов, получат подарочный набор на компанию друзей от St-Remy! Победителя ждёт необычный приз, который может войти в вашу историю… St-Remy оживит ваши лучшие воспоминания с друзьями, наполнив их новыми эмоциями!</div>
        </div>
      </div>
      <div class="promo__images">
        <img src="@/assets/images/promo-01.jpg" alt="Promo">
        <img src="@/assets/images/promo-02.jpg" alt="Promo">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Promo",
    data() {
      return {
        promoVkLink: CONFIG.PROMO_VK_LINK,
      };
    },
} 
</script>

<style lang="scss">
  .promo {
    margin-bottom: 150px;
    @media (max-width: 1279px) {
      margin-bottom: 40px;
    }
    &__box1 {
      display: flex;
      margin-bottom: 100px;
      @media (max-width: 1279px) {
        flex-direction: column;
        margin-bottom: 40px;
      }
    }
    &__phraze {
      color: var(--prime-color);
      font-size: 14px;
      font-weight: 700;
      font-family: var(--second-font);
      max-width: 200px;
      flex-shrink: 0;
      margin-right: 120px;
      @media (max-width: 1719px) {
        margin-right: 80px;
      }
      @media (max-width: 1279px) {
        margin-bottom: 20px;
      }
    }
    &__link {
      color: var(--prime-color);
      text-decoration: underline;
      transition: all 0.2s ease;
      &:hover {
        color: var(--common-text-color);
      }
    }
    &__box2 {
      max-width: 950px;
    }
    &__head {
      color: var(--prime-color);
      font-size: 30px;
      font-weight: 700;
      font-family: var(--second-font);
      max-width: 700px;
      margin-bottom: 60px;
      line-height: 40px;
      @media (max-width: 1279px) {
        max-width: 100%;
        margin-bottom: 40px;
      }
      @media (max-width: 575px) {
        font-size: 24px;
      }
    }
    &__text {
      line-height: 27px;
      &:not(:last-child) {
        margin-bottom: 50px;
      }
      @media (max-width: 1719px) {
        font-size: 16px;
      }
      @media (max-width: 1279px) {
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
       span {
        font-size: 200px;
        float: left;
        display: block;
        height: 135px;
        position: relative;
        top: 52px;
        @media (max-width: 1279px) {
          font-size: 16px;
          float: none;
          display: inline;
          height: auto;
          position: static;
        }
      }
    }
    &__images {
      display: flex;
      justify-content: space-between;
      @media (max-width: 575px) {
        flex-direction: column;
        align-items: center;
      }
      img {
        border: 6px solid var(--prime-color);
        max-width: 48%;
        object-fit: cover;
        @media (max-width: 575px) {
          max-width: 100%;
          &:first-child {
            margin-bottom: 15px;
          }
        }
      }
    }
  }
</style>