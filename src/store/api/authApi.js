import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(), // No real API calls
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn(credentials, { dispatch }) {
        dispatch(loginStart());

        return new Promise((resolve) => {
          setTimeout(() => {
            const { username, password } = credentials;

            if (username === 'kminchelle' && password === '0lelplR') {
              const mockData = {
                user: {
                  id: 1,
                  username: 'kminchelle',
                  email: 'kminchelle@dummyjson.com',
                  firstName: 'Kim',
                  lastName: 'Minchelle',
                  image: 'https://robohash.org/hicveldicta.png'
                },
                accessToken: 'mock-token-12345'
              };

              dispatch(loginSuccess(mockData));
              resolve({ data: mockData });
            } else {
              const error = 'Invalid username or password';
              dispatch(loginFailure(error));
              resolve({ error: { status: 401, data: { message: error } } });
            }
          }, 1000); // Simulate API delay
        });
      }
    })
  })
});

export const { useLoginMutation } = authApi;
