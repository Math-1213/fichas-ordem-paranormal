import json
import os
from backend.backend import create_app

# 1. Carregar as configurações do arquivo JSON
config_path = os.path.join(os.path.dirname(__file__), 'environment.json')
with open(config_path, 'r', encoding='utf-8-sig') as f:
    config = json.load(f)

# Inicializa a aplicação Flask
app = create_app()

# 2. Usar as configurações do JSON
host = "0.0.0.0"
port = config['api_port']

if __name__ == "__main__":
    """
    Ponto de entrada do script.
    Roda o servidor de desenvolvimento do Flask.
    """
    print(f"Sua API será mapeada pelo túnel na porta: {port}")
    # debug=True habilita o recarregamento automático ao alterar arquivos
    app.run(debug=True, host=host, port=port)