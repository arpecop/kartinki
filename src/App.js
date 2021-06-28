import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { gql, useQuery } from '@apollo/client';
import { Col, Row } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cardx from './components/Card';
import useLocalStorage from './hooks/useLocalStorage';
import Item from './Item';

function App() {
  const [login, setLogin] = useLocalStorage(false);
  const [user, setUser] = useLocalStorage({});
  const GET_ITEMS = gql`
    {
      allKartinkis(sortBy: meta_lastPublicationDate_DESC) {
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

  const responseFacebook = (response) => {
    setUser(response);

    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container">
      <>
        {!login && (
          <FacebookLogin
            buttonStyle={{}}
            appId="281985576166744"
            autoLoad={false}
            fields="name,email"
            callback={responseFacebook}
            icon="fa-facebook"
            cssClass="ant-btn ant-btn-primary ant-btn-round ant-btn-lg"
            textButton=" Влез с Facebook"
            language="bg_BG"
          />
        )}

        <Row justify="center">
          {login && (
            <>
              {data.allKartinkis.edges.map(({
                node: {
                  description, title, _meta, media,
                },
              }) => (
                <Col xs={24} sm={20} md={17} lg={12} xl={6} key={_meta.id} style={{ margin: 10 }}>
                  <Cardx
                    description={description}
                    title={title}
                    _meta={_meta}
                    media={media}
                    user={user}
                  />
                </Col>
              ))}
            </>
          )}
        </Row>
      </>
    </div>
  );
}
const Routez = () => (
  <Router>
    <Switch>
      <Route
        path="/:id"
        exact
        render={(props) => (
          <>
            <Row justify="center">
              <Col xs={24} sm={20} md={17} lg={12} xl={6} style={{ margin: 10 }}>
                <Item match={props.match} />
              </Col>
            </Row>
            <App />
          </>
        )}
      />
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Router>
);

export default Routez;
