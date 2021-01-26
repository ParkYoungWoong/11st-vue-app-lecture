<template>
  <div>
    <nav
      v-if="done"
      :class="{ show: isShowLNB }">
      <div class="user">
        <a href="javascript:void(0)">로그인</a>
        <div class="flex-space"></div>
        <div
          class="close-nav"
          @click="offNav"></div>
      </div>
      <div class="container">
        <!--GROUP-->
        <div class="group categories">
          <h3 class="group__title">
            {{ navigations.categories.title }}
          </h3>
          <ul class="group__list">
            <li
              v-for="(item1, index) in navigations.categories.list"
              :key="item1.name">
              <div class="category-icon"></div>
              {{ item1.name }}
              <ul class="depth">
                <li
                  v-for="item2 in item1.list"
                  :key="item2.name">
                  <a :href="item2.href">
                    {{ item2.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="exhibitions">
        <a :href="navigations.exhibitions.href">
          <img
            :src="navigations.exhibitions.src"
            :alt="navigations.exhibitions.name" />
        </a>
      </div>
    </nav>

    <!--BACKGROUND-->
    <div
      v-if="isShowLNB"
      class="nav-bg"
      @click="offNav"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      navigations: {},
      done: false
    }
  },
  computed: {
    isShowLNB () {
      // this.$store.state.네임스페이스.상태
      return this.$store.state.navigation.isShowLNB
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.navigations = await this.$fetch({
        requestName: 'navigations'
      })
      this.done = true
    },
    offNav () {
      this.$store.dispatch('navigation/offNav')
    }
  }
}
</script>

<style scoped lang="scss">
  nav {
    width: 300px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: #f6f6f6;
    transition: transform .4s;
    transform: translateX(-300px);
    &.show {
      transform: translateX(0);
    }
    .user {
      height: 70px;
      padding: 0 25px;
      background-color: #fff;
      display: flex;
      align-items: center;
      a {
        font-size: 20px;
        font-weight: 700;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      .flex-space {
        flex-grow: 1;
      }
      .close-nav {
        width: 36px;
        height: 36px;
        background-image: url("https://trusting-williams-8cacfb.netlify.app/images/globals_2x.png");
        background-position: -261px -203px;
        background-size: 363px;
        cursor: pointer;
      }
    }
    .container {
      height: calc(100% - 164px);
      overflow-y: auto;
      padding: 10px 0;
      box-sizing: border-box;
      // Common!
      .group {
        &__title {
          font-size: 17px;
          font-weight: 700;
          padding: 14px 25px;
        }
        &__list {
          li {
            display: flex;
            align-items: center;
          }
        }
      }
      // Each..
      .group {
        &.categories {
          .group__list {
            > li {
              height: 50px;
              padding: 0 25px;
              .category-icon {
                width: 24px;
                height: 24px;
                margin-right: 4px;
                background-image: url("https://trusting-williams-8cacfb.netlify.app/images/categories_2x.png");
                background-size: 48px; // Origin 96px
              }
              @for $i from 1 through 13 {
                &:nth-child(#{$i}) {
                  .category-icon {
                    background-position: 0 -#{($i - 1) * 24}px;
                  }
                }
              }
              // TODO: 클래스 선택자로 수정해야 함!
              &.hover {
                background-color: #ff5534;
                color: #fff;
                @for $i from 1 through 13 {
                  &:nth-child(#{$i}) {
                    .category-icon {
                      background-position: -24px -#{($i - 1) * 24}px;
                    }
                  }
                }
                .depth {
                  display: block;
                }
              }
              .depth {
                display: none;
                width: 200px;
                height: 100%;
                border-left: 1px solid #eee;
                padding: 20px 0;
                box-sizing: border-box;
                position: fixed;
                top: 0;
                bottom: 0;
                left: 300px;
                background-color: #fff;
                font-size: 15px;
                overflow-y: auto;
                li {
                  height: 40px;
                  a {
                    padding: 0 20px;
                  }
                  &:hover {
                    background-color: #fafafa;
                    color: #ff5534;
                    a {
                      color: #ff5534;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .exhibitions {
      width: 300px;
      height: 94px;
      a {
        display: block;
        width: inherit;
        height: inherit;
        cursor: pointer;
        img {
          width: inherit;
          height: inherit;
        }
      }
    }
  }
  .nav-bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(#000, .2);
    z-index: 98;
  }
</style>
