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
      budgetType: 'daily',
      amount: 0,
      schedule: {
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
      },
      showEndDate: false
    };
  },

  template: `
    <div class="budget-schedule-card mb-6">
      <h6 class="page-header-title mb-3">Budget & Schedule</h6>
      <v-card max-width="100%" class="pa-5 mb-5 rounded-lg" elevation="1">
        <div class="card-body">
          <!-- Budget Type Selection -->
          <div class="budget-type mb-4">
            <v-select
              v-model="budgetType"
              :items="[
                { title: 'Daily Budget', value: 'daily' },
                { title: 'Lifetime Budget', value: 'lifetime' }
              ]"
              label="Budget Type"
            ></v-select>
          </div>

          <!-- Budget Amount -->
          <div class="budget-amount mb-4">
            <v-text-field
              v-model="amount"
              type="number"
              label="Budget Amount"
              prefix="$"
              min="0"
            ></v-text-field>
          </div>

          <!-- Schedule -->
          <div class="schedule">
            <h4 class="mb-2">Schedule</h4>
            
            <div class="d-flex gap-2 mb-3">
              <v-text-field
                v-model="schedule.startDate"
                type="date"
                label="Start Date"
              ></v-text-field>
              <v-text-field
                v-model="schedule.startTime"
                type="time"
                label="Start Time"
              ></v-text-field>
            </div>

            <v-checkbox
              v-if="budgetType === 'daily'"
              v-model="showEndDate"
              label="Set an End Date (Optional)"
            ></v-checkbox>

            <div v-if="showEndDate || budgetType === 'lifetime'" class="d-flex gap-2">
              <v-text-field
                v-model="schedule.endDate"
                type="date"
                label="End Date"
              ></v-text-field>
              <v-text-field
                v-model="schedule.endTime"
                type="time"
                label="End Time"
              ></v-text-field>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  `
});