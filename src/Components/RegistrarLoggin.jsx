import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "../css/Registrar.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const RegistrarLoggin = () => {
  const url = `https://babytracker.develotion.com/`;
  //Login
  const [UsuarioLogin, setUsuarioLogin] = useState("");
  const [ContrasenaLogin, setContrasenaLogin] = useState("");
  const [User, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
});
  const navigate = useNavigate();

  //errores
  const [errorLogin, seterrorLogin] = useState(false);
  const [MensajeerrorLogin, setMensajeerrorLogin] = useState(null);

  const [errorRegistro, seterrorRegistro] = useState(false);
  const [MensajeerrorRegistro, setMensajeerrorRegistro] = useState(null);

  //CrearUsuario

  const [Departamentos, setDepartamentos] = useState([]);
  const [Ciudades, setCiudades] = useState([]);
  const [CiudadSelecc, setCiudadSelecc] = useState([]);
  const [Usuario, setUsuario] = useState("");
  const [Contrasena, setContrasena] = useState("");
  const [DepartamentosSelecc, setDepartamentosSelecc] = useState([]);

  //CrearRegistrar
  const [CrearRegistrar, setCrearRegistrar] = useState(false);

  const CrearUsuario = async () => {
    const UsuarioRegistro = {
      usuario: Usuario,
      password: Contrasena,
      idDepartamento: DepartamentosSelecc,
      idCiudad: CiudadSelecc,
    };

    console.log(UsuarioRegistro);
    const UrlUsuario = "/usuarios.php";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    requestOptions.body = JSON.stringify(UsuarioRegistro);

    const urlfetch = url + UrlUsuario;

    fetch(urlfetch, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.codigo == 200) {
          const newUser = {
            id: result.id,
            apiKey: result.apiKey,
          };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          setMensajeerrorRegistro(null);
          seterrorRegistro(false);
        } else {
          setMensajeerrorRegistro("Error al crear usuario");
          seterrorRegistro(true);
        }
      })
      .catch((error) => {
        setMensajeerrorRegistro("fallo en la conexio");
        seterrorRegistro(true);
      });
      console.log("se creo el usuario")
  };

  const LoginUsuario = async () => {
    const UsuarioLogg = {
      usuario: UsuarioLogin,
      password: ContrasenaLogin,
    };
    const UrlUsuario = "login.php";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    requestOptions.body = JSON.stringify(UsuarioLogg);

    const urlfetch = url + UrlUsuario;

    console.log(urlfetch);

    fetch(urlfetch, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.codigo === 200) {
          const newUser = {
            id: result.id,
            apiKey: result.apiKey,
          };
          localStorage.setItem("user", JSON.stringify(newUser));
          setUser(newUser);
          setMensajeerrorLogin(null);
          seterrorLogin(false);
        } else {
          setMensajeerrorLogin("Error al logear");
          seterrorLogin(true);
        }
      })
      .catch((error) => {
        setMensajeerrorLogin("fallo en la conexio");
        seterrorLogin(true);
      });
  };

  useEffect(() => {
    FetchDepartamentos();
  }, []);
  
  useEffect(() => {
    FetchCiudades();
  }, [DepartamentosSelecc]);

  const FetchDepartamentos = async () => {
    const UrlDepartamentos = "/departamentos.php";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(url + UrlDepartamentos, requestOptions);

    const result = await response.json();
    console.log(result.departamentos);
    setDepartamentos(result.departamentos);
  };

  const FetchCiudades = async () => {
    const UrlDepartamentos = "ciudades.php?idDepartamento=";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const urlfetch = url + UrlDepartamentos + DepartamentosSelecc;
    console.log(urlfetch);
    const response = await fetch(urlfetch, requestOptions);

    const result = await response.json();
    console.log(result);
    setCiudades(result.ciudades);
  };

  useEffect(() => {
    if (User) {
      navigate("/Home");
    }
  }, []);
  if (User) {
    navigate("/Home");
  }
  return (
    <>
      {CrearRegistrar ? (
        <>
          {errorRegistro && <p style={{width:"100%",backgroundColor:"red",height:"40px"}}>{MensajeerrorRegistro}</p>}
          <div className="form-container">
            <h1>Registro</h1>
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={Usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
              }}
              placeholder="Usuario"
            />
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={Contrasena}
              onChange={(e) => {
                setContrasena(e.target.value);
              }}
              placeholder="Contraseña"
            />
            <Form.Label>Departamento</Form.Label>
            <Form.Select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setDepartamentosSelecc(e.target.value);
              }}
              value={DepartamentosSelecc}
            >
              <option value=""></option>
              {Departamentos.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Label>Ciudades</Form.Label>
            <Form.Select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setCiudadSelecc(e.target.value);
              }}
              value={CiudadSelecc}
            >
              <option value=""></option>
              {Ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </Form.Select>
            <Button
              style={{ marginBottom: "10px" }}
              onClick={() => CrearUsuario()}
            >
              Registrar
            </Button>
            <Button style={{ backgroundColor: "rgb(0, 117, 0)",border:"none" }}  onClick={() => setCrearRegistrar(false)}>Login</Button>
          </div>
        </>
      ) : (
        <>
          {errorLogin && <p style={{width:"100%",backgroundColor:"red",height:"40px"}}>{MensajeerrorLogin}</p>}
          <div className="form-container">
            <h1>Login</h1>
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={UsuarioLogin}
              onChange={(e) => {
                setUsuarioLogin(e.target.value);
              }}
              placeholder="Usuario"
            />
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              value={ContrasenaLogin}
              onChange={(e) => {
                setContrasenaLogin(e.target.value);
              }}
              placeholder="Contraseña"
            />
            <Button
              style={{ marginBottom: "10px" }}
              onClick={() => LoginUsuario()}
            >
              Login
            </Button>
            <Button style={{ backgroundColor: "rgb(0, 117, 0)",border:"none"  }} onClick={() => setCrearRegistrar(true)}>Registrarme</Button>
          </div>
        </>
      )}
    </>
  );
};
