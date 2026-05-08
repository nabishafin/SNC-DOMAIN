import { create } from 'zustand';

const useSncPaymentStore = create((set) => ({
  isOpen: false,
  paymentData: null,
  step: 'idle', // idle | loading_request | ready | requesting_nonce | awaiting_signature | wallet_verified | tx_submitted | backend_verification_pending | success | failure
  errorMsg: null,

  openModal: (paymentData) => set({ 
    isOpen: true, 
    paymentData, 
    step: paymentData ? 'ready' : 'loading_request',
    errorMsg: null 
  }),
  
  closeModal: () => set({ 
    isOpen: false,
    // we don't reset state immediately so modal fade-out looks smooth
  }),

  reset: () => set({
    paymentData: null,
    step: 'idle',
    errorMsg: null
  }),

  setStep: (step) => set({ step }),
  setPaymentData: (data) => set({ paymentData: data }),
  setError: (msg) => set({ errorMsg: msg, step: 'failure' }),
}));

export default useSncPaymentStore;
