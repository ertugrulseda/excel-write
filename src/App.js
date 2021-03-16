import logo from './logo.svg';
import './App.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { useState, useRef } from 'react';
import ExcelJS from 'exceljs';

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

	const createExcel = () => {
		console.log('createExcel');
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
