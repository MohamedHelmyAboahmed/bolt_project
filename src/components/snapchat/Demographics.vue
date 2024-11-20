import { defineComponent } from 'vue';
import { useAdSetStore } from '@/stores/adSetStore';

export default defineComponent({
  setup() {
    const store = useAdSetStore();

    return {
      store
    };
  },

  data() {
    return {
      ageRestrictions: {
        required: false,
        startAge: '13',
        endAge: '+50'
      },
      gender: 'OTHER',
      languages: [],
      selectedLanguages: []
    };
  },

  template: `
    <div class="demographics ad-set-details-card mb-6">
      <h6 class="page-header-title mb-3">Demographics</h6>
      <v-card max-width="100%" class="pa-5 mb-5 rounded-lg" elevation="1">
        <div class="card-body">
          <!-- Age Restrictions -->
          <div class="age-restrictions mb-4">
            <label class="snap-checkbox">
              <input v-model="ageRestrictions.required" type="checkbox">
              <span class="snap-checkmark"></span>
              Age restrictions required
            </label>
            
            <div v-if="ageRestrictions.required" class="mt-3">
              <label>Age Range</label>
              <div class="d-flex align-center gap-2">
                <v-select
                  v-model="ageRestrictions.startAge"
                  :items="ageRangeItems"
                  label="Start Age"
                  class="w-25"
                ></v-select>
                <span>to</span>
                <v-select
                  v-model="ageRestrictions.endAge"
                  :items="ageRangeItems"
                  label="End Age"
                  class="w-25"
                ></v-select>
              </div>
            </div>
          </div>

          <!-- Gender Selection -->
          <div class="gender-selection mb-4">
            <label>Gender</label>
            <div class="d-flex gap-2">
              <v-btn
                v-for="option in ['ALL', 'MALE', 'FEMALE', 'OTHER']"
                :key="option"
                :variant="gender === option ? 'contained' : 'outlined'"
                @click="gender = option"
              >
                {{ option }}
              </v-btn>
            </div>
          </div>

          <!-- Languages -->
          <div class="languages">
            <label>Languages</label>
            <v-select
              v-model="selectedLanguages"
              :items="languages"
              multiple
              chips
              label="Select Languages"
            ></v-select>
          </div>
        </div>
      </v-card>
    </div>
  `
});