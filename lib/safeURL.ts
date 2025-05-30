const safeUrl = (url: string | File | undefined | null): string => {
  if (!url) return "";

  if (url instanceof File) {
    return URL.createObjectURL(url);
  }

  // Ensure url is a string before using string methods
  if (typeof url !== 'string') {
    return "";
  }

  const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
  const shortYoutubeMatch = url.match(/(?:https?:\/\/)?youtu\.be\/([^?]+)/);
  const shortsMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?&]+)/);
  const vimeoMatch = url.match(/(?:https?:\/\/)?vimeo\.com\/(\d+)/);

  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  if (shortYoutubeMatch) {
    return `https://www.youtube.com/embed/${shortYoutubeMatch[1]}`;
  }

  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }

  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (!url.startsWith('/')) {
    return `/${url}`;
  }

  return url;
};

export default safeUrl;