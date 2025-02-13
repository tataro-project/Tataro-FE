export const API = {
  BASE_URL: 'https://hakunamatatarot.com/api/v1',
  ENDPOINTS: {
    USER: {},
    TAROT: {
      INIT: '/tarot/init/',
      GENERATE: (id: string) => `/tarot/${id}`,
    },
    REVIEW: {},
    NOTICE: {},
    FAQ: {},
  },
};
