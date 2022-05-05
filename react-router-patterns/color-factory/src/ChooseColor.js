import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Color from './Color';

const ChooseColor = ({ colors }) => {
  const { color } = useParams();

  return Object.keys(colors).includes(color) ? <Color color={color} hex={colors[color]} /> 
    : <Redirect to="/colors" />;
};

export default ChooseColor;