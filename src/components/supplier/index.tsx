import { FC } from 'react';
import * as React from "react"
import { useState, useEffect, useReducer } from "react"
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
    TabPanels,
    TabPanel,
    FormControl,
    FormLabel,
    Input,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
} from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons'
import Sbike from '../../assets/images/s-bike.png';
import threeWheeler from '../../assets/images/three-wheeler.png';
import download from '../../assets/images/download.jpeg';
import downloadIcon from '../../assets/images/downloadIcon.png'
import addSuplier from '../../assets/images/addsupplier.png';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { Post, Get, PATCH } from "../../utilities/service";
import AddSupplier from './addSupplier';
import ApproveSuccess from '../Auth/approveSuccess';
import { format } from 'date-fns';

/* Form Validation */
import { useForm } from "react-hook-form";

let formfeilds1: any = [];
let formfeilds2: any = [];
let formfeilds3: any = [];
let formfeilds4: any = [];
let formfeilds5: any = [];

// Define the types
interface Property {
    label: string;
    value: string;
}

interface Properties {
    [key: string]: Property;
}

interface Footer {
    properties: Properties;
    label: string;
}

interface AllFormsDataData {
    footer: Footer;
    _id: string;
}

// Initialize with an empty state or appropriate default values
const initialFooterData: AllFormsDataData = {
    footer: {
        properties: {
            Homologation_Engineer_Name: {
                label: "Homologation Engineer Name",
                value: ""
            },
            Engineer_Designation: {
                label: "Engineer Designation",
                value: ""
            },
            Manufacture_Name: {
                label: "Manufacture Name",
                value: ""
            },
            Document_No: {
                label: "Document No",
                value: ""
            },
            Upload_Seal: {
                label: "Upload Seal / Signature",
                value: ""
            }
        },
        label: "Footer"
    },
    _id: "665ee0ce28090299501f4700"
};

const Homologation: FC = () => {

    const homologationDatas: any = useSelector((state: RootState) => state.homologation.homologationData);
    const Category: string = useSelector((state: RootState) => state.homologation.Category);
    const requestId: any = useSelector((state: RootState) => state.homologation.requestId);
    const token: string = useSelector((state: RootState) => state.loginCredential.token);
    const searchApiURL = "getModelData/homologationRequestComponents";
    const supplierURL = "supplier/";
    const [homologationsData, sethomologationsData] = useState([]);
    const [footerData, setFooterData] = useState<AllFormsDataData>(initialFooterData);
    const [pageName, setPageName] = useState<string | undefined>("");
    const [activeTabs, setActiveTabs] = useState<string | undefined>("");
    const [activeComponent, setActiveComponent] = useState<string | undefined>("");
    const [activeSuppliers, setActiveSuppliers] = useState<string | undefined>("");
    const [formId, setFormId] = useState<string | undefined>("");    
    const [addsupplier, setAddsupplier] = useState<boolean>(false);
    const [dataSaved, setDataSaved] = useState<boolean>(false);
    const [homologationAllData, setHomologationAllData] = useState([]);
    const [suppliersData, setSuppliersData] = useState([]);
    const [formsData, setFormsData] = useState([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { handleSubmit: handleSubmit1, register: register1, formState: { errors: errors1 }, reset: reset1, } = useForm()
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, reset: reset2, } = useForm();
    const { register: register3, formState: { errors: errors3 }, handleSubmit: handleSubmit3, reset: reset3, } = useForm();
    const { register: register4, formState: { errors: errors4 }, handleSubmit: handleSubmit4, reset: reset4, } = useForm();
    const { register: register5, formState: { errors: errors5 }, handleSubmit: handleSubmit5, reset: reset5, } = useForm();

    const [formFeildLength1, setFormFeildLength1] = useState<any>({});
    const [formFeildLength2, setFormFeildLength2] = useState<any>({});
    const [formFeildLength3, setFormFeildLength3] = useState<any>({});
    const [formFeildLength4, setFormFeildLength4] = useState<any>({});
    const [formFeildLength5, setFormFeildLength5] = useState<any>({});


    let activeComponentName: any[];
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    const handleReset = (formKey:any,formName:any) => {
        console.log('formKey43535',formName)
        if(formName ==='notApplicabale'){
            switch (formKey) {
                case 0:
                    reset1(); 
                    //setFormFeildLength1({ 'formName': formName, 'fielsdLength': 0 })               
                    break;
                case 1:
                    reset2();
                    //setFormFeildLength2({ 'formName': formName, 'fielsdLength': 0 }) 
                    break;
                case 2:
                    reset3();
                    //setFormFeildLength3({ 'formName': formName, 'fielsdLength': 0 }) 
                    break;
                case 3:
                    reset4();
                    //setFormFeildLength4({ 'formName': formName, 'fielsdLength': 0 }) 
                    break;
                case 4:
                    reset5();
                    //setFormFeildLength5({ 'formName': formName, 'fielsdLength': 0 }) 
                    break;
                default:
                    break;
            }
        }else{
        switch (formKey) {
            case 0:
                reset1(); 
                setFormFeildLength1({ 'formName': formName, 'fielsdLength': 0 })               
                break;
            case 1:
                reset2();
                setFormFeildLength2({ 'formName': formName, 'fielsdLength': 0 }) 
                break;
            case 2:
                reset3();
                setFormFeildLength3({ 'formName': formName, 'fielsdLength': 0 }) 
                break;
            case 3:
                reset4();
                setFormFeildLength4({ 'formName': formName, 'fielsdLength': 0 }) 
                break;
            case 4:
                reset5();
                setFormFeildLength5({ 'formName': formName, 'fielsdLength': 0 }) 
                break;
            default:
                break;
        }
    }
        
    };

    const getHomologationData = async (homologationData: {}) => {
        await Post(searchApiURL, homologationData, config)
            .then((resp) => {
                sethomologationsData(resp.data)
                setPageName('safety-component-1');
                activeComponentName = resp.data;
            })
            .catch((error) => {
                console.log('error');
            });
    };


    const handleFileChange = async(e:any) => {
        console.log('e.target.files[0]',e.target.files[0])
        setDataSaved(true)
        const inputElement = e.target;
        const propertyName = inputElement.getAttribute('id');
        const headerName = inputElement.getAttribute('name')
        const formNameAndFormId = inputElement.getAttribute('form').replace("Data", "").split("formId");
        const form = formNameAndFormId[0]
        const formId = formNameAndFormId[1]

        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        formData.append('form', form);
        formData.append('headerName', headerName);
        formData.append('propertyName', propertyName);

        let uploadFileUrl = "files/upload/" + formId;
        await Post(uploadFileUrl, formData, config)
            .then((resp) => {
                console.log('resp',resp); 
                setTimeout(function () {
                    setDataSaved(false)
                }, 5000);              
                getHomologationFormData(pageName, '', '');
             
            })
            .catch((error) => {
                console.log('error');
            }); 
    };
   
    const uploadSealSigniture = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            if (file.size > 10240) { // Check if file size is greater than 10KB (10KB = 10 * 1024 bytes)
                alert('File size should be less than 10KB.');
                event.target.value = ''; // Reset the input
                setSelectedFile(null);
            } else {
                setSelectedFile(file);
            }
        }
    };

    const storeSupplier = async (suppliers: {}) => {

        await Post(supplierURL, suppliers, config)
            .then((resp) => {
                let supplierAPI = "forms/createFormsForSupplier/" + requestId;
                let suplierIdAndComponentName = { "supplierId": resp.data.body._id, "component": activeComponent }
                Post(supplierAPI, suplierIdAndComponentName, config)
                    .then((resp) => {
                        getHomologationFormData(pageName, activeComponent, activeSuppliers);

                    })
                    .catch((error) => {
                        console.log('error');
                    });
            })
            .catch((error) => {
                console.log('error');
            });
    };


    const formApiURL = "forms/" + requestId;
    const getHomologationFormData = async (pageName?: string, activeComponent?: string, activeSupplier?: any, pageOrComponent?: string) => {
        await Get(formApiURL, config)
            .then(resp => {
                if (resp.data.status === 'success') {

                    let active: string = '';
                    let checkArraydata: any[]
                    console.log('resp.data.body', resp.data.body);
                    

                    checkArraydata = activeComponentName ? activeComponentName : homologationsData;

                    activeComponent && pageName ? checkArraydata.filter((value: any) => pageName === value.page && value.components.filter((value: any, key: any) => value === activeComponent ? active = value : null))
                        : pageName ? checkArraydata.filter((value: any) => pageName === value.page && value.components.filter((value: any, key: any) => key === 0 ? active = value : null))
                            : checkArraydata.filter((value: any) => 'safety-component-1' === value.page && value.components.filter((value: any, key: any) => key === 0 ? active = value : null))

                    setActiveComponent(active);
                    let suppliData: any = [];
                    let formsfeild: any = [];
                    let formsData: any = [];
                    var activeSupl: string = '';
                    var storeSupplier: number = 0;
                    let formNames = Object.keys(resp.data.body)
                    let fileUploadData = Object.keys(resp.data.body.fileUploadData)
                    
                    let allSuppliersNull: boolean = false;
                    var matchedFormsNumber: number = 0;
                    let formId:any;

                    formNames.forEach(function (formValue: any, formKey: any) {
                        if(formKey !==5){
                            [resp.data.body].filter((allDatavalue: any, key) => {

                                [allDatavalue[formValue]].filter((value: any, key) => {
                                    let formData = Object.keys(value)
    
                                    formData.map(function (cmpValue: any, key) {
    
                                        let toLowerCase: string = '';
                                        if (value[cmpValue]?.label) {
                                            toLowerCase = value[cmpValue]?.label.toLowerCase()
                                        }
                                        if (toLowerCase === active.toLowerCase()) {
    
                                            storeSupplier++;
                                            let conponetObj = value[cmpValue];
                                            let conpnentskeys: any = Object.keys(value[cmpValue]);
                                            let checkArray: any = Object.keys(value[cmpValue]);
                                            checkArray = checkArray.filter((item: any, key: any) => key > 0);
                                            conponetObj[checkArray[0]].length > 0 &&
                                                conpnentskeys.map((componentValue: any, key: any) => {
                                                    if (key > 0) {
    
                                                        let getActiveComponentIndex: number = 0;
                                                        let findActiveSuppliedIndiex: number = 0;
    
    
                                                        if (storeSupplier === 1) {
                                                            conponetObj[componentValue].map((sup: any, key: any) => {
                                                                suppliData.push(sup.supplier)
                                                            })
                                                        }
    
                                                        let supIndex: number = 0;
                                                        for (const activeSup of suppliData) {
                                                            supIndex++
                                                            if (activeSup.active) {
                                                                findActiveSuppliedIndiex = supIndex - 1;
                                                                break;
                                                            }
                                                        }
                                                        if (activeSuppliers && !activeSupplier && !pageOrComponent) {
                                                            activeSupl = activeSuppliers
                                                        } else {
                                                            activeSupplier ? activeSupl = activeSupplier : suppliData.filter((value: any, key: any) => key === findActiveSuppliedIndiex ? activeSupl = value._id : null);
                                                        }
    
                                                        conponetObj[componentValue].map((getactiveSupId: any, key: any) => {
                                                            if (getactiveSupId.supplier._id === activeSupl && getactiveSupId.supplier.active) {
                                                                getActiveComponentIndex = key;
                                                                allSuppliersNull = true;
                                                            }
                                                        })
    
                                                        let supplier: string = 'supplier'
                                                        let id: string = '_id';
                                                        let fieldValuse = Object.keys(conponetObj[componentValue][getActiveComponentIndex]);
                                                        let fieldData: any = [];
                                                        let fields: any;
                                                        let fieldLength: number = 0;
                                                        let filledfieldLength: number = 0;
                                                        let pushFilledFormValue: any = [];
                                                        let formId: any = [];
    
    
                                                        fieldValuse.map((ids: any, key: any) => {
                                                            if (key === fieldValuse.length - 1) {
                                                                formId.push(conponetObj[componentValue][getActiveComponentIndex][ids])
                                                            }
                                                        })
    
    
                                                        fieldValuse = fieldValuse.filter((item: any) => item !== supplier);
                                                        fieldValuse = fieldValuse.filter((item: any) => item !== id);
    
                                                        fieldValuse.map((feildName: any, key: any) => {
    
                                                            fieldData.push({ 'headingKey': feildName }, conponetObj[componentValue][getActiveComponentIndex][feildName]);
                                                            fields = Object.keys(conponetObj[componentValue][getActiveComponentIndex][feildName].properties);
                                                            let reduceDisplayField: number = 0;
                                                            fields.map((feildProperty: any, key: any) => {
                                                                if (conponetObj[componentValue][getActiveComponentIndex][feildName].properties[feildProperty].display === false) {
                                                                    reduceDisplayField++
                                                                }
                                                            })
    
    
                                                            fieldLength += fields.length - reduceDisplayField;
                                                            fields.map((field: any, key: any) => {
                                                                if (conponetObj[componentValue][getActiveComponentIndex][feildName].properties[field].value !== '') {
                                                                    filledfieldLength = filledfieldLength + 1
                                                                    let fieldName = field
                                                                    let parentLabel = (conponetObj[componentValue][getActiveComponentIndex][feildName].label).replace(/\s/g, "_");
                                                                    let fieldNamePlusparentLabel = fieldName + "&&&" + parentLabel;
                                                                    let fieldValue = conponetObj[componentValue][getActiveComponentIndex][feildName].properties[field].value;
                                                                    pushFilledFormValue.push({ [fieldNamePlusparentLabel]: fieldValue })
                                                                }
                                                            })
    
                                                        })
                                                        matchedFormsNumber++
    
                                                        if (filledfieldLength > 0) {
                                                            if (matchedFormsNumber === 1) {
                                                                setFormFeildLength1({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': filledfieldLength });
                                                                formfeilds1 = pushFilledFormValue;
                                                            } else if (matchedFormsNumber === 2) {
                                                                setFormFeildLength2({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': filledfieldLength });
                                                                formfeilds2 = pushFilledFormValue;
                                                            } else if (matchedFormsNumber === 3) {
                                                                setFormFeildLength3({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': filledfieldLength });
                                                                formfeilds3 = pushFilledFormValue;
                                                            } else if (matchedFormsNumber === 4) {
                                                                setFormFeildLength4({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': filledfieldLength });
                                                                formfeilds4 = pushFilledFormValue;
                                                            } else if (matchedFormsNumber === 5) {
                                                                setFormFeildLength5({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': filledfieldLength });
                                                                formfeilds5 = pushFilledFormValue;
                                                            }
    
                                                        } else {
                                                            if (matchedFormsNumber === 1) {
                                                                setFormFeildLength1({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': 0 });
                                                                formfeilds1 = [];
                                                            } else if (matchedFormsNumber === 2) {
                                                                setFormFeildLength2({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': 0 });
                                                                formfeilds2 = [];
                                                            } else if (matchedFormsNumber === 3) {
                                                                setFormFeildLength3({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': 0 });
                                                                formfeilds3 = [];
                                                            } else if (matchedFormsNumber === 4) {
                                                                setFormFeildLength4({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': 0 });
                                                                formfeilds4 = [];
                                                            } else if (matchedFormsNumber === 5) {
                                                                setFormFeildLength5({ 'formName': formValue.replace("form", "").replace("Data", ""), 'fielsdLength': 0 });
                                                                formfeilds5 = [];
                                                            }
                                                        }
    
                                                        setTimeout(function () {
                                                            setDataSaved(false)
                                                        }, 5000);
    
                                                        if (activeSupl === activeSupplier && fieldLength > 0) {
                                                            allSuppliersNull &&
                                                                formsfeild.push([{ 'formName': formValue }, { 'fieldLength': fieldLength }, { 'formId': formId }, fieldData]);
                                                        } else if (fieldLength > 0) {
                                                            allSuppliersNull &&
                                                                formsfeild.push([{ 'formName': formValue }, { 'fieldLength': fieldLength }, { 'formId': formId }, fieldData]);
                                                        }
    
                                                    }
                                                });
    
                                        }
                                    });
                                });
    
                            });
                        }else if(active === "File Uploads"){ // file upload functionality started
                            fileUploadData.forEach(function (allDatavalue: any, formKey: any) {
                                formId = resp.data.body.fileUploadData._id;
                                setFormId(requestId)
                                setFooterData(resp.data.body.fileUploadData.footerData) 
                                if(allDatavalue!=='_id'  &&  allDatavalue!=='homologationRequest' && allDatavalue!=='createdAt' && allDatavalue!=='updatedAt' && allDatavalue!=='__v'){
                                    let formData = Object.keys(resp.data.body.fileUploadData[allDatavalue]);  
                                    let countFeild:number=0;
                                    let fileUploadCount:number = 0; 
                                    if(allDatavalue!=='footerData'){                                                                          
                                        formData.forEach(function (formValue: any, formKey: any) {
                                            if(formValue!=='_id'){
                                                let formFeild = Object.keys(resp.data.body.fileUploadData[allDatavalue][formValue].properties);
                                                countFeild+=formFeild.length;
                                                formFeild.forEach(function (val: any, formKey: any) {
                                                    if(resp.data.body.fileUploadData[allDatavalue][formValue].properties[val].file_name!==''){
                                                        fileUploadCount+=1
                                                    }
                                                })
                                            }
                                            
                                        })
                                    }

                                    formsData.push(
                                        {
                                            'formsData':resp.data.body.fileUploadData[allDatavalue],
                                            'formName':allDatavalue,'feildLength':countFeild,'fileUploadCount':fileUploadCount,
                                            'formId' : formId
                                        }                                        
                                    )
                                }
                            });
                        }
                        handleReset(formKey,'notApplicabale') 

                    });
                   
                    console.log('formsData',formsData)
                    console.log("formsfeild", formsfeild);
                    console.log("suppliData", suppliData);

                    reset1(homologationAllData);
                    reset2(homologationAllData);
                    reset3(homologationAllData);
                    reset4(homologationAllData);
                    reset5(homologationAllData);
                   
                    /*
                    let resetButton = document.getElementById('resetId0');
                    resetButton?.click()
                   // handleReset(formKey,'notApplicabale')
                 
                    let resetButton1 = document.getElementById('resetId1');
                    resetButton1?.click()
                    let resetButton2 = document.getElementById('resetId2');
                    resetButton2?.click()
                    let resetButton3 = document.getElementById('resetId3');
                    resetButton3?.click()
                    let resetButton4 = document.getElementById('resetId4');
                    resetButton4?.click()
*/
                    setSuppliersData(suppliData);
                    setFormsData(formsData);
                    setActiveSuppliers(activeSupl)
                    setHomologationAllData(formsfeild);
                    setActiveSuppliers(activeSupl);
                }
                if (resp.data.status === 'failure') { }

            })
            .catch((error) => {
                console.log(error)
            })
    };

    const footerHandleSubmit = async (event: any) => {
        event.preventDefault();
        setDataSaved(true)
        const data = new FormData(event.target);
        const formObject = Object.fromEntries(data.entries());
        const footerUrl = "files/footer/" + formId;

        for (let key in formObject) {
            if (footerData.footer.properties.hasOwnProperty(key)) {
                if (key !== 'Upload_Seal') {
                    footerData.footer.properties[key].value = formObject[key] as string;
                } else {
                    footerData.footer.properties[key].value = selectedFile ? selectedFile.name : '';
                }
            }
        }
        const allFooterdata = {
            'data': {
                "footerData": footerData
            }
        };

        await Post(footerUrl, allFooterdata, config)
            .then((resp) => {
                console.log('resp', resp);
                setTimeout(function () {
                    setDataSaved(false)
                }, 5000);
                getHomologationFormData(pageName, '', '');
            })
            .catch((error) => {
                console.log('error', error);
            });
    };


    const supplierApi = "supplier/";
    const activeOrDeactiveSupplier = async (suppliers: {}) => {
        await PATCH(supplierApi, suppliers, config)
            .then((resp) => {
                if (resp.data.status === 'success') {
                    getHomologationFormData(pageName, activeComponent, '');
                }
                if (resp.data.status === 'failure') { }
            })
            .catch((error) => {
                console.log('error');
            });
    };


    const getPageName = (pageName?: string) => {
        setPageName(pageName);
        setActiveSuppliers('');
        setActiveTabs('');
        getHomologationFormData(pageName, '', '', 'page');
    }
    const active = (activeComponentName?: string) => {
        setActiveComponent(activeComponentName);
        setActiveSuppliers('');
        setActiveTabs('');
        getHomologationFormData(pageName, activeComponentName, '', 'component');

    }
    const activeSupplier = (activeSupplier?: string) => {
        if (activeSuppliers !== activeSupplier) {
            setActiveSuppliers(activeSupplier);
            getHomologationFormData(pageName, activeComponent, activeSupplier);
            setActiveTabs('');
        }

    }

    const supplierDeactivateOrActivate = (supplierId: string, status: boolean) => {
        let checkStatus: boolean;
        status === true ? checkStatus = false : checkStatus = true;
        activeOrDeactiveSupplier({ 'supplierId': supplierId, 'status': checkStatus })
    }

    const addSupliers = () => {
        setAddsupplier(true);
        setActiveTabs('');
    }
    const closePopup = (popupClosed: boolean) => {
        setAddsupplier(popupClosed);
    }
    const activeTab = (activeTab: string) => {
        setActiveTabs(activeTab);
    }


    const onSubmits = (supplierData: any) => {
        let active: any = { "active": true }
        let suppliers = { ...supplierData, ...active }
        storeSupplier(suppliers);
        setAddsupplier(false);
    };

    const commonFunction = (name: any, value: any, formfeilds: any) => {
        let keyName = name;
        let keyIndex: number = 0;
        let checkKey: boolean = false;
        let final: any = [];
        if (value) {
            if (formfeilds.length === 0) {
                formfeilds.push({ [name]: value })
            } else {
                formfeilds.map((element: any, index: number) => {
                    if (keyName in element) {
                        checkKey = true;
                        keyIndex = index
                    }
                });
                if (checkKey) {
                    formfeilds[keyIndex][keyName] = value
                } else {
                    formfeilds.push({ [name]: value })
                }
            }

        } else {
            formfeilds.map((element: any, index: number) => {
                if (keyName in element) {
                    checkKey = true;
                    delete formfeilds[index][keyName]
                }
            });

        }
        formfeilds.map((element: any, index: number) => {
            if (Object.keys(element).length > 0) {
                final.push(element);
            }
        });
        return final.length
    }


    const changeHandler1 = (event: React.ChangeEvent<HTMLInputElement>, formName: any) => {
        let fieldLength = commonFunction(event.target.name, event.target.value, formfeilds1)
        setFormFeildLength1({ 'formName': formName, 'fielsdLength': fieldLength })
    }

    const changeHandler2 = (event: React.ChangeEvent<HTMLInputElement>, formName: any) => {
        let fieldLength = commonFunction(event.target.name, event.target.value, formfeilds2)
        setFormFeildLength2({ 'formName': formName, 'fielsdLength': fieldLength })
    }

    const changeHandler3 = (event: React.ChangeEvent<HTMLInputElement>, formName: any) => {
        let fieldLength = commonFunction(event.target.name, event.target.value, formfeilds3)
        setFormFeildLength3({ 'formName': formName, 'fielsdLength': fieldLength })
    }

    const changeHandler4 = (event: React.ChangeEvent<HTMLInputElement>, formName: any) => {
        let fieldLength = commonFunction(event.target.name, event.target.value, formfeilds4)
        setFormFeildLength4({ 'formName': formName, 'fielsdLength': fieldLength })
    }

    const changeHandler5 = (event: React.ChangeEvent<HTMLInputElement>, formName: any) => {
        let fieldLength = commonFunction(event.target.name, event.target.value, formfeilds5)
        setFormFeildLength5({ 'formName': formName, 'fielsdLength': fieldLength })
    }

    const constructFormData = (formsData: any, resetId?: number) => {
        console.log('formData', formsData)
        let activeSupplierData = suppliersData.filter((value: any, key: any) => value._id === activeSuppliers)

        let keyObjects = Object.keys(formsData)
        let formType = formsData.formType;
        let formId = formsData.formId;
        let lableNames: any = [];
        let fieldLabel: any = [];
        let fieldNames: any = []
        let unitsName: any = []
        let constructData: any = []
        let activeSupplier;
        let checkNumber = /^(\d+ )*(\d+)$/

        activeSupplierData.map((element: any) => { activeSupplier = element; })

        keyObjects.map((element: any) => {
            if (element.includes("&&&")) {
                fieldNames.push(element)
            } else if (element.includes("###")) {
                fieldLabel.push(element)
            } else if (element.includes("****")) {
                unitsName.push(element)
            } else if (element !== 'formType' && element !== 'formId' && !checkNumber.test(element)) {
                lableNames.push(element)
            }
        });

        let getMatchedLen: any = [];


        lableNames.map((lebelName: any) => {
            getMatchedLen = [];
            fieldNames.map((fieldName: any) => {

                fieldLabel.map((fieldlabel: any) => {

                    let exactFiledName = fieldName.split("&&&");
                    let lableNames = fieldlabel.split("###");


                    let name: any = exactFiledName[0];
                    if (lableNames[0] === name) {
                        if (fieldName.includes(lebelName)) {
                            let display: any;
                            if (formsData[fieldName] === 'false') {
                                display = {
                                    "value": '',
                                    "label": formsData[fieldlabel],
                                    'display': false
                                }
                            } else if (formsData[fieldName] === 'mm' || formsData[fieldName] === 'Kg' || formsData[fieldName] === '% or °(Degree)') {
                                console.log('Wheel_base&&&General_arrangement_vehicle', formsData[fieldName])
                            } else {
                                let units: string = '';                              
                                for (const el of unitsName) {
                                    let measureMent = el.split("****");
                                    let fielsdName = fieldName.split("&&&");
                                    if (measureMent[0] === fielsdName[0]) {
                                        units = formsData[el]
                                        break;
                                    }

                                }
                                if (units) {
                                    console.log('unitsData', units);
                                    display = {
                                        "value": formsData[fieldName],
                                        "label": formsData[fieldlabel],
                                        "units": units
                                    }
                                } else {

                                    display = {
                                        "value": formsData[fieldName],
                                        "label": formsData[fieldlabel],
                                    }
                                }
                            }

                            getMatchedLen.push({ [name]: display })
                        }
                    }

                })

            })

            const feildObjects = getMatchedLen.reduce((accumulator: any, currentValue: any) => {
                const key = Object.keys(currentValue)[0];
                accumulator[key] = currentValue[key];
                return accumulator;
            }, {});


            constructData.push({
                [lebelName]: {
                    "properties": feildObjects,
                    "label": lebelName.replace(/_/g, ' ')
                }
            })

        })

        constructData.push({ 'supplier': activeSupplier })
        constructData.push({ '_id': formId })

        const formsLabelObjects = constructData.reduce((accumulator: any, currentValue: any) => {
            const key = Object.keys(currentValue)[0];
            accumulator[key] = currentValue[key];
            return accumulator;
        }, {});



        console.log('constructData', { 'data': formsLabelObjects, 'formType': formType });
        storeFormsfieldDat({'data':formsLabelObjects,'formType':formType},resetId)        
    }


    const storeFormsfieldDat = async (formsFieldData: {}, resetId: number | undefined) => {
        await Post(formApiURL, formsFieldData, config)
            .then((resp) => {
                if (resp.data.status === 'success') {
                    console.log('resp.data.body', resp.data)
                    let resetButton = document.getElementById('resetId' + resetId);
                    resetButton?.click()
                    setDataSaved(true)
                    getHomologationFormData(pageName, activeComponent, activeSuppliers);

                }


            })
            .catch((error) => {
                console.log('error');
            });
    };



    const onSubmit1 = (formsData: any) => {
        constructFormData(formsData, 0)
    };
    const onSubmit2 = (formsData: any) => {
        constructFormData(formsData, 1)

    };
    const onSubmit3 = (formsData: any) => {
        constructFormData(formsData, 2)
    };
    const onSubmit4 = (formsData: any) => {
        constructFormData(formsData, 3)
    };
    const onSubmit5 = (formsData: any) => {
        constructFormData(formsData, 4)
    };
    const isExpired = (date:any) => {
        // Get the current date 
        let currentDate:any = new Date().toJSON().slice(0, 10);

        const myDate = new Date(date);
        const formattedDate = myDate.toISOString().split('T')[0];

        const twoMonthsFromNow = new Date();
        twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
        const twoMonthsFromNowFormattedDate = twoMonthsFromNow.toISOString().split('T')[0];

        let expired :string = 'expired'
        let inTwoMonth :string = 'inTwoMonth'
        let TwoMntGratr :string = 'TwoMntGratr'
       
        // Check if the given date is before the current date
        if(formattedDate < currentDate){ 
            return expired
        }else if(formattedDate <= twoMonthsFromNowFormattedDate){           
            return inTwoMonth;
        }else if(formattedDate > twoMonthsFromNowFormattedDate){
            return TwoMntGratr;
        }
      }
     
      

    useEffect(() => {

        getHomologationData(homologationDatas);
        getHomologationFormData(pageName, activeComponent, activeSuppliers);
    }, [])

    const successMsg = 'Data Saved Successfully';
    return (
        <>
            <Container maxWidth='100%' bg='#fff' p={0}  >
                <Flex bg={'color.700'}
                    flexWrap={'nowrap'}
                    alignItems='center'
                    flexDirection={'row'}
                >

                    <Box alignItems='center'
                        className='hamerger-icon'
                        width={[
                            '10%', // 0-30em
                            '10%', // 30em-48em
                            '14%', // 48em-62em
                            '11%', // 62em+
                        ]} >
                        <Menu >
                            <MenuButton as={Button} ml={['0', '30', '30%']}
                                bg={'transparent'}
                                _hover={{ bg: 'transparent' }}
                                _active={{ bg: 'transparent' }}
                                rightIcon={<HamburgerIcon />}
                                color={'color.500'}
                            >

                            </MenuButton>
                            <MenuList p={'0'}>

                                {
                                    homologationsData.map((value: any, key) => <MenuItem key={key} onClick={() => getPageName(value.page)} _hover={{ bg: '#edf2f7' }} backgroundColor={value.page === pageName ? '#edf2f7' : '#fff'} >{value.page}</MenuItem>)
                                }

                            </MenuList>
                        </Menu>
                    </Box>
                    <Show breakpoint='(min-width: 1024px)'>
                        <Box
                            width={[
                                '90%', // 0-30em
                                '90%', // 30em-48em
                                '98%', // 48em-62em
                                '98%', // 62em+
                            ]}
                            display={'flex'}
                            flexWrap={'nowrap'}
                            alignItems='center'
                            flexDirection={'row'}
                            pl={['10%', '10%', '2%', '2%']}
                        >
                            <Box alignItems='center'
                                width={[
                                    '50%', // 0-30em
                                    '50%', // 30em-48em
                                    '16%', // 48em-62em
                                    '16%', // 62em+
                                ]} >
                                {
                                    homologationDatas.vehicle_type === '3-Wheeler' ?
                                        <Image src={threeWheeler} alt="brand" h={'72px'} w={'72px'} borderRadius={'50%'} />
                                        : <Image src={Sbike} alt="brand" h={'72px'} w={'72px'} borderRadius={'50%'} />
                                }

                            </Box>
                            <Box alignItems='center' pl={'5'}
                                width={[
                                    '40%', // 0-30em
                                    '40%', // 30em-48em
                                    '16%', // 48em-62em
                                    '16%', // 62em+
                                ]} >

                                <Text fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Vehicle Type</Text>
                                <Text fontFamily={'Open Sans'} fontSize={'14'} color={'color.500'}>{homologationDatas.vehicle_type}</Text>
                            </Box>
                            <Box alignItems='center' pl={'5'}
                                width={[
                                    '60%', // 0-30em
                                    '60%', // 30em-48em
                                    '15%', // 48em-62em
                                    '15%', // 62em+
                                ]} >
                                <Text fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Category</Text>
                                <Text fontFamily={'Open Sans'} fontSize={'14'} color={'color.500'}>{Category}</Text>
                            </Box>
                            <Box alignItems='center' pl={'5'}
                                width={[
                                    '40%', // 0-30em
                                    '40%', // 30em-48em
                                    '16%', // 48em-62em
                                    '16%', // 62em+
                                ]} >
                                <Text fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Fuel</Text>
                                <Text fontFamily={'Open Sans'} fontSize={'14'} color={'color.500'}>{homologationDatas.fuel_type}</Text>
                            </Box>
                            <Box alignItems='center'
                                width={[
                                    '60%', // 0-30em
                                    '60%', // 30em-48em
                                    '20%', // 48em-62em
                                    '20%', // 62em+
                                ]} >
                                <Text fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Page</Text>
                                <Text fontFamily={'Open Sans'} fontSize={'14'} color={'color.500'}>{pageName}</Text>
                            </Box>
                        </Box>
                    </Show>

                    <Show breakpoint='(max-width: 1023px)'>
                        <Box overflow='scroll'
                            width={[
                                '100%', // 0-30em
                                '100%', // 30em-48em
                                '98%', // 48em-62em
                                '98%', // 62em+
                            ]}

                        >
                            <Stack width='800px'
                                display={'flex'}
                                flexWrap={'nowrap'}
                                alignItems='center'
                                flexDirection={'row'}
                                pl={['10%', '10%', '2%', '2%']}
                            >
                                <Box alignItems='center' pl={'5'}
                                    width={[
                                        '50%', // 0-30em
                                        '50%', // 30em-48em
                                        '20%', // 48em-62em
                                        '15%', // 62em+
                                    ]} >
                                    {
                                        homologationDatas.vehicle_type === '3-Wheeler' ?
                                            <Image src={threeWheeler} alt="brand" h={'72px'} w={'72px'} borderRadius={'50%'} />
                                            : <Image src={Sbike} alt="brand" h={'72px'} w={'72px'} borderRadius={'50%'} />
                                    }
                                </Box>
                                <Box alignItems='center' pl={'5'}
                                    width={[
                                        '40%', // 0-30em
                                        '40%', // 30em-48em
                                        '20%', // 48em-62em
                                        '15%', // 62em+
                                    ]} >

                                    <Text fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Vehicle Type</Text>
                                    <Text fontFamily={'Open Sans'} fontSize={'14'} color={'color.500'}>{homologationDatas.vehicle_type}</Text>
                                </Box>
                                <Box alignItems='center' pl={'5'}
                                    width={[
                                        '60%', // 0-30em
                                        '60%', // 30em-48em
                                        '20%', // 48em-62em
                                        '15%', // 62em+
                                    ]} >
                                    <Text fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Category</Text>
                                    <Text fontFamily={'Open Sans'} fontSize={'14'} color={'color.500'}>{homologationDatas.vehicle_category}</Text>
                                </Box>
                                <Box alignItems='center' pl={'5'}
                                    width={[
                                        '40%', // 0-30em
                                        '40%', // 30em-48em
                                        '20%', // 48em-62em
                                        '15%', // 62em+
                                    ]} >
                                    <Text fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Fuel</Text>
                                    <Text fontFamily={'Open Sans'} fontSize={'14'} color={'color.500'}>{homologationDatas.fuel_type}</Text>
                                </Box>
                                <Box alignItems='center' pl={'5'}
                                    width={[
                                        '60%', // 0-30em
                                        '60%', // 30em-48em
                                        '35%', // 48em-62em
                                        '20%', // 62em+
                                    ]} >
                                    <Text fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Page</Text>
                                    <Text fontFamily={'Open Sans'} fontSize={'14'} color={'color.500'}>{pageName}</Text>
                                </Box>
                            </Stack>
                        </Box>
                    </Show>

                </Flex>
            </Container>
           
            { /** ============== COMPONENT SECTION  STARTS =================*/} 
            <Container maxWidth='100%' bg='#fff'
                pl={["20px", "40px", "40px", "40px"]}
                pr={["20px", "40px", "40px", "40px"]}
                pt={["20px", "20px", "20px", "20px"]}
                pb={["0px", "0px", "0px", "0px"]}
            >

                <Flex bg={'color.500'}
                    flexWrap={['nowrap']}
                    justifyContent={'flex-start'}
                    className='component-container'
                >
                    {
                        homologationsData.map((value: any, key) => {

                            return (

                                pageName === value.page && pageName !== "File Uploads" &&
                                <>
                                    {
                                        value.components.map((value: any, key: any) => {
                                            return (

                                                <Box alignItems='center' pl={'5'} key={value} color={'#949494'} title={value}

                                                    display={'flex'}
                                                    flexWrap={['wrap', 'wrap', 'nowrap']}
                                                    justifyContent={'start'}
                                                    flexDirection={'column'}
                                                    mb={['5', '5', '5', '5']}
                                                    onClick={() => active(value)}
                                                    cursor={'pointer'}
                                                    textAlign={'center'}
                                                    width={'200px'}
                                                >

                                                    <Stack h={'55px'}>
                                                        <Image display={'block'} m={'auto'} src={activeComponent === value ? `/images/allcomponetimages/${value.replace(/\s/g, "").replace(/\//g, "")}-active.png` : `/images/allcomponetimages/${value.replace(/\s/g, "").replace(/\//g, "")}.png`} />
                                                    </Stack>
                                                    <Text className={activeComponent === value ? 'active-component component-name' : 'component-name'} fontSize={'12'} mt={'3'} p={'0'} >{value}</Text>
                                                    {activeComponent === value &&
                                                        <Text as={'div'} mt={'2'} className="border"></Text>
                                                    }
                                                </Box>
                                            )
                                        })
                                    }

                                </>
                            )
                        })
                    }
                </Flex>
            </Container>
            { /** ============== COMPONENT SECTION  STARTS =================*/}

            { /** ============== SUPPLIER SECTION  STARTS =================*/}
            
            {
                pageName !== "File Uploads" &&
                <Container maxWidth='100%' bg={'color.800'} p={0}>

                    <Container maxWidth='100%'
                        pl={["20px", "40px", "40px", "40px", "40px"]}
                        pr={["20px", "40px", "40px", "40px", "40px"]}
                        pt={["40px", "40px", "40px", "40px"]}
                        pb={["40px", "40px", "40px", "40px"]}
                    >
                        <Text
                            ml={['0', '4', '4', '4']}
                            mb={'4'}
                            fontSize={'12'} fontFamily={'Open Sans'}
                        >{activeComponent}</Text>

                        <Flex
                            flexWrap={['wrap']}
                            justifyContent={'flex-start'}

                        >

                            {
                                suppliersData.length > 0 &&
                                suppliersData.map((value: any, key) => {
                                    const getDate = value.copCertificationValidityDate;
                                    const isExpiredDate = isExpired(getDate); 
                                    return (
                                        <Box alignItems='center' p={'4'}
                                            ml={['0', '4', '4', '4']}
                                            mb={'4'}
                                            bg={isExpiredDate==='inTwoMonth' ? '#FFA500'
                                            : isExpiredDate==='TwoMntGratr' ? "color.700"
                                            :'#FF0000'                                         
                                            }
                                            
                                            border={'4px'}
                                            borderColor={activeSuppliers === value._id  && (value.active) ? 'color.700' : '#E2E8F0'}
                                            borderRadius={'6'}
                                            boxShadow={'1px -1px 23px rgba(0, 0, 0, 0.1)'}
                                            width={['100%', '47%', '23%', '23%']}
                                            key={key}
                                            className={activeSuppliers}


                                        >
                                            <Stack float={'right'}>
                                                <Switch
                                                    zIndex={'1'} isChecked={value.active ? false : true}
                                                    onChange={(e) => supplierDeactivateOrActivate(value._id, value.active)}
                                                    sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: 'color.200' } }}
                                                ></Switch>
                                            </Stack>
                                            <Box color={activeSuppliers === value._id && value.active ? 'color.500' 
                                                : isExpiredDate==='inTwoMonth' ? 'color.500'
                                                : isExpiredDate==='expired' ? 'color.500'
                                                : 'color.500'}
                                                cursor={value.active ? 'pointer' : 'default'} h={'100%'}
                                                position={'relative'}
                                                opacity={value.active ? '1' : '.5'}
                                                onClick={() => value.active && activeSupplier(value._id)}
                                            >
                                                <Stack
                                                    display={'flex'}
                                                    flexDirection={'row'}
                                                    alignItems={'flex-start'}
                                                    justifyContent={'space-around'}

                                                >
                                                    <Text as={'div'} fontSize={'12'} width={'50%'} textAlign={'start'}>
                                                        <Text>Supplier</Text>
                                                    </Text>
                                                    <Text as={'div'} fontSize={'12'} width={'50%'} textAlign={'start'}>
                                                        <Text>&nbsp;</Text>
                                                    </Text>

                                                </Stack>

                                                <Stack mt={'4'} mb={'4'}>
                                                    <Heading as={'h4'} fontFamily={'Open Sans'} fontSize={'18'} width={'100%'}>
                                                        {value.nameOfSupplier}
                                                    </Heading>
                                                </Stack>
                                                { (value.testReportNumber || value.copCertificationNumber) &&
                                                    <Stack mb={'3'}
                                                        display={'flex'}
                                                        flexDirection={'row'}
                                                        alignItems={'flex-start'}
                                                        justifyContent={'space-around'}
                                                    >
                                                        <Text as={'div'} fontSize={'12'} width={'50%'} textAlign={'start'}>
                                                            <Text>{value.testReportNumber ? 'Test Report Number' : "Application Reference Number"} </Text>
                                                            <Text fontSize={'11'} fontFamily={'Open Sans'}>{value.testReportNumber ? value.testReportNumber : value.applicationReferenceNumber}</Text>
                                                        </Text>
                                                        <Text as={'div'} fontSize={'13'} width={'50%'} mt={'0 !important'} textAlign={'end'}>
                                                            <Text fontSize={'12'}>Cop - Cart No</Text>
                                                            <Text fontSize={'11'} fontFamily={'Open Sans'}>{value.copCertificationNumber}</Text>
                                                        </Text>
                                                    </Stack>
                                                }
                                                {(value.copCertificationValidityDate || value.licenceNumber) &&
                                                    <Stack mb={'4'}
                                                        display={'flex'}
                                                        flexDirection={'row'}
                                                        alignItems={'flex-start'}
                                                        justifyContent={'space-around'}
                                                    >
                                                        <Text as={'div'} fontSize={'12'} width={'50%'} textAlign={'start'}>
                                                            <Text>{value.licenceNumber ? 'Licence Number' : 'Submission Date'}</Text>
                                                            <Text fontSize={'11'} fontFamily={'Open Sans'}>{value.licenceNumber ? value.licenceNumber : value.submissionDate && format(new Date(value.submissionDate), 'dd MMMM, yyyy')}</Text>
                                                        </Text>
                                                        <Text as={'div'} fontSize={'13'} width={'50%'} mt={'0 !important'} textAlign={'end'}>
                                                            <Text fontSize={'12'}>Cop - Cart Validity Date</Text>
                                                            <Text fontSize={'11'} fontFamily={'Open Sans'}>{value.copCertificationValidityDate && format(new Date(value.copCertificationValidityDate), 'dd MMMM, yyyy')}</Text>
                                                        </Text>
                                                    </Stack>
                                                }

                                                {value.licenceValidityDate &&
                                                    <Stack mb={'4'}
                                                        display={'flex'}
                                                        flexDirection={'row'}
                                                        alignItems={'flex-start'}
                                                        justifyContent={'space-around'}
                                                    >
                                                        <Text as={'div'} fontSize={'12'} width={'50%'} textAlign={'start'}>
                                                            <Text>{value.licenceValidityDate && 'Licence Validity'}</Text>
                                                            <Text fontSize={'11'} fontFamily={'Open Sans'}>{value.licenceValidityDate && format(new Date(value.licenceValidityDate), 'dd MMMM, yyyy')}</Text>
                                                        </Text>
                                                        <Text as={'div'} fontSize={'13'} width={'50%'} mt={'0 !important'} textAlign={'end'}>
                                                            &nbsp;
                                                        </Text>
                                                    </Stack>
                                                }

                                            </Box>
                                        </Box>



                                    )
                                })

                            }
                            <Box alignItems='center' p={'4'}
                                ml={['0', '4', '4', '4']}
                                mb={'4'}
                                bg={'color.500'}
                                borderRadius={'6'}
                                boxShadow={'1px -1px 23px rgba(0, 0, 0, 0.1)'}
                                width={['100%', '47%', '23%', '23%']}

                            >
                                <Box color={'color.100'} >

                                    <Stack
                                        display={'flex'}
                                        flexDirection={'column'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        flexWrap={'nowrap'}
                                        minH={'200'}
                                    >
                
                                        {

                                            suppliersData.length <= 2 && pageName !== 'vehicle-ok' ?
                                                (<Image
                                                    src={addSuplier}
                                                    alt="Add Supplier"
                                                    width={'32px'}
                                                    height={'32px'}
                                                    cursor={'pointer'}
                                                    onClick={addSupliers} />)
                                                : (<Image
                                                    src={addSuplier}
                                                    alt="Add Supplier"
                                                    width={'32px'}
                                                    height={'32px'}
                                                    cursor={'pointer'} />

                                                )


                                        }

                                        <Text fontSize={'12'} fontFamily={'Open Sans'}>Add Supplier</Text>
                                        <Text fontSize={'12'}> <Text as={'span'} fontSize={'12'} fontFamily={'Open Sans'}>Note: </Text> Max upto 3 suppliers only </Text>
                                    </Stack>


                                </Box>
                            </Box>

                        </Flex>

                    </Container>

                </Container> 
            }
            { /** ============== SUPPLIER SECTION  END =================*/}

            { /** ============== ALL FORMS SECTION STARTS =================*/}
            {homologationAllData.length > 0 &&
                <Container maxWidth='100%' bg={'color.800'}
                    pl={["0px", "0px", "40px", "40px", "40px"]}
                    pr={["0px", "0px", "40px", "40px", "40px"]}
                    pt={["40px", "40px", "40px", "40px"]}
                    pb={["40px", "40px", "40px", "40px"]}

                >
                    <Tabs
                        display={'flex'}
                        flexWrap={['wrap', 'wrap', 'nowrap']}
                        justifyContent={'space-around'}
                        flexDirection={['column', 'column', 'row', 'row']}
                        ml={['0', '0', '4', '4']}
                    >



                        <TabList
                            display={'flex'}
                            flexWrap={['nowrap', 'nowrap', 'nowrap']}
                            justifyContent={'flex-start'}
                            flexDirection={['row', 'row', 'column', 'column']}
                            bg={'color.1000'}
                            w={['100%', '100%', '156px', '156px']}
                            pt={['10', '10', '20', '20']}
                            pl={['4', '4', '14px', '14px']}
                            pb={'0'}
                            pr={['14px', '14px', '0', '0']}
                            columnGap={'20px'}
                        >

                            {

                                homologationAllData.map((value: any, formKey: any) => {
                                    return (

                                        <>
                                            <Tab key={formKey}
                                                onClick={(e) => activeTab(value[0].formName)}
                                                minW={['30%', '30%', 'auto', 'auto']}
                                                className={!activeTabs && formKey === 0 ? 'supplier-tab tab-active' : value[0].formName === activeTabs ? 'supplier-tab tab-active' : 'supplier-tab'}
                                                mb={['0', '0', '10px', '10px']} height={'77px'}
                                                color={'color.100'} p={0}>
                                                <Box>
                                                    <Text fontSize="12" className='form-number'>
                                                        {value[0].formName.replace("form", "").replace("Data", "")}

                                                    </Text>
                                                    <Text bg={'color.1100'} fontSize="12" className='form-color'>&nbsp;</Text>
                                                </Box>
                                                <Box mt={'14px'}>
                                                    {
                                                        value[0].formName.replace("form", "").replace("Data", "") === formFeildLength1?.formName ? formFeildLength1?.fielsdLength
                                                            : value[0].formName.replace("form", "").replace("Data", "") === formFeildLength2?.formName ? formFeildLength2?.fielsdLength
                                                                : value[0].formName.replace("form", "").replace("Data", "") === formFeildLength3.formName ? formFeildLength3.fielsdLength
                                                                    : value[0].formName.replace("form", "").replace("Data", "") === formFeildLength4.formName ? formFeildLength4.fielsdLength
                                                                        : value[0].formName.replace("form", "").replace("Data", "") === formFeildLength5.formName ? formFeildLength5.fielsdLength
                                                                            : 0
                                                    }/{value[1].fieldLength}
                                                </Box>

                                            </Tab>
                                        </>
                                    )
                                })

                            }

                        </TabList>

                        <TabPanels pl={['0', '0', '16px', '16px']} >


                            {

                                homologationAllData.map((value: any, formKey: any) => {
                                    let registerData = formKey === 0 ? register1 : formKey === 1 ? register2 : formKey === 2 ? register3 : formKey === 3 ? register4 : register5;
                                    let handeleChange = formKey === 0 ? changeHandler1 : formKey === 1 ? changeHandler2 : formKey === 2 ? changeHandler3 : formKey === 3 ? changeHandler4 : changeHandler5;

                                    return (
                                        <TabPanel
                                            pl={['0', '0', '0', '0']}
                                            pt={['0', '0', '0', '0']}
                                            pb={['0', '0', '0', '0']}
                                            pr={['0', '0', '0', '0']}
                                        >

                                            <form onSubmit={formKey === 0 ?
                                                handleSubmit1(onSubmit1)
                                                : formKey === 1 ? handleSubmit2(onSubmit2)
                                                    : formKey === 2 ? handleSubmit3(onSubmit3)
                                                        : formKey === 3 ? handleSubmit4(onSubmit4)
                                                            : handleSubmit5(onSubmit5)
                                            }>
                                                <Input
                                                    className='form-input'
                                                    type={'hidden'}
                                                    defaultValue={value[0].formName.replace("form", "").replace("Data", "")}
                                                    {...registerData('formType', {})}

                                                />
                                                <Input
                                                    className='form-input'
                                                    type={'hidden'}
                                                    defaultValue={value[2].formId[0]}
                                                    {...registerData('formId', {})}

                                                />

                                                {

                                                    value.map((formdata: any, key: any) => {
                                                        let headingKey: string;
                                                        return (

                                                            key > 2 &&
                                                            formdata.map(function (feildProperty: any, key: number) {

                                                                let checkField = feildProperty.label &&  Object.keys(feildProperty.properties)
                                                                .filter(feildValue => feildProperty.properties[feildValue].display !== false)
                                                                .length;

                                                                if (feildProperty.headingKey) { headingKey = feildProperty.headingKey; }

                                                                return (

                                                                    feildProperty.label &&
                                                                    <Box mb={'9'}  className={checkField >= 1 ? 'showfield' : 'hiddeField'}> 

                                                                        <Input
                                                                            className='form-input'
                                                                            type={'hidden'}
                                                                            defaultValue={feildProperty.label}
                                                                            {...registerData(headingKey, {})}

                                                                        />

                                                                        <Heading as={'h4'}
                                                                            fontSize={'14'} bg={'color.1200'}
                                                                            height={'44px'} lineHeight={'44px'}
                                                                            pl={'4'}
                                                                        >{feildProperty.label}</Heading>

                                                                        <Stack
                                                                            bg={'color.1000'}
                                                                            display={'flex'}
                                                                            justifyContent={'flex-start'}
                                                                            flexDirection={['column', 'row', 'row', 'row']}
                                                                            flexWrap={'wrap'}
                                                                            pt={'36px'}
                                                                            pb={'44px'}
                                                                            columnGap={'10%'}
                                                                            pl={['0', '18px', '36px', '36px']}
                                                                            pr={['0', '18px', '36px', '36px']}
                                                                            
                                                                        >

                                                                            {

                                                                                Object.keys(feildProperty.properties).map(function (feildValue: any, key: any) {

                                                                                    return (
                                                                                        <FormControl mt={'8px'} mb={'10px'}
                                                                                            pl={['16px', '16px', '0', '0']}
                                                                                            pr={['16px', '16px', '0', '0']}
                                                                                            width={['90%', '45%', '45%', '26%',]}
                                                                                            className={feildProperty.properties[feildValue].display !== false ? 'showfield' : 'hiddeField'}
                                                                                        >
                                                                                            <FormLabel className={'formFeild'} mb={'0'} fontSize={'14px'} title={feildProperty.properties[feildValue].label}>{feildProperty.properties[feildValue].label} </FormLabel>
                                                                                            <Input placeholder={feildProperty.properties[feildValue].label}
                                                                                                className='form-input'
                                                                                                type={feildProperty.properties[feildValue].label.toLowerCase().includes(' date of submission') ?
                                                                                                    'date': 'text'
                                                                                                }
                                                                                                defaultValue={feildProperty.properties[feildValue].display !== false ? feildProperty.properties[feildValue].value : feildProperty.properties[feildValue].display}
                                                                                                {...registerData(`${feildValue}&&&${headingKey}`,
                                                                                                    {
                                                                                                        onBlur: (e) => { handeleChange(e, value[0].formName.replace("form", "").replace("Data", "")) }
                                                                                                    })
                                                                                                }

                                                                                            />
                                                                                            {feildProperty.properties[feildValue].units &&
                                                                                                <>
                                                                                                    <Input
                                                                                                        className='form-input'
                                                                                                        type={'hidden'}
                                                                                                        defaultValue={feildProperty.properties[feildValue].units}
                                                                                                        {...registerData(`${feildValue}****${headingKey}****units`, {})}

                                                                                                    />
                                                                                                    <span style={{ position: 'absolute', right: '3px', zIndex: '9', background: '#fff', height: '35px', top: '23px', padding: '5px' }}> {feildProperty.properties[feildValue].units}</span>
                                                                                                </>
                                                                                            }
                                                                                            <Input placeholder={feildProperty.properties[feildValue].label}
                                                                                                className='form-input'
                                                                                                type="hidden"
                                                                                                defaultValue={feildProperty.properties[feildValue].label}
                                                                                                {...registerData(`${feildValue}###${headingKey}@@@@${key}`,
                                                                                                    {
                                                                                                        onBlur: (e) => { handeleChange(e, value[0].formName.replace("form", "").replace("Data", "")) }
                                                                                                    })
                                                                                                }

                                                                                            />


                                                                                            <Popover>
                                                                                                <PopoverTrigger>
                                                                                                    <Button
                                                                                                        bg="transparent"
                                                                                                        _hover={{ bg: 'transparent' }}
                                                                                                        _focus={{ bg: 'transparent' }}
                                                                                                        position={"absolute"}
                                                                                                        right={"-45px"}
                                                                                                        top={"20px"}>
                                                                                                        <InfoIcon boxSize={6} color={"#C4C4C4"} />
                                                                                                    </Button>
                                                                                                </PopoverTrigger>
                                                                                                <PopoverContent>
                                                                                                    <PopoverArrow />

                                                                                                    <PopoverBody>
                                                                                                        <Image
                                                                                                            src={`/images/popoverImages/${feildProperty.properties[feildValue].label.replace(/\s/g, "_")}.png`}
                                                                                                            alt={`${feildProperty.properties[feildValue].label.replace(/\s/g, '_')}`}
                                                                                                            borderRadius={'50%'}
                                                                                                        />

                                                                                                    </PopoverBody>
                                                                                                </PopoverContent>
                                                                                            </Popover>

                                                                                        </FormControl>

                                                                                    )
                                                                                })


                                                                            }


                                                                        </Stack>
                                                                    </Box>
                                                                )
                                                            })

                                                        )
                                                    })

                                                }

                                                <FormControl w={["100%"]} >
                                                    <Stack direction='row' spacing={4} justify="center">

                                                        <Button
                                                            variant='outline'
                                                            border={"1px solid #7FBF28"}
                                                            w={"50%"}
                                                            height='48px'
                                                            type='reset'
                                                            id={'resetId' + formKey}
                                                            onClick={() => handleReset(formKey,value[0].formName.replace("form", "").replace("Data", ""))}
                                                            
                                                        >
                                                            Clear
                                                        </Button>
                                                        <Button
                                                            height='48px'
                                                            bg="#7FBF28"
                                                            w={"50%"}
                                                            color='#fff'
                                                            _hover={{ bg: '#7FBF28' }}
                                                            _focus={{ bg: '#7FBF28' }} variant='solid'
                                                            type="submit"
                                                        >
                                                            Submit
                                                        </Button>
                                                    </Stack>
                                                </FormControl>

                                            </form>

                                        </TabPanel>
                                    )
                                })

                            }





                        </TabPanels>
                    </Tabs>

                </Container>
            }
            { /** ============== ALL FORMS SECTION END =================*/}

            { /** ============== FILE UPLOAD SECTION STARTS =================*/}
            
            { pageName === "File Uploads" &&
                <Container maxWidth='100%' bg={'color.800'}
                pl={["0px", "0px", "40px", "40px", "40px"]}
                pr={["0px", "0px", "40px", "40px", "40px"]}
                pt={["40px", "40px", "40px", "40px"]}
                pb={["40px", "40px", "40px", "40px"]}

                >
                
                <Tabs
                    display={'flex'}
                    flexWrap={['wrap', 'wrap', 'nowrap']}
                    justifyContent={'space-around'}
                    flexDirection={['column', 'column', 'row', 'row']}
                    ml={['0', '0', '4', '4']}
                >



                    <TabList
                        display={'flex'}
                        flexWrap={['nowrap', 'nowrap', 'nowrap']}
                        justifyContent={'flex-start'}
                        flexDirection={['row', 'row', 'column', 'column']}
                        bg={'color.1000'}
                        w={['100%', '100%', '156px', '156px']}
                        pt={['10', '10', '20', '20']}
                        pl={['4', '4', '14px', '14px']}
                        pb={'0'}
                        pr={['14px', '14px', '0', '0']}
                        columnGap={'20px'}
                    >

                        {

                            formsData.map((value: any, formKey: any) => {
                            return (

                                <>
                                    <Tab key={formKey}
                                        onClick={(e) => activeTab(value.formName)}
                                        minW={['30%', '30%', 'auto', 'auto']}
                                        className={!activeTabs && formKey === 0 ? 'supplier-tab tab-active' : value.formName === activeTabs ? 'supplier-tab tab-active' : 'supplier-tab'}
                                        mb={['0', '0', '10px', '10px']} height={'77px'}
                                        color={'color.100'} p={0}>
                                        {
                                            value.formName!=="footerData" ?
                                          <> 
                                           <Box>

                                            <Text fontSize="12" className='form-number'>
                                                {value.formName.replace("form", "").replace("Data", "")}

                                            </Text>
                                            <Text bg={'color.1100'} fontSize="12" className='form-color'>&nbsp;</Text>

                                            </Box>
                                            <Box mt={'14px'}>
                                            { value.fileUploadCount > 0 ? value.fileUploadCount:0 }/{ value.feildLength }
                                            </Box>
                                          </> 
                                          : 
                                          <>
                                            <Box>
                                                <Text fontSize="14" fontFamily={'Open Sans'}>Footer</Text>
                                            </Box>
                                          
                                          </> 
                                        }
                                       

                                    </Tab>
                                </>
                            )
                        })

                        }

                    </TabList>

                    <TabPanels pl={['0', '0', '16px', '16px']} >


                        {

                            formsData.map((value: any, formKey: any) => {
                                let fomsField = Object.keys(value.formsData); 

                                return (
                                    <TabPanel
                                        pl={['0', '0', '0', '0']}
                                        pt={['0', '0', '0', '0']}
                                        pb={['0', '0', '0', '0']}
                                        pr={['0', '0', '0', '0']}
                                    >

                                        <form onSubmit={footerHandleSubmit}>
                                            <Input
                                                className='form-input'
                                                type={'hidden'}
                                                defaultValue={value.formName.replace("form", "").replace("Data", "")} 

                                            />
                                            

                                            {

                                                fomsField.map((formValue: any, key: any) => {
                                                    return (
                                                      
                                                    <>
                                                    {  formValue !=='_id' &&  
                                                    <Box mb={'9'}> 

                                                        <Text 
                                                        w={"100%"} 
                                                        fontFamily={'Open Sans'} 
                                                        fontSize={'12'} 
                                                        height={'34px'} lineHeight={'34px'}
                                                        mb={value.formName!=="footerData" ? "10px" : "0"}
                                                        bg={value.formName==="footerData" ? "#ACD5FE" : "#dcdcdc"}
                                                        pl={"16px"}
                                                        color={'#000'}>
                                                            {value.formsData[formValue].label}
                                                        </Text>
                                                                    {
                                                                    value.formName!=="footerData" &&
                                                                    <Heading as={'h4'}
                                                                        fontSize={'14'}
                                                                        height={'44px'} lineHeight={'44px'}
                                                                        bgColor={'#115fab'}
                                                                        pl={'4'}
                                                                        display={'flex'}
                                                                        justifyContent={'space-around'}
                                                                        flexDirection={['column', 'row', 'row', 'row']}
                                                                        flexWrap={'wrap'}
                                                                        

                                                                    >
                                                                         <Text   fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Column Name</Text>
                                                                         <Text   fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Document No/Name</Text>
                                                                         <Text   fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>Upload Doc* (Only PDf allowed)</Text>
                                                                         <Text   fontFamily={'Open Sans'} fontSize={'12'} color={'color.500'}>File Attached</Text>
                                                                    
                                                                    </Heading>
                                                                    }
                                                                    { 
                                                                    <Stack
                                                                        bg={'color.1000'}
                                                                        display={'flex'}
                                                                        justifyContent={'flex-start'}
                                                                        flexDirection={['column', 'row', 'row', 'row']}
                                                                        flexWrap={'wrap'}
                                                                        pt={'36px'}
                                                                        pb={'44px'}
                                                                        columnGap={'10%'}
                                                                        pl={['0', '18px', '16px', '16px']}
                                                                        pr={['0', '18px', '16px', '16px']}
                                                                        
                                                                    >

                                                                        {

                                                                            Object.keys(value.formsData[formValue].properties).map(function (feildValue: any, key: any) {
                                                                                return (
                                                                                    <FormControl mt={'8px'} mb={'10px'}
                                                                                        pl={['16px', '16px', '0', '0']}
                                                                                        pr={['16px', '16px', '0', '0']}
                                                                                        width={value.formName!=="footerData" ? '100%': "auto"}  
                                                                                    >
                                                                                        
                                                                                        <Box as="div"
                                                                                            bg={'color.1000'} 
                                                                                            display={'flex'}
                                                                                            justifyContent={'flex-start'}
                                                                                            flexDirection={['column', 'row', 'row', 'row']}
                                                                                            flexWrap={'nowrap'}    
                                                                                        >

                                                                                        <Box
                                                                                            display={value.formName!=="footerData" ? 'flex':'block'}
                                                                                            justifyContent={'flex-start'}
                                                                                        >   
                                                                                            {
                                                                                                feildValue !== 'Upload_Seal' ?  
                                                                                                <FormLabel  
                                                                                                className={'formFeild'} mb={'0'}
                                                                                                lineHeight="44px"
                                                                                                fontSize={'14px'} title={value.formsData[formValue].properties[feildValue].label}>
                                                                                                    {value.formsData[formValue].properties[feildValue].label} 
                                                                                                </FormLabel>

                                                                                                : <FormLabel  
                                                                                                    mb={'0'}
                                                                                                    lineHeight="44px"
                                                                                                    fontSize={'14px'} title={value.formsData[formValue].properties[feildValue].label}>
                                                                                                    <Text as={'span'} className='requiredField'>*</Text>  File format PNG and image size should not be more than 10KB
                                                                                                </FormLabel>
                                                                                            }
                                                                                           


                                                                                            {value.formName!=="footerData" ? 
                                                                                            
                                                                                            <Input w={'auto'}
                                                                                            className='form-input'
                                                                                            defaultValue={value.formsData[formValue].properties[feildValue].file_name.replace(value.formId+'-', "") }
                                                                                            readOnly
                                                                                            /> 
                                                                                            : feildValue !== 'Upload_Seal' ?                                                                                            
                                                                                            <Input
                                                                                             w={'auto'}
                                                                                            className='form-input'
                                                                                            defaultValue={value.formsData[formValue].properties[feildValue].value}
                                                                                            id={feildValue}
                                                                                            name={feildValue}                                                                                            
                                                                                            /> 
                                                                                            :
                                                                                            <>
                                                                                            <input  
                                                                                                type="file"
                                                                                                accept="image/*"                                                                                              
                                                                                                style={{ display: "none" }}
                                                                                                id={feildValue}
                                                                                                name={feildValue}   
                                                                                                onChange={uploadSealSigniture}                                                                                           
                                                                                                
                                                                                            />    
                                                                                            <label htmlFor={feildValue}>
                                                                                            <Button as="span"  h={'40px'} width="auto"  fontSize={'14px'} _hover={{ bg: '#3F83C8'}} bg='#3F83C8' color='color.500'>
                                                                                            <Image
                                                                                                src={downloadIcon}
                                                                                                alt=''
                                                                                                w={'32px'}
                                                                                                h={'32px'}
                                                                                            />
                                                                                            <Text ml={'10px'}>{
                                                                                            selectedFile?.name ? selectedFile?.name :
                                                                                            value.formsData[formValue].properties[feildValue].value!=='' ?
                                                                                            value.formsData[formValue].properties[feildValue].value :
                                                                                            
                                                                                            value.formsData[formValue].properties[feildValue].label                                                                                            
                                                                                            } 
                                                                                            </Text>
                                                                                            </Button>
                                                                                            </label>
                                                                                            
                                                                                            </>




                                                                                            }
                                                                                            
                                                                                            {value.formName!=="footerData" &&

                                                                                            <Popover >
                                                                                                <PopoverTrigger>
                                                                                                    <Button
                                                                                                        bg="transparent"
                                                                                                        _hover={{ bg: 'transparent' }}
                                                                                                        _focus={{ bg: 'transparent' }}
                                                                                                        >
                                                                                                        <InfoIcon boxSize={6} color={"#3c7ea5"} />
                                                                                                    </Button>
                                                                                                </PopoverTrigger>
                                                                                                <PopoverContent>
                                                                                                    <PopoverArrow />

                                                                                                    <PopoverBody>
                                                                                                        {
                                                                                                            /*
                                                                                                        <Image
                                                                                                            src={`/images/popoverImages/${feildValue.properties[feildValue].label.replace(/\s/g, "_")}.png`}
                                                                                                            alt={`${feildValue.properties[feildValue].label.replace(/\s/g, '_')}`}
                                                                                                            borderRadius={'50%'}
                                                                                                        />
                                                                                                        */

                                                                                                        }
                                                                                                    </PopoverBody>
                                                                                                </PopoverContent>
                                                                                            </Popover>
                                                                                            }  


                                                                                        </Box>
                                                                                       


                                                                                        <Box display={value.formName!=="footerData" ? 'block':'none'}>
                                                                                            <input
                                                                                                type="file"
                                                                                                accept="application/pdf"
                                                                                                onChange={handleFileChange}
                                                                                                style={{ display: "none" }}
                                                                                                id={feildValue}
                                                                                                form={value.formName+"formId"+value.formId}
                                                                                                name={formValue}
                                                                                                
                                                                                                
                                                                                            />
                                                                                            
                                                                                                { value.formsData[formValue].properties[feildValue].file_name !=='' ?
                                                                                                  <label>
                                                                                                  <Button as="span" disabled h={'40px'} width="200px" ml={'20px'} fontSize={'14px'} bg='#D8D8D8' color='color.500'>
                                                                                                    Document Upload
                                                                                                  </Button>
                                                                                                  </label>
                                                                                                  :
                                                                                                  <label  htmlFor={feildValue}>
                                                                                                  <Button as="span" h={'40px'} width="200px" ml={'20px'} fontSize={'14px'} bg='color.200' color='color.500' _hover={{ bg: 'color.200', borderColor: 'color.300' }}>
                                                                                                    Document Upload
                                                                                                  </Button>
                                                                                                  </label>

                                                                                                }
                                                                                              
                                                                                           
                                                                                           
                                                                                            </Box>
                                                                                            <Box width={'22%'}
                                                                                                 display={value.formName!=="footerData" ? 'flex':'none'}
                                                                                                 justifyContent={'flex-end'}
                                                                                                 flexDirection={['column', 'row', 'row', 'row']}
                                                                                                 flexWrap={'wrap'} 
                                                                                                 alignItems={'center'}   
                                                                                            >
                                                                                            {value.formsData[formValue].properties[feildValue].file_name !=='' ?
                                                                                                <>
                                                                                                <Image
                                                                                                        src={download}
                                                                                                        alt=''
                                                                                                        w={'32px'}
                                                                                                        h={'32px'}
                                                                                                    /> &nbsp;&nbsp;&nbsp;
                                                                                                 <FormLabel margin={'0'} fontSize={'14px'} color='#1A202C'>Document added</FormLabel>
                                                                                                 </>
                                                                                                 : ""
                                                                                                 
                                                                                            }
                                                                                            </Box>
                                                                                            

                                                                                        </Box>


                                                                                    </FormControl>

                                                                                )
                                                                            })


                                                                        }


                                                                    </Stack>
                                                                    }
                                                    </Box>
                                                    }  
                                                    </>  
                                                    

                                                    )
                                                })

                                            }

                                            { value.formName === "footerData" &&

                                            <FormControl w={["100%"]} >
                                                <Stack direction='row' spacing={4} justify="center">

                                                    <Button
                                                        variant='outline'
                                                        border={"1px solid #7FBF28"}
                                                        w={"50%"}
                                                        height='48px'
                                                        type='reset'
                                                        id={'resetId' + formKey}
                                                    >
                                                        Clear
                                                    </Button>
                                                    <Button
                                                        height='48px'
                                                        bg="#7FBF28"
                                                        w={"50%"}
                                                        color='#fff'
                                                        _hover={{ bg: '#7FBF28' }}
                                                        _focus={{ bg: '#7FBF28' }} variant='solid'
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </Button>
                                                </Stack>
                                            </FormControl>

                                        }

                                        </form>

                                    </TabPanel>
                                )
                            })

                        }





                    </TabPanels>
                </Tabs>

                </Container>
            }

            { /** ============== FILE UPLOAD SECTION END =================*/}
            
            
            {addsupplier ?
                <AddSupplier
                    componentName={'Add Supplier for ' + activeComponent}
                    added={addsupplier}
                    onSubmits={onSubmits}
                    closePopup={closePopup}
                />
                : null}

            {dataSaved ? <ApproveSuccess successMsg={successMsg} approved={dataSaved} /> : null}

        </>
    )
}
export default Homologation;
