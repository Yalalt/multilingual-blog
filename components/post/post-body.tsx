import React from 'react';
import parse from 'html-react-parser';
import Image from 'next/image';

const PostBody = ({ body }: { body: string }) => {
  const options = {
    replace: (domNode: Element) => {
      if (domNode instanceof Element && (domNode as any).attribs) {
        const { name, attribs } = domNode as any;
        if (name === 'img') {
          const { src, alt } = attribs;
          return (
            <Image
              className='object-cover object-center w-full my-3 rounded-md h-auto max-h-[300px] md:max-h-[500px]'
              src={src}
              alt={alt}
              width={1280}
              height={620}
            />
          );
        }
      }
    },
  };

  const getParsedHTML = (body: string) => {
    return parse(body);
  };

  return <div className='rich-text'>{getParsedHTML(body)}</div>;
};

export default PostBody;
