import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const dollarSign = (p) => {

  return <><span>${p.value}</span></>

}
function App() {

  const gridRef = useRef(); //for grid api selection 
  const [rowData, setRowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950 },
    { make: 'Ford', model: 'Series', price: 33850 },
    { make: 'Toyota', model: 'Corolla', price: 29600 }
  ])
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'make',
      sortable: true,
      filter: 'agTextColumnFilter',

      cellRenderer: p => <><b>{p.value}</b></> //cellRenderes

    },
    { field: 'model' },
    {
      field: 'price',
      filter: 'agNumberColumnFilter',
      cellRenderer: memo(dollarSign) //avoid re-rendering of cellRenderes 
    }
  ])

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json').
      then(result => result.json()).then(rowData => setRowData(rowData))
  }, [])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filterParams: {
      debounceMs: 0,
      buttons: ['apply', 'clear', 'cancel', 'reset']
    }
  }), [])

  const buttonClickHandler = useCallback((e) => {
    gridRef.current.api.deselectAll();
  });


  const cellClickedListener = useCallback(e => console.log("cell cliked", e));
  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <button onClick={buttonClickHandler}>Deselect</button>
      <AgGridReact
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection='multiple'
        animateRows={true}

      />
    </div>
  );
}


export default App;
