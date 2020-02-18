/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { Tag, Dropdown, Icon, Menu } from 'antd';
import { connect } from 'react-redux';
import { removeInterest, addInterest, getInterests, getUsersInterests } from '../../../state/actions/interests';

const Interests = ({
  authState: {
    credentials: { id },
  },
  allInterests,
  userInterests,
  removeInterest,
  addInterest,
  getInterests,
  getUsersInterests 
}) => {
  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    async function allInterests() {
      await getInterests();
      await getUsersInterests(id); 
    }

    allInterests();
  }, [])

  const showInput = () => {
    setInputVisible(true);
  };

  const handleRemoveInterest = async (e, interestId) => {
    e.preventDefault();
    await removeInterest(interestId);
  };

  const handleAddInterest = (userId, interestId) => {
    addInterest(userId, interestId);
  };

  const menu = (
    <Menu>
      {allInterests.interests
      .filter(elem => !userInterests.interests.map(int => int.interest).includes(elem.interest))
      .map(obj => (
          <Menu.Item
            onClick={() => handleAddInterest(id, obj.id)}
            key={obj.id}
          >
            {obj.interest}
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <div>
      {!userInterests.interests.length ? (
        <p>No interests yet</p>
      ) : (
        <>
          {!inputVisible &&
            userInterests.interests.map((elem) => <Tag key={elem.id}>{elem.interest}</Tag> )
          }
          {inputVisible &&
            userInterests.interests.map(elem => {
              return (
                <Tag
                  key={elem.id}
                  closable
                  onClose={e => handleRemoveInterest(e, elem.id)}
                >
                  {elem.interest}
                </Tag>
              );
            })}
        </>
      )}

      <br />

      {inputVisible && (
        <>
          <Dropdown overlay={menu} trigger={['click']}>
            <button type="button">
              Interests <Icon type="down" />
            </button>
          </Dropdown>
          <Icon
            style={{ marginLeft: '20px', color: 'red', cursor: 'pointer' }}
            onClick={() => setInputVisible(false)}
            type="close-circle"
          />
        </>
      )}
      {!inputVisible && (
        <Tag
          onClick={showInput}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          <Icon type="plus" /> Edit Interests
        </Tag>
      )}
    </div>
  );
};

export default connect(state => state, { removeInterest, addInterest, getInterests, getUsersInterests  })(
  Interests
);
