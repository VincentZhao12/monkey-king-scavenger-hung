import React, { FC } from 'react';
import WuKong from '../assets/WuKong.png';
import './Home.css';
import {
    Heading,
    Button,
    Stack,
    Text,
    HStack,
    Image,
    Link as StyledLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface EndProps {}

const End: FC<EndProps> = () => {
    return (
        <HStack
            justifyContent={'center'}
            height={'80%'}
            width={'40%'}
            spacing={7}
        >
            <Stack>
                <Heading size="lg">Thank you so much for playing</Heading>
                <Text>
                    You helped out 孫悟空 a great deal here! Read my artist
                    statement{' '}
                    <StyledLink
                        as="a"
                        href="https://docs.google.com/document/d/1sw9RvV_MzCh2840jiTo60KMSLX5-LsTtgeOe7kKbQwU/edit?usp=sharing"
                        target="_blank"
                        color="blue"
                    >
                        here
                    </StyledLink>
                </Text>
            </Stack>
            <Image src={WuKong} height={500} />
        </HStack>
    );
};

export default End;
