import { getAccessToken } from '@/utils/auth';

import { API } from './constants';

export const paginatedReviewList = async (sortType: string, page: number, perPage: number) => {
  const accessToken = getAccessToken();

  let endpoint;

  if (sortType === 'best') {
    endpoint = `${API.ENDPOINTS.REVIEW.ALL_REVIEW}?page=${page}&size=${perPage}`;
  } else if (sortType === 'new') {
    endpoint = `${API.ENDPOINTS.REVIEW.ALL_REVIEW}?page=${page}&size=${perPage}&sort_by=date`;
  }
  const response = await fetch(`${API.BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }
  return response.json();
};

export const createReview = async (data: { title: string; content: string; roomId: string }) => {
  const accessToken = getAccessToken();

  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.REVIEW.CREATE_REVIEW}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      taro_chat_room: data.roomId,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create review');
  }
  return response.json();
};

export const getReviewDetail = async (reviewId: number) => {
  const accessToken = getAccessToken();

  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.REVIEW.REVIEW_DETAIL(reviewId)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to detail review');
  }
  return response.json();
};

export const updateReview = async (data: {
  title: string;
  content: string;
  reviewId: number | string;
}) => {
  const accessToken = getAccessToken();

  const response = await fetch(
    `${API.BASE_URL}${API.ENDPOINTS.REVIEW.UPDATE_REVIEW(data.reviewId)}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title: data.title, content: data.content }),
    },
  );
  if (!response.ok) {
    throw new Error('Failed to update review');
  }
  return response.json();
};

export const deleteReview = async (reviewId: number | string) => {
  const accessToken = getAccessToken();

  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.REVIEW.DELETE_REVIEW(reviewId)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete review');
  }
};
