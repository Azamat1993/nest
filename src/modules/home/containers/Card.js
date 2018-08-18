import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  background-image: linear-gradient(180deg,#3272cf 0,#589dc7 50%,#8ab7cb);
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const Card = ({item, itemType}) => {
  const { name, device_id, target_temperature_f } = item;
  return (
    <Link to={`/home/${itemType}/${device_id}`}>
      <Container>
        {name}
        <p>{target_temperature_f}</p>
      </Container>
    </Link>
  )
}

export default Card;
