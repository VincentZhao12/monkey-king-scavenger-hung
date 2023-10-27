import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WebcamPredictor from '../components/WebcamPredictor';
import { dialogues, videos, gameOrder } from '../constants';
import './Game.css';
import WuKong from '../assets/WuKong.png';
import {
    Box,
    Button,
    HStack,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from '@chakra-ui/react';

interface GameProps {
    item: string;
}

const Game: FC<GameProps> = ({ item }) => {
    const [showPrompt, setShowPrompt] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [correctItem, setCorrectItem] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlePredict = (res: string) => {
        console.log(res);

        setShowModal(true);
        setCorrectItem(item === res);
    };

    if (showPrompt)
        return (
            <Box
                bgColor={'#dbdbdb'}
                height={'100vh'}
                width={'100vw'}
                justifyContent={'center'}
                display={'flex'}
            >
                <HStack alignItems={'flex-start'}>
                    <Image className="character" src={WuKong} height={500} />

                    {item && (
                        <Stack className="character" height={'100%'}>
                            <Box
                                width={'30%'}
                                borderWidth={'medium'}
                                padding={'1em'}
                                borderRadius={'5%'}
                                marginTop={'10%'}
                                bgColor={'white'}
                            >
                                {dialogues[item as keyof typeof dialogues]}
                            </Box>
                            <Button
                                width={'30%'}
                                colorScheme="red"
                                onClick={() => setShowPrompt(false)}
                            >
                                Continue
                            </Button>
                        </Stack>
                    )}
                </HStack>
            </Box>
        );

    return (
        <>
            <Stack alignItems={'center'}>
                <Text width="100%">
                    <b>Monkey King: </b>
                    {dialogues[item as keyof typeof dialogues]}
                </Text>
                <WebcamPredictor onPredict={handlePredict} />
            </Stack>
            <Modal isOpen={showModal} onClose={() => {}}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {correctItem
                            ? `Thank you for the ${item}!!`
                            : `This was not a ${item}, please try again!`}
                    </ModalHeader>
                    <ModalBody>
                        {correctItem && (
                            <>
                                You can watch this scene occur in the live
                                action{' '}
                                <Link
                                    as="a"
                                    href={videos[item as keyof typeof videos]}
                                    target="_blank"
                                >
                                    here
                                </Link>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                                setShowModal(false);
                                if (correctItem && item) {
                                    setCorrectItem(false);
                                    setShowPrompt(true);
                                    const next = gameOrder.indexOf(item) + 1;

                                    if (next < gameOrder.length)
                                        navigate(`/game/${gameOrder[next]}`);
                                    else navigate('end');
                                }
                            }}
                        >
                            Next
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Game;
