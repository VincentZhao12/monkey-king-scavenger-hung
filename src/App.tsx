import { Button, ChakraProvider, Heading, Stack } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
    return (
        <ChakraProvider>
            <div className="App" style={{ height: '100vh' }}>
                <BrowserRouter>
                    <Navbar />
                    <Stack alignItems={'center'} height={'100%'}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </Stack>
                </BrowserRouter>
            </div>
        </ChakraProvider>
    );
}

export default App;
