import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  // Your Firebase config here
};

const app = initializeApp(firebaseConfig);

const useAnalytics = () => {
  useEffect(() => {
    const initAnalytics = async () => {
      if (typeof window !== 'undefined') {
        const supported = await isSupported();
        if (supported) {
          getAnalytics(app);
        }
      }
    };
    
    initAnalytics();
  }, []);
};

export default useAnalytics;
