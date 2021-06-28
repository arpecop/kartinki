import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Cardx from './components/Card';

const Item = ({ match }) => {
  console.log(match.params.id);

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
      <Cardx _meta={_meta} media={media} title={title} description={description} />
    </>
  );
};
export default Item;
