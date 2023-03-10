export interface PublishNotes {
  id: string;
  author: string | undefined;
  blocks: (BlocksEntity)[];
  time: number;
  version: string;
  username: string | undefined;
  content_length: string;
  tag: Tag[];
  highlight: IArticleMapper;
}

export interface BlocksEntity {
  data: Data;
  id: string;
  type: string;
}

export interface Data {
  level?: number | null;
  text?: string | null;
  caption?: string | null;
  file?: File | null;
  stretched?: boolean | null;
  withBackground?: boolean | null;
  withBorder?: boolean | null;
  items?: (string)[] | null;
  style?: string | null;
  code?: string | null;
}

export interface File {
  url: string;
}

export interface Tag {
  name: string;
}

export interface Highlights {
  author?: string;
  header?: string | null;
  content: string;
}

export interface IPublicationHighlights extends Highlights {
  imgUrl?: string[] | string;
}

export interface IArticleMapper extends Highlights {
  id: string;
  username?: string | undefined;
  content_length?: string;
  tag?: Tag[];
  imgUrl?: string;
  time?: string
}
