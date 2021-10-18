<template>
  <div class="built-in-collaboration-with" :class="{show}">
    <span>Built in Collaboration with</span>
    <div class="built-in-collaboration-with-logos" ref="logosContainer">
      <img v-for="i in logoOrder" :src="logos[i]" :key="i" />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import LogoManifold from "@/assets/images/collaborators-manifold.png"
  import LogoOpenSea from "@/assets/images/collaborators-opensea.png"
  import LogoRarible from "@/assets/images/collaborators-rarible.png"
  import LogoFoundation from "@/assets/images/collaborators-foundation.png"
  import LogoSuperRare from "@/assets/images/collaborators-superrare.png"
  import LogoNifty from "@/assets/images/collaborators-nifty.png"

  @Component
  export default class Collaborators extends Vue {
    logos: string[] = [
      LogoManifold,
      LogoOpenSea,
      LogoRarible,
      LogoFoundation,
      LogoSuperRare,
      LogoNifty
    ]
    logoOrder: number[] = []
    loadedLogo: number = 0
    show: boolean = false

    created() {
      let numberSet = Array.from({length: this.logos.length}, (x, i) => i)

      while (numberSet.length > 0) {
        const idx = Math.floor(numberSet.length * Math.random())
        this.logoOrder.push(numberSet[idx])
        numberSet.splice(idx, 1)
      }
    }
    mounted() {
      const self = this

      //@ts-ignore
      const array = [...this.$refs.logosContainer.children]
      array.forEach(el => {
        el.addEventListener('load', () => {
          self.loadedLogo++

          if (self.loadedLogo == self.logos.length) {
            self.show = true
          }
        }, false)
      })
    }
  }
</script>
<style lang="scss" scoped>
  .built-in-collaboration-with {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    grid-gap: 40px;
    max-width: 900px;
    padding: 0 10px;
    margin: 0 auto;

    span {
      font-size: 10px;
      text-transform: uppercase;
      display: inline-block;
      width: min-content;
      white-space: nowrap;
    }

    .built-in-collaboration-with-logos {
      display: flex;
      grid-gap: 22px;
      justify-content: center;
      align-items: center;

      img {
        width: auto;
        height: 32px;
        opacity: 0;
        transition: opacity 0.3s;

        &:nth-child(1) {
          transition-delay: 0.1s;
        }

        &:nth-child(2) {
          transition-delay: 0.2s;
        }

        &:nth-child(3) {
          transition-delay: 0.3s;
        }

        &:nth-child(4) {
          transition-delay: 0.4s;
        }

        &:nth-child(5) {
          transition-delay: 0.5s;
        }

        &:nth-child(6) {
          transition-delay: 0.6s;
        }
      }
    }

    &.show {
      .built-in-collaboration-with-logos {
        img {
          opacity: 1;
        }
      }
    }
  }
</style>
