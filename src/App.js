import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Tabela from './Tabela.js';
import Header from './Header.js'
import PopUp from './PopUp';
import Formulario from './Formulario';
import ApiService from './ApiService';


class App extends Component {
  constructor(props){
    super(props);
    
    this.state= {
      autores: []
    }
  }

  // state = {
    // autores:  [
      // {
      //   nome: 'Paulo',
      //   livro: 'React',
      //   preco: '1000'
      // },
      // {
      //   nome: 'Daniel',
      //   livro: 'Java',
      //   preco: '99'
      // },
      // {
      //   nome: 'Marcos',
      //   livro: 'Design',
      //   preco: '150'
      // },
      // {
      //   nome: 'Bruno',
      //   livro: 'DevOps',
      //   preco: '100'
      // },
      // {
      //   nome: 'Bruna',
      //   livro: 'DevOps',
      //   preco: '1000'
      // }
    // ]
  // }

  removerAutor = (indiceSelecionado) => {
    const {autores} = this.state;

    ApiService.RemoveAutor(indiceSelecionado)
      .then(() => {
        this.setState(
          {
            autores: autores.filter((autor) => {
                    return indiceSelecionado !== autor.id
            })
          }
        )
        PopUp.exibeMensagem('success', "Autor removido com sucesso");
      })
  }

  incluirAutor = (autor) => {
    ApiService.CriaAutor(autor)
      .then((resp) => {
        autor.id = resp.data.id;
        this.setState(
          {
            autores: [...this.state.autores, autor]
          }
        )
        PopUp.exibeMensagem('success', "Autor adicionado com sucesso");
      })
  }

  componentDidMount (){
    console.log('componentDidMount');
    ApiService.ListaAutores()
      .then(res => {
        console.log(res);
        
        this.setState({
          autores: [...res.data]
        })
      })
  }
  
  render() {
    console.log('render');

    return (
      <Fragment>
        <Header/>
        <div className="container mb-10">
          <h1>Casa do Código</h1>
          <Tabela autores = {this.state.autores} removerAutor= {this.removerAutor} />
          <Formulario submit= {this.incluirAutor}/>
        </div>
      </Fragment>
    );
  }
}

export default App;
