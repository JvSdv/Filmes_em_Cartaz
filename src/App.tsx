import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Movie } from './types/Types';

const App = () => {
    //assim tipamos o tipo da variável
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        loadMovies();
    }, []);

    async function loadMovies() {
        setLoading(true);
        //https://api.b7web.com.br/cinema/
        //primeiro vem a string, depois o json

        //metodo 1
        try {
            const response = await fetch('https://api.b7web.com.br/cinema/');
            const data = await response.json();
            setMovies(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            alert('Erro ao carregar os dados');
            console.error(error);
        }

        //metodo 2 o then é um metodo que executa uma função quando a requisição for concluida, ou seja, quando o fetch for concluido o json é retornado e o setMovies é colocado como o json
        // antes so desse jeito mas agora com o async await posso usar o metodo 1 ou 2 com await fetch
        /*  await fetch('https://api.b7web.com.br/cinema/')
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        alert('teste'); */
    }

    return (
        <Container>
            <Row>
                <Button onClick={loadMovies} className={'mt-2 col-sm-3'}>
                    Carregar Filmes
                </Button>
                {loading && (
                    <div>
                        Carregando...
                        <div className='spinner-border text-primary' role='status'></div>
                    </div>
                )}
                {movies.length > 0 && <p>Total de filmes: {movies.length}</p>}
            </Row>
            <Row>
                {movies.map(
                    (movie, index) =>
                        //se tiver escape route, entao nao colocamos na tela
                        movie.titulo.toLowerCase().indexOf('escape route') === -1 && (
                            <Col key={index} xs={6} sm={6} md={4} lg={2}>
                                {/* verificar se o filme tem "Escape Route" no titulo e se tiver
                                deleta-lo */}
                                <div className='card my-2'>
                                    <img src={movie.avatar} alt={movie.titulo} />
                                    <div className='card-body' style={{ minHeight: '5rem' }}>
                                        <h6 className='card-title'>{movie.titulo}</h6>
                                    </div>
                                </div>
                            </Col>
                        ),
                )}
            </Row>
        </Container>
    );
};

export default App;
