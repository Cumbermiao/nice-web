import { curry, compose, prop, map } from 'ramda/es';

const trace = curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

const Impure = {
  getJSON: curry(function(cb, url) {
    $.getJSON(url, cb);
  }),

  setHtml: curry(function(selector, html) {
    console.log(selector, html);
    $(selector).html(html);
  })
};

var url = function(term) {
  return (
    'https://api.flickr.com/services/feeds/photos_public.gne?tags=' +
    term +
    '&format=json&jsoncallback=?'
  );
};

const mediaUrl = compose(
  prop('m'),
  prop('media')
);

const img = url => $('<img />', { src: url });

const url2Img = compose(
  img,
  mediaUrl
);

const images = compose(
  map(url2Img),
  prop('items')
);

const renderImgs = compose(
  Impure.setHtml('#app'),
  images
);

const app = compose(
  Impure.getJSON(renderImgs),
  url
);
app('cats');
