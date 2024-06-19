import exportDoc from './exportUtil';
import { Document, Header, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, Footer, PageNumber, ImageRun, VerticalAlign, VerticalPositionRelativeFrom, VerticalPositionAlign, convertInchesToTwip } from "docx";
import docSeal from '../assets/images/docSeal.png';

function getWheelRimsTableData(wheelRimData) {
    let rimRows = [];
    if (wheelRimData && wheelRimData.length > 0) {
        wheelRimData.map(wheelRim => {
            const rimRow = new TableRow({
                children: [
                    new TableCell({
                        columnWidths: [2500,2500],
                        width: {
                            size: 2500,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                style:"TableRowContent",
                                children: [
                                    new TextRun({
                                        text: wheelRim?.supplier?.nameOfSupplier
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 2500,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style:"TableRowContent",
                                children: [
                                    new TextRun({
                                        text: wheelRim?.Wheel_Rim_Size?.properties?.Wheel_rim_size?.value
                                    })
                                ]
                            })
                        ]
                    })
                ]
            });
            rimRows.push(rimRow);
        });
    }
    if (rimRows.length === 0) {
        const emptyRow = new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 2500,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            style:"TableRowContent",
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
                        size: 2500,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            style:"TableRowContent",
                            children: [
                                new TextRun({
                                    text: ""
                                })
                            ]
                        })
                    ]
                })                
            ]
        });
        rimRows.push(emptyRow);
    }
    return rimRows;
}

function generateForm7(form7Data,footerData) {
    const dataOfFooter = footerData.footerData.footer.properties;
    const vehicleGeneralInformationList = form7Data.Vehicle_General_Information.VehicleGeneralInformation;
    const vehicleDimensionsList = form7Data.Vehicle_Dimensions.VehicleDimensions;
    const suspensionList = form7Data.Suspension.Suspension;
    //const suspension = form7Data.Suspension.Suspension[0].Suspension;
    //const brakes = form7Data.Brakes.Brakes[0];
    //const tyres = form7Data.Tyres.TyresData[0];
    //const weights = form7Data.Weights.Weights[0];
    const brakesList = form7Data.Brakes.Brakes;
    const tyresList = form7Data.Tyres.TyresData;
    const weightsList = form7Data.Weights.Weights;

    let vehModelList = [];
    let vehTypeList = [];
    let vehCategoryList = [];
    let importerNameAddressList = [];
    let mfNameAddressList = [];
    vehicleGeneralInformationList.map(vehDesc => {
        if (vehDesc.supplier.active === true){
            const supplierName = vehDesc?.supplier?.nameOfSupplier;
            const vehModel = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Basic_model?.value
            }
            vehModelList.push(vehModel);
            const vehType = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.properties?.Type_Of_Vehicle?.value
            }
            vehTypeList.push(vehType);
            const vehCategory = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.Vehicle_category?.value
            }
            vehCategoryList.push(vehCategory);
            const vehNameAddress = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.Name_and_address_of_the_vehicle_importer?.value
            }
            importerNameAddressList.push(vehNameAddress);
            const mfNameAddress = {
                supplier: supplierName,
                value: vehDesc?.Manufacturer_Details?.Manufacturer_name_and_address?.value
            }
            mfNameAddressList.push(mfNameAddress);
            
        }
    });
    
    const vehModelRows = getWheelRimsTableData(vehModelList);
    const vehTypeRows = getWheelRimsTableData(vehTypeList);
    const categoryRows = getWheelRimsTableData(vehCategoryList);
    const importerNameAddressRows = getWheelRimsTableData(importerNameAddressList);
    const mfNameAddressRows = getWheelRimsTableData(mfNameAddressList);

    let Frames_Long_member_size_list = [];
    let Number_of_cross_members_if_any_list = [];
    let Wheel_base_list = [];
    let Overall_width_list = [];
    let Overall_length_list = [];
    let Overall_height_list = []
    let Front_track_list = [];
    let Rear_track_list = [];
    let Min_ground_clearance_list = [];
    let Cargo_box_dimensions_if_fitted_list = [];
    let Front_Body_Overhang_list = [];
    let Rear_Body_Overhang_list = [];
    let Frames_overhang_at_front_list = [];
    let Frames_overhang_at_rear_end_list = [];
    let Load_body_platform_area_list = [];

    vehicleDimensionsList.map(vehDesc => {
        if (vehDesc.supplier.active === true){
            const supplierName = vehDesc?.supplier?.nameOfSupplier;
            const Frames_Long_member_size = {
                supplier: supplierName,
                value: vehDesc?.Frame.properties?.Frames_Long_member_size?.value
            }
            Frames_Long_member_size_list.push(Frames_Long_member_size);
            const Number_of_cross_members_if_any = {
                supplier: supplierName,
                value: vehDesc?.Frame.properties?.Number_of_cross_members_if_any?.value
            }
            Number_of_cross_members_if_any_list.push(Number_of_cross_members_if_any);
            const  Wheel_base = {
                supplier: supplierName,
                value: vehDesc?.General_arrangement_of_the_vehicle_dimension?.properties?.Wheel_base?.value
            }
            Wheel_base_list.push(Wheel_base);
            const Overall_width = {
                supplier: supplierName,
                value: vehDesc?.General_arrangement_of_the_vehicle_dimension?.properties.Overall_width?.value
            }
            Overall_width_list.push(Overall_width);
            const Overall_length = {
                supplier: supplierName,
                value: vehDesc?.General_arrangement_of_the_vehicle_dimension?.properties.Overall_length?.value
            }
            Overall_length_list.push(Overall_length);
            const Overall_height = {
                supplier: supplierName,
                value: vehDesc?.General_arrangement_of_the_vehicle_dimension?.properties?.Overall_height?.value
            }
            Overall_height_list.push(Overall_height);
            const Front_track = {
                supplier: supplierName,
                value: vehDesc?.General_arrangement_of_the_vehicle_dimension?.properties.Front_track?.value
            }
            Front_track_list.push(Front_track);
            const Rear_track = {
                supplier: supplierName,
                value: vehDesc?.General_arrangement_of_the_vehicle_dimension?.properties?.Rear_track?.value
            }
            Rear_track_list.push(Rear_track);
            const  Min_ground = {
                supplier: supplierName,
                value: vehDesc?.General_arrangement_of_the_vehicle_dimension?.properties.Min_ground_clearance?.value
            }
            Min_ground_clearance_list.push(Min_ground);
            const  Cargo_box_dimensions = {
                supplier: supplierName,
                value: vehDesc?.General_arrangement_of_the_vehicle_dimension?.properties?.Cargo_box_dimensions_if_fitted?.value
            }
            Cargo_box_dimensions_if_fitted_list.push(Cargo_box_dimensions);
            const  Front_Body_Overhang = {
                supplier: supplierName,
                value: vehDesc?.Body_Overhang.properties?.Front_Body_Overhang?.value
            }
            Front_Body_Overhang_list.push(Front_Body_Overhang);
            const  Rear_Body_Overhang = {
                supplier: supplierName,
                value: vehDesc?.Body_Overhang?.properties?.Rear_Body_Overhang?.value
            }
            Rear_Body_Overhang_list.push(Rear_Body_Overhang);
            const  Frames_overhang_at_front = {
                supplier: supplierName,
                value: vehDesc?.Frame_Overhang?.properties?.Frames_overhang_at_front?.value
            }
            Frames_overhang_at_front_list.push(Frames_overhang_at_front);
            const  Frames_overhang_at_rear_end = {
                supplier: supplierName,
                value: vehDesc?.Frame_Overhang?.properties?.Frames_overhang_at_rear_end?.value
            }
            Frames_overhang_at_rear_end_list.push(Frames_overhang_at_rear_end);
            const  Load_body_platform_area = {
                supplier: supplierName,
                value: vehDesc?.Frame_Overhang?.properties?.Load_body_platform_area?.value
            }
            Load_body_platform_area_list.push(Load_body_platform_area);
        }
    });

    const Frames_Long_member_size_Rows = getWheelRimsTableData(Frames_Long_member_size_list);
    const Number_of_cross_members_if_any_Rows = getWheelRimsTableData(Number_of_cross_members_if_any_list);
    const Wheel_base_Rows = getWheelRimsTableData(Wheel_base_list);
    const Overall_width_Rows = getWheelRimsTableData(Overall_width_list);
    const Overall_length_Rows = getWheelRimsTableData(Overall_length_list);
    const Overall_height_Rows = getWheelRimsTableData(Overall_height_list);
    const Front_track_Rows = getWheelRimsTableData(Front_track_list);
    const Rear_track_Rows = getWheelRimsTableData(Rear_track_list);
    const Min_ground_clearance_Rows = getWheelRimsTableData(Min_ground_clearance_list);
    const Cargo_box_dimensions_if_fitted_Rows = getWheelRimsTableData(Cargo_box_dimensions_if_fitted_list);
    const Front_Body_Overhang_Rows = getWheelRimsTableData(Front_Body_Overhang_list);
    const Rear_Body_Overhang_Rows = getWheelRimsTableData(Rear_Body_Overhang_list);
    const Frames_overhang_at_front_Rows = getWheelRimsTableData(Frames_overhang_at_front_list);
    const Frames_overhang_at_rear_end_Rows = getWheelRimsTableData(Frames_overhang_at_rear_end_list);
    const Load_body_platform_area_Rows = getWheelRimsTableData(Load_body_platform_area_list);

    let Type_of_Shock_absorbers_provided_at_the_front_and_Rear_list = [];
    let Type_of_springs_provided_at_front_and_Rear_list = [];
    let Antiroll_bar_if_provided_list = [];
    suspensionList.map(vehDesc => {
        if (vehDesc.supplier.active === true){
            const supplierName = vehDesc.supplier.nameOfSupplier;
            const Type_of_Shock_absorbers_provided_at_the_front_and_Rear = {
                supplier: supplierName,
                value: vehDesc?.suspension?.properties?.Type_of_Shock_absorbers_provided_at_the_front_and_Rear?.value
            }
            Type_of_Shock_absorbers_provided_at_the_front_and_Rear_list.push(Type_of_Shock_absorbers_provided_at_the_front_and_Rear);

            const Type_of_springs_provided_at_front_and_Rear = {
                supplier: supplierName,
                value: vehDesc?.suspension?.properties?.Type_of_springs_provided_at_front_and_Rear?.value
            }
            Type_of_springs_provided_at_front_and_Rear_list.push(Type_of_springs_provided_at_front_and_Rear);

            const Antiroll_bar_if_provided = {
                supplier: supplierName,
                value: vehDesc?.suspension?.properties?.Antiroll_bar_if_provided?.value
            }
            Antiroll_bar_if_provided_list.push(Antiroll_bar_if_provided);
        }
    });

    const Type_of_Shock_absorbers_provided_at_the_front_and_Rear_Rows = getWheelRimsTableData(Type_of_Shock_absorbers_provided_at_the_front_and_Rear_list);
    const Type_of_springs_provided_at_front_and_Rear_Rows = getWheelRimsTableData(Type_of_springs_provided_at_front_and_Rear_list);
    const Antiroll_bar_if_provided_Rows = getWheelRimsTableData(Antiroll_bar_if_provided_list);

    let Select_Type_of_Braking_System_list = [];
    let Whether_ABS_provided_list = [];
    let Parking_Brake_list = [];
    let Is_there_any_secondary_brake_list = [];
    brakesList.map(vehDesc => {
        if (vehDesc.supplier.active === true){
            const supplierName = vehDesc.supplier.nameOfSupplier;
            const Select_Type_of_Braking_System = {
                supplier: supplierName,
                value: vehDesc?.brakes?.Brief_Brake_Information?.properties?.Select_Type_of_Braking_System?.value
            }
            Select_Type_of_Braking_System_list.push(Select_Type_of_Braking_System);
            const Whether_ABS_provided = {
                supplier: supplierName,
                value: vehDesc?.brakes?.ABS?.properties?.Whether_ABS_provided?.value
            }
            Whether_ABS_provided_list.push(Whether_ABS_provided);
            const Parking_Brake = {
                supplier: supplierName,
                value: vehDesc?.brakes?.Parking_Brake?.properties?.Parking_Brake?.value
            }
            Parking_Brake_list.push(Parking_Brake);
            const Is_there_any_secondary_brake = {
                supplier: supplierName,
                value: vehDesc?.brakes?.Re_Generative_Brake?.properties?.Is_there_any_secondary_brake?.value
            }
            Is_there_any_secondary_brake_list.push(Is_there_any_secondary_brake);
        }
    });

    const Select_Type_of_Braking_System_Rows = getWheelRimsTableData(Select_Type_of_Braking_System_list);
    const Whether_ABS_provided_Rows = getWheelRimsTableData(Whether_ABS_provided_list);
    const Parking_Brake_Rows = getWheelRimsTableData(Parking_Brake_list);
    const Is_there_any_secondary_brake_Rows = getWheelRimsTableData(Is_there_any_secondary_brake_list);

    let Tyre_size_designation_including_ply_rating_list = [];
    let Speed_index_list = [];
    let Load_index_Load_rating_list = [];
    let Tyre_Type_list = [];
    let Laden_list = [];
    tyresList.map(vehDesc => {
        if (vehDesc.supplier.active === true){
            const supplierName = vehDesc.supplier.nameOfSupplier;
            const Tyre_size_designation_including_ply_rating = {
                supplier: supplierName,
                value: vehDesc?.tyres?.Tyre_Description?.properties?.Tyre_size_designation_including_ply_rating?.value
            }
            Tyre_size_designation_including_ply_rating_list.push(Tyre_size_designation_including_ply_rating);
            const  Speed_index = {
                supplier: supplierName,
                value: vehDesc?.tyres?.Tyre_Description?.properties?.Speed_index?.value
            }
            Speed_index_list.push( Speed_index);
            const Load_index_Load_rating = {
                supplier: supplierName,
                value: vehDesc?.tyres?.Tyre_Description?.properties?.Load_index_Load_rating?.value
            }
            Load_index_Load_rating_list.push(Load_index_Load_rating);
            const Tyre_Type = {
                supplier: supplierName,
                value: vehDesc?.tyres?.Tyre_Description?.properties?.Tyre_Type?.value
            }
            Tyre_Type_list.push(Tyre_Type);
            const Laden = {
                supplier: supplierName,
                value: vehDesc?.tyres?.Tyre_Description?.properties?.Laden.value
            }
            Laden_list.push(Laden);
        }
    });

    const Tyre_size_designation_including_ply_rating_Rows = getWheelRimsTableData(Tyre_size_designation_including_ply_rating_list);
    const Speed_index_Rows = getWheelRimsTableData(Speed_index_list);
    const Load_index_Load_rating_Rows = getWheelRimsTableData(Load_index_Load_rating_list);
    const Tyre_Type_Rows = getWheelRimsTableData(Tyre_Type_list);
    const Laden_Rows = getWheelRimsTableData(Laden_list);


    let Vehicle_kerb_weight_list = [];
    let Maximum_gradeability_list = [];
    weightsList.map(vehDesc => {
        if (vehDesc.supplier.active === true){
            const supplierName = vehDesc?.supplier?.nameOfSupplier;
            const Vehicle_kerb_weight = {
                supplier: supplierName,
                value: vehDesc?.weights?.Kerb_Weight?.properties?.Vehicle_kerb_weight?.value
            }
            Vehicle_kerb_weight_list.push(Vehicle_kerb_weight);
            const Maximum_gradeability = {
                supplier: supplierName,
                value: vehDesc?.weights?.Gradability?.properties?.Maximum_gradeability?.value
            }
            Maximum_gradeability_list.push(Maximum_gradeability);
        }
    });
    const Vehicle_kerb_weight_Rows = getWheelRimsTableData(Vehicle_kerb_weight_list);
    const Maximum_gradeability_Rows = getWheelRimsTableData(Maximum_gradeability_list);

    const docSealImage = new ImageRun({
        data: docSeal,
        transformation: {
            width: 90,
            height: 50,
        }
    });
    const wheelRimsRows = getWheelRimsTableData(form7Data.Wheel_Rim.WheelRim);
    const form7Document = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "TableBoldTitle",
                    name: "TableBoldTitle",
                    basedOn: "Normal",
                    run: {
                        bold: true,
                        size: "12pt"
                    },
                    paragraph: {
                        indent: {
                            left: 100
                        }
                    }
                },
                {
                    id: "TableRowContent",
                    name: "TableRowContent",
                    basedOn: "Normal",
                    run: {
                        size: "12pt"
                    },
                    paragraph:{
                        spacing: {
                            line: 276,
                            after: 120,
                            before: 120
                        },
                        indent: {
                            left: 100
                        }
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
        sections:[
            {
                headers: {
                    default: new Header({
                        children: [
                            new Paragraph(
                                {
                                    children: [
                                        new TextRun(
                                            {
                                                text: "Table 7 of AIS-007 (Revision 5)",
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
                    new Table({
                        columnWidths: [7000,3000],
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Manufacturer’s name and address"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: mfNameAddressRows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Importer’s name and address (in case of CBU)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: importerNameAddressRows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Vehicle data"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Basic model"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: vehModelRows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type / Description"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: vehTypeRows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Category of the vehicle"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: categoryRows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Variant(s)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type / Description"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Category of variant(s)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Engine"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Model"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Bore  x  stroke  (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "No. of cylinders"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Displacement"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Compression ratio"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Max. Engine output  (kW @ rpm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Max. Torque  (Nm @ rpm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Air cleaner type"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type of Fuel"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Clutch"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Gear box"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Make model"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "No. of gears"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Gear ratio \n\t\t 1st"
                                                    }),
                                                    new TextRun({
                                                        text: "\t\t\t\t 2nd",
                                                        break: 1
                                                    }),
                                                    new TextRun({
                                                        text: "\t\t\t\t 3rd",
                                                        break: 1
                                                    }),
                                                    new TextRun({
                                                        text: "\t\t\t\t 4th",
                                                        break: 1
                                                    }),
                                                    new TextRun({
                                                        text: "\t\t\t\t 5th",
                                                        break: 1
                                                    }),
                                                    new TextRun({
                                                        text: "\t\t\t\t 6th",
                                                        break: 1
                                                    }),
                                                    new TextRun({
                                                        text: "\t\t\t\t Reverse",
                                                        break: 1
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Drive Axle (Front / Rear / All)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Front axle ratio"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Rear axle ratio"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Steering"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type / Description"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Steering wheel diameter mm"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Ratio"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Frame"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Long member size (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Frames_Long_member_size_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Number of cross members"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Number_of_cross_members_if_any_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Suspension"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Type / Description"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Spring"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Type_of_springs_provided_at_front_and_Rear_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Anti-roll bar"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Antiroll_bar_if_provided_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Shock absorbers"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Type_of_Shock_absorbers_provided_at_the_front_and_Rear_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Brake"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Service brake (Brief description)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Select_Type_of_Braking_System_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Auto Slack Adjuster Fitted ( Yes / No / Optional )"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "ABS Fitted (Yes / No / Optional )"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Whether_ABS_provided_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Front (Disc / Drum)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Rear (Disc / Drum)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Total braking area (cm²)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Parking brake"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Parking_Brake_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Secondary brake"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Is_there_any_secondary_brake_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Wheels and tyres"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Wheel rim size"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        margins: {
                                            top: convertInchesToTwip(0.15),
                                            bottom: convertInchesToTwip(0.15),
                                            right: convertInchesToTwip(0.15),
                                            left: convertInchesToTwip(0.15),
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: wheelRimsRows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Tyre size designation including ply rating"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Tyre_size_designation_including_ply_rating_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Speed index"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Speed_index_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Load index / Load rating "
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Load_index_Load_rating_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Tyre Type (Radial / Cross / Tube / Tubeless)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Tyre_Type_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Laden Tyre pressure (front & rear)  (kg/cm2)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Laden_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Electrical system"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "System voltage  (V)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Battery rating  (Ah)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Wiper motor"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Wiping system (Brief description)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                        columnSpan: 2,
                                        width: {
                                            size: 10000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Fuel tank"
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Material"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Capacity  (l)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                        columnSpan: 2,
                                        width: {
                                            size: 10000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Dimensions"
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Wheel base  (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Wheel_base_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Overall width  (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Overall_width_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Overall length  (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Overall_length_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Overall height  (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Overall_height_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Front track  (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Front_track_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Rear track  (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Rear_track_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Ground clearance for vehicle category M1 in accordance with IS 9435,(mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Min. ground clearance (mm) (other than M1)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Min_ground_clearance_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Cargo box dimensions (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Cargo_box_dimensions_if_fitted_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Body overhang (mm)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Front end"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Front_Body_Overhang_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Rear end"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Rear_Body_Overhang_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Frame overhang mm (in case of vehicles without complete body)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Front end"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Frames_overhang_at_front_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Rear end"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Frames_overhang_at_rear_end_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Load body platform area"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    rows: Load_body_platform_area_Rows
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Weights"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Base"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Var 1"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Var 2"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Var 3"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Var 4"
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum GVW  kg (for rigid vehicles)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum GCW  kg (for articulated / combination vehicles)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum FAW  (kg)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum RAW  (kg)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Kerb weight with 90% fuel \n (with spare wheel , tools, etc.)  (kg)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: Vehicle_kerb_weight_Rows
                                                }
                                            )
                                        ]
                                    }) ,
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Maximum gradeability in 1st gear"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Table(
                                                {
                                                    columnWidths: [500,500],
                                                    rows: Maximum_gradeability_Rows
                                                }
                                            )
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
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
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                        columnSpan: 6,
                                        width: {
                                            size: 10000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "CO2 (g/km) (Applicable for category M1 with GVW<3.5 T)"
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Declared  : (rounded to 3 decimal places)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                        columnSpan: 6,
                                        width: {
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Fuel consumption (l/100 km) for Petrol, LPG or Diesel  and (kg/100km) for CNG and (kWh/100 km) for Electric Driven Vehicles(Applicable for category M1 with GVW<3.5 T) \n (rounded to 3 decimal places )*"
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Fuel Equivalent Fuel Consumption (Actual Fuel)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Petrol Equivalent Fuel Consumption (Petrol Equivalent)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Vehicle Max Speed in unladen condition"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Vehicle Max Speed in laden condition"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
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
                                        columnSpan: 6,
                                        width: {
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableBoldTitle",
                                                children: [
                                                    new TextRun({
                                                        text: "Seating"
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Seating capacity"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: form7Data?.General_arrangement_of_the_vehicle?.Generalarrangementofthevehicle[0]?.General_arrangement_of_the_vehicle?.properties?.Number_of_seating_positions?.value
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
                                            size: 7000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: "Sketch showing seating layout with vehicle dimensions \n (mm) (all category of vehicles)"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                style:"TableRowContent",
                                                children: [
                                                    new TextRun({
                                                        text: ""
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                        ]
                    })
                ],
                footers: {
                    default: new Footer({
                        children:[
                            new Table({
                                width: {
                                    size: 9000,
                                    type: WidthType.DXA
                                },
                                rows: [
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
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
                                                rowSpan: 4,
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Document No :" + dataOfFooter.Document_No.value
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
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
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Cert No :"
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
                                                    size: 4000,
                                                    type: WidthType.DXA
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
                                                    size: 4000,
                                                    type: WidthType.DXA
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
                                                    size: 4000,
                                                    type: WidthType.DXA
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
                                            })
                                        ]
                                    }),
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                rowSpan: 2,
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Signature"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Signature"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                rowSpan: 3,
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [docSealImage],
                                                        alignment: AlignmentType.CENTER
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Name: "+dataOfFooter.Homologation_Engineer_Name.value
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
                                                    size: 4000,
                                                    type: WidthType.DXA
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
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Sheet No"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Designation :"+dataOfFooter.Engineer_Designation.value
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
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Designation"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Date"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                text: "Date of Issue"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                width: {
                                                    size: 4000,
                                                    type: WidthType.DXA
                                                },
                                                children:[
                                                    new Paragraph({
                                                        style: "redColorText",
                                                        children: [
                                                            new TextRun({
                                                                children: ["Page No ", PageNumber.CURRENT ," of ",PageNumber.TOTAL_PAGES]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                }
            }
        ]
    })
    exportDoc(form7Document,"form7Document.docx");
}

export default generateForm7;