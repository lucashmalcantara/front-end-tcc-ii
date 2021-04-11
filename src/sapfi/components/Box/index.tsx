import { ReactNode } from 'react';

import { Text } from 'react-native';

// import { Container } from './styles';

interface BoxProps {
  children: ReactNode;
}

function Box({ children }: BoxProps) {
  return (
    <>
      <Text>Box</Text>
      {children}
    </>
  );
};

export default Box;
