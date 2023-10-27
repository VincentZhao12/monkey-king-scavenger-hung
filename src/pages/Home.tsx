import React, { FC } from 'react';
import WuKong from '../assets/WuKong.png';
import './Home.css';
import { Heading, Button, Stack, Text, HStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    return (
        <HStack
            justifyContent={'center'}
            height={'80%'}
            width={'40%'}
            spacing={7}
        >
            <Stack>
                <Heading size="lg">Journey to the West Scavenger Hunt</Heading>
                <Text>
                    孫悟空 needs your help!! Before He takes off on his journey
                    to the west, he will need a few items! Play through this
                    scavenger hunt to find the items that he needs!
                </Text>
                <Button
                    as={Link}
                    // width={'50%'}
                    size={'lg'}
                    colorScheme="red"
                    to="/game/peach"
                >
                    Play Scavenger Hunt
                </Button>
            </Stack>
            <Image src={WuKong} height={500} />
        </HStack>
    );
};

export default Home;
