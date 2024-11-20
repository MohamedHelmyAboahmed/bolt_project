import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    selected: {
      type: String,
      default: ''
    }
  },

  emits: ['selectedGoal'],

  data() {
    return {
      goals: [
        {
          id: 'awareness',
          label: 'Awareness',
          children: [
            { id: 'impressions', label: 'Impressions' },
            { id: 'reach', label: 'Reach' }
          ]
        },
        {
          id: 'consideration',
          label: 'Consideration',
          children: [
            { id: 'video_views', label: 'Video Views' },
            { id: 'swipes', label: 'Swipes' }
          ]
        },
        {
          id: 'conversions',
          label: 'Conversions',
          children: [
            { id: 'app_installs', label: 'App Installs' },
            { id: 'purchases', label: 'Purchases' }
          ]
        }
      ],
      isOpen: false
    };
  },

  methods: {
    selectGoal(goalId) {
      this.$emit('selectedGoal', goalId);
      this.isOpen = false;
    }
  },

  template: `
    <div class="tree-select-container">
      <div class="selected-display" @click="isOpen = !isOpen">
        <span>{{ selected || 'Select a goal' }}</span>
        <v-icon>{{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </div>

      <div v-if="isOpen" class="goals-dropdown">
        <div v-for="category in goals" :key="category.id" class="goal-category">
          <div class="category-label">{{ category.label }}</div>
          <div v-for="goal in category.children" :key="goal.id" 
               class="goal-option"
               :class="{ 'selected': selected === goal.id }"
               @click="selectGoal(goal.id)">
            {{ goal.label }}
          </div>
        </div>
      </div>
    </div>
  `
});