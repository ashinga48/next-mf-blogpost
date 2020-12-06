import * as React from 'react';
import { useEffect } from 'react';

const Nav = () => {

  // useEffect(() => {
  //   console.log(' HOOK WORKS ...... ');
  // }, [])

  return (
    <nav
      style={{
        background: 'hotpink',
        width: '100%',
        height: '100px',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
      }}>
      Nav
    </nav>
  );
};

export default Nav;
