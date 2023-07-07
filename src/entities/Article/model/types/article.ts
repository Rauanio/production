import { User } from 'entities/user';

export enum ArticleBlockType {
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
}

export enum ArticleSortField {
    TITLE = 'title',
    DATE = 'date',
    VIEWS = 'views'
}

export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE;
    code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT;
    paragraphs: string[];
    title?: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export enum ArticleType {
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS'
}

export enum ArticleView {
    BLOCK = 'BLOCK',
    LIST = 'LIST'
}

export interface Article {
    id: string;
    user: User
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}
