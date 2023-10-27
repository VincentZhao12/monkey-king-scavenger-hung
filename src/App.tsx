import { ChakraProvider, Stack } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Game from './pages/Game';

function App() {
    return (
        <ChakraProvider>
            <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <Stack alignItems={'center'} height={'100%'}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/game/:item" element={<Game />} />
                        </Routes>
                    </Stack>
                </BrowserRouter>
            </div>
        </ChakraProvider>
    );
}

export default App;
