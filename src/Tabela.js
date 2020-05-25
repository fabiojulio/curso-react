import React, {Component} from 'react';

const TableHead = () => {
    return(
        <thead>
            <tr>
                <th>Autor</th>
                <th>Livro</th>
                <th>Preço</th>
                <th>Remover</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const {removerAutor} = props;
    const linhas = props.autores.map((item, index) => {
        return (
            <tr key={item.id}  >
                <td>{item.nome}</td>
                <td>{item.livro}</td>
                <td>{item.preco}</td>
                <td><button className="waves-effect waves-light btn" onClick={() => {removerAutor(item.id)}}>Remover</button></td>
            </tr>
        )
    })

    return (
        <tbody>
            {linhas}
        </tbody>
    )
}

class Tabela extends Component{
    render (){
        const {autores, removerAutor} = this.props;
        return(
            <table className="highlight">
                <TableHead/>            
                <TableBody autores = {autores} removerAutor = {removerAutor}/>
            </table>
        )
    }
}

export default Tabela;