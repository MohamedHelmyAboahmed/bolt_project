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
      name: '',
      status: true
    };
  },

  template: `
    <div class="ad-set-details-card mb-6">
      <h6 class="page-header-title mb-3">Ad Set Details</h6>
      <v-card max-width="100%" class="pa-5 mb-5 rounded-lg" elevation="1">
        <div class="card-header">
          <v-text-field
            v-model="name"
            label="Ad Set Name"
            placeholder="Enter ad set name"
            class="mb-3"
          ></v-text-field>

          <div class="status-toggle">
            <label class="d-block status-title">Status</label>
            <v-switch
              v-model="status"
              :label="status ? 'Active' : 'Paused'"
            ></v-switch>
          </div>
        </div>
      </v-card>
    </div>
  `
});