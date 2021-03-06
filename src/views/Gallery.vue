<template>
  <section class="gallery">
    <div class="container gallery__container">
      <h1 class="gallery__head" id="gallery">Участвуй в творческом конкурсе от St-Remy</h1>
      <p class="gallery__text">Поделись своей историей дружбы! Размещай свои и голосуй за понравившиеся работы участников с 01 октября до 30 ноября 2018 г.</p>
      <ul class="gallery__list">
        <li v-for="story in items" :key="story.id" class="gallery__item"> <!-- Начало итема -->
          <div class="gallery__image" @click="showStory(story)">
            <img :src="story.img_before.image" alt="before image">
            <img :src="story.img_after.image" alt="after image">
          </div>
          <span class="gallery__date">{{ `${story.img_before.date}/${story.img_after.date}` }}</span>
          <b class="gallery__author">{{ story.user }}</b>
          <div class="gallery__box1">
            <div class="gallery__share">
              <ul class="gallery__social">
                <li><a class="social-link social-link--ok social-link--mr15" title="Одноклассники" target="blank" :href="okShareLinkCreate(story.id)">ok.ru</a></li>
                <li><a class="social-link social-link--vk" title="Вконтакте" target="blank" :href="vkShareLinkCreate(story.id)">vk.com</a></li>
              </ul>
            </div>
          </div>
          <Button class="gallery__btn" @click.native="sendVoice(story)">
            Проголосовать
            <svg x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M53.333,224C23.936,224,0,247.936,0,277.333V448c0,29.397,23.936,53.333,53.333,53.333h64 c12.011,0,23.061-4.053,32-10.795V224H53.333z"/></g><g><path d="M512,304c0-12.821-5.077-24.768-13.888-33.579c9.963-10.901,15.04-25.515,13.653-40.725 c-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819,16.981-56.149,16.981-85.333c0-46.272-39.317-85.333-64-85.333 c-22.165,0-37.995,12.48-38.677,12.992c-2.517,2.027-3.989,5.099-3.989,8.341v72.341l-61.44,133.099l-2.56,1.301v228.651 C188.032,475.584,210.005,480,224,480h195.819c23.232,0,43.563-15.659,48.341-37.269c2.453-11.115,1.024-22.315-3.861-32.043 c15.765-7.936,26.368-24.171,26.368-42.688c0-7.552-1.728-14.784-5.013-21.333C501.419,338.731,512,322.496,512,304z"/></g></svg>
            <span class="gallery__likes">{{ story.voices }}</span>
          </Button>
        </li> <!-- Конец итема -->
      </ul>

      <paginate
        v-if="pageCount > 1"
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        prevText="Назад"
        nextText="Вперед"
        containerClass="pagination"
        pageLinkClass="pagination__link"
        prevLinkClass="pagination__link"
        nextLinkClass="pagination__link"
        active-class="pagination__link pagination__link--active"
        disabled-class="pagination__link pagination__link--disabled"
        :noLiSurround="true"
      >
      </paginate>

    </div>
  </section>
</template>

<script>
  import MetaInfo from "@/mixins/metaInfo.mixin.js";
  import {mapGetters} from "vuex";
  import {apiErrorHandler} from "@/utils/apiErrorHandler.util.js";
  import pagination from "@/mixins/pagination.mixin.js";
  import share from "@/mixins/share.mixin.js";

  export default {
    name: "Gallery",
    mixins: [MetaInfo, pagination, share],
    methods: {
      async sendVoice(story) {
        if (!this.userInfo) {
          this.$store.dispatch("openModal", {type: "LoginForm"});
          return;
        }
        try {
          const data = {
            history: story.id,
          };
          const response = await this.$store.dispatch("sendVoice", data);
          console.log(response.data);
          let text = null;
          console.log(story.voices);
          if (story.voices === response.data.voices) {
            text = this.$messages.VOICE_REJECT;
          } else {
            text = this.$messages.VOICE_ACCEPT;
          }
          this.$store.dispatch("openModal", {
            type: "Message",
            data: {text: text},
          });
          this.$store.dispatch("replaceStory", response.data);
          this.setupPagination(this.allStories, CONFIG.PAGINATION_GALLERY_PER_PAGE, "#gallery");
        } catch(err) {
          if (err.response.data.message) {
            this.$store.dispatch("openModal", {
              type: "Message",
              data: {head: this.$messages.GALLERY_VOICE_MODAL_HEAD, text: err.response.data.message},
            });
            return;
          }
          apiErrorHandler.call(this, err);
        }
      },
      showStory(story) {
        this.$store.dispatch("openModal", {
          type: "Story",
          data: {
            imgBefore: story.img_before.image,
            imgAfter: story.img_after.image,
            okLink: this.okShareLinkCreate(story.id),
            vkLink: this.vkShareLinkCreate(story.id),
            text: story.desc,
            author: story.user,
            date: `${story.img_before.date}/${story.img_after.date}`,
          },
        });
      },
    },
    computed: {
      ...mapGetters(["allStories", "userInfo"]),
    },
    async mounted() {
      try {
        await this.$store.dispatch("getAllStories");
        this.setupPagination(this.allStories, CONFIG.PAGINATION_GALLERY_PER_PAGE, "#gallery");
      } catch(err) {
        apiErrorHandler.call(this, err);
      }
    },
  }
</script>

<style lang="scss">
  .gallery {
    position: relative;
    z-index: 15;
    margin-top: 120px;
    margin-bottom: 320px;
    @media (max-width: 1719px) {
      margin-bottom: 40px;
    }
    &__head {
      font-size: 36px;
      font-family: var(--second-font);
      font-weight: 700;
      color: var(--prime-color);
      text-align: center;
      margin-bottom: 25px;
      @media (max-width: 991px) {
        font-size: 32px;
      }
    }
    &__text {
      max-width: 490px;
      margin: 0 auto;
      text-align: center;
      margin-bottom: 50px;
    }
    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, 500px);
      grid-gap: 80px 50px;
      justify-content: center;
      margin-bottom: 100px;
      @media (max-width: 1719px) {
        grid-template-columns: repeat(auto-fill, 560px);
      }
      @media (max-width: 991px) {
        grid-template-columns: repeat(auto-fill, 720px);
        grid-gap: 120px 0px;
      }
       @media (max-width: 575px) {
        grid-template-columns: repeat(auto-fill, 100%);
        grid-gap: 100px 0px;
      }
    }
    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__image {
      width: 500px;
      height: 500px;
      border: 6px solid var(--prime-color);
      margin-bottom: 25px;
      line-height: 0;
      cursor: pointer;
      transition: all 0.3s ease;
      @media (max-width: 1719px) {
        width: 560px;
        height: 560px;
      }
      @media (max-width: 991px) {
        width: 720px;
        height: 720px;
      }
      @media (max-width: 991px) {
        width: 540px;
        height: 540px;
      }
       @media (max-width: 575px) {
        width: 100%;
        height: 100%;
      }
      &:hover {
        border: 6px solid var(--light-bg-color);
        filter: brightness(1.2);
      }
      img {
        width: 100%;
        height: 50%;
        object-fit: cover;
        &:first-child {
          border-bottom: 1px solid var(--light-bg-color);
        }
      }
    }
    &__date {
      font-size: 14px;
      margin-bottom: 10px;
    }
    &__author {
      font-family: var(--second-font);
      font-weight: 700;
      font-size: 26px;
      margin-bottom: 20px;
      text-align: center;
    }
    &__box1 {
      position: relative;
    }
    &__share {
      position: relative;
      width: 20px;
      height: 22px;
      background: url("../assets/images/share-icon.png") center no-repeat;
      margin-bottom: 20px;
      transition: all 0.2s ease;
      cursor: pointer;
      opacity: 1;
      &:hover {
        .gallery__social {
          opacity: 1;
        }
      }
    }
    &__social {
      padding: 5px;
      background-color: var(--common-bg-color);
      opacity: 0;
      transition: all 0.2s ease;
      position: absolute;
      display: flex;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    &__btn {
      &:hover {
        svg {
          fill: var(--common-bg-color);
        }
      }
      svg {
        transition: all 0.2s ease;
        position: relative;
        top: 2px;
        width: 16px;
        height: 16px;
        fill: var(--light-bg-color);
        margin-left: 10px;
      }
    }
    &__likes {
      margin-left: 5px;
    }
  }
</style>


