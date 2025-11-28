import React from 'react';
export default function TableComponent({ data }){
  if(!data || data.length===0) return <div>No rows</div>;
  const cols = Object.keys(data[0]);
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead><tr>{cols.map(c=> <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{data.map((r, i)=>(<tr key={i}>{cols.map(c=> <td key={c}>{r[c]}</td>)}</tr>))}</tbody>
      </table>
    </div>
  );
}
