package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CommunityReview;

@Repository
public interface CommunityReviewRepository extends JpaRepository<CommunityReview, Integer> {

}