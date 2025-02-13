import { mockReviews } from '../mockData';
import ReviewList from '../reviewList';

const NewReviews = () => {
  return (
    <ReviewList
      title="New"
      reviews={mockReviews}
      sortFunction={(a, b) => {
        const dateA = new Date(a.updated_at || a.created_at).getTime();
        const dateB = new Date(b.updated_at || b.created_at).getTime();
        return dateB - dateA;
      }}
    />
  );
};

export default NewReviews;
