import Autolinker from 'autolinker';

export default {
  url: (text: string) =>
    new Autolinker({
      urls: {
        schemeMatches: true,
        wwwMatches: true,
        tldMatches: true,
      },
      email: true,
      phone: false,
      mention: false,
      hashtag: false,

      stripPrefix: true,
      stripTrailingSlash: true,
      newWindow: true,

      truncate: {
        length: 0,
        location: 'end',
      },

      className: '',
    }).link(text),
};
