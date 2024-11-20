import { defineComponent, computed } from 'vue';
import { useAdSetStore } from '@/stores/adSetStore';
import TreeSelectCustom from './tree-select-componant/TreeSelect.vue';

export default defineComponent({
  components: {
    TreeSelectCustom
  },

  setup() {
    const store = useAdSetStore();

    const isMaxBidSelected = computed(() => {
      return store.goalAndBid.bidType === 'Max Bid';
    });

    const updateGoalAndBid = (data) => {
      store.updateGoalAndBid(data);
    };

    return {
      store,
      isMaxBidSelected,
      updateGoalAndBid
    };
  },

  data() {
    return {
      bidOptions: [
        {
          id: 1,
          title: 'Auto-Bid',
          autoPaied: 'Recommended',
          description: 'Makes best effort to spend your budget. Try this strategy if you want to learn what cost per action you can achieve on Snap.'
        },
        {
          id: 2,
          title: 'Max Bid',
          description: 'Bids conservatively at or below your desired bid.'
        }
      ],
      showBidOptions: false,
      validateMaxBid: true
    };
  },

  methods: {
    toggleBidOptions() {
      this.showBidOptions = !this.showBidOptions;
    },

    selectBidType(bidType) {
      this.updateGoalAndBid({ bidType });
      this.showBidOptions = false;
    },

    updateMaxBid(event) {
      const value = event.target.value;
      this.validateMaxBid = !value;
      this.updateGoalAndBid({ maxBid: value });
    },

    getSelectedGoal(goal) {
      this.updateGoalAndBid({ selectedGoal: goal });
    }
  },

  template: `
    <div class="goal-and-bid ad-set-details-card mb-6">
      <h6 class="page-header-title mb-3">Goal & Bid</h6>
      <v-card max-width="100%" class="pa-5 mb-5 rounded-lg" elevation="1">
        <div class="card-header">
          <label>Performance Goal</label>
          <TreeSelectCustom
            :selected="store.goalAndBid.selectedGoal"
            @selectedGoal="getSelectedGoal"
          />

          <div class="bid-parent position-relative mt-4">
            <label>Bid</label>
            <div
              :class="{ 'border-bottom': showBidOptions }"
              class="select-bid-way d-flex align-center justify-space-between"
              @click="toggleBidOptions"
            >
              <p>{{ store.goalAndBid.bidType }}</p>
              <span>
                <v-icon>{{ showBidOptions ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </span>
            </div>

            <div v-if="showBidOptions" class="bid-options">
              <div v-for="option in bidOptions" :key="option.id" class="bid-option" @click="selectBidType(option.title)">
                <div class="d-flex align-center">
                  <span class="title">{{ option.title }}</span>
                  <span v-if="option.autoPaied" class="recommended ml-2">{{ option.autoPaied }}</span>
                </div>
                <p class="description">{{ option.description }}</p>
              </div>
            </div>

            <div v-if="isMaxBidSelected" class="max-bid-section mt-3">
              <div class="max-bid-amount d-flex align-center justify-space-between">
                <v-text-field
                  :value="store.goalAndBid.maxBid"
                  @input="updateMaxBid"
                  type="number"
                  min="0"
                  label="Maximum Bid"
                  prefix="$"
                ></v-text-field>
                <span class="bid-per">Bid is per 15 Second Video View</span>
              </div>

              <div v-if="validateMaxBid" class="validation-message mt-2">
                <v-icon color="error">mdi-alert-circle</v-icon>
                <span class="ml-2">Maximum bid requires bid value</span>
              </div>

              <p class="suggested-bid mt-2">
                <span>Suggested bid $0.20 - $0.57</span>
              </p>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  `
});