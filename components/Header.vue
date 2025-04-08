<template>
  <div>
    <header class="header">
      <h1 class="logo">
        <a href="https://microcms.io">
          <img
            class="logoImg"
            src="/images/logo.svg"
            width="422"
            height="80"
            alt="microCMS"
          />
        </a>
      </h1>
      <button class="menuBtn" @click="toggleOpen()">
        <img src="/images/icon_menu.svg" width="24" height="24" alt="menu" />
      </button>
      <div v-if="open" class="mask" @click="setOpen(false)"></div>

      <div class="menu" :class="{ isOpen: open }">
        <ul class="lists isMobile">
          <li class="list">
            <a href="https://microcms.io/contact">お問い合わせ</a>
          </li>
          <li class="list">
            <a href="https://microcms.io/pricing">料金プラン</a>
          </li>
          <li class="list">
            <a href="https://microcms.io/projects">導入事例一覧</a>
          </li>
          <li class="list">
            <a href="https://help.microcms.io/ja/knowledge" target="_blank"
              >ヘルプ</a
            >
          </li>
          <li class="list">
            <a
              href="https://blog.microcms.io/category/update/page/1/"
              target="_blank"
              >更新情報</a
            >
          </li>
          <li class="list">
            <a href="https://blog.microcms.io/" target="_blank">ブログ</a>
          </li>
          <li class="list">
            <a href="https://document.microcms.io/" target="_blank"
              >ドキュメント</a
            >
          </li>
          <li class="list">
            <a href="https://microcms.io/seminars">セミナー情報</a>
          </li>
          <li class="list">
            <a href="https://microcms.io/ebook">お役立ち資料</a>
          </li>
          <li class="list">
            <a href="https://templates.microcms.io">テンプレート</a>
          </li>
        </ul>

        <ul class="lists isDesktop">
          <li
            v-for="(menu, index) in desktopHeaderMenu"
            :key="index"
            class="list"
            @mouseover="handleOpenMenu(index)"
            @mouseleave="handleCloseMenu(index)"
          >
            <component
              :is="menu.isDropDown ? 'button' : 'a'"
              :type="menu.isDropDown ? 'button' : ''"
              :href="menu.isDropDown ? '' : menu.path"
              :class="menu.isDropDown ? 'dropDown' : ''"
              v-text="menu.name"
            />

            <!-- dropdown menu -->
            <template v-if="menu.contents.length > 0">
              <transition name="fade">
                <ul v-show="openDropDownMenu[index]" class="dropDownMenu">
                  <li
                    v-for="(content, contentIndex) in menu.contents"
                    :key="contentIndex"
                    class="dropDownMenuList"
                  >
                    <a :href="content.path" v-text="content.name" />
                  </li>
                </ul>
              </transition>
            </template>
          </li>
        </ul>

        <ul class="lists authLinks">
          <li class="list authLinksItem">
            <a class="signin" href="https://app.microcms.io/signin">ログイン</a>
          </li>
          <li class="list noMargin">
            <a class="signup" :href="`https://app.microcms.io${params}`"
              >無料ではじめる</a
            >
          </li>
        </ul>
      </div>
    </header>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: this.params || '',
      open: false,
      openDropDownMenu: [],
      desktopHeaderMenu: [
        {
          name: '機能',
          path: '',
          isDropDown: true,
          contents: [
            {
              name: 'エディタ',
              path: 'https://microcms.io/features/schema',
            },
            {
              name: 'カスタムフィールド',
              path: 'https://microcms.io/features/custom-field',
            },
            {
              name: 'コンテンツAPI',
              path: 'https://microcms.io/features/contents-api',
            },
            {
              name: 'マネジメントAPI',
              path: 'https://document.microcms.io/management-api/introduction',
            },
            {
              name: 'APIデータ連携',
              path: 'https://microcms.io/features/link-api',
            },
            {
              name: '画像編集',
              path: 'https://microcms.io/features/image-api',
            },
            {
              name: 'SDK',
              path: 'https://microcms.io/features/sdk',
            },
            {
              name: '権限管理',
              path: 'https://microcms.io/features/authority',
            },
            {
              name: 'ワークフロー',
              path: 'https://microcms.io/features/workflow',
            },
            {
              name: 'セキュリティ',
              path: 'https://microcms.io/features/security',
            },
            {
              name: 'サポート',
              path: 'https://microcms.io/features/support',
            },
          ],
        },
        {
          name: 'リソース',
          path: '',
          isDropDown: true,
          contents: [
            {
              name: '導入事例一覧',
              path: 'https://microcms.io/projects',
            },
            {
              name: '導入事例インタビュー',
              path: 'https://microcms.io/interviews',
            },
            {
              name: 'セミナー情報',
              path: 'https://microcms.io/seminars',
            },
            {
              name: 'イベント情報',
              path: 'https://microcms.io/events',
            },
            {
              name: 'ドキュメント',
              path: 'https://document.microcms.io/',
            },
            {
              name: 'ヘルプ',
              path: 'https://help.microcms.io/ja/knowledge',
            },
            {
              name: 'ブログ',
              path: 'https://blog.microcms.io/',
            },
            {
              name: 'テンプレート',
              path: 'https://templates.microcms.io/',
            },
          ],
        },
        {
          name: 'パートナー',
          path: '',
          isDropDown: true,
          contents: [
            {
              name: 'パートナーになる',
              path: 'https://microcms.io/for-partners',
            },
            {
              name: 'パートナーを探す',
              path: 'https://microcms.io/partners',
            },
          ],
        },
        {
          name: '料金プラン',
          path: 'https://microcms.io/pricing',
          isDropDown: false,
          contents: [],
        },
        {
          name: 'お役立ち資料',
          path: 'https://microcms.io/ebook',
          isDropDown: false,
          contents: [],
        },
        {
          name: 'お問い合わせ',
          path: '',
          isDropDown: true,
          contents: [
            {
              name: '新規導入に関するご相談',
              path: 'https://microcms.io/contact',
            },
            {
              name: 'パートナー紹介のご相談',
              path: 'https://microcms.io/partners#consultation',
            },
          ],
        },
      ],
    };
  },
  created() {
    this.openDropDownMenu = Array(this.desktopHeaderMenu.length).fill(false);
  },
  mounted() {
    this.params = location.search || '';
  },
  methods: {
    setOpen(value) {
      this.open = value;
    },
    toggleOpen() {
      this.open = !this.open;
    },
    handleOpenMenu(index) {
      this.openDropDownMenu.splice(index, 1, true);
    },
    handleCloseMenu(index) {
      this.openDropDownMenu.splice(index, 1, false);
    },
  },
};
</script>

<style scoped>
@media (min-width: 1240px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 12px 40px;
    z-index: 20;
    border-bottom: 1px solid var(--color-border);
    background-color: #fff;
    font-size: 14px;
  }

  .empty {
    height: 80px;
    margin-bottom: 40px;
  }

  .logo {
    padding: 8px 0;
    margin-right: 30px;

    a {
      display: block;
      width: 160px;
      height: 30.3px;
    }
  }

  .logoImg {
    width: 160px;
    height: auto;
  }

  .menuBtn {
    display: none;
  }

  .menu {
    display: flex;
    padding: 8px 0;
  }

  .lists {
    display: flex;
    align-items: center;

    &:first-child::after {
      content: '';
      width: 1px;
      height: 30px;
      background-color: var(--color-text-off);
      margin-right: 40px;
    }

    &.isMobile {
      display: none;
    }

    &.isDesktop {
      display: flex;
    }

    &.authLinks {
      margin-left: 10px;
    }
  }

  .list {
    margin-right: 22px;
    padding: 8px 0;
    white-space: nowrap;
    position: relative;

    &.noMargin {
      margin: 0;
    }

    &.authLinksItem {
      margin-right: 16px;
    }

    a,
    a:visited {
      color: var(--color-text-main);

      &.signup {
        border-radius: 4px;
        background-color: var(--color-primary);
        color: #fff;
        text-align: center;
        padding: 12px 34px;
        font-size: 16px;
      }

      &.signin {
        border-radius: 4px;
        border: 1px solid var(--color-primary);
        color: var(--color-primary);
        text-align: center;
        padding: 11px 32px;
        font-size: 16px;
      }
    }
  }

  .dropDown {
    color: var(--color-text-sub);
    display: inline-block;
    padding-right: 20px;
    position: relative;
    appearance: none;
    border: none;
    background: inherit;
    font-size: inherit;

    &::after {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-left: 6px;
      background: url('/images/icon_arrow_bottom.svg') center center no-repeat;
      background-size: contain;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .dropDownMenu {
    font-size: 14px;
    display: inline-block;
    position: absolute;
    background-color: #fff;
    top: 35px;
    right: 0px;
    padding: 8px 16px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    text-align: center;
  }

  .dropDownMenuList {
    a {
      color: var(--color-text-sub);
      display: block;
      transition: 0.3s all ease-in-out;
      padding: 10px 0;

      &:hover {
        color: var(--color-text-main);
        opacity: 0.8;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter {
    transform: translateY(-10px);
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}

@media (max-width: 1240px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 16px;
    z-index: 20;
    border-bottom: 1px solid var(--color-border);
  }

  .empty {
    height: 61px;
  }

  .logo {
    display: inline-block;
    height: 28px;
  }

  .logoImg {
    width: auto;
    height: 28px;
  }

  .menuBtn {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .menu {
    position: absolute;
    left: 0;
    top: 61px;
    display: none;
    flex-direction: column-reverse;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid var(--color-border);
    z-index: 2001;
    padding-top: 8px;

    &.isOpen {
      display: flex;
    }
  }

  .lists {
    padding: 8px 0;

    &:first-child {
      padding-top: 0;
    }

    &.isMobile {
      display: block;
    }

    &.isDesktop {
      display: none;
    }

    &.isMobileReverse {
      display: flex;
      flex-direction: column-reverse;
    }

    &.authLinks {
      display: flex;
      flex-direction: row-reverse;
      padding-right: 10px;
      padding-left: 10px;
      .list {
        width: calc(100% / 2);
        padding: 0 8px;
      }
    }
  }

  .list {
    padding: 0 16px;
    white-space: nowrap;

    a {
      display: block;
      color: var(--color-text-main);
      padding: 8px 0;

      &.signup {
        border-radius: 4px;
        background-color: var(--color-primary);
        color: #fff;
        text-align: center;
        font-weight: bold;
        margin-bottom: 8px;
      }

      &.signin {
        border-radius: 4px;
        color: var(--color-primary);
        border: 1px solid var(--color-primary);
        text-align: center;
        font-weight: bold;
        margin-bottom: 8px;
      }
    }

    &:last-child a {
      border-bottom: none;
    }
  }

  .mask {
    position: fixed;
    top: 61px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2000;
  }
}
</style>
