import { mockReviews } from '../mockData';
import ReviewList from '../reviewList';

const BestReviews = () => {
  return (
    <ReviewList
      title="Best Review"
      reviews={mockReviews}
      sortFunction={(a, b) => b.view_count - a.view_count}
    />
  );
};

export default BestReviews;
