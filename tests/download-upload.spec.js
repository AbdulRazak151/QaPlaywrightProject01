/*const ExcelJS= require('exceljs');
const { test, expect, request } = require('@playwright/test');



async function writeExcel (SearchText,ReplaceText,change,filepath) {
    

const workbook = new ExcelJS.Workbook();

await workbook.xlsx.readFile(filepath);

    const worksheet = workbook.getWorksheet("Sheet1");
    const output=await readExcel(worksheet,SearchText);
         
   const cell= worksheet.getCell(output.row,output.column+change.changeColumn);
   cell.value=ReplaceText;
    await workbook.xlsx.writeFile(filepath);
}



async function readExcel(worksheet,SearchText)
{

    let output={row:-1,column:-1};
worksheet.eachRow((row, rowNumber) => {

           row.eachCell((cell, cellNumber) => {

             if(cell.value===SearchText){
               output.row= rowNumber;
            output.column=cellNumber;


          }

      });

    });
    return output;

}




test("download-upload",async({page})=>
{


        const SearchText='Mango';
        const updatevalue='3432';
        await   page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const downloadPromise =  page.waitForEvent('download');
        await   page.getByRole('button',{name:'Download'}).click();
        
      
      await downloadPromise;
      writeExcel(SearchText,updatevalue,{changeRow:0,changeColumn:2},"C:\\Users\\AbdulRazak\\Downloads\\downloadexceltest.xlsx");
       await page.locator("#fileinput").click();
       await page.locator("#fileinput").setInputFiles("C:\\Users\\AbdulRazak\\Downloads\\downloadexceltest.xlsx");
       const textLocator= page.getByText(SearchText);
      const desiredRow= await page.getByRole('row').filter({has:textLocator});
      await expect(desiredRow.locator(".cell-4-undefined")).toContainText(updatevalue);
        




}



);*/

const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
 
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText); // not async
 
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}
 
// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}
 
//update Mango Price to 350. 
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");
 
test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';
 
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
 
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const dl = await download;
  const filePath = 'C:\\Users\\AbdulRazak\\Downloads\\downloadexceltest.xlsx'; // or await dl.path()
 
  // ✅ Ensure the edit finishes before upload
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
 
  await page.locator('#fileinput').setInputFiles(filePath);
 
  const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});