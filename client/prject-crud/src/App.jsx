// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react';
import './App.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';



function App() {

  //De la siguiente manera creamos las variables que van a gestionar los valores que se van a agregar a uno de mis campos
  const [nombre, setNombre] = useState(""); //Con esto asignamos un valor al nombre
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();

  //creamos una variable para editar los datos
  const [editar, setEditar] = useState(false);


  //Esta constante va a tener la lista de los empleados
  const [empleadosList, setEmpleados] = useState([]); //Lo inicializamos a una lista vacia

  //La siguiente funcion es para pasarsela con un evento de click al boton, y muestre el valor del nombre
  // const mostraDatos = () => {
  //   console.log(nombre);
  //   alert(nombre);
  // }

  //creamos un metodo para agregar
  const add = () => {
    //Aqui vamos a llamar a axios
    Axios.post("http://localhost:5174/create", {
      //Aqui tenemos el envio de los valores que fueron capturados desde los campos
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
      //luego de que enviemos esto "then", y que ejecute los siguiente una vez que termine el proceso
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue registrado correctamente!!</i>`,
        icon: 'success',
        timer: 3000
      })
    }).catch(function (error) { //Esto para capturar el error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
      })
    });  
  }

  //metodo para el funcionamiento del boton actualizar, y con esto ya se va a actualizar
  const update = () => {
    //Aqui vamos a llamar a axios
    Axios.put("http://localhost:5174/update", {
      //Aqui tenemos el envio de los valores que fueron capturados desde los campos
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
      //luego de que enviemos esto "then", y que ejecute los siguiente una vez que termine el proceso
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue actualizado correctamente!!</i>`,
        icon: 'success',
        timer: 3000
      })
    }).catch(function (error) { //Esto para capturar el error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  //El siguiente metodo es para la eliminacion de datos
  const deleteEmple = (val) => { //le vamos a decir que recibimos el valor.

    Swal.fire({
      title: 'Confirmar eliminado?',
      html: `<i>Realmente desea eliminar a <strong>${val.nombre}</strong>?</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        //Concatenamos el ID, de esta forma enviamos el "id" via URL
        Axios.delete(`http://localhost:5174/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiarCampos();
          Swal.fire({
            icon: 'success',
            title: `<strong>${val.nombre}</strong> fue eliminado`,
            showConfirmButton: false,
            timer: 2500
          });
        }).catch(function (error) { //Esto para capturar el error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el empleado!',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });

  }



  //Ahora hacemos la funcion para el boton cancelar
  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");
    setEditar(false);
  }


  //creamos otra funcion para editar los datos
  const editarEmpleado = (val) => { //Vamos a recibir un valor
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  }


  //creamos otro metodo para listar los empleados
  const getEmpleados = () => {
    //Aqui vamos a llamar a axios, y llamamos al metodo get para obtener
    Axios.get("http://localhost:5174/empleados").then((response) => { //Aqui le decimos que cuando se obtenga la respuesta me lo guarde en la variable "response"

      //le decimos que asigne a los empleados
      setEmpleados(response.data); //De esta manera vienen todos los datos que traemos desde la API

    });
  }

  getEmpleados();



  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre: </span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value); //Con esto obtenemos los valores de cada uno de los campos
              }}
              className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad: </span>
            <input type="number"
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control" value={edad} placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Pais: </span>
            <input type="text"
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control" value={pais} placeholder="Ingrese Pais" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input type="text"
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control" value={cargo} placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años: </span>
            <input type="number"
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control" value={anios} placeholder="Ingrese años de experiencia" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

        </div>
        <div className="card-footer text-muted">
          {
            //Aqui hacemos una codicion, en el caso de que se cumpla, va a mostrar el boton, en caso contrario muestra el otro boton, m-2 es margin de 2 para el boton
            editar ?
              <div>
                <button className='btn btn-warning m-2' onClick={update} >Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampos} >Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add} >Registrar</button>
          }

        </div>
      </div>

      {/*Agregamos un campo mas para agregar boton de accion*/}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {
            //map ayuda a recorrer todos los valores
            empleadosList.map((val, key) => {
              //Aqui voy a decirle que haga algo cuando vaya recibiendo cada uno de los elementos
              return <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      onClick={() => {
                        editarEmpleado(val); //Con esto ya se van a extraer cada uno de los valores, colocamos val, ya que este ya tiene cada uno de esos campos internamente
                      }}
                      className="btn btn-info">Editar</button>
                    <button type="button" onClick={() => {
                      deleteEmple(val);
                    }} className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>


            })
          }


        </tbody>
      </table>

    </div>
  )
}

export default App
