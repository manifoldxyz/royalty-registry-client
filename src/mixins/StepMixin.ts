import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import { RoyaltyRegistry } from "@/lib/RoyaltyRegistry"
import { RoyaltyEngineV1 } from "@/lib/RoyaltyEngineV1"
import { RoyaltySpecChecker } from "@/lib/RoyaltySpecChecker"
import LoadScreen from "@/components/LoadScreen.vue"

@Component({
  components: {
    LoadScreen,
  }
})
export default class StepMixin extends Vue {
  @Prop({ type: Boolean, required: true }) active: boolean
  loaded: boolean = false
  registry: RoyaltyRegistry
  engine: RoyaltyEngineV1
  specChecker: RoyaltySpecChecker

  created() {
    //@ts-ignore
    this.registry = this.$parent.registry
    //@ts-ignore
    this.engine = this.$parent.engine
    //@ts-ignore
    this.specChecker = this.$parent.specChecker
  }

  @Watch("active")
  async activeHandler(value) {
    if (value) {
      await this.activate()
    }
  }

  async activate() {
    throw new Error("Activate function must be overwritten.")
  }
}
