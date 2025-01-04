import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
    Container,
    Flex,
    Box,
    Image,
    Button,
    Stack,
    Text,
    Show,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Heading,
    Switch,
    Tabs,
    TabList,
    Tab,
    Checkbox,
    TabPanels,
    TabPanel,
    FormControl,
    FormLabel,
    Input,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Modal,
    useDisclosure, Select,
} from "@chakra-ui/react";
interface FormData {
    barrel1: string;
    barrel1A: string;
    barrel2: string;
    barrel3: string;
    barrel4: string;
    serialNumber: string;
}

interface Result {
    message: string;
    className: string;
}

const BarrelDataForm: React.FC = () => {
    const [serialNumbers, setSerialNumbers] = useState<string[]>([]);
    const [formData, setFormData] = useState<FormData>({
        barrel1: "",
        barrel1A: "",
        barrel2: "",
        barrel3: "",
        barrel4: "",
        serialNumber: "",
    });

    const [result, setResult] = useState<Result>({
        message: "PART/ASSY Number ",
        className: "info",
    });

    useEffect(() => {
        // Populate Serial Numbers (001 to 500)
        const numbers = Array.from({ length: 500 }, (_, i) => (i + 1).toString().padStart(3, "0"));
        setSerialNumbers(numbers);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const clearForm = () => {
        setFormData({
            barrel1: "",
            barrel1A: "",
            barrel2: "",
            barrel3: "",
            barrel4: "",
            serialNumber: "",
        });
        setResult({
            message: "PART/ASSY Number ",
            className: "info",
        });
    };
    const generateFinalOutput = (): string | null => {
        const { barrel1, barrel1A, barrel2, barrel3, barrel4, serialNumber } = formData;
        if (!barrel1 || !barrel1A || !barrel2 || !barrel3 || !barrel4 || !serialNumber) {
            return null;
        }
        return barrel1 + barrel1A + barrel2 + barrel3 + barrel4 + serialNumber;
    };

    const submitBarrelData = async (e: FormEvent) => {
        e.preventDefault();

        const finalOutput = generateFinalOutput();
        if (!finalOutput) {
            alert("Please select all barrel values and serial number.");
            return;
        }

        const dataToSubmit = {
            ...formData,
            finalOutput,
        };
        // below is for global access
        try {
            const response = await fetch("https://bv-reg.com/api/barrels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSubmit),
            });

            const result = await response.json();

            if (response.ok) {
                setResult({ message: `PART/ASSY Number : ${result.finalOutput}`, className: "success" });
            } else {
                setResult({ message: result.message, className: "error" });
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setResult({ message: "Error: Unable to submit data.", className: "error" });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '75.8vh' }}>
            <Heading as={'h4'}
                fontSize={'14'}
                height={'44px'} lineHeight={'44px'}
                color={'#fff'}
                bgColor={'color.700'}
                pl={'4'}
                display={'flex'}
                justifyContent={'space-around'}
                flexDirection={['column', 'row', 'row', 'row']}
                flexWrap={'wrap'}
            >
                PROJECT SERIES PART NUMBER

            </Heading>



            <form id="barrelForm" onSubmit={submitBarrelData}>

                <Flex m={"20px 0px"} gap="8" flexWrap={['wrap']} justify="space-around">

                    <FormControl w={["100%", "100%", "30%"]} >
                        <FormLabel fontWeight={"700"} fontSize={"14px"}>
                            Barrel 1(Project Code)
                        </FormLabel>

                        <Select
                            placeholder='Select'
                            bg={"#fff"}
                            border={"1px solid #D9D9D9"}
                            id="barrel1"
                            value={formData.barrel1}
                            onChange={handleChange}
                            required
                        >
                            {/* Add Select options here */}
                            <option value="12">12 - 12M Bus</option>
                            <option value="13">13 - 13.5M Bus</option>
                            <option value="09">09 - 9M Bus</option>
                        </Select>
                    </FormControl>


                    <FormControl w={["100%", "100%", "30%"]} >
                        <FormLabel fontWeight={"700"} fontSize={"14px"}>
                            Barrel 1A(Project Code)
                        </FormLabel>

                        <Select
                            placeholder='Select'
                            bg={"#fff"}
                            border={"1px solid #D9D9D9"}
                            id="barrel1A"
                            value={formData.barrel1A}
                            onChange={handleChange}
                            required
                        >
                            {/* Add Select options here */}
                            <option value="90">90 - Sleerer</option>
                            <option value="91">91 - Hybrid</option>
                            <option value="92">92 - 2+2_Seater</option>
                            <option value="93">93 - 2+1_Seater</option>
                        </Select>
                    </FormControl>

                    <FormControl w={["100%", "100%", "30%"]} >
                        <FormLabel fontWeight={"700"} fontSize={"14px"}>
                            Barrel 2(Design Group)
                        </FormLabel>

                        <Select
                            placeholder='Select'
                            bg={"#fff"}
                            border={"1px solid #D9D9D9"}
                            id="barrel2"
                            value={formData.barrel2}
                            onChange={handleChange}
                            required
                        >
                            {/* Add Select options here */}
                            <option value="00">00 - Vehicle Release Group</option>
                            <option value="01">01 - Front Structure</option>
                        </Select>
                    </FormControl>

                    <FormControl w={["100%", "100%", "30%"]} >
                        <FormLabel fontWeight={"700"} fontSize={"14px"}>
                            Barrel3(Sub Group)
                        </FormLabel>

                        <Select
                            placeholder='Select'
                            bg={"#fff"}
                            border={"1px solid #D9D9D9"}
                            id="barrel3"
                            value={formData.barrel3}
                            onChange={handleChange}
                            required
                        >
                            {/* Add Select options here */}
                            <option value="00">00 - Assembly</option>
                            <option value="01">01 - RECT/SQ. MS/ GI Tube</option>
                        </Select>
                    </FormControl>


                    <FormControl w={["100%", "100%", "30%"]} >
                        <FormLabel fontWeight={"700"} fontSize={"14px"}>
                            Barrel4(Part Designation And Level)
                        </FormLabel>

                        <Select
                            placeholder='Select'
                            bg={"#fff"}
                            border={"1px solid #D9D9D9"}
                            id="barrel4"
                            value={formData.barrel4}
                            onChange={handleChange}
                            required
                        >
                            {/* Add Select options here */}
                            <option value="0">0 - BUS</option>
                            <option value="1">1 - Sub Bus Assy</option>
                        </Select>
                    </FormControl>


                    <FormControl w={["100%", "100%", "30%"]} >
                        <FormLabel fontWeight={"700"} fontSize={"14px"}>
                            Serial Number
                        </FormLabel>

                        <Select
                            placeholder='Select'
                            bg={"#fff"}
                            border={"1px solid #D9D9D9"}
                            id="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleChange}
                            required
                        >
                            {/* Add Select options here */}

                            {serialNumbers.map((number) => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    {/* </div> */}
                </Flex>


                <FormControl w={["100%"]}>
                    <Stack direction="row" spacing={4} justify="center">
                        <Button
                            height="48px"
                            w="48%"
                            border={"1px solid #7FBF28"}
                            variant="solid"
                            type="button"
                            onClick={clearForm}
                        >
                            Clear
                        </Button>
                        <Button
                            height="48px"
                            bg="#7FBF28"
                            w="48%"
                            color="#fff"
                            _hover={{ bg: "#7FBF28" }}
                            _focus={{ bg: "#7FBF28" }}
                            variant="solid"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Stack>
                </FormControl>
            </form >


            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <div
                    style={{
                        display: 'inline-block',  // Keeps the box tight around the content
                        padding: '20px',
                        borderRadius: '4px',
                        color: result.className === "success" ? "#155724" : result.className === "error" ? "#721c24" : "#555",
                        backgroundColor:
                            result.className === "success"
                                ? "#d4edda"
                                : result.className === "error"
                                    ? "#f8d7da"
                                    : "#e7e7e7",
                        border: result.className === "success"
                            ? "1px solid #c3e6cb"
                            : result.className === "error"
                                ? "1px solid #f5c6cb"
                                : "1px solid #ddd",
                    }}
                >
                    <p id="result" className={result.className}>
                        {result.message}
                    </p>
                </div>
            </div>



        </div>
    );
};

export default BarrelDataForm;