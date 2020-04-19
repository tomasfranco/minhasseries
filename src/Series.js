import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
const Series = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/series").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const deleteSerie = (id) => {
    axios.delete("/api/series/" + id).then((res) => {
      const filtrado = data.filter((item) => item.id !== id);
      setData(filtrado);
    });
  };

  const renderizaLinha = (record) => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button
            onClick={() => deleteSerie(record.id)}
            type="button"
            className="btn btn-danger"
          >
            Remover
          </button>
          <Link to={"/series/" + record.id} className="btn btn-success">
            Info
          </Link>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Series</h1>
        <br /> <br />
        <Link to="/series/novo" className="btn btn-primary">
          Nova Série
        </Link>
        <br /> <br />
        <div className="alert alert-warning" role="alert">
          Você não possui séries criadas.
        </div>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="container">
      <h1>Séries</h1>
      <br /> <br />
      <Link to="/series/novo" className="btn btn-primary">
        Nova Série
      </Link>
      <br /> <br />
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>{data.map(renderizaLinha)}</tbody>
      </table>
    </div>
  );
};

export default Series;
