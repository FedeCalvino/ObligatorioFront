import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../css/Registrar.css'
import Button from 'react-bootstrap/Button';

export const Registrar = () => {
    const url = `https://babytracker.develotion.com/`;
    const [Departamentos,setDepartamentos]=useState([])
    const [Ciudades,setCiudades]=useState([])
    const [CiudadSelecc,setCiudadSelecc]=useState([])
    const [Usuario,setUsuario]=useState("")
    const [Contrasena,setContrasena]=useState("")
    const [DepartamentosSelecc,setDepartamentosSelecc]=useState([])



    useEffect(()=>{
        FetchDepartamentos()
    },[]);
    useEffect(()=>{
        FetchCiudades()
    },[DepartamentosSelecc]);

    const FetchDepartamentos = async()=>{
        const UrlDepartamentos = "/departamentos.php";
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        const response = await fetch(url+UrlDepartamentos, requestOptions);

        const result = await response.json();
        console.log(result.departamentos)
        setDepartamentos(result.departamentos)
    }

    const FetchCiudades = async()=>{
        const UrlDepartamentos = "ciudades.php?idDepartamento=";
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        const urlfetch= url+UrlDepartamentos+DepartamentosSelecc;
        console.log(urlfetch)
        const response = await fetch(urlfetch, requestOptions);

        const result = await response.json();
        console.log(result)
        setCiudades(result.ciudades)
    }

    const CrearUsuario = async ()=>{

        const UsuarioRegistro = {
            usuario: Usuario,
            password:Contrasena,
            idDepartamento: DepartamentosSelecc,
            idCiudad: CiudadSelecc
        }

        console.log(UsuarioRegistro)

        const UrlUsuario = "usuarios.php";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        requestOptions.body = JSON.stringify(Usuario);

        const urlfetch= url+UrlUsuario;
        console.log(urlfetch)
        
        const response = await fetch(urlfetch, requestOptions);

        const result = await response.json();
        console.log(result)
        
    }

  return (
    <>

<div className="form-container">
    <h1>Registro</h1>
            <Form.Label>Usuario</Form.Label>
            <Form.Control
                type="text"
                className="form-control"
                value={Usuario}
                onChange={(e) => { setUsuario(e.target.value) }}
                placeholder="Usuario"
            />
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
                type="text"
                className="form-control"
                value={Contrasena}
                onChange={(e) => { setContrasena(e.target.value) }}
                placeholder="Contraseña"
            />
            <Form.Label>Departamento</Form.Label>
            <Form.Select 
                className="form-select" 
                aria-label="Default select example" 
                onChange={(e) => { setDepartamentosSelecc(e.target.value) }} 
                value={DepartamentosSelecc}
            >
                <option value=""></option>
                {Departamentos.map(dep =>   
                    <option key={dep.id} value={dep.id}>{dep.nombre}</option>   
                )}
            </Form.Select>
            <Form.Label>Ciudades</Form.Label>
            <Form.Select 
                className="form-select" 
                aria-label="Default select example" 
                onChange={(e) => { setCiudadSelecc(e.target.value) }} 
                value={CiudadSelecc}
            >
                <option value=""></option>
                {Ciudades.map(ciudad => 
                    <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>   
                )}
            </Form.Select>
            <Button onClick={()=>CrearUsuario()}>Registrar</Button>
        </div>
    </>
  )
}
