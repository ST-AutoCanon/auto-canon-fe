import exportDoc from './exportUtil';
import populateMultiSupData from './form1ADataGenerator';
import { Document, Header, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, Footer, PageNumber } from "docx";

let multiSupplierDataList = [];
let form1ATable1RowsList = [];
let form1ATable2RowsList = [];
let form1ATable3RowsList = [];

function readList(itemsListName, form1Adata, footerData, tableNo = 1){
    fetch(itemsListName).then(response => response.text()).then(responseText =>{
        if (responseText){
            const lines = responseText.split("\n");
            if (lines && lines.length > 0){
                generateRows(lines,tableNo, itemsListName, form1Adata);
                if (itemsListName.indexOf("_List1") > 0){
                    readList('./Form1A_List2.csv',form1Adata,footerData,tableNo);
                }
                else if (itemsListName.indexOf("_List2") > 0){
                    readList('./Form1A_List3.csv',form1Adata,footerData,2);
                }
                else if (itemsListName.indexOf("_List3") > 0){
                    readList('./Form1A_List4.csv',form1Adata,footerData,3);
                }
                else if (itemsListName.indexOf("_List4") > 0){
                    readList('./Form1A_List5.csv',form1Adata,footerData,3);
                }
                else{
                    fillAndDownload(form1Adata,footerData);
                }
            }
        }
    })
}

function generateRows(lines, tableNo = 1, itemsListName = "List", form1Adata){
    let styleName = "table1Header";
    if (itemsListName.indexOf("List2") > 0){
        styleName = "paragrapgBold";
        const tyreVariantRow = new TableRow({
            children:[
                new TableCell(
                    {
                        width:{
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Tyre",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Variant / version"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Type"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Size designation with speed category symbol and load capacity index"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Make (s)"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Type Approval Number or BIS license number or identification"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Dynamic"
                                        }),
                                        new TextRun({
                                            break: 1,
                                            text: "Rolling"
                                        }),
                                        new TextRun({
                                            break: 1,
                                            text: "Radius"
                                        }),
                                    ]
                                }
                            )
                        ]
                    }
                )
            ]
        });
        form1ATable1RowsList.push(tyreVariantRow);        
    }
    if (tableNo === 3 && itemsListName.indexOf("List5") >= 0){
        const rowOfSeat = new TableRow({
            children:[
                new TableCell(
                    {
                        width:{
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Row of Seat"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Location*"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Type of seat belt"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Variant"
                                        }),
                                        new TextRun({
                                            text: "(if applicable)",
                                            break: 1
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Belt adjustment device for height"
                                        }),
                                        new TextRun({
                                            text: "(indicate Yes/No/optional)",
                                            break: 1
                                        })
                                    ]
                                }
                            )
                        ]
                    }
                )
            ]
        });
        form1ATable3RowsList.push(rowOfSeat);

        const firstRowL = new TableRow({
            children:[
                new TableCell(
                    {
                        width:{
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "First row of seats"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "L"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                }
                            )
                        ]
                    }
                )
            ]
        });
        form1ATable3RowsList.push(firstRowL);

        const firstRowC = new TableRow({
            children:[
                new TableCell(
                    {
                        width:{
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "C"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                }
                            )
                        ]
                    }
                )
            ]
        });
        form1ATable3RowsList.push(firstRowC);

        const firstRowR = new TableRow({
            children:[
                new TableCell(
                    {
                        width:{
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "R"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                }
                            )
                        ]
                    }
                )
            ]
        });
        form1ATable3RowsList.push(firstRowR);

        const secondRowL = new TableRow({
            children:[
                new TableCell(
                    {
                        width:{
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "Second row of seats"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "L"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                }
                            )
                        ]
                    }
                )
            ]
        });
        form1ATable3RowsList.push(secondRowL);

        const secondRowC = new TableRow({
            children:[
                new TableCell(
                    {
                        width:{
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "C"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                }
                            )
                        ]
                    }
                )
            ]
        });
        form1ATable3RowsList.push(secondRowC);

        const secondRowR = new TableRow({
            children:[
                new TableCell(
                    {
                        width:{
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "R"
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: ""
                                        })
                                    ]
                                }
                            )
                        ]
                    }
                )
            ]
        });
        form1ATable3RowsList.push(secondRowR);

        const rowSeatInfo = new TableRow({
            children:[
                new TableCell(
                    {
                        width:{
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "",
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
                            size: 5000,
                            type: WidthType.DXA
                        },
                        columnSpan: 5,
                        children:[
                            new Paragraph(
                                {
                                    style: styleName,
                                    children: [
                                        new TextRun({
                                            text: "The table may be extended as necessary for vehicles with more than two rows of seats there are more than three seats across the width of the vehicle."
                                        }),
                                        new TextRun({
                                            break: 1,
                                            text: "*(L = left-hand side, R= right-hand side, C = centre)"
                                        })
                                    ]
                                }
                            )
                        ]
                    }
                )
            ]
        });
        form1ATable3RowsList.push(rowSeatInfo);
    }
    lines.map(currentLine => {
        const lineItems = currentLine.split(",");
        styleName = "table1Header";
        if (lineItems[2] && lineItems[2].replace("\r","") === "TRUE"){
            styleName = "paragrapgBold";
        }
        const rowKey = itemsListName.replace("./Form1A_","").replace(".csv","");
        let currentRow;
        const rowData = getRowData(rowKey,lineItems[0]);
        if (tableNo < 3){
            currentRow = new TableRow({
                children:[
                    new TableCell(
                        {
                            width:{
                                size: 1000,
                                type: WidthType.DXA
                            },
                            children:[
                                new Paragraph(
                                    {
                                        style: styleName,
                                        children: [
                                            new TextRun({
                                                text: lineItems[0],
                                            })
                                        ]
                                    }
                                )
                            ]
                        }
                    ),
                    new TableCell(
                        {
                            columnSpan: 4,
                            width:{
                                size: 5000,
                                type: WidthType.DXA
                            },
                            children:[
                                new Paragraph(
                                    {
                                        style: styleName,
                                        children: [
                                            new TextRun({
                                                text: lineItems[1]
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
                                new Table(
                                    {
                                        columnWidths: [500,500],
                                        rows: rowData
                                    }
                                )
                            ]
                        }
                    )
                ]
            });
        }
        else{
            currentRow = new TableRow({
                children:[
                    new TableCell(
                        {
                            width:{
                                size: 1000,
                                type: WidthType.DXA
                            },
                            children:[
                                new Paragraph(
                                    {
                                        style: styleName,
                                        children: [
                                            new TextRun({
                                                text: lineItems[0],
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
                                        style: styleName,
                                        children: [
                                            new TextRun({
                                                text: lineItems[1]
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
                                new Table(
                                    {
                                        columnWidths: [500,500],
                                        rows: rowData
                                    }
                                )
                            ]
                        }
                    ),
                    new TableCell(
                        {
                            width:{
                                size: 5000,
                                type: WidthType.DXA
                            },
                            children:[
                                new Paragraph(
                                    {
                                        style: styleName,
                                        children: [
                                            new TextRun({
                                                text: ""
                                            })
                                        ]
                                    }
                                )
                            ]
                        }
                    )
                ]
            });
        }
        if (tableNo === 1){
            form1ATable1RowsList.push(currentRow);
        }
        else if (tableNo === 2){
            form1ATable2RowsList.push(currentRow);
        }
        else if (tableNo === 3){
            form1ATable3RowsList.push(currentRow);
        }
    })
}

function getRowData(listName, serialNo = ""){
    let targetData = [];
    const currentRowKey = listName + "_" + serialNo.replaceAll(".","");
    const itemsList = multiSupplierDataList.filter(supData => {
        return supData.rowKey === currentRowKey;
    });
    if (itemsList && itemsList.length > 0){
        targetData = itemsList[0].value;
    }
    return targetData;
}

function generateForm1A(form1Adata,footerData){
    
    const headerRow = new TableRow({
        children:[
            new TableCell(
                {
                    width:{
                        size: 1000,
                        type: WidthType.DXA
                    },
                    columnSpan: 7,
                    children:[
                        new Paragraph(
                            {
                                style: "paragrapgBold",
                                children: [
                                    new TextRun({
                                        text: "INFORMATION RELATING JOINTLY TO L1, L2, L5 and L7 CATEGORY BATTERY OPERATED VEHICLES",
                                    }),
                                    new TextRun({
                                        break: 1,
                                        text: "(2 AND 3 WHEELERS including Quadricycle)"
                                    })
                                ],
                                alignment: AlignmentType.CENTER
                            }
                        )
                    ]
                }
            )
        ]
    });
    form1ATable1RowsList.push(headerRow);

    const headerRowTable2 = new TableRow({
        children:[
            new TableCell(
                {
                    width:{
                        size: 1000,
                        type: WidthType.DXA
                    },
                    columnSpan: 7,
                    children:[
                        new Paragraph(
                            {
                                style: "paragrapgBold",
                                children: [
                                    new TextRun({
                                        text: "INFORMATION RELATING SOLELY TO L5 CATEGORY BATTERY OPERATED VEHICLES",
                                    })
                                ],
                                alignment: AlignmentType.CENTER
                            }
                        )
                    ]
                }
            )
        ]
    });
    form1ATable2RowsList.push(headerRowTable2);

    const headerRowTable3 = new TableRow({
        children:[
            new TableCell(
                {
                    width:{
                        size: 1000,
                        type: WidthType.DXA
                    },
                    columnSpan: 7,
                    children:[
                        new Paragraph(
                            {
                                style: "paragrapgBold",
                                children: [
                                    new TextRun({
                                        text: "INFORMATION RELATING SOLELY TO L7 CATEGORY BATTERY OPERATED VEHICLES",
                                    })
                                ],
                                alignment: AlignmentType.CENTER
                            }
                        )
                    ]
                }
            )
        ]
    });
    form1ATable3RowsList.push(headerRowTable3);
    multiSupplierDataList = populateMultiSupData(form1Adata);
    readList('./Form1A_List1.csv', form1Adata,footerData);
}

function fillAndDownload(form1Adata,footerData){
    const dataOfFooter = footerData.footerData.footer.properties;
    const form1ADocument = new Document({
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
        numbering: {
            config: [
                {
                    reference: "my-crazy-numbering",
                    levels: [
                        {
                            level: 0,
                            format: "decimal",
                            text: "%1",
                            alignment: AlignmentType.START,
                            style: {
                                paragraph: {
                                    indent: { left: 720, hanging: 260 },
                                    spacing:{
                                        
                                    }
                                },
                            },
                        }
                    ],
                },
            ],
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
                                                text: "Table 1A of AIS-007 (Revision 5)",
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
                                    text: "DETAILED TECHNICAL SPECIFICATIONS",
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
                            rows: form1ATable1RowsList,
                            size: "12pt"
                        }
                      ),
                      new Paragraph("\n\n"),
                      new Table(
                        {
                            columnWidths: [7000,3000],
                            rows: form1ATable2RowsList,
                            size: "12pt"
                        }
                      ),
                      new Paragraph("\n\n"),
                      new Paragraph({
                        children:[
                            new TextRun(
                                {
                                    text: "Footnotes: -",
                                    bold: true,
                                    size:"12pt"
                                }
                            )
                        ]
                      }),
                      new Paragraph("\n\n"),
                      new Paragraph({
                        text: "State as appropriate",
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "Where a device has been component type-approved, the description may be replaced by a reference to that component type-approval. Likewise, no description is needed where a component's structure is clear from the diagrams or drawings attached to the certificate. State the numbers of the corresponding Annexes for each heading where photographs and drawings must be attached."
                            }),
                            new TextRun({
                                break: 1,
                                text: "Where used, means of identification may appear only on vehicles, separate technical units or components falling within the scope of the AIS / IS governing components type-approval."
                            }),
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "Classification in accordance with AIS-053."
                            })
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "Maximum payload declared by the manufacturer: - load obtained by subtracting the weight defined in 2.2, from the mass defined in 2.3."
                            })
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "The mass of the rider is taken to be a round figure of 75 kg."
                            })
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "This figure should be to the nearest tenth of a millimeter."
                            })
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "This value should be calculated with pi = 3,1416 to the nearest cmX3"
                            })
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "The information requested should be supplied for a possible variant."
                            })
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "A tolerance of 5 % is permitted provided that the limit values pursuant to AIS-017 are not exceeded."
                            })
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "Where unconventional engines and systems are fitted, information equivalent to that referred under this heading must be supplied by their manufacturer."
                            })
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph({
                        children:[
                            new TextRun({
                                text: "In case of CNG / LPG vehicles the additional details in Table 21 format shall be applicable. In case BOV, additional details as per table 13 shall be applicable"
                            })
                        ],
                        numbering:{
                            reference: "my-crazy-numbering",
                            level: 0
                        }
                      }),
                      new Paragraph("\n\n"),
                      new Table(
                        {
                            columnWidths: [7000,3000],
                            rows: form1ATable3RowsList,
                            size: "12pt"
                        }
                      ),
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
                                                                text: "Name: "+ dataOfFooter.Homologation_Engineer_Name.value
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
                                                                text: "Designation: "+dataOfFooter.Engineer_Designation.value,
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
    exportDoc(form1ADocument,"form1ADocument.docx");
};

export default generateForm1A;