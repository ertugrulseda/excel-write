import './App.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { useState } from 'react';
import * as Excel from 'exceljs';
import { saveAs } from 'file-saver';

function App() {
	const [ rowData, setRowData ] = useState([]);

	const readCharacters = async () => {
		const response = await fetch('https://rickandmortyapi.com/api/character');
		const data = await response.json();
		let arr = [];
		data.results.forEach((element) => {
			const newElement = {
				ad: element.name,
				cinsiyet: element.gender,
				memleket: element.location.name,
				durum: element.status
			};
			arr = [ ...arr, newElement ];
		});
		setRowData(arr);
	};

	const createExcel = async () => {
		const workbook = new Excel.Workbook();
		workbook.creator = 'Me';
		workbook.lastModifiedBy = 'Her';

		workbook.views = [
			{
				x: 0,
				y: 0,
				width: 10000,
				height: 20000,
				firstSheet: 0,
				activeTab: 1,
				visibility: 'visible'
			}
		];

		const sheet = workbook.addWorksheet('Sayfa1', { properties: { tabColor: { argb: 'FFC0000' } } });
		sheet.columns = [
			{ header: 'Ad', key: 'ad', width: 40 },
			{ header: 'Cinsiyet', key: 'cinsiyet', width: 25 },
			{ header: 'Memleket', key: 'memleket', width: 40 },
			{ header: 'Durum.', key: 'durum', width: 25 }
		];

		rowData.forEach((item, index) => {
			sheet.addRow({
				id: index,
				ad: item.ad,
				cinsiyet: item.cinsiyet,
				memleket: item.memleket,
				durum: item.durum
			});
		});
		const buffer = await workbook.xlsx.writeBuffer();
		const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		const blob = new Blob([ buffer ], { type: fileType });
		saveAs(blob, 'export.xlsx');
		alert('Excel Oluşturuldu');
	};

	const clear = () => {
		setRowData([]);
	};
	return (
		<div className="App">
			<div className="head">
				<button className="btn-read btn" onClick={readCharacters}>
					Karakterleri Doldur
				</button>
				<button className="btn-excel btn" onClick={createExcel}>
					Excele Çıkar
				</button>
				<button className="btn-clear btn" onClick={clear}>
					Temizle
				</button>
			</div>
			<div className="ag-theme-alpine grid" style={{ height: 500, width: 1000 }}>
				<AgGridReact rowData={rowData}>
					<AgGridColumn field="ad" resizable={true} width={250} />
					<AgGridColumn field="cinsiyet" resizable={true} />
					<AgGridColumn field="memleket" resizable={true} width={400} />
					<AgGridColumn field="durum" resizable={true} />
				</AgGridReact>
			</div>
		</div>
	);
}

export default App;
