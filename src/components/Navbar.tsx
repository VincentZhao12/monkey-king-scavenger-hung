import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
    return (
        <div
            style={{
                height: '10%',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Heading size={'lg'}>
                    <Link
                        to="/"
                        style={{
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        Monkey King's Scavenger Hunt
                    </Link>
                </Heading>
            </div>
            <hr />
        </div>
    );
};

export default Navbar;
