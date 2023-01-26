import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { Header, Form, Button, Input } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  return (
    <Header>
      <Form onSubmit={onSubmit}>
        <Button type="submit">
          <FaSearch style={{ color: 'blue' }} />{' '}
        </Button>
        <Input
          name="search"
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
}
Searchbar.protoTypes = {
  onSubmit: PropTypes.func.isRequired,
};
