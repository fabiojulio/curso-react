import React, { Component, Fragment } from 'react';
import Header from './Header';
import DataTable from './DataTable';
import ApiService from './ApiService';


class Autores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autores: [],
              titulo: 'Autores'
        };
    }

    componentDidMount(){
      ApiService.ListaAutores()
        .then(resp =>{
          this.setState({
            autores: resp.data
          })
        })
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className='container'>
                    <h1>Página de Autores</h1>
                    <DataTable dados={this.state.autores} titulo={this.state.titulo} colunas={['nome']}/>
                </div>
            </Fragment>
        );
    }
}

export default Autores;