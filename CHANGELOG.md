# Changelog - Ordem Paranormal Ficha

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.
## [1.3.0] - 2026-01-xx

### Corrigido

### Adicionado

- Novo Seletor de Personagens.
- Hud do Personagme na ficha.
- Adicionado Condições para o HUD.

### Alterado

- Melhoria na experiência de uso (UX/UI) das informações exibidas ao usuário.

## [1.2.0] - 2026-01-17

### Corrigido

- Correção no input de nacionalidade.
- Correção de falha que impedia o salvamento de novos personagens.

### Adicionado

- Criação do arquivo de regras para padronização de nomenclaturas no sistema.
- Implementação das regras na criação de personagens.
- Implementação de informações adicionais nas seções de Infos, Atributos, Perícias e Status.
- Aplicação de calculadoras automáticas para Vida, Sanidade e Esforço.
- Implementação da calculadora básica de Defesa.
- Aplicação de Poderes e Percias Automaticas

### Alterado

- Melhoria na experiência de uso (UX/UI) das informações exibidas ao usuário.

## [1.1.2] - 2026-01-15

### Adicionado

- Script de inicialização automática (`run.bat`).
- Geração de subdomínios aleatórios para evitar conflitos no Localtunnel.
- Captura automática de IP Público para o "IP Chave".
- Suporte a Servidor de Produção usando o pacote `serve`.

### Corrigido

- Erro de leitura de JSON no Python 3.13 (ajuste de encoding para `utf-8-sig`).
- Duplicidade de arquivos de configuração (`enviroment.json` vs `environment.json`).
- Problema de cache no Vite que mantinha URLs antigas da API após o build.

### Alterado

- Otimização do fluxo de inicialização: agora o build é gerado após a atualização das configurações.
- Janelas do terminal agora iniciam minimizadas para reduzir a poluição visual.

## [1.0.0] - 2026-01-10

### Adicionado

- Estrutura base da API em Flask.
- Sistema de fichas de personagens.
- Integração inicial com Localtunnel para modo desenvolvimento.
