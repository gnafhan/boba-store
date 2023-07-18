import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Grid,
    GridItem,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Avatar,
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  import { Inter, Outfit } from 'next/font/google'
   
  import { Quicksand } from 'next/font/google';
  import { Sigmar } from 'next/font/google';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
  const inter = Inter({ subsets: ['latin'] })
  const outfit = Outfit({subsets:['latin']})
  const quicksand = Quicksand({subsets:['latin']})
  const outfitBold = Outfit({subsets:['latin'], weight:'700'})
  const sigmar = Sigmar({subsets: ['latin'], weight: '400'});


  export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const {status} = useSession();
  
    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'left', md: 'left' })}
              className={outfitBold.className}
              display={{base:"flex", md: 'flex'}}
              // ml={{base:-3}}
              // fontSize={20}
              color={useColorModeValue('#422AFB', 'white')}>
              Boba
            </Text>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
          
          {status == "authenticated" ? (<div>
            <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
               <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => signOut()}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
            </Stack>
            
          </div>):status =="loading"?null:(<div><Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <Button
              as={'a'}
              fontSize={'md'}
              fontWeight={600}
              color={useColorModeValue('#422AFB', '#B9A2FF')}
              bg={useColorModeValue('white', '#1A202C')}
              className={quicksand.className}
              colorScheme={useColorModeValue('#422AFB', '#B9A2FF')}
              display={{ base: 'none', md: 'inline-flex' }}

              variant={'outline'}
              href={'/auth/signIn'}
              _hover={{
                bg: useColorModeValue('#f3f0ff', '#2e3046')
              }}
              _active={{
                bg: useColorModeValue('#f3f0ff', '#403f5e')
              }}
              >
              Sign In
            </Button>
            <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'md'}
              fontWeight={600}
              color={useColorModeValue('white', '#1A202C')}
              bg={useColorModeValue('#422AFB', '#B9A2FF')}
              _hover={{bg: useColorModeValue('#3311db', '#9374ff')}}
              _active={{bg: useColorModeValue('#2111a5', '#7551ff'),}}
              className={outfit.className}

              href={'/auth/signUp'}
              >
                
              Sign Up
            </Button>
          </Stack></div>)}

          
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
        
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  className={outfit.className}
                  p={2}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('purple.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: useColorModeValue('#422AFB', '#B9A2FF') }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={useColorModeValue('#422AFB', '#B9A2FF')} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };
  
  const MobileNav = () => {
    const {status }= useSession()
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
        <div>
        {status =='authenticated' ?null: (        <Stack spacing={4}>
        <Flex
          py={2}
          as={Link}
          href={ '#'}
          justify={'space-around'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
            <Button
              fontSize={'md'}
              px={{base: 10, sm: 90}}

              fontWeight={600}
              color={useColorModeValue('#422AFB', '#B9A2FF')}
              bg={useColorModeValue('white', '#1A202C')}
              className={quicksand.className}
              colorScheme={useColorModeValue('#422AFB', '#B9A2FF')}
              variant={'outline'}
              href={'/auth/signIn'}
              _hover={{
                bg: useColorModeValue('#f3f0ff', '#2e3046')
              }}
              _active={{
                bg: useColorModeValue('#f3f0ff', '#403f5e')
              }}
              >
              Sign In
            </Button>
            <Button
              display={{ base: 'inline-flex', md: 'inline-flex' }}
              px={{base: 10, sm: 90}}
              fontSize={'md'}
              fontWeight={600}
              color={useColorModeValue('white', '#1A202C')}
              bg={useColorModeValue('#422AFB', '#B9A2FF')}
              className={outfit.className}

              href={'/auth/signUp'}
              _hover={{bg: useColorModeValue('##422AFB', '#9374ff')}}
              _active={{bg: useColorModeValue('#2111a5', '#7551ff'),}}
              > 
              Sign Up
              </Button>
            </Flex>
            </Stack>)}

        </div>
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  

  
  const NAV_ITEMS = [
    {
      label: 'Home',
      href: '/',
      
    },
    {
      label: 'Catalogue',
      children: [
        {
          label: 'All Boba',
          subLabel: 'All drink including tea, milk, and fruit',
          href: '/catalogue',
        },
        {
          label: 'Tea Boba',
          subLabel: 'This type of boba drink uses the main ingredient of tea as its base, such as black tea or oolong tea.',
          href: '/catalogue',
        },
        {
          label: 'Milk Boba',
          subLabel: "This type of milk boba drink has a milk base, either cow's milk, soy milk, or almond milk",
          href: '/catalogue',
        },
        {
          label: 'Fruit Boba',
          subLabel: 'This type of fruit boba drink uses juice or fruit puree as its base.',
          href: '/catalogue',
        }
      ],
      href: '/catalogue',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
    
  ];


