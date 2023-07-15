import { Box, Spinner as ChakraSpinner, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';

const Spinner = () => {
  const primaryColor = "#4318FF";
  const secondaryColor = useColorModeValue('purple.500', 'purple.200');

  // Fungsi untuk menghasilkan warna berikutnya
  const getNextColor = (currentColor) => {
    return currentColor === primaryColor ? secondaryColor : primaryColor;
  };

  // Animasi warna spinner setiap 500ms
  const animateColorChange = () => {
    const spinner = document.getElementById('spinner');
    let currentColor = primaryColor;

    setInterval(() => {
      currentColor = getNextColor(currentColor);
      spinner.style.color = currentColor;
    }, 500);
  };

  // Mulai animasi saat komponen dipasang
  useEffect(() => {
    animateColorChange();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <ChakraSpinner id="spinner" size="xl" thickness="4px" speed="0.65s" color={primaryColor} />
    </Box>
  );
};

export default Spinner;
