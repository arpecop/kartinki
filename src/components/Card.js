import React from 'react';
import { Card } from 'antd';
import LazyLoad from 'react-lazyload';

const Cardx = ({
  _meta, media, title, description,
}) => (
  <Card
    hoverable
    cover={(
      <a href={`/${_meta.id}`}>
        <LazyLoad height={media.dimensions.height}>
          <img alt="example" src={media.url} style={{ width: '100%' }} />
        </LazyLoad>
      </a>
    )}
  >
    <Card.Meta title={title[0].text} description={description[0].text} />
  </Card>
);
export default Cardx;
