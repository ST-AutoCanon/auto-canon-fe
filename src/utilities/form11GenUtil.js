import exportDoc from './exportUtil';
import { Document, Header, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, Footer, PageNumber } from "docx";

function generateYearProductionItems(){
    let yearItems = [];
    const yearTitle1 = new TableRow({
        children:[
            new TableCell(
                {
                    columnSpan: 2,
                    width:{
                        size: 5000,
                        type: WidthType.DXA
                    },
                    children:[
                        new Paragraph(
                            {
                                style: "paragrapgBold",
                                children: [
                                    new TextRun({
                                        text: "Code for month of production:",
                                    })
                                ]
                            }
                        )
                    ]
                }
            ),
            new TableCell(
                {
                    columnSpan: 2,
                    width:{
                        size: 5000,
                        type: WidthType.DXA
                    },
                    children:[
                        new Paragraph(
                            {
                                style: "paragrapgBold",
                                children: [
                                    new TextRun({
                                        text: "Code for year of production:"
                                    })
                                ]
                            }
                        )
                    ]
                }
            )                                            
        ]
    })

    const yearTitle2 = new TableRow(
        {
            children:[
                new TableCell(
                    {
                        width:{
                            size: 2500,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph({
                                style: "table1Header",
                                children: [
                                    new TextRun({
                                        text: "Month"
                                    })
                                ]
                            })
                        ]
                    }
                ),
                new TableCell(
                    {
                        width:{
                            size: 2500,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph({
                                style: "table1Header",
                                children: [
                                    new TextRun({
                                        text: "Code"
                                    })
                                ]
                            })
                        ]
                    }
                ),
                new TableCell(
                    {
                        width:{
                            size: 2500,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph({
                                style: "table1Header",
                                children: [
                                    new TextRun({
                                        text: "Year"
                                    })
                                ]
                            })
                        ]
                    }
                ),
                new TableCell(
                    {
                        width:{
                            size: 2500,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph({
                                style: "table1Header",
                                children: [
                                    new TextRun({
                                        text: "Code"
                                    })
                                ]
                            })
                        ]
                    }
                )                                                                                                
            ]
        }
    )
    yearItems.push(yearTitle1);
    yearItems.push(yearTitle2);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (let loop = 0 ; loop < 12 ; loop++){
        let monthItem = new TableRow(
            {
                children:[
                    new TableCell(
                        {
                            width:{
                                size: 2500,
                                type: WidthType.DXA
                            },
                            children:[
                                new Paragraph({
                                    style: "table1Header",
                                    children: [
                                        new TextRun({
                                            text: monthNames[loop]
                                        })
                                    ]
                                })
                            ]
                        }
                    ),
                    new TableCell(
                        {
                            width:{
                                size: 2500,
                                type: WidthType.DXA
                            },
                            children:[
                                new Paragraph({
                                    style: "table1Header",
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                })
                            ]
                        }
                    ),
                    new TableCell(
                        {
                            width:{
                                size: 2500,
                                type: WidthType.DXA
                            },
                            children:[
                                new Paragraph({
                                    style: "table1Header",
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                })
                            ]
                        }
                    ),
                    new TableCell(
                        {
                            width:{
                                size: 2500,
                                type: WidthType.DXA
                            },
                            children:[
                                new Paragraph({
                                    style: "table1Header",
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                })
                            ]
                        }
                    )                                                                                                
                ]
            }
        )
        yearItems.push(monthItem);
    }
    console.log(`Rows Length : ${yearItems.length}`)
    return yearItems;
}

function generateTableData(dataList) {
    let dataRows = [];
    if (dataList && dataList.length > 0) {
        dataList.map(currentData => {
            const rimRow = new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 7000,
                            WidthType: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style:"TableRowContent",
                                children: [
                                    new TextRun({
                                        text: currentData?.supplier
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            WidthType: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style:"TableRowContent",
                                children: [
                                    new TextRun({
                                        text: currentData?.value
                                    })
                                ]
                            })
                        ]
                    })
                ]
            });
            dataRows.push(rimRow);
        });        
    }
    return dataRows;
}

function generateForm11(form11Data,footerData){

    const dataOfFooter = footerData.footerData.footer.properties;
    const vehicleGeneralInformation_list = form11Data?.Vehicle_General_Information?.vehicleGeneralInformation;
    const vehicleIdentificationNumber_list = form11Data?.Vehicle_Identification_Number?.VehicleIdentificationNumber;

    let Specify_the_Location_of_VIN_on_Chassis_List = [];
    let Position_of_the_code_for_month_in_the_Chassis_number_List = [];
    let Height_of_VIN_characters_List = [];
    let Manufacturer_name_and_address_List = [];
    let Basic_model_List = [];
    let variant_List = [];

    vehicleGeneralInformation_list.map(vehDesc => {
        if (vehDesc.supplier.active === true){
            const supplierName = vehDesc?.supplier?.nameOfSupplier;
            const Manufacturer_name_and_address = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Manufacturer_name_and_address?.value
            }
            Manufacturer_name_and_address_List.push(Manufacturer_name_and_address);
            const  Basic_model = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Basic_model?.value
            }
            Basic_model_List.push( Basic_model);
            const variant = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.variant?.value
            }
            variant_List.push(variant);
        }
    });

    const Manufacturer_name_and_address_Rows = generateTableData(Manufacturer_name_and_address_List);
    const Basic_model_Rows = generateTableData(Basic_model_List);
    const variant_Rows = generateTableData(variant_List);

    let Example_of_Engine_Motor_No_List = [];
    let Example_of_Chassis_No_with_Month_Year_of_Manufacture_List = [];

    vehicleIdentificationNumber_list.map(vehDesc => {
        if (vehDesc.supplier.active === true){
            const supplierName = vehDesc?.supplier?.nameOfSupplier;
            const Specify_the_Location_of_VIN_on_Chassis = {
                supplier: supplierName,
                value: vehDesc?.VIN_Numbering?.properties?.Specify_the_Location_of_VIN_on_Chassis?.value
            }
            Specify_the_Location_of_VIN_on_Chassis_List.push(Specify_the_Location_of_VIN_on_Chassis);
            const Position_of_the_code_for_month_in_the_Chassis_number = {
                supplier: supplierName,
                value: vehDesc?.VIN_Numbering?.properties?.Position_of_the_code_for_month_in_the_Chassis_number?.value
            }
            Position_of_the_code_for_month_in_the_Chassis_number_List.push(Position_of_the_code_for_month_in_the_Chassis_number);
            const Height_of_VIN_characters = {
                supplier: supplierName,
                value: vehDesc?.VIN_Numbering?.properties?.Height_of_VIN_characters?.value
            }
            Height_of_VIN_characters_List.push(Height_of_VIN_characters);
            const Example_of_Engine_Motor_No = {
                supplier: supplierName,
                value: vehDesc?.VIN_Numbering?.properties?.Example_of_Engine_Motor_No?.value
            }
            Example_of_Engine_Motor_No_List.push(Example_of_Engine_Motor_No);
            const Example_of_Chassis_No_with_Month_Year_of_Manufacture = {
                supplier: supplierName,
                value: vehDesc?.VIN_Numbering?.properties?.Example_of_Chassis_No_with_Month_Year_of_Manufacture?.value
            }
            Example_of_Chassis_No_with_Month_Year_of_Manufacture_List.push(Example_of_Chassis_No_with_Month_Year_of_Manufacture);
        }
    });

    const Specify_the_Location_of_VIN_on_Chassis_Rows = generateTableData(Specify_the_Location_of_VIN_on_Chassis_List);
    const Position_of_the_code_for_month_in_the_Chassis_number_Rows = generateTableData(Position_of_the_code_for_month_in_the_Chassis_number_List);
    const Height_of_VIN_characters_Rows = generateTableData(Height_of_VIN_characters_List);
    const Example_of_Engine_Motor_No_Rows = generateTableData(Example_of_Engine_Motor_No_List);
    const Example_of_Chassis_No_with_Month_Year_of_Manufacture_Rows = generateTableData(Example_of_Chassis_No_with_Month_Year_of_Manufacture_List);


    const yearItems = generateYearProductionItems();
    const form11Document = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "table1Header",
                    name: "table1Header",
                    basedOn: "Normal",
                    run: {
                        size: "12pt",
                    },
                    paragraph: {
                        size: "12pt",
                        indent:{
                            left:"0.2cm"
                        }
                    }
                },
                {
                    id:"paragrapgBold",
                    name: "paragrapgBold",
                    basedOn: "Normal",
                    run:{
                        bold: true,
                        size: "12pt"
                    }
                },
                {
                    id: "redColorText",
                    name: "redColorText",
                    basedOn: "Normal",
                    run: {
                        color: "#880808",
                        size: "11pt",
                        font:  "Calibri",
                        bold: true
                    }
                }
            ]
        },
        sections: [
            {
                headers: {
                    default: new Header({
                        children: [
                            new Paragraph(
                                {
                                    children: [
                                        new TextRun(
                                            {
                                                text: "Table 11 of AIS-007 (Revision 5)",
                                                bold: true,
                                                size: "18pt"
                                            }
                                        )
                                    ],
                                    alignment: AlignmentType.CENTER
                                }
                            ),
                        ],
                    })
                },
                children: [
                    new Paragraph({
                        children:[
                            new TextRun(
                                {
                                    text: "DETAILS OF LOCATION OF CHASSIS NUMBER AND CODE FOR MONTH AND YEAR OF MANUFACTURE AS PER RULE 122 OF CMVR",
                                    bold: true,
                                    size:"12pt"
                                }
                            )
                        ],
                        alignment: AlignmentType.CENTER
                      }),
                      new Paragraph("\n\n"),
                      new Table(
                        {
                            columnWidths: [7000,3000],
                            rows:[
                                new TableRow({
                                    children:[
                                        new TableCell(
                                            {
                                                width:{
                                                    size: 7000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children: [
                                                                new TextRun({
                                                                    text: "Name of the Vehicle Manufacturer & Address :",
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell({
                                            width: {
                                                size: 5000,
                                                WidthType: WidthType.DXA
                                            },
                                            children: [
                                                new Table(
                                                    {
                                                        columnWidths: [500,500],
                                                        rows: Manufacturer_name_and_address_Rows
                                                    }
                                                )
                                            ]
                                        })                                             
                                    ]
                                }),
                                new TableRow({
                                    children:[
                                        new TableCell(
                                            {
                                                width:{
                                                    size: 7000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children:[
                                                                new TextRun({
                                                                    text: "Name of the basic model :",
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell({
                                            width: {
                                                size: 5000,
                                                WidthType: WidthType.DXA
                                            },
                                            children: [
                                                new Table(
                                                    {
                                                        columnWidths: [500,500],
                                                        rows: Basic_model_Rows
                                                    }
                                                )
                                            ]
                                        })                                             
                                    ]
                                }),
                                new TableRow({
                                    children:[
                                        new TableCell(
                                            {
                                                width:{
                                                    size: 7000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children:[
                                                                new TextRun({
                                                                    text: "Name of Variants, if any  :",
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell({
                                            width: {
                                                size: 5000,
                                                WidthType: WidthType.DXA
                                            },
                                            children: [
                                                new Table(
                                                    {
                                                        columnWidths: [500,500],
                                                        rows: variant_Rows
                                                    }
                                                )
                                            ]
                                        })                                              
                                    ]
                                }),
                                new TableRow({
                                    children:[
                                        new TableCell(
                                            {
                                                width:{
                                                    size: 7000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children:[
                                                                new TextRun({
                                                                    text: "Place of Embossing or etching the Chassis Number (Vehicle Identification Number). Supporting details by drawing or pictures may be provided if necessary.",
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell({
                                            width: {
                                                size: 5000,
                                                WidthType: WidthType.DXA
                                            },
                                            children: [
                                                new Table({
                                                    columnWidths: [500, 500],
                                                    rows: Specify_the_Location_of_VIN_on_Chassis_Rows
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableRow({
                                    children:[
                                        new TableCell(
                                            {
                                                width:{
                                                    size: 7000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children:[
                                                                new TextRun({
                                                                    text: "Place of PIN Verification plate. Supporting details by drawing or pictures may be provided if necessary",
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width:{
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph(
                                                        {
                                                            text: ""
                                                        }
                                                    )
                                                ]
                                            }
                                        )                                            
                                    ]
                                }),
                                new TableRow({
                                    children:[
                                        new TableCell(
                                            {
                                                width:{
                                                    size: 7000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph(
                                                        {
                                                            style: "table1Header",
                                                            children:[
                                                                new TextRun({
                                                                    text: "Place of Local information (Importer Plate)- if machine imported. Supporting details by drawing or pictures may be provided if necessary",
                                                                })
                                                            ]
                                                        }
                                                    )
                                                ]
                                            }
                                        ),
                                        new TableCell(
                                            {
                                                width:{
                                                    size: 3000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph(
                                                        {
                                                            text: ""
                                                        }
                                                    )
                                                ]
                                            }
                                        )                                            
                                    ]
                                })
                            ],
                            size: "12pt"
                        }
                      ),
                      new Paragraph(
                        {
                            style: "paragrapgBold",
                            children:[
                                new TextRun({
                                    break: 1,
                                    text: "Code for month and year of production:",
                                })
                            ]
                        }
                      ),
                      new Table(
                        {
                            columnWidths: [2500,2500,2500,2500],
                            rows: yearItems,
                            size: "12pt"
                        }
                      ),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "",
                                break: 1
                            })
                        ]
                      }),
                      new Table({
                        columnWidths: [7000,3000],
                        rows:[
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size:7000,
                                            type: WidthType.DXA
                                        },
                                        children:[
                                            new Paragraph({
                                                style: "table1Header",
                                                children:[
                                                    new TextRun({
                                                        text: "Position of the code for month of production in  the Chassis number :"
                                                    })
                                                ]
                                            })
                                        ]}),
                                        new TableCell({
                                            width: {
                                                size: 5000,
                                                WidthType: WidthType.DXA
                                            },
                                            children: [
                                                new Table(
                                                    {
                                                        columnWidths: [500,500],
                                                        rows: Position_of_the_code_for_month_in_the_Chassis_number_Rows
                                                    }
                                                )
                                            ]
                                        })  
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size:7000,
                                            type: WidthType.DXA
                                        },
                                        children:[
                                            new Paragraph({
                                                style: "table1Header",
                                                children:[
                                                    new TextRun({
                                                        text: "Position of the code for year of production in the Chassis number  :"
                                                    })
                                                ]
                                            })
                                        ]}),
                                        new TableCell({
                                            width: {
                                                size:3000,
                                                type: WidthType.DXA
                                            },
                                            children:[
                                                new Paragraph({
                                                    style: "table1Header",
                                                    children:[
                                                        new TextRun({
                                                            text: ""
                                                        })
                                                    ]
                                                })
                                            ]})
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size:7000,
                                            type: WidthType.DXA
                                        },
                                        children:[
                                            new Paragraph({
                                                style: "table1Header",
                                                children:[
                                                    new TextRun({
                                                        text: "Height of the Chassis number"
                                                    }),
                                                    new TextRun({
                                                        text: "(Vehicle Identification Number) :",
                                                        break: 1
                                                    })
                                                ]
                                            })
                                        ]}),
                                        new TableCell({
                                            width: {
                                                size: 5000,
                                                WidthType: WidthType.DXA
                                            },
                                            children: [
                                                new Table(
                                                    {
                                                        columnWidths: [500,500],
                                                        rows: Height_of_VIN_characters_Rows
                                                    }
                                                )
                                            ]
                                        })  
                                ]
                            })                                
                        ]
                      }),
                      new Paragraph({
                        style: "table1Header",
                        children: [
                            new TextRun({
                                text: "Example of Engine/Motor No.: -"
                            })
                        ]
                      }),
                      new Table(
                        {
                            columnWidths: [500,500],
                            rows: Example_of_Engine_Motor_No_Rows
                        }
                    ),
                    new Paragraph({
                        style: "table1Header",
                        children: [
                            new TextRun({
                                text: "Example of Chassis No. (Vehicle Identification Number) with Month & Year of Manufacture: -"
                            })
                        ]
                      }),
                      new Table(
                        {
                            columnWidths: [500,500],
                            rows: Example_of_Chassis_No_with_Month_Year_of_Manufacture_Rows
                        }
                    )
                ],
                footers: {
                    default: new Footer({
                        children:[
                            new Table({
                                width: {
                                    size: 9000,
                                    type: WidthType.DXA
                                },
                                columnWidths: [3300,3300,3300],
                                rows: [
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                width: {
                                                    size: 3300,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Manufacturer: "+dataOfFooter.Manufacture_Name.value
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 3300,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Sheet No : "
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 3300,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Test Agency : "
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                width: {
                                                    size: 3300,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: ""
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 3300,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Document No: "+dataOfFooter.Document_No.value
                                                            }),
                                                            new TextRun({
                                                                text: "",
                                                                break: 1
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 3300,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Test Agency : "
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                width: {
                                                    size: 3300,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Name: "+dataOfFooter.Homologation_Engineer_Name.value
                                                            }),
                                                            new TextRun({
                                                                text: "Designation: "+dataOfFooter.Engineer_Designation.value,
                                                                break: 1
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 3300,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Date : "
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 3300,
                                                    WidthType: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Name: "
                                                            }),
                                                            new TextRun({
                                                                text: "Designation: ",
                                                                break: 1
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new Paragraph({
                                children:[
                                    new TextRun({
                                        children: ["Page | ", PageNumber.CURRENT]
                                    })
                                ],
                                alignment: AlignmentType.RIGHT
                            })
                        ]
                    })
                }
            }
        ]
    })
    exportDoc(form11Document,"form11Document.docx");

}

export default generateForm11;