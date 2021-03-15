import logo from './logo.svg';
import './App.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { useState,useRef } from 'react';
import ExcelJS from 'exceljs';

function App() {
  const [ rowData, setRowData ] = useState([]);

  const readCharacters = async () =>{
   const response = await fetch('https://rickandmortyapi.com/api/character');
   const data = await response.json();
   //data.results[0]
		setRowData([]);
	};

  return (
    <div className="App">
			<div className="Content">
				<div className="file-input">
					<button className="btn-clear" onClick={readCharacters}>Karakterleri Doldur</button>
				</div>
				<div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
					<AgGridReact  rowData={rowData}>
						<AgGridColumn field="Marka" />
						<AgGridColumn field="Model" />
						<AgGridColumn field="Fiyat" />
						<AgGridColumn field="Plaka" />
					</AgGridReact>
				</div>
			</div>
		</div>
  );
}

export default App;
