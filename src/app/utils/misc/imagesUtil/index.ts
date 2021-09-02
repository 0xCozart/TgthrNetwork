export const getImageURL = (content: any[]) => {
  return URL.createObjectURL(new Blob(content, { type: 'file' }));
};
