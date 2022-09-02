import React from 'react'
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

function ExportToExcel({ fileName, sheetName, columns, data }) {

    const workbook = new Excel.Workbook();

    const saveExcel = async () => {
        try {

            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet(sheetName);

            // add worksheet columns
            // each columns contains header and its mapping key from data
            worksheet.columns = columns;

            // updated the font for first row.
            worksheet.getRow(1).font = { bold: true };

            // loop through all of the columns and set the alignment with width.
            worksheet.columns.forEach(column => {
                column.width = column.header.length + 5;

                let dataHeader = columns.filter(d => {
                    return d.key === column.key
                })[0];

                let cellAlign = 'left';
                if (dataHeader.align) {
                    cellAlign = dataHeader.align;
                }

                column.alignment = { horizontal: cellAlign };
            });

            // loop through data and add each one to worksheet
            data.forEach(singleData => {
                worksheet.addRow(singleData);
            });

            // loop through all of the rows and set the outline style.
            worksheet.eachRow({ includeEmpty: false }, row => {
                // store each cell to currentCell
                const currentCell = row._cells;

                // loop through currentCell to apply border only for the non-empty cell of excel
                currentCell.forEach(singleCell => {
                    // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
                    const cellAddress = singleCell._address;

                    //for format date column value
                    if (singleCell._column._key === "createdDt") {
                        const cellValue = worksheet.getCell(cellAddress).value;
                        if (cellValue !== "Created On") {
                            worksheet.getCell(cellAddress).value = moment(cellValue).format("DD-MM-YYYY");
                        }
                    }

                    /* // apply border
                    worksheet.getCell(cellAddress).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    }; */
                });
            });

            // write the content using writeBuffer
            const buf = await workbook.xlsx.writeBuffer();

            // download the processed file
            saveAs(new Blob([buf]), `${fileName}.xlsx`);

        } catch (error) {
            console.error('<<<ERRROR>>>', error);
            console.error('Something Went Wrong', error.message);
        } finally {
            // removing worksheet's instance to create new one
            workbook.removeWorksheet(sheetName);
        }
    };


    return (
        <Button
            variant="outlined"
            size="medium"
            className="btn-orange-outline btnExport"
            startIcon={
                <FontAwesomeIcon icon={faFileExcel} color={"#f15a21 "} />
            }
            onClick={() => saveExcel()}
        >
            Export Report
        </Button>
    )
}

export default ExportToExcel