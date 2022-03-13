# Cadastro de carro

**RF**
Dever ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias

**RNF**

**RN**
Não deve ser possível cadastrar com uma placa ja existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado, por padrão com disponibilidade.
Somente usuários administradores poderão cadastrar carros.

# Listagem de carro

**RF**
Deve ser possível listar todos carros disponíveis 
Deve ser possível listar todos carros disponíveis pelo o nome da categoria
Deve ser possível listar todos carros disponíveis pelo o nome da marca
Deve ser possível listar todos carros disponíveis pelo o nome do carro

**RNF**

**RN**
O usuário não precisa estar logado no sistema

# Cadastro de Especificação do carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações
deve ser possível listar todos os carros
 
**RNF**

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Somente usuários administradores poderão cadastrar especificações.

# Cadastro de Imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível lista todos os carros
 
**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O Usuário pode cadastrar mais de uma imagem para o mesmo carro
Somente usuários administradores poderão cadastrar imagens.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RNF**

**RN**
O aluguel dever duração minima de 24 hora
Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro

