export default function getDefaultOgimage(content) {
  const encodedTitle = encodeURI(content.title);
  const length = content.title.length;
  const textSize = length > 36 ? 56 : length > 22 ? 64 : length > 14 ? 74 : 84; // 正確な文字数ではないが大体の指標としては十分と判断する
  return `https://images.blog.microcms.io/assets/f5d83e38f9374219900ef1b0cc4d85cd/92c09085ec6243cca78046fa644dd8cd/banner-bg.png?blend-mode=normal&blend-x=78&blend-y=200&blend64=${Buffer.from(
    `https://assets.imgix.net/~text?txtsize=${textSize}&w=672&txtfont=Noto%20Sans%20JP%20Black&txt-color=212149&txt=${encodedTitle}`,
    'ascii'
  ).toString('base64')}`;
}
