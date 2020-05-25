import React, {Component} from 'react';
import FormValidator from './FormValidator';
import PopUp from './PopUp';


class Formulario extends Component {
    constructor (props){
        super(props);

        this.validador = new FormValidator([
            {
            campo:'nome',
            metodo:'isEmpty',
            validoQuando: false,
            mensagem: 'Entre com um nome'
            },
            {
            campo:'livro',
            metodo:'isEmpty',
            validoQuando: false,
            mensagem: 'Entre com um livro'
            },
            {
            campo:'preco',
            metodo:'isInt',
            args: [{min:0, max:99999}],
            validoQuando: true,
            mensagem: 'Entre com um valor numérico'
            }
        ]);

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.validador.valido(),
        }


        this.state = this.stateInicial;
    }

    escutadorInput = (event) => {
        const {name, value} = event.target;
        console.log(name, value);

        this.setState(
            {
                [name]: value
            }
        )
    }

    tratarSalvar = () => {
        const validacao = this.validador.valida(this.state);

        if(validacao.isValid) {
            this.props.submit(this.state);
            this.setState(this.stateInicial);
        }else{
            const {nome, livro, preco} = validacao;
            const campos = [nome, livro, preco];
    
            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid;
            });
            camposInvalidos.forEach(item => {
                PopUp.exibeMensagem('error', item.message);
            });
    
        }
    }
        

    render () {
        const {livro, preco} = this.state;

        return (
            <form>
                <div className="row">
                    <div className="input-field col s4">
                        <label htmlFor="nome" >Nome</label>
                        <input
                            id="nome"
                            type="text"
                            name="nome"
                            value={this.state.nome}
                            onChange={this.escutadorInput}
                        />
                    </div>
                    <div className="input-field col s4">
                        <label htmlFor="livro">Livro</label>
                        <input
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange={this.escutadorInput}
                        />
                    </div>

                    <div className="input-field col s4">
                        <label htmlFor="preco">Preço</label>
                        <input
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={this.escutadorInput}
                        />
                    </div>
                </div>
                <button type="button" className="waves-effect waves-light btn" onClick={this.tratarSalvar}>Salvar
                </button>
            </form>
        )
    }
}

export default Formulario;