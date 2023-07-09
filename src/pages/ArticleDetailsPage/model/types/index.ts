import { ArticleDetailsCommentSchema } from './ArticleDetailsCommentsSchema';
import { ArticleDetailsRecommendationSchema } from './ArticleDetailsRecommendationSchema';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentSchema
    recommendations: ArticleDetailsRecommendationSchema
}
