export type Item = {
  displayLink: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  htmlSnippet: string;
  htmlTitle: string;
  kind: string;
  link: string;
  pagemap: {
    cse_thumbnail?: ItemThumbnail[];
  };
  snippet: string;
  title: string;
}

export type ItemThumbnail = {
  height: string;
  src: string;
  width: string;
}