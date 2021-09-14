import React, { CSSProperties, ReactNode } from 'react';
import { Button, FileInput, Form, FormField, TextInput, Box } from 'grommet';

type BoxFormProps = { style?: CSSProperties; children: ReactNode };

const BoxForm = ({ children, style }: BoxFormProps) => (
  <Box
    direction="column"
    pad="small"
    style={style}
    border={{ color: 'dark-2', size: 'small', style: 'solid', side: 'all' }}
  >
    {children}
  </Box>
);

export { BoxForm };
