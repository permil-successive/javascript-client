import styled from 'styled-components';

const SelectFieldStyle = styled.select`
{
  width: 500px;
  padding: 10px;
  margin: 16px 16px 16px 0px;
  box-sizing: border-box;
  font-size: 12px;
}

:disabled {
  border: 1px solid lightgray;
}

  &.error {
  border: 1px solid red;
}`;

export default SelectFieldStyle;