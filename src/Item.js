import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import Cardx from './components/Card';

const Item = ({ match }) => {
  const GET_ITEM = gql`
    {
      allKartinkis(id: "${match.params.id}") {
        edges {
          node {
            title
            description
            media
            _meta {
              id
            }
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_ITEM);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const {
    _meta, media, title, description,
  } = data.allKartinkis.edges[0].node;
  return (
    <>
      <Helmet
        title={title[0].text}
        meta={[
          { name: 'author', content: 'kartinki' },
          { property: 'og:title', content: title[0].text },
          { property: 'og:site_name', content: 'Fishii.shop' },
          { property: 'og:type', content: 'website' },
          {
            property: 'og:url',
            content: `https://3rgggdshyf.execute-api.us-east-1.amazonaws.com/dev?id=${media.url}&path=${match.params.id}`,
          },
          { property: 'og:description', content: title[0].description },
          { property: 'og:image', content: media.url },
          { property: 'og:site_name', content: 'kartinki' },
        ]}
      />
      <Cardx _meta={_meta} media={media} title={title} description={description} />
    </>
  );
};
export default Item;
