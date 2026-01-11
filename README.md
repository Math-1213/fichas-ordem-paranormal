# 🌀 Ficha Paranormal - Dashboard de RPG

Uma aplicação web interativa e de alta performance desenvolvida para jogadores do sistema de RPG **Ordem Paranormal**. Este dashboard permite gerenciar personagens, realizar rolagens de dados complexas e consultar rituais de forma dinâmica.

## ✨ Funcionalidades

- **🎲 Calculadora de Dados Inteligente**: Suporta expressões complexas (ex: `/FOR/d20 + /LUTA/`).
- **🔄 Modos de Rolagem**: Alternância entre **Modo Teste** (pega o melhor dado) e **Modo Soma** (soma todos os valores, ideal para dano).
- **🔮 Grimório de Rituais**: Listagem completa com filtros por elemento (Sangue, Morte, Energia, Conhecimento, Medo) e círculo.
- **📜 Histórico em Tempo Real**: Registro das últimas 10 rolagens da sessão com detalhes técnicos.
- **📱 Interface Responsiva**: Design Dark Mode otimizado para desktop e dispositivos móveis usando React-Bootstrap.

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca UI.
- [Vite](https://vitejs.dev/) - Bundler de próxima geração para um desenvolvimento rápido.
- [React-Bootstrap](https://react-bootstrap.github.io/) - Framework de componentes UI.
- [Lucide React](https://lucide.dev/) - Conjunto de ícones leves.
- [JSDoc](https://jsdoc.app/) - Documentação de funções e lógica.

## 🚀 Começando

Siga as instruções abaixo para rodar o projeto localmente.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

### Instalação

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
   ```
2. Entre na pasta do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Abra o navegador no endereço indicado pelo terminal (geralmente http://localhost:5173).

⚙️ Sistema de Rolagem
O projeto utiliza uma lógica personalizada para traduzir abreviações da ficha:

/FOR/ -> Traduz para o valor do atributo Força do personagem.

/PONT/ -> Traduz para o bônus da perícia Pontaria.

d20 -> Dispara automaticamente a mecânica de "pegar o melhor" se estiver no Modo Teste.

📄 Licença
Este projeto é para fins de entretenimento e suporte à comunidade de RPG. Sinta-se à vontade para contribuir!

Desenvolvido com ❤️ para a comunidade de Ordem Paranormal.
