import { Link } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { Box, ChakraProvider, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function AdminIndex (){
    const toast = useToast();
    const router = useRouter();
    const [showToast, setShowToast] = useState(false);
  
    useEffect(() => {
      const { create } = router.query;
  
      if (create === 'success' && !showToast) {
        toast.closeAll()
        toast({
          title: 'Sukses',
          description: 'Form berhasil disubmit',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setShowToast(true);
      }
    }, [router.query, showToast, toast]);
  

    return(
        <div>
            <Link href="/admin/create"><h1>create</h1></Link>
            <Link href="/admin/edit"><h1>edit</h1></Link>
            <Link href="/admin/delete"><h1>delete</h1></Link>
        </div>
    )
}