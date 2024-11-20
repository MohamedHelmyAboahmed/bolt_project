import { defineStore } from 'pinia';
import { openDB } from 'idb';

const DB_NAME = 'snapchatAdsDB';
const STORE_NAME = 'adSetStore';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const useAdSetStore = defineStore('adSet', {
  state: () => ({
    tracking: {
      snapPixel: false,
      appTracking: false
    },
    goalAndBid: {
      selectedGoal: '',
      bidType: 'Auto-Bid',
      maxBid: null
    },
    adSetDetails: {
      name: '',
      status: true
    },
    budget: {
      type: 'daily',
      amount: 0,
      schedule: {
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
      }
    }
  }),

  actions: {
    async loadFromDB() {
      try {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        
        // Load all store sections
        const tracking = await store.get('tracking');
        const goalAndBid = await store.get('goalAndBid');
        const adSetDetails = await store.get('adSetDetails');
        const budget = await store.get('budget');

        if (tracking) this.tracking = tracking;
        if (goalAndBid) this.goalAndBid = goalAndBid;
        if (adSetDetails) this.adSetDetails = adSetDetails;
        if (budget) this.budget = budget;
      } catch (error) {
        console.error('Error loading from IndexedDB:', error);
      }
    },

    async updateTracking(data) {
      try {
        this.tracking = { ...this.tracking, ...data };
        await this.saveToDb('tracking', this.tracking);
      } catch (error) {
        console.error('Error updating tracking:', error);
      }
    },

    async updateGoalAndBid(data) {
      try {
        this.goalAndBid = { ...this.goalAndBid, ...data };
        await this.saveToDb('goalAndBid', this.goalAndBid);
      } catch (error) {
        console.error('Error updating goal and bid:', error);
      }
    },

    async updateAdSetDetails(data) {
      try {
        this.adSetDetails = { ...this.adSetDetails, ...data };
        await this.saveToDb('adSetDetails', this.adSetDetails);
      } catch (error) {
        console.error('Error updating ad set details:', error);
      }
    },

    async updateBudget(data) {
      try {
        this.budget = { ...this.budget, ...data };
        await this.saveToDb('budget', this.budget);
      } catch (error) {
        console.error('Error updating budget:', error);
      }
    },

    async saveToDb(key, data) {
      const db = await initDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      await store.put(data, key);
      await tx.done;
    }
  }
});