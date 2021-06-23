import { render, screen } from '@testing-library/react';
import App from './App';
import React, { Component } from 'react';
import '@testing-library/jest-dom/extend-expect';

test('Locates sign up page', () => {
  render(<App/>);
  const linkElement = screen.getByText("Sign Up");
  expect(linkElement).toBeInTheDocument();
});
