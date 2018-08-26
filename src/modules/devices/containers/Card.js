import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Counter from './Counter';

const Container = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background-image: linear-gradient(180deg,#333333, #000000);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const Title = styled.h3`
  color: white;
`;

const Subtitle = styled.h4`
  color: white;
  text-align: center;
  margin-top: 1rem;
`

const Card = ({item, itemType}) => {
    const {name, device_id, target_temperature_f} = item;
    return (
        <Container>
            <Link to={`/devices/${itemType}/${device_id}`}>
                <Title>{name}</Title>
                <Subtitle>
                    <Counter value={target_temperature_f}/>
                </Subtitle>
            </Link>
        </Container>
    )
}

export default Card;
