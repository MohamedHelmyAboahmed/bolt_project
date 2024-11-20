import { defineComponent, onMounted } from 'vue';
import { useAdSetStore } from '@/stores/adSetStore';
import AdSetDetails from '@/components/snapchat/AdSetDetails.vue';
import Demographics from '@/components/snapchat/Demographics.vue';
import Tracking from '@/components/snapchat/Tracking.vue';
import GoalAndBid from '@/components/snapchat/GoalAndBid.vue';
import BudgetAndSchedule from '@/components/snapchat/BudgetAndSchedule.vue';
import SideNav from '@/components/snapchat/SideNav.vue';

export default defineComponent({
  components: {
    AdSetDetails,
    Demographics,
    Tracking,
    GoalAndBid,
    BudgetAndSchedule,
    SideNav
  },

  setup() {
    const store = useAdSetStore();

    onMounted(() => {
      store.loadFromDB();
    });

    return {
      store
    };
  },

  methods: {
    nextStep() {
      this.$router.push({ name: 'SnapThirdStep' });
    },
    
    goBackStep() {
      this.$router.push({ name: 'SnapFirstStep' });
    }
  },

  template: `
    <div class="parent w-100 position-relative">
      <v-container fluid style="min-height: calc(100vh - 55px); display: grid; padding: 0">
        <v-row class="h-100 ma-0" style="background-color: #f9f9fa">
          <v-col cols="3" class="py-0 px-0" style="position: relative">
            <SideNav firstTile="Awareness & Engagement" />
          </v-col>
          
          <v-col cols="7" class="main-contain pa-8">
            <div class="all-contain-form">
              <AdSetDetails />
              <Tracking />
              <GoalAndBid />
              <BudgetAndSchedule />
              <Demographics />
            </div>
          </v-col>

          <v-col cols="2"></v-col>
        </v-row>

        <div class="footer d-flex align-center justify-center">
          <div class="d-flex align-center justify-space-between footer-contain">
            <v-btn
              type="button"
              color="#444546"
              rounded
              class="footer-back-btn"
              variant="outlined"
              @click="goBackStep"
            >
              Back
            </v-btn>
            
            <v-btn
              type="button"
              color="#444546"
              rounded
              @click="nextStep"
              class="footer-next-btn"
              variant="outlined"
            >
              Next
            </v-btn>
          </div>
        </div>
      </v-container>
    </div>
  `
});