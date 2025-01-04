import { FC } from 'react';
import {
    Box,
    HStack,
    ModalBody,
    ModalCloseButton,
    Image,
    ModalContent,
    Text,
    Button,
    ModalFooter,
    Modal,
    ModalOverlay,
    useDisclosure

} from "@chakra-ui/react";
import success from '../../assets/images/success.png';
interface Props{
    successMsg: string,
    approved: boolean
}
const ApproveSuccess: FC<Props> = ({successMsg, approved}) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: approved }); 
    return (
        <>  
        <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
            <ModalContent className='resister-success' maxW={"400px"}>
                <ModalCloseButton color={"#000"} />
                <ModalBody bg="#fff" >
                    <HStack>
                        <Box p={["15px", "20px"]} justifyContent="center" alignItems='center' display='flex'>
                            <Image src={success} alt="" title="" w={'30px'} />
                        </Box>
                        <Box>
                            <Text fontSize={'18px'} fontFamily={'Open Sans'}>{successMsg}</Text>
                        </Box>
                    </HStack>

                </ModalBody>
                <ModalFooter position={'relative'} h='80px'>
                    <ModalCloseButton
                        top={'20px'}
                        left={'27%'}
                        color={"#fff"}
                        w="185px"
                        bg={'#7FBD2C'}
                        fontSize='16px'
                    >Close</ModalCloseButton>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    )
}
export default ApproveSuccess;