import { Box } from "@chakra-ui/react";
import LoginBtn from "../../components/login-btn";

export default function test(){
    return(
        <div>
            <Box w='100%' h='400px' bg='blue' bgImage="https://media.architecturaldigest.com/photos/5d3f6c8084a5790008e99f37/master/w_3000,h_2123,c_limit/GettyImages-1143278588.jpg" bgSize='cover' bgAttachment='fixed' bgPos='50% 100%' pos='relative' bgRepeat='no-repeat' > 
            <LoginBtn/>
            
            </Box>
        </div>
    )
}