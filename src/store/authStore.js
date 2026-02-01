import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: async (email, password) => {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock validation
                if (email && password) {
                    set({
                        user: {
                            id: '1',
                            name: 'John Doe',
                            email: email,
                            role: 'user'
                        },
                        isAuthenticated: true
                    });
                } else {
                    throw new Error('Invalid credentials');
                }
            },

            register: async (name, email, password) => {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Registering user:', { name, email, passwordLength: password.length });

                set({
                    user: {
                        id: Math.random().toString(),
                        name,
                        email,
                        role: 'user'
                    },
                    isAuthenticated: true
                });
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            updateProfile: (data) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...data } : null
                }));
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);
