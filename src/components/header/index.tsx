import { FC, useEffect, useState }  from 'react';
import * as React from "react"
import {
    Container,
    Flex,
    Box,
    Spacer,
    Image,
    Button,
    Stack,
    Text,
    Avatar,
    Show,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from "@chakra-ui/react";
  import { ChevronDownIcon } from '@chakra-ui/icons'
  import { useNavigate } from 'react-router-dom';
  import { Link} from 'react-router-dom';
  import logo from '../../assets/images/logo.png';
  import userIcon from '../../assets/images/userIcon.png';  
  import { useSelector, useDispatch } from 'react-redux';
  import { RootState } from "../../app/store";
  import {logout,setUserData} from '../../features/login/loginSlice';
  import {Title} from '../../utilities/meta';
const Header: FC = () =>{
  const navigate = useNavigate();
  const userData:any = useSelector((state: RootState) => state.loginCredential.userData);
  const {username, role} = userData;
  const dispatch = useDispatch();
  Title({
    title: 'Bv-Reg'
  });
  const userLogout = () => {
    dispatch(logout())
    dispatch(setUserData({}))  
    navigate('/')  

  }
 return(
    <Container maxWidth='100%' bg='#fff' boxShadow='md' p={2}>
        <Flex flexWrap='wrap' alignItems='center'>
            <Box alignItems='center'
            display={'flex'} 
            justifyContent={'space-between'}
            alignContent={'center'}
          
             width={[
                '30%', // 0-30em
                '20%', // 30em-48em
                '15%', // 48em-62em
                '15%', // 62em+
              ]} pl={5}>
                <Link to='/'><Image src={logo} alt="brand"/></Link>
                
                </Box>
                {username !== undefined && userData.status !== 'inactive'  || userData.role === 'admin' ? 
            <Show breakpoint='(max-width: 767px)'>
              <Box
                width={[
                  '70%', // 0-30em
                  '80%', // 30em-48em
                  '15%', // 48em-62emg
                  '15%', // 62em+
                ]}>
                <Flex direction='row' justifyContent='right'>
                  <Box pt={5} pr={5} textAlign='center'>
                    <Text fontSize={14} lineHeight={0} pt={5}>Welcome</Text>
                    <Text fontSize={14} lineHeight={0} as='b'>{username}</Text>
                  </Box>
                  <Box pt={4} pr={5} textAlign='left'>
                    <Avatar name='Dan Abrahmov' w={[70]} h={[70]} src={userIcon} />
                    <Menu closeOnSelect={false}>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon color={"#000"} />}
                          size='md'
                          w={"25px"}
                          height='48px'
                          mt={"12px"}
                          bg="#fff"
                          _hover={{ bg: '#fff' }}
                          _focus={{ bg: '#fff' }}
                          _active={{ bg: '#fff' }}
                          
                        >
                        </MenuButton>
                        <MenuList mt={"25px"}>
                          <MenuItem _hover={{ bg: '#fff' }} onClick={userLogout}>Logout</MenuItem>
                        </MenuList>
                      </Menu>
                  </Box>
                </Flex>
              </Box>
            </Show> : null }
            <Box 
            width={[
                '100%', // 0-30emhh
                '100%', // 30em-48em
                '70%', // 48em-62em
                '55%', // 62em+
              ]} justifyContent='center' alignItems='center'>
               
         <Show breakpoint='(min-width: 1024px)'>
           <Stack direction='row' spacing={4} alignItems='center' height={20}  fontSize={16}>
             {
             (role === 'user' && role !== undefined || role === 'admin') &&

              <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}><Link to='/'>Home</Link></Button>

             }

{
             (role === 'user' && role !== undefined || role === 'admin') &&

              <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}><Link to='/About'>About</Link></Button>

             }
             

             {role === 'user' && role !== undefined ? <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}><Link to='/Dashboard'>Homologation</Link></Button> :
               ""
             }
             {role === 'user' && role !== undefined ? <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}><Link to='/WMI'>WMI</Link></Button> :
               ""
             }
             {role === 'admin' && role !== undefined ? <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}><Link to='/SearchUserOrHomologation'>Dashboard</Link></Button> : ""}
             {role !== undefined ?
               <>
                 {/* <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}>WMI</Button> */}
                 <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}>Udyam reg</Button>
                 <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}>Inbox</Button>
               </>
               : ""}
           </Stack>
         </Show>
              <Show breakpoint='(max-width: 1023px)'>
                  <Box width='100%' overflow='scroll'>
             <Stack direction='row' width='800px' spacing={4} alignItems='center' height={20} pt={4} fontSize={16}>
               <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}><Link to='/'>Home</Link></Button>
               {role === 'user' && role !== undefined ? <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}><Link to='/Dashboard'>HomoLogation</Link></Button> :
                 ""}
                  {role === 'user' && role !== undefined ? <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}><Link to='/WMI'>WMI</Link></Button> :
                 ""}
               {role === 'admin' && role !== undefined ? <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}><Link to='/SearchUserOrHomologation'>Dashboard</Link></Button>
                 : ""}
               {role !== undefined ?
                 <>
                   {/* <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}>WMI</Button> */}
                   <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}>Udyam reg</Button>
                   <Button variant='link' pl={5} pr={5} pt={2} pb={2} color='#000' _hover={{ bg: '#7FBD2C' }}>Inbox</Button>
                 </>
                 : ""}
             </Stack>
                  </Box>
         
              </Show>
           
            
              </Box>
             
            <Spacer/>
            {username !== undefined && userData.status !== 'inactive' || userData.role === 'admin' ? 
            <Show breakpoint='(min-width: 768px)'>
            <Box 
            width={[
                '100%', // 0-30em
                '100%', // 30em-48em
                '15%', // 48em-62emg
                '25%', // 62em+
              ]}>
                 <Flex direction='row' justifyContent='right'>
                     <Box pt={5} pr={5} textAlign='left'>
                         <Text fontSize={14} lineHeight={0} pt={5}>Welcome</Text>
                         <Text fontSize={14} lineHeight={'36px'} as='b'>{username}</Text>
                     </Box>
                     <Box pt={4} pr={5} textAlign='left'>
                         <Avatar name='Dan Abrahmov' w={[18, 24, 70]} h={[18, 24, 70]} src={userIcon}/>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon color={"#000"} />}
                          size='md'
                          w={"auto"}
                          height='auto'
                          mt={"12px"}
                          bg="#fff"
                          _hover={{ bg: '#fff' }}
                          _focus={{ bg: '#fff' }}
                          _active={{ bg: '#fff' }}
                        >
                        </MenuButton>
                        <MenuList>
                          <MenuItem _hover={{ bg: '#fff' }} onClick={userLogout} textAlign={'center'}>Logout</MenuItem>
                        </MenuList>
                      </Menu>
                     </Box>
                 </Flex>
              </Box>
              </Show>
              : null }
        </Flex>
    </Container>
 )
}
export default Header;
