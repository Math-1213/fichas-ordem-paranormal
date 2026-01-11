from backend.backend import create_app

# Inicializa a aplicação Flask
app = create_app()

# Configurações de rede
# "0.0.0.0" permite acesso de outros dispositivos na mesma rede (celular, tablet)
host = "0.0.0.0"
port = 5001

if __name__ == "__main__":
    """
    Ponto de entrada do script.
    Roda o servidor de desenvolvimento do Flask.
    """
    # debug=True habilita o recarregamento automático ao alterar arquivos
    app.run(debug=True, host=host, port=port)