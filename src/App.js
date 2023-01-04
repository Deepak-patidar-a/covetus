import React from 'react'
//below import is for route between pages
import { Route, Routes} from 'react-router-dom';
import { Box } from '@mui/material';

import BMI from './Bmi';
import UserData from './UserData';

const App = () => {
  return (
    <Box width="400px" sx={{ width: {xl: '1488px'}}} m="auto">
        <Routes>
            <Route path="/" element={<BMI />} />
            <Route path="/UserData" element={<UserData/>} />
        </Routes>
    </Box>
  )
}

export default App
