import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleSortField, ArticleView } from 'entities/Article';
import { SortOrder } from 'shared/types/sort';

export interface ArticlesPageSchema extends EntityState<Article>{
    isLoading?: boolean
    error?: string
    view: ArticleView
    page: number
    limit?: number
    hasMore: boolean
    order: SortOrder
    sort: ArticleSortField
    search: string
    _inited: boolean
}
