import { defineComponent } from 'vue';
import { useAdSetStore } from '@/stores/adSetStore';
import SwitchToogle from './Label&input/SwitchToogle.vue';

export default defineComponent({
  components: {
    SwitchToogle
  },

  setup() {
    const store = useAdSetStore();

    return {
      store,
      updateTracking: (data) => store.updateTracking(data)
    };
  },

  template: `
    <div class="tracking-card ad-set-details-card mb-6">
      <h6 class="page-header-title mb-3">Tracking</h6>
      <v-card max-width="100%" class="pa-5 mb-5 rounded-lg" elevation="1">
        <div class="card-header">
          <label class="d-block status-title">Snap Pixel</label>
          <switch-toogle
            :checked="store.tracking.snapPixel"
            @tooglePaused="updateTracking({ snapPixel: !store.tracking.snapPixel })"
          />
          
          <div class="mb-4"></div>
          
          <label class="d-block status-title">
            Snap <strong>App ID Tracking</strong>
          </label>
          <switch-toogle
            :checked="store.tracking.appTracking"
            @tooglePaused="updateTracking({ appTracking: !store.tracking.appTracking })"
          />

          <div v-if="store.tracking.appTracking" class="alert-for-app mt-5">
            <div class="warnning-card">
              <h4>Have you added your app?</h4>
              <p>
                We haven't found any Snap App IDs associated with this ad account. 
                Make sure to authenticate your app in
                <a href="#">Business Manager</a>
                and associate it with this ad account.
              </p>
              <p>
                App events tracking via Snap App ID unlocks several benefits such as 
                Mobile App Custom Audiences or App Re-engagement Optimization Goals. 
                This is optional but recommended.
              </p>
              <a href="https://businesshelp.snapchat.com/s/article/snap-app-id?language=en_US">
                Learn More about Snap App IDs
              </a>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  `
});